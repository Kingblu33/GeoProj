const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config()
const app = express();
const url = "https://myadminapi.geotab.com/v2/MyAdminApi.ashx"

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

let apiKey = "";
let sessionId = "";

app.post("/authenticate", async (req, res) => {
    const username = process.env.CRED_DATA_USERNAME1
    const password = process.env.CRED_DATA_PASSWORD2
    try {
        const response = await axios.post(url,
            {
                'method': 'Authenticate',
                params: {
                    'username': username,
                    'password': password
                }
            });
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

app.get('/getDevicePlans', async (req, res) => {
    try {
        const response = await axios.post(url, {
            id: -1,
            method: "GetDevicePlans",
            params: {
                
                sessionId: "",
                // serialNo: serialNumber
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
});


// change route to loginstall
//log install will always be penske.

app.post('/getdevice/:serialNumber', async (req, res) => {
    const serialNumber = req.params.serialNumber;
    try {
        const response = await axios.post(url, {
            id: -1,
            method: "LookupDevice",
            params: {
                apiKey: apiKey,
                sessionId: sessionId,
                serialNo: serialNumber
            }
        });

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
                lastCom: lastCommunicationDate
            });
        } else if(response.data && response.data.error){
            res.status(400).json({error: response.data.error})
        }
        else {
            res.json(response.data);
        }
    } catch (error) {
        // console.log(error)
        res.status(500).json({error: error.message})
    }
});


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


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
