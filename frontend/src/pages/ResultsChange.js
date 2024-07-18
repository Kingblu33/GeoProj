import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const ResultsChange = () => {
    const location = useLocation();
    const { data } = location.state || {};

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900 text-black">
                <div className="bg-dark-100 rounded-lg shadow-lg p-10 w-full max-w-md border border-black bg-white">
                    <h1 className="text-2xl font-semibold mb-6 text-center font-mono">No Results Found</h1>
                    <Link
                        to="/Home"
                        className="font-mono bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full block w-full text-center"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900">
            <div className="flex space-x-6">
                <div className="p-10 rounded-3xl bg-white max-w-md w-full flex flex-col">
                    <h3 className="font-medium text-xl tracking-tight text-gray-900 leading-tight mb-4">Device Information</h3>
                    <div className="mt-4 flex-grow">
                        <div className="font-mono p-4 text-black">
                            <div className="flex justify-between mb-4">
                                <span className="text-md">Status:</span>
                                <span className="font-semibold" style={{ color: data.status === 'Reporting' ? 'green' : 'red' }}>
                                    {data.status}
                                </span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span className="text-md">Device Type:</span>
                                <span className="font-semibold">{data.device.name}</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span className="text-md">Last Communicated:</span>
                                <span className="font-semibold">{data.lastCom.slice(0, 10)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-md">Serial Number:</span>
                                <span className="font-semibold">{data.serialNumber}</span>
                            </div>
                        </div>
                    </div>
                    <Link
                        to="/Home"
                        className="mt-6 font-mono bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-full block w-full text-center"
                    >
                        Return to Device Check
                    </Link>
                </div>

                {data.status !== 'Reporting' && (
                    <div className="p-10 rounded-3xl bg-white max-w-md w-full flex flex-col">
                        <h3 className="font-medium text-xl tracking-tight text-gray-900 leading-tight mb-4">Device Issue</h3>
                        <p className="text-md font-normal text-gray-400 leading-none mb-2">Things to check if the device is not reporting:</p>
                        <div className="mt-4 flex-grow">
                            <ul className="list-disc pl-5 text-md text-gray-700">
                                <li>Loremipsum ssaidn sidn ai subfau f</li>
                                <li>Verify network connectivity.</li>
                                <li>Confirm configuration settings are correct.</li>
                                <li>Check for firmware updates.</li>
                                <li>Contact technical support if needed.</li>
                            </ul>
                        </div>
                        <Link
                            to="/help"
                            className="mt-6 font-mono bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full block w-full text-center"
                        >
                            View Detailed Documentation
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultsChange;
