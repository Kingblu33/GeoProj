export const SamsaraData = [
    {
        image: "https://images.ctfassets.net/bx9krvy0u3sx/7ia7qpeK6TeGaAvtoIE6U8/5b7365b8c75ae8b315d3096e66f678c0/fleet-manager-4-vg34.jpg",
        description: "Samsara offers innovative fleet management and IoT solutions.",
        troubleshoot: "Troubleshoot common issues with Samsara devices using the provided guide."
    },
    {
        image: "https://images.ctfassets.net/bx9krvy0u3sx/7ia7qpeK6TeGaAvtoIE6U8/5b7365b8c75ae8b315d3096e66f678c0/fleet-manager-4-vg34.jpg",
        description: "Samsara's platform helps optimize fleet performance and safety measures.",
        troubleshoot: "Learn how to troubleshoot Samsara hardware and software issues."
    },
];

export const ZonarData = [
    {
        image: "https://i.ebayimg.com/images/g/EXwAAOSwuXllejN3/s-l1200.webp",
        description: "Zonar provides smart fleet management solutions.",
        troubleshoot: "Refer to the Zonar troubleshooting guide for assistance."
    },
    {
        image: "https://i.ebayimg.com/images/g/EXwAAOSwuXllejN3/s-l1200.webp",
        description: "Zonar provides smart fleet management solutions.",
        troubleshoot: "Refer to the Zonar troubleshooting guide for assistance."
    }
];

export const GeotabData = [
    {
        image: "https://www.geotab.com/CMS-Media-production/Product/GO/geotab-go9-hero.jpg",
        description: "Geotab is a vehicle tracking and fleet management platform."
    },
    {
        image: "https://www.geotab.com/CMS-Media-production/Product/GO/geotab-go9-hero.jpg",
        description: "Geotab offers advanced telematics solutions for businesses."
    },
];


export const getDevice = async (serial) => {
    // setIsLoading(true);
    fetch(`http://localhost:5000/getdevice/${serial}`, {
        method: "POST",
    })
        .then((response) => {
            if (response.status === 404) {
                throw new Error("Device not found");
            } else { 
                return response.json();
            }
        })
        .then((responseData) => {
            if (responseData.error) {
                throw new Error(responseData);
            } else {
               return responseData
            }
        })
        .catch((err) => {
            // setIsLoading(false);
            console.log("Server Encountered an error: ", err);
            // setError(err);
        });
};

// const logDevice = (serial, location) => {
//     fetch(`http://localhost:5000/loginstall/${serial}/${location}`, {
//         method: "POST",
//     })
//         .then((response) => {
//             if (response.status === 400) {
//                 console.log("Need to reauth");
//                 // handleAuthenticationReset();
//                 throw new Error("Authenticating");
//             } else if (response.status === 404) {
//                 console.log(response);
//                 throw new Error("Device not found");
//             } else {
//                 return response.json();
//             }
//         })
//         .then((responseData) => {
//             if (responseData.error) {
//                 //think about remove this considering we arent really using it anymore
//                 // setData(null);
//                 setError(responseData);
//                 console.log(error);
//             } else {
//                 setError(null);
//                 navigate('/results', { state: { data: responseData } })
//                 // setData(responseData);
//                 console.log(responseData);
//             }
//         })
//         .catch((err) => {
//             console.log("Server Encountered an error: ", err);
//             setError(err);
//         });
// };