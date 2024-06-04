import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Result = () => {
    const location = useLocation();
    const { data } = location.state || {};


    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
                <div className="bg-dark-100 rounded-lg shadow-lg p-8 w-full max-w-md border border-gray-300">
                    <h1 className="text-2xl font-semibold mb-6 text-center font-mono">No Results Found</h1>
                    <div className="mt-8">
                        <Link
                            to="/Home"
                            className="font-mono bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full block w-full text-center"
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
            <div className="bg-dark-100 rounded-lg shadow-lg p-8 w-full max-w-md border border-gray-300">
                <h1 className="font-mono text-2xl font-semibold mb-6 text-center">Results</h1>

                <div className="grid grid-cols-2 gap-4">
                    {[
                        { label: 'Status', value: data.status },
                        { label: 'Device', value: data.device.name },
                        { label: 'Last Reported Date', value: data.lastCom },
                        { label: 'Serial Number', value: data.serialNumber },
                    ].map((item, index) => (
                        <div key={index} className="font-mono flex flex-col justify-between p-4 border rounded-lg">
                            <span className="font-mono text-sm">{item.label}</span>
                            <span className="font-mono font-semibold">{item.value}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-8">
                    {
                        data.status === "Not Reporting" ?
                            <div className="flex justify-between space-x-4">
                                <Link
                                    to="/help"
                                    className="font-mono bg-red-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full block w-1/2 text-center"
                                >
                                    Troubleshoot
                                </Link>
                                <Link
                                    to="/Home"
                                    className="font-mono bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full block w-1/2 text-center"
                                >
                                    Back to Home
                                </Link>
                            </div>
                            :
                            <Link
                                to="/Home"
                                className="font-mono bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full block w-full text-center"
                            >
                                Back to Home
                            </Link>
                    }
                </div>


            </div>
        </div>
    );
};

export default Result;
