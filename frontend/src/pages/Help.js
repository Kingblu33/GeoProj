import React, { useState } from "react";
import { Link } from "react-router-dom";
import TabComponent from "./TabComponent";

const Help = () => {
    const [activeTab, setActiveTab] = useState('Geotab');

    const GeotabData = [
        {
            image: "https://www.geotab.com/CMS-Media-production/Product/GO/geotab-go9-hero.jpg",
            description: "Geotab is a vehicle tracking and fleet management platform."
        },
        {
            image: "https://www.geotab.com/CMS-Media-production/Product/GO/geotab-go9-hero.jpg",
            description: "Geotab offers advanced telematics solutions for businesses."
        },
    ];

    const ZonarData = [
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

    const SamsaraData = [
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

    return (
        <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5 relative">
            <div className="bg-gray-900 text-gray-200 rounded-3xl shadow-xl border border-gray-600 w-full md:max-w-4xl overflow-hidden"> {/* Added border */}
                <div className="md:flex w-full">
                    <div className="w-full py-10 px-5 md:px-10">
                    <ul className="hidden sm:flex text-sm font-medium text-center text-gray-500 rounded-lg shadow dark:divide-gray-700 dark:text-gray-400">
    <li className="w-full focus-within:z-10">
        <button onClick={() => setActiveTab('Geotab')} className={`inline-block w-full p-4 text-gray-300 border-r border-gray-400 dark:border-gray-600 rounded-t-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:text-white ${activeTab === 'Geotab' ? 'border-b-0' : 'border-b border-gray-400'}`} aria-current={activeTab === 'Geotab' ? "page" : undefined}>Geotab</button>
    </li>
    <li className="w-full focus-within:z-10">
        <button onClick={() => setActiveTab('Samsara')} className={`inline-block w-full p-4 text-gray-300 bg-gray-900 border-r border-gray-400 dark:border-gray-600 hover:text-gray-400 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:hover:bg-gray-700 ${activeTab === 'Samsara' ? 'border-b-0' : 'border-b border-gray-400'}`}>Samsara</button>
    </li>
    <li className="w-full focus-within:z-10">
        <button onClick={() => setActiveTab('Zonar')} className={`inline-block w-full p-4 text-gray-300 bg-gray-900 border-r border-gray-400 dark:border-gray-600 hover:text-gray-400 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:hover:bg-gray-700 ${activeTab === 'Zonar' ? 'border-b-0' : 'border-b border-gray-400'}`}>Zonar</button>
    </li>
</ul>

                        <div>
                            {activeTab === 'Geotab' && <TabComponent data={GeotabData} />}
                            {activeTab === 'Zonar' && <TabComponent data={ZonarData} />}
                            {activeTab === 'Samsara' && <TabComponent data={SamsaraData} />}
                        </div>
                        <div className="flex justify-center mt-4 sm:hidden">
                        <Link to={"/help"} className="block text-xs font-semibold text-blue-300 mt-4">Return Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;
