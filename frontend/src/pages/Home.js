import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import image2 from "../Images/Tractor divided highway.jpeg";

const Home = () => {
    const [serialNumber, setSerialNumber] = useState("");
    const [location, setLocation] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        getDevice(serialNumber);
    };

    const getDevice = (serial) => {
        setIsLoading(true);
        fetch(`http://localhost:5000/getdevice/${serial}`, {
            method: "POST",
        })
            .then((response) => {
                if (response.status === 404) {
                    console.log(response);
                    throw new Error("Device not found");
                } else {
                    return response.json();
                }
            })
            .then((responseData) => {
                if (responseData.error) {
                    setError(responseData);
                    setIsLoading(false);
                    console.log(error);
                } else {
                    setError(null);
                    navigate('/TestResult', { state: { data: responseData } });
                    setIsLoading(false);
                }
            })
            .catch((err) => {
                setIsLoading(false);
                console.log("Server Encountered an error: ", err);
                setError(err);
            });
    };

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5 relative">
            {isLoading && (
                <>
                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black opacity-50">
                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-400"></div>
                    </div>
                </>
            )}
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full md:max-w-6xl" style={{ height: '600px' }}>
                <div className="md:flex w-full h-full">
                    <div className="md:w-1/2 py-10 px-10 relative h-full rounded-l-3xl overflow-hidden bg-black">
                        <img src={image2} className="absolute inset-0 w-full h-full object-cover" alt="Truck with trailer" />
                    </div>
                    <div className="w-full md:w-1/2 py-10 px-8 h-full flex flex-col justify-center">
                        <form onSubmit={submit} className="space-y-6">
                            <div className="text-center mb-4">
                                <h1 className="font-bold font-mono text-3xl text-gray-900">Geotab Device Check</h1>
                            </div>
                            <div>
                                <label className="font-mono block text-sm font-semibold mb-1" htmlFor="provider">Provider</label>
                                <input id="provider" type="text" value="Geotab" readOnly className="font-mono block w-full border border-gray-600 rounded-md px-3 py-2 bg-gray-200 text-black cursor-not-allowed" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1 font-mono" htmlFor="serialNumber">Enter Serial Number (Don't include dashes)</label>
                                <input id="serialNumber" type="text" value={serialNumber} onChange={(event) => setSerialNumber(event.target.value)} className="w-full border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-white text-black" />
                            </div>
                            <div>
                                <label className="font-mono block text-sm font-semibold mb-1" htmlFor="location">Enter Location (xxxx-xx)</label>
                                <input id="location" type="text" value={location} onChange={(event) => setLocation(event.target.value)} className="w-full border border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 bg-white text-black" />
                            </div>
                            <button type="submit" className={`font-mono w-full py-2 rounded-md focus:outline-none ${serialNumber.length < 5 || serialNumber.length > 12 ? "bg-gray-500 text-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600 focus:bg-blue-600"}`} disabled={serialNumber.length < 5 || serialNumber.length > 12}> Submit </button>
                        </form>
                        <Link to={"/help"} className="font-mono block text-xs font-semibold text-blue-900 mt-4">Need Help?</Link>
                        <Link to={"/Dashboard"} className="font-mono block text-xs font-semibold text-blue-800 mt-4">Return to Dashboard.</Link>
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
