require('dotenv').config()
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const url = "https://myadminapi.geotab.com/v2/MyAdminApi.ashx"

app.use(cors({
    origin: 'http://localhost:3000',
    // origin: '*',
    credentials: true
}));

let apiKey = "";
let sessionId = "";
const authenticate = async () =>{
    const username = process.env.CRED_DATA_USERNAME1
    const password = process.env.CRED_DATA_PASSWORD2

    const response =  await axios.post(url,
        {
        method: 'Authenticate',
        params: {
            'username': username,
            'password': password
        }
})

apiKey = response.data.result.userId;
sessionId = response.data.result.sessionId

return response;
}

app.post("/authenticate", async (req, res) => {
    try {
        const response = await authenticate();
        if (response !== null && response.data) {
            apiKey = response.data.result.userId;
            sessionId = response.data.result.sessionId
            res.json(response.data);
        }
    } catch (error) {
        
        console.log(error)
        res.status(500).json({ error: error.message })
    }
})

const getDevice = async (serialNumber) => {
    console.log("Calling get device")
    const response =  await axios.post(url,{
            id: -1,
            method: "LookupDevice",
            params: {
                apiKey: apiKey,
                sessionId: sessionId,
                serialNo: serialNumber
            }
    })
    return response
}

app.post('/getdevice/:serialNumber', async (req, res) => {
    const serialNumber = req.params.serialNumber;
    let retry = 0;
    let success = false;

    while(!success && retry <=3){
        try {
            const response = await getDevice(serialNumber);
            if (Object.keys(response.data).length === 0) {
                const error ={error:{message: 'Device not found' , serialNumber: serialNumber}}
                res.status(404).json(error)
                success = true;
    
            } else if (response.data && response.data.result && response.data.result.request && response.data.result.request.device) {
                const { serial, deviceType } = response.data.result.request.device;
                const lastCommunicationDate = new Date(response.data.result.lastServerCommunication);
                const currentDate = new Date();
                const differenceInDays = Math.floor((currentDate - lastCommunicationDate) / (1000 * 60 * 60 * 24));
                let status;
                if (differenceInDays <= 3) {
                    status = 'Reporting';
                } else {
                    status = 'Not Reporting';
                }
            
                res.json({ 
                    status: status,
                    serialNumber: serial,
                    device: deviceType,
                    serialNumber: serialNumber,
                    lastCom: lastCommunicationDate
                });
                success = true;
            } else if(response.data && response.data.error){
                //this should be the onl
                console.log("Api Key Error")
                console.log("Authenticating")
                await new Promise(resolve => setTimeout(resolve, 1000)); //awaiting between retrys so the server doesnt get overloaded 
                await authenticate();
                retry += 1;
                
            }
            else {
                res.json(response.data);
            }
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

});

app.post("/loginstall/:serialNumber/:location",async(req,res)=>{
    const serialNumber = req.params.serialNumber;
    const location = req.params.location;
try{
    const response = await axios.post(url,{
        id: -1,
        "method": "LogInstall",
        "params":{
            apiKey: apiKey,
            sessionId: sessionId,
            serialNo: serialNumber,
            installerCompany:"Penske",
            installerName:"0000"
        }
        
    })
    if (Object.keys(response.data).length === 0) {
        const error ={error:{message: 'Device not found' , serialNumber: serialNumber}}
        res.status(404).json(error)

    } else if (response.data && response.data.result && response.data.result.request && response.data.result.request.device) {
        const { serial, deviceType } = response.data.result.request.device;
        const lastCommunicationDate = new Date(response.data.result.lastServerCommunication);
        const currentDate = new Date();
        const differenceInDays = Math.floor((currentDate - lastCommunicationDate) / (1000 * 60 * 60 * 24));

        let status;
        if (differenceInDays <= 3) {
            status = 'Reporting';
        } else {
            status = 'Not Reporting';
        }

        res.json({ 
            status: status,
            serialNumber: serial,
            device: deviceType,
            serialNumber: serialNumber,
            lastCom: lastCommunicationDate,
            location: location
        });
    } else if(response.data && response.data.error){
        console.log("Api Key Error")
        res.status(400).json({error: response.data.error})

    }
    else {
        res.json(response.data);
    }
} catch (error) {
    // console.log(error)
    res.status(500).json({error: error.message})
}});
    

// Eg of returned data: 
//     "result": {
//         "request": {
//             "device": {
//                 "id": 9015048,
//                 "serialNumber": "GARZUPW3VW6T",
//                 "modemSerialNo": "355917923167239",
//                 "deviceType": {
//                     "name": "GO"
//                 }
//             },
//             "requestDateUtc": "2024-04-05T12:59:33.016Z"
//         },
//         "resultDateUtc": "2024-04-05T12:59:33.016Z",
//         "lastServerCommunication": "2024-04-04T18:45:54.885Z",
//         "simNumber": "89148000008717534667",
//         "simActive": true,
//         "comments": "No Recent Engine Data, No Recent AUX Logs",
//         "possibleIssues": "No Valid GPS Records, No Recent Ignition On",
//         "firmwareVersion": "124.39.35"
//     }
// }

process.on('SIGINT', function() {
    console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
    // some other closing procedures go here
    process.exit(9);
});

app.listen(5000,'0.0.0.0', () => {
    console.log('Server is running on port 5000');
});
