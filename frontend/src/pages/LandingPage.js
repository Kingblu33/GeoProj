import React from "react";
import { items } from "../Helpers/helperContent";
const LandingPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-0">
            <div className="bg-gray-black text-gray-500 rounded-3xl w-full md:max-w-6xl h-full">
                <div className="flex flex-col w-full h-full py-10 px-8 space-y-6">
                    <h2 className="text-3xl font-bold text-center text-white">Choose Your Device</h2>
                    <p className="text-lg text-center text-white">Select a device below to check its status, access detailed instructions, or place an order. </p>

                    {items.map((item, index) => (
                        <div key={index} className="flex flex-col items-start rounded-lg shadow-lg p-6 relative transition-transform transform hover:scale-95 mb-6" style={{ backgroundImage: `url(${item.backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center", }}>
                            <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div>
                            <div className="flex flex-col flex-grow p-4 relative z-10">
                                <h3 className="text-2xl font-semibold text-white">{item.title}</h3>
                                <p className="text-white">{item.description}</p>
                                <div className="flex space-x-4 mt-2">
                                    {item.links.map((link, linkIndex) => (
                                        <a key={linkIndex} href={link.href} className="text-blue-200 hover:underline flex items-center">{link.label}</a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
