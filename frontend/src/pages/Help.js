import React, { useState } from "react";
import TabComponent from "./TabComponent";
import {
    SamsaraData,
    GeotabData,
    ZonarData,
} from "../Helpers/deviceTroubleshoot";

const Help = () => {
    const [activeTab, setActiveTab] = useState("Geotab");

    return (
        <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5 relative">
            <div className="bg-gray-900 text-gray-200 rounded-3xl shadow-xl border border-gray-600 w-full md:max-w-4xl overflow-hidden">
                <div className="md:flex w-full">
                    <div className="w-full py-10 px-5 md:px-10">
                        <ul className="hidden sm:flex text-sm font-medium text-center text-gray-500 rounded-lg shadow dark:divide-gray-700 dark:text-gray-400">
                            <li className="w-full focus-within:z-10">
                                <button
                                    onClick={() => setActiveTab("Geotab")}
                                    className={`font-mono inline-block w-full p-4 text-gray-300 border-r border-gray-400 dark:border-gray-600 rounded-t-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:text-white ${activeTab === "Geotab"
                                            ? "border-b-0"
                                            : "border-b border-gray-400"
                                        }`}
                                    aria-current={activeTab === "Geotab" ? "page" : undefined}
                                >
                                    Geotab
                                </button>
                            </li>
                            <li className="w-full focus-within:z-10">
                                <button
                                    onClick={() => setActiveTab("Samsara")}
                                    className={`font-mono inline-block w-full p-4 text-gray-300 bg-gray-900 border-r border-gray-400 dark:border-gray-600 hover:text-gray-400 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:hover:bg-gray-700 ${activeTab === "Samsara"
                                            ? "border-b-0"
                                            : "border-b border-gray-400"
                                        }`}
                                >
                                    Samsara
                                </button>
                            </li>
                            <li className="w-full focus-within:z-10">
                                <button
                                    onClick={() => setActiveTab("Zonar")}
                                    className={`font-mono inline-block w-full p-4 text-gray-300 bg-gray-900 border-r border-gray-400 dark:border-gray-600 hover:text-gray-400 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:hover:bg-gray-700 ${activeTab === "Zonar"
                                            ? "border-b-0"
                                            : "border-b border-gray-400"
                                        }`}
                                >
                                    Zonar
                                </button>
                            </li>
                        </ul>

                        <div>
                            {activeTab === "Geotab" && <TabComponent data={GeotabData} />}
                            {activeTab === "Zonar" && <TabComponent data={ZonarData} />}
                            {activeTab === "Samsara" && <TabComponent data={SamsaraData} />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Help;
