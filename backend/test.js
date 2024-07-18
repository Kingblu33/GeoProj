const express = require('express');
const GeotabApi = require('mg-api-js');
require('dotenv').config()
const app = express();

const authentication = {
    credentials: {
        database: process.env.CRED_DATA_DATABASE,
        userName: process.env.CRED_DATA_USERNAME,
        password: process.env.CRED_DATA_password
    },
        path: process.env.CRED_DATA_SERVER
};


const api = new GeotabApi(authentication)
// console.log(GeotabApi)

api.authenticate(success => {
    // const apiKey = api._helper.credentialStore.credentials_key;
    // const sessionId = api._helper.credentialStore.server_key;
    console.log("successful Auth")
}, (message, error) => {
    console.log('Something went wrong', error);
    console.log(message)
});


app.get('/getdevices', async (req, res) => {
    try {
        const devices = await api.call('Get',
            {
                "typeName": 'Device',
                "resultsLimit": 1
            }
        );
        // console.log(JSON.stringify(devices))
        res.json(devices);
    } catch (error) {
        console.error('Err', error);
        res.status(500).json({ error });
    }
});

app.get('/test2/:device', async (req, res) => {
    const device = req.params.device;
    try {
        const result = await api.call("Get", {
            "typeName": "LogRecord",
            "resultsLimit": 1, 
            "deviceSearch": {
                "serialNumber": device
            }
        });
        res.json(result);
    } catch (error) {
        console.error('Err', error);
        res.status(500).json({ error: 'Server Err' });
    }
});

app.get('/test3', async (req,res)=>{
    
    const apiKey = api._helper.credentialStore.credentials_key;
    const sessionId = api._helper.credentialStore.userId;
    try{
        const device = await api.call("LookupDevice", {
            "apiKey":apiKey,
            "sessionId": sessionId,
            "resultsLimit": 1, 
            "serialNo": "G9902108E954",
            
        });
        res.json(device)
    }catch(error){
        console.error('Err',error);
        res.status(500).json({ error: 'Server Err' })
    }
})

app.get('/getStatus', async (req,res)=>{
    
    try{
        const device = await api.call("Get", {
            "typeName": "StatusData",
            "resultLimit": 1,
            // "serach": {
            //     "deviceSearch":{
            //         "serialNumber": "G9902108E954"
            // }
            "Device": "G9902108E954"
        });
        res.json(device)
    }catch(error){
        console.error('Err',error);
        res.status(500).json({ error: 'Server Err' })
    }
})

// b1952D
// Note: Log record gets the datetime for the vehicle by the id.
app.get('/test4/:serialNo', async (req, res) => {
    const serialNumber = req.params.serialNo
    try {
        const device = await api.call("Get",
            {
                "typeName": "DeviceStatusInfo",
                "resultsLimit": 1,
                "search": {
                    "deviceSearch": {
                        "serialNumber": serialNumber
                    }
                }

            });
        console.log(device);
        res.json(device);
    } catch (error) {
        console.error('Err', error);
        res.status(500).json({ error: 'Server Err' });
    }
});

app.get('/status/:deviceSerial', async (req, res) => {
    const serial = req.params.deviceSerial;
    try {
        const deviceInfo = await api.call('Get', {
            "typeName": "IoxAddOnStatus",
            "resultsLimit": 1,
            "search": {
                "deviceSearch": {
                    "serialNumber": serial
                }
            }
        })
        console.log(deviceInfo)
        res.json(deviceInfo);
    } catch (error) {
        console.log(error)
    }
})

app.get('/getdevice/:serialNumber',async (req,res)=>{
    const serialNumber = req.params.serialNumber;
    try {
        const response = await api.call("LookupDevice", {
                id: -1,
                params:{
                    apiKey: "2c1c6d85-2b37-4f4c-8aa7-bea58ded1c35",
                    sessionId: "65f732c4-8b13-4640-b95b-2bf6957f490b",
                    serialNo: serialNumber
                }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Server Error" });
    }
})
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

