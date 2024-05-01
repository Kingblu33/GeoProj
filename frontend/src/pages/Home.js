import React, { useState, useEffect } from "react";
import { useNavigate,Link } from "react-router-dom";
// import { logDevice, getDevice, authenticateUser, handleAuthenticationReset } from "../functions/api"
const Home = () => {
    const [authenticate, setAuthenticate] = useState(true);
    const [serialNumber, setSerialNumber] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    //Submit form and calls get device function
    const submit = (e) => {
        e.preventDefault();
        getDevice(serialNumber);
    };

    //currently alternating between this and get device
    const logDevice = (serial, location) => {
        fetch(`http://localhost:5000/loginstall/${serial}/${location}`, {
            method: "POST",
        })
            .then((response) => {
                if (response.status === 400) {
                    console.log("Need to reauth");
                    handleAuthenticationReset();
                    throw new Error("Authenticating");
                } else if (response.status === 404) {
                    console.log(response);
                    throw new Error("Device not found");
                } else {
                    return response.json();
                }
            })
            .then((responseData) => {
                if (responseData.error) {
                    //think about remove this considering we arent really using it anymore
                    // setData(null);
                    setError(responseData);
                    console.log(error);
                } else {
                    setError(null);
                    navigate('/results', { state: { data: responseData } })
                    // setData(responseData);
                    console.log(responseData);
                }
            })
            .catch((err) => {
                console.log("Server Encountered an error: ", err);
                setError(err);
            });
    };
    const getDevice = (serial) => {
        setIsLoading(true);
        fetch(`http://192.168.0.104:5000/getdevice/${serial}`, {
            method: "POST",
        })
            .then((response) => {
                if (response.status === 400) {
                    console.log("Need to reauth");
                    handleAuthenticationReset();
                    throw new Error("Authenticating");
                } else if (response.status === 404) {
                    console.log(response);
                    throw new Error("Device not found");
                } else {
                    return response.json();
                }
            })
            .then((responseData) => {
                if (responseData.error) {
                    // setData(null);
                    setError(responseData);
                    setIsLoading(false);
                    console.log(error);
                } else {
                    setError(null);
                    navigate('/results', { state: { data: responseData } })
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log("Server Encountered an error: ", err);
                setError(err);
            });
    };

    //consider moving this to the backend
    const authenticateUser = () => {
        setIsLoading(true);
        fetch("http://localhost:5000/authenticate", {
            method: "POST",
        })
            .then((response) => response.json())
            .then((data) => {
                if (data !== null) {
                    setAuthenticate(true);
                    // localStorage.setItem("authenticated", "true");
                    console.log("Authenticated");
                    setError(null);
                    getDevice(serialNumber);
                }
            })
            .catch((error) => {
                console.log(error)
                setIsLoading(false);
                setError(error);
            });
    };


    // this as well to the backend
    const handleAuthenticationReset = () => {
        console.log("Authentication reset. Re-authenticating...");
        setAuthenticate(false);
        authenticateUser();
    };

    useEffect(() => {
        if (!authenticate) {
            authenticateUser();
        }
    }, [authenticate,serialNumber]);

    return (
        <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5 relative">
            {isLoading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-400 h-12 w-12 mb-4"></div>
                </div>
            )}
            {isLoading && (
                <div className="absolute inset-0 z-10 bg-black opacity-50"></div>
            )}
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full md:max-w-4xl overflow-hidden">
                <div className="md:flex w-full">
                    <div className="md:w-1/2 py-10 px-10 relative">
                        <img
                            src="https://cdn.continental.com/fileadmin/__imported/sites/corporate/_international/english/hubpages/10_20press/01_press_releases/06_20cvt/2023/continental_pp_fleets.jpg"
                            className="absolute inset-0 w-full h-full object-cover"
                            alt="Truck with trailer"
                        />
                    </div>
                    <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
                        <form onSubmit={submit}>
                            <div className="text-center mb-10">
                                <h1 className="font-bold text-3xl text-gray-900">
                                    Device Check
                                </h1>
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs font-semibold mb-1" htmlFor="provider">
                                    Choose a provider
                                </label>
                                <select
                                    id="provider"
                                    className="block w-full border border-gray-600 rounded-md px-3 py-2 bg-white text-black"
                                >
                                    <option value="Geotab">Geotab</option>
                                    <option value="Geotab">Samsara</option>
                                    <option value="Geotab">Zonar</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs font-semibold mb-1" htmlFor="serialNumber">
                                    Enter Serial Number (Don't include dashes)
                                </label>
                                <input
                                    id="serialNumber"
                                    type="text"
                                    value={serialNumber}
                                    onChange={(event) => setSerialNumber(event.target.value)}
                                    className="w-full border border-gray-600 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500 bg-white text-black"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-xs font-semibold mb-1" htmlFor="location">
                                    Enter Location (xxxx-xx)
                                </label>
                                <input
                                    id="location"
                                    type="text"
                                    value={location}
                                    onChange={(event) => setLocation(event.target.value)}
                                    className="w-full border border-gray-600 rounded-md px-3 py-2 mb-2 focus:outline-none focus:border-blue-500 bg-white text-black"
                                />
                            </div>
                            <button
                                type="submit"
                                className={`w-full py-2 rounded-md focus:outline-none ${serialNumber.length < 5 || serialNumber.length > 12
                                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                                    : "bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600"
                                    
                                    }`}
                                disabled={serialNumber.length < 5 || serialNumber.length > 12}
                            >
                                Submit
                            </button>
                        </form>
                        <Link to={"/help"} className="block text-xs font-semibold text-blue-300 mt-4">Need Help?</Link>
                        {error !== null && error.message ? (
                            <div className="mt-6">
                                <p className="text-red-600 mb-2">{error.serialNumber}</p>
                                <p className="text-red-600">{error.message}</p>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
