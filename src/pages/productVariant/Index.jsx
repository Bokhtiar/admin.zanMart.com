import React, { useEffect, useState } from 'react';
import ColorVariant from '../../components/ProductVariant/ColorVariant/ColorVariant';
import AttributeVariant from '../../components/ProductVariant/AttributeVariant/AttributeVariant';
import { privateRequest } from '../../config/axios.config';
import { Toastify } from '../../components/toastify';
import { FaPlus } from "react-icons/fa";
import UnitVariant from '../../components/ProductVariant/UnitVariant/UnitVariant';
import BrandVariant from '../../components/ProductVariant/BrandAttribute/BrandAttribute';
import ProductVariantComponant from '../../components/ProductVariant/MainVariant/ProductVariant';
const ProductVariant = () => {
    const [activeTab, setActiveTab] = useState( localStorage.getItem("tabItem")?localStorage.getItem("tabItem"): 'color');
    const [attributeValue,setAttributeValue] = useState([]);
    const [valueAdded,setValueAdded] = useState({});
    console.log(valueAdded);
    const [open,setOpen] = useState({
        add:false,
        update:false
    });
    const [id,setId] = useState(null);
    const fetchColor = async()=>{
        try {
            const res = await privateRequest.get(`admin/${activeTab}` );
            if(res?.status===200 || res?.status===201){
                setAttributeValue(res?.data?.data?.data);
            }
        } catch (err) {
            Toastify.Error(err.message);
        }
    }
     // fetch all variant route 
    useEffect(()=>{
        fetchColor();
    },[activeTab])
    // added attribute 
    const handleAdded = async(e)=>{
        e.preventDefault();
        try { 
            const response = await privateRequest.post(`admin/${activeTab}`, valueAdded);
            if (response.status === 200 || response.status === 201) { 
                fetchColor();
                Toastify.Success(response?.data?.message)
            } else { 
              Toastify.Error("color not posted or update")
            }
          } catch (error) { 
            Toastify.Error(error.message)
          }
    }
    // update attribute 
    const handleUpdateAttribute = async (e)=>{
        e.preventDefault();
        try { 
            const response = await privateRequest.put(`admin/${activeTab}/${id}`, valueAdded);
            // Handle response
            if (response.status === 200 || response.status === 201) { 
                // update value 
                fetchColor();
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
            //  const filterDataAfterDelete= attributeValue.filter((color)=>color?.color_id!==id);
            if(response?.status===200||response?.status===201){
                // setAttributeValue(filterDataAfterDelete);
                fetchColor();
                Toastify.Success(response?.data?.message)
            }
        } catch (error) {
            Toastify.Error(error.message)
        }
    }
    // render for open variant page or tab 
    const renderTabContent = () => {
        switch (activeTab) {
            case 'color':
                return <ColorVariant  colorVariant={attributeValue} handleDelete={handleDelete} setOpen={setOpen} open={open} setValueAdded={setValueAdded} valueAdded={valueAdded} handleAdded={handleAdded} handleUpdateAttribute={handleUpdateAttribute} setId={setId} id={id}/>;
            case 'attribute':
                return  <AttributeVariant attribute={attributeValue} handleDelete={handleDelete} setOpen={setOpen} open={open} setValueAdded={setValueAdded} valueAdded={valueAdded} handleAdded={handleAdded} handleUpdateAttribute={handleUpdateAttribute} setId={setId} id={id}/>;
            case 'unit':
                return  <UnitVariant unitvariant={attributeValue} handleDelete={handleDelete}  setOpen={setOpen} open={open} setValueAdded={setValueAdded} valueAdded={valueAdded} handleAdded={handleAdded} handleUpdateAttribute={handleUpdateAttribute} setId={setId} id={id}/>;
            case 'brand':
                return  <BrandVariant brandVariant={attributeValue} handleDelete={handleDelete}  setOpen={setOpen} open={open} setValueAdded={setValueAdded} valueAdded={valueAdded} handleAdded={handleAdded} handleUpdateAttribute={handleUpdateAttribute} setId={setId} id={id}/>;
            case 'productvariant':
                return  <ProductVariantComponant productVariant={attributeValue} handleDelete={handleDelete}  setOpen={setOpen} open={open} setValueAdded={setValueAdded} valueAdded={valueAdded} handleAdded={handleAdded} handleUpdateAttribute={handleUpdateAttribute} setId={setId} id={id}/>;
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
                    <button
                        onClick={() => handleTabItem('unit')}
                        className={`px-3 py-1 rounded-lg text-white font-semibold text-base ${
                            activeTab === 'unit' ? 'bg-blue-700' : 'bg-blue-500'
                        }`}
                    >
                        unit
                    </button>
                    <button  onClick={() => handleTabItem('brand')}
                        className={`px-3 py-1 rounded-lg text-white font-semibold text-base ${
                            activeTab === 'brand' ? 'bg-blue-700' : 'bg-blue-500'
                        }`}
                    >
                      Brand
                    </button> 
                    <button  onClick={() => handleTabItem('productvariant')}
                        className={`px-3 py-1 rounded-lg text-white font-semibold text-base ${
                            activeTab === 'productvariant' ? 'bg-blue-700' : 'bg-blue-500'
                        }`}
                    >
                     Product Variant
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
                <button onClick={()=>setOpen({
                    add:true,
                    update:false
                })}>
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
