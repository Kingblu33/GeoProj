import React from 'react';
import { Link } from 'react-router-dom';

const TabComponent = ({ data }) => {
    return (
        <div className="mt-8 px-4 bg-gray-900"> {/* Added padding, margin top, and dark background */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Display all data */}
                {data.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-4">
                        {/* Section for Image */}
                        <div className="mb-4">
                            <img src={item.image} alt={item.description} className="w-full h-auto rounded-lg font-mono" />
                        </div>
                        {/* Section for Troubleshooting Steps */}
                        <div>
                            <p className="text-gray-800 text-lg font-semibold mb-2 font-mono">Description:</p>
                            <p className="text-gray-600 font-mono">{item.description}</p>
                            <p className="text-gray-800 text-lg font-semibold mt-4 mb-2 font-mono">Troubleshooting Steps:</p>
                            <p className="text-gray-600 font-mono">{item.troubleshoot}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-8">
            <Link to={"/Home"} className="block font-mono text-xs font-semibold text-blue-300 mt-4">Return Home</Link>
            </div>
        </div>
    );
};

export default TabComponent;
