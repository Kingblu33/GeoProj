import GeoInstallPDF from "../troubleshootFiles/Geotab Install - Update 042423.pdf";
import GeoRepairPDF from "../troubleshootFiles/Geotab Repair - Update 071322.pdf";

export const categories = [
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

]

export const items = [
    {
        title: "Geotab",
        description:
            "Optimize your fleet management with Geotab's innovative solutions.",
        backgroundImage:
            "https://www.geotab.com/CMS-Media-production/Blog/NA/March_2019/First_Look/blog-geotab-go9-hero@2x.jpg",
        links: [
            { href: "/Home", label: "Instructions" },
            { href: "/Home", label: "Device Check" },
            { href: "/order-device", label: "Order Device" },
        ],
    },
    {
        title: "Samsara",
        description:
            "Gain insights into your operations with Samsara's advanced tracking technology.",
        backgroundImage:
            "https://images.ctfassets.net/bx9krvy0u3sx/7ia7qpeK6TeGaAvtoIE6U8/5b7365b8c75ae8b315d3096e66f678c0/fleet-manager-4-vg34.jpg",
        links: [
            { href: "/NotFound", label: "Instructions" },
            { href: "/NotFound", label: "Device Check" },
            { href: "/NotFound", label: "Order Device" },
        ],
    },
    {
        title: "Zonar",
        description:
            "Streamline your fleet operations with Zonar's cutting-edge solutions.",
        backgroundImage:
            "https://www.zonarsystems.com/wp-content/uploads/2021/07/v4-essential-telematics-device.jpg",
        links: [
            { href: "/NotFound", label: "Instructions" },
            { href: "/NotFound", label: "Device Check" },
            { href: "/NotFound", label: "Order Device" },
        ],
    },
    
];


