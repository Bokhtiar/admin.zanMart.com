import { RxDashboard } from "react-icons/rx";
import { IoColorPaletteOutline } from "react-icons/io5";
import { RiProductHuntLine } from "react-icons/ri";
import { TbBrandApplePodcast } from "react-icons/tb";
import { FaUnity } from "react-icons/fa";
import { CgAttribution } from "react-icons/cg";
export const menuData = [
  {
    title: "Dashboard",
    icon: <RxDashboard />,
    path: "/dashboard",
    
},
  {
<<<<<<< HEAD
    title: "Category",
    icon: <RxDashboard />,
    path: "/dashboard/category",
    
},
  {
=======
>>>>>>> 37ca9fd7d76798b75fa67e15ff9ace5e0739ed1a
    title: "Product Variant",
    icon: <RiProductHuntLine />,
    childrens:[
        {
            title: "Color",
            icon: <IoColorPaletteOutline />,
            path: "/dashboard/color",
            
        },
        {
            title: "Brand",
            icon: <TbBrandApplePodcast />,
            path: "/dashboard/brand",
            
        },
        {
            title: "Unit",
            icon: <FaUnity/>,
            path: "/dashboard/unit",
            
        },
        {
            title: "Attribute",
            icon: <CgAttribution />,
            path: "/dashboard/attribute",
            
        },
        {
            title: "Product Variant",
            icon: <RiProductHuntLine />,
            path: "/dashboard/product-variant",
            
        },
    ]
    
},
 
  {
    title: "Dashboard",
    icon: <RxDashboard />,
    path: "/",
    
},
  {
    title: "Dashboard",
    icon: <RxDashboard />,
    path: "/",
    
},
  {
    title: "Dashboard",
    icon: <RxDashboard />,
    path: "/",
    
},
  {
    title: "Dashboard",
    icon: <RxDashboard />,
    path: "/",
    
},
];
