//LookupDevice seems to not work without admin priviledges

app.get('/test3', async (req,res)=>{
    
    const apiKey = api._helper.credentialStore.credentials_key;
    const sessionId = api._helper.credentialStore.userId;
    try{
        const device = await api.call("LookupDevice", {
            // "apiKey":apiKey,
            // "sessionId": sessionId,
            // "resultsLimit": 1, 
            "serialNo": "G9902108E954",
            
        });
        console.log(JSON.stringify(device));
        res.json(device)
    }catch(error){
        console.error('Err',error);
        res.status(500).json({ error: 'Server Err' })
    }
})

app.get('/getVersion',(req,res)=>{
    try{
        const version = api.call("GetVersion",{});
        console.log(JSON.stringify(version))
        res.json(version)
    }
    catch(error){
        console.log(error);
    }
})


// app.post('/getdevice/:serialNumber', async (req, res) => {
//     const serialNumber = req.params.serialNumber;
//     try {
//         const response = await axios.post(url, {
//             id: -1,
//             method: "LookupDevice",
//             params: {
//                 apiKey: apiKey,
//                 sessionId: sessionId,
//                 serialNo: serialNumber
//             }
//         });
//         // if(response.data  && response.data.result){
//         //     const {serial, deviceType}  = response.data.result.request.device
        
//         //     const lastCommunicationDate = new Date(response.data.result.lastServerCommunication);
//         //     const currentDate = new Date();
//         //     const differenceInDays = Math.floor((currentDate - lastCommunicationDate) / (1000 * 60 * 60 * 24));

//         //     if (differenceInDays <= 3) {
//         //         res.json({ 
//         //             status: 'Reporting',
//         //             serialNumber: serial,
//         //             device: deviceType,
//         //             lastCom: lastCommunicationDate
//         //         })
//         //     } else if (differenceInDays >= 3){
//         //         res.json({ 
//         //             status: 'Not Reporting',
//         //             serialNumber: serial,
//         //             device: deviceType,
//         //             lastCom: lastCommunicationDate
//         //         });
//         //     }
//         // }
//         res.json(response.data);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: error.message });
//     }
// })