import React, { useState } from 'react';
import { FaHome } from "react-icons/fa"
import { FaFolder } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import {categories} from "../Helpers/helperContent"

const Content = () => {

    const [selectedCategory, setSelectedCategory] = useState(categories[0].name);
    const [selectedSubcategory, setSelectedSubcategory] = useState(categories[0].subcategories[0]);
    const [selectedFile, setSelectedFile] = useState(categories[0].files[0]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category.name);
        setSelectedSubcategory(category.subcategories[0]);
        setSelectedFile(category.files[0]);
    };

    const handleSubcategoryChange = (subcategory, file) => {
        setSelectedSubcategory(subcategory);
        setSelectedFile(file);
    };

    return (
<<<<<<< Updated upstream
        <div className="min-h-screen bg-gray-800 flex items-center justify-center px-5 py-5 relative">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full md:max-w-6xl">
                <div className="md:flex w-full">
                    <aside className="flex flex-col w-64 px-5 py-8 bg-black border-r border-gray-800 text-white rounded-l-3xl">
                        <div className="flex flex-col justify-between flex-1">
                            <div className="-mx-3 space-y-6 ">
                                <div className="flex items-center px-3 py-2 text-gray-200 transition-colors duration-300 transform rounded-lg hover:bg-purple-700 cursor-pointer ">
                                    <a href="/Home" className="flex items-center">
                                        <FaHome />
=======
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5 relative">
            <div className="bg-gray-300 text-gray-500 rounded-3xl shadow-xl w-full md:max-w-6xl">
                <div className="md:flex w-full">
                    <div className="flex flex-col w-64 px-5 py-8 bg-black border-r border-black text-white rounded-l-3xl">
                        <div className="flex flex-col justify-between flex-1">
                            <nav className="-mx-3 space-y-6">
                                <div className="flex items-center px-3 py-2 text-gray-200 transition-colors duration-300 transform rounded-lg hover:bg-purple-700 cursor-pointer">
                                    <a href="/Home" className="flex items-center">
                                        <span className="text-lg mr-2">🏠</span>
>>>>>>> Stashed changes
                                        <span className="mx-2 text-sm font-medium">Home</span>
                                    </a>
                                </div>
                                {categories.map((category, index) => (
                                    <div key={index}>
                                        <div
                                            className="flex items-center px-3 py-2 text-gray-200 transition-colors duration-300 transform rounded-lg hover:bg-gray-700 cursor-pointer"
                                            onClick={() => handleCategoryChange(category)}
                                        >
<<<<<<< Updated upstream
                                            <FaFolder />
=======
                                            <span className="text-lg mr-2">📁</span>
>>>>>>> Stashed changes
                                            <span className="mx-2 text-sm font-medium">{category.name}</span>
                                        </div>
                                        {selectedCategory === category.name && (
                                            <div className="ml-4 mt-2 space-y-3">
                                                {category.subcategories.map((subcategory, subIndex) => (
                                                    <div
                                                        key={subIndex}
                                                        className={`flex items-center px-3 py-2 text-gray-200 transition-colors duration-300 transform rounded-lg hover:bg-gray-600 cursor-pointer ${selectedSubcategory === subcategory ? 'bg-gray-600' : ''}`}
                                                        onClick={() => handleSubcategoryChange(subcategory, category.files[subIndex])}
                                                    >
<<<<<<< Updated upstream
                                                        <FaFile/>
=======
                                                        <span className="text-lg mr-2">📄</span>
>>>>>>> Stashed changes
                                                        <span className="mx-2 text-sm font-medium">{subcategory}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
<<<<<<< Updated upstream
                            </div>
                        </div>
                    </aside>
=======
                            </nav>
                        </div>
                    </div>
>>>>>>> Stashed changes
                    <div className="md:w-3/4 p-10">
                        <h1 className="text-2xl font-bold mb-4 text-gray-900">{selectedSubcategory}</h1>
                        <div className="file-viewer-container" style={{ width: '100%', height: '500px', overflow: 'auto' }}>
                            <iframe src={selectedFile} style={{ width: '100%', height: '500px' }} title="PDF Viewer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Content;
