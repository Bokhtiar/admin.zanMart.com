import React, { useEffect, useState } from 'react';
import ColorVariant from '../../components/ProductVariant/ColorVariant/ColorVariant';
import AttributeVariant from '../../components/ProductVariant/AttributeVariant/AttributeVariant';
import { privateRequest } from '../../config/axios.config';
import { Toastify } from '../../components/toastify';
import { FaPlus } from "react-icons/fa";
const ProductVariant = () => {
    const [activeTab, setActiveTab] = useState( localStorage.getItem("tabItem")?localStorage.getItem("tabItem"): 'color');
    const [attributeValue,setAttributeValue] = useState([]);
    const [valueAdded,setValueAdded] = useState({});
    const [open,setOpen] = useState(false);
     // fetch all variant route 
    useEffect(()=>{
        privateRequest.get(`admin/${activeTab}`).then(res=>{
             console.log(res);
            if(res?.status===200 || res?.status===201){
                setAttributeValue(res?.data?.data?.data);
            }
        }).catch(err=>{
            Toastify.Error(err.message);
            console.log(err );
        })
    },[activeTab])
    // added ProductVariant 
    const handleAdded = async(e)=>{
        e.preventDefault();
        try { 
            const response = await privateRequest.post(`admin/${activeTab}`, valueAdded);
            
            // Handle response
            if (response.status === 200 || response.status === 201) { 
                // update value 
                const extraAdded = attributeValue[0]?attributeValue[0]:{created_at:new Date(),updated_at:new Date(),color_id:1};
                 const newConnection = {...extraAdded,color_id:extraAdded?.color_id+1,...valueAdded,};  
                setAttributeValue([newConnection,...attributeValue])
                Toastify.Success(response?.data?.message)
            } else { 
              Toastify.Error("color not posted or update")
            }
          } catch (error) { 
            Toastify.Error(error.message)
          }
    }
    // delete specific item 
    const handleDelete=async(id)=>{
        try {
            const response = await privateRequest.delete(`admin/${activeTab}/${id}`)
            console.log(response);
            if(response?.data?.status){
                Toastify.Success(response?.data?.data)
            }
        } catch (error) {
            console.log(error.message);
            Toastify.Error(error.message)
        }
    }
    // render for open variant page or tab 
    const renderTabContent = () => {
        switch (activeTab) {
            case 'color':
                return <ColorVariant  colorVariant={attributeValue} handleDelete={handleDelete} setOpen={setOpen} open={open} setValueAdded={setValueAdded} valueAdded={valueAdded} handleAdded={handleAdded}/>;
            case 'attribute':
                return  <AttributeVariant open={open}/>;
            case 'size':
                return <div>Size content goes here.</div>;
            default:
                return <div>Select a tab to see the content.</div>;
        }
    };
    // tab open close functioin 
   const handleTabItem = (value)=>{
    setOpen(false)
       setActiveTab(value);
       localStorage.setItem("tabItem",value);
   }
   console.log(valueAdded,"--------------");
    return (
        <div>
            <div className='shadow-lg py-5 flex justify-between gap-2'>
              
                <div className='flex gap-2'>
                    <button
                        onClick={() => handleTabItem('color')}
                        className={`px-3 py-1 rounded-lg text-white font-semibold text-base ${
                            activeTab === 'color' ? 'bg-blue-700' : 'bg-blue-500'
                        }`}
                    >
                        Color
                    </button>
                    <button
                        onClick={() => handleTabItem('attribute')}
                        className={`px-3 py-1 rounded-lg text-white font-semibold text-base ${
                            activeTab === 'attribute' ? 'bg-blue-700' : 'bg-blue-500'
                        }`}
                    >
                        Attribute
                    </button>
                    {/* <button
                        onClick={() => handleTabItem('size')}
                        className={`px-3 py-1 rounded-lg text-white font-semibold text-base ${
                            activeTab === 'size' ? 'bg-blue-700' : 'bg-blue-500'
                        }`}
                    >
                        Size
                    </button> */}
                </div>
                <button onClick={()=>setOpen(true)}>
                <FaPlus />
                </button>
            </div>
            <div className='p-4'>
                {renderTabContent()}
            </div>
        </div>
    );
};

export default ProductVariant;
