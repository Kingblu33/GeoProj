import React, { useState } from 'react';
import GeoInstallPDF from "../troubleshootFiles/Geotab Install - Update 042423.pdf";
import GeoRepairPDF from "../troubleshootFiles/Geotab Repair - Update 071322.pdf";

const Content = () => {
    const categories = [
        {
            name: 'Geotab',
            subcategories: ['Geotab Repair', 'Geotab Install'],
            files: [GeoInstallPDF, GeoRepairPDF]
        },
        {
            name: 'Samsara',
            subcategories: ['Geotab Repair', 'Geotab Install'],
            files: [GeoInstallPDF, GeoRepairPDF]
        },
        {
            name: 'Zonar',
            subcategories: ['Geotab Repair', 'Geotab Install'],
            files: [GeoInstallPDF, GeoRepairPDF]
        },
    ];

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
        <div className="min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5 relative">
            <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full md:max-w-6xl">
                <div className="md:flex w-full">
                    <aside className="flex flex-col w-64 px-5 py-8 bg-gray-800 border-r border-gray-800 text-white rounded-l-3xl">
                        <div className="flex flex-col justify-between flex-1">
                            <nav className="-mx-3 space-y-6">
                                <div className="flex items-center px-3 py-2 text-gray-200 transition-colors duration-300 transform rounded-lg hover:bg-purple-700 cursor-pointer bg-purple-600">
                                    <a href="/Home" className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M13 5v6m6 6h2a2 2 0 002-2v-5.5a2 2 0 00-.586-1.414l-8-8a2 2 0 00-2.828 0l-8 8A2 2 0 003 10.5V16a2 2 0 002 2h2" />
                                        </svg>
                                        <span className="mx-2 text-sm font-medium">Home</span>
                                    </a>
                                </div>
                                {categories.map((category, index) => (
                                    <div key={index}>
                                        <div
                                            className="flex items-center px-3 py-2 text-gray-200 transition-colors duration-300 transform rounded-lg hover:bg-gray-700 cursor-pointer"
                                            onClick={() => handleCategoryChange(category)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.656 1.343-3 3-3s3 1.344 3 3-1.343 3-3 3-3-1.344-3-3zM6 10V6c0-2.209 1.791-4 4-4h4c2.209 0 4 1.791 4 4v4M5 21h14M12 21v-9" />
                                            </svg>
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
                                                        <svg xmlns="http://www.w3.org/2000/svg" className
="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
<path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m-6 2l-2 2M12 21v-6m0 0L9 12m3 3h6m-6-3l-2-2m0 0l2 2" />
</svg>
<span className="mx-2 text-sm font-medium">{subcategory}</span>
</div>
))}
</div>
)}
</div>
))}
</nav>
</div>
</aside>
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
