import { Toastify } from "../../components/toastify";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { NetworkServices } from "../../network/index";
import { PrimaryButton } from "../../components/button";
import {   useCallback, useEffect, useState } from "react";
import { networkErrorHandeller } from "../../utils/helper";
import {
   
  TextInput,
} from "../../components/input";
 
export const BannerEdit = () => {
  const navigate = useNavigate(); 
  
  const [data, setData] = useState({name:''});
  const { id } = useParams();
  const [buttonLoading, setButtonLoading] = useState(false); 
  
  const [singleImage, setSingleImage] = useState(null);
  const handleSingleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSingleImage(file);
    }
  };
  const fetchData = useCallback(async () => {
    try {

      const response = await NetworkServices.Banner.show(id);
       
      if (response.status === 200) {
        setData(response.data.data);
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, [id]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  /* submit reosurce */
  const onSubmit = async (dat) => {
    try {
      setButtonLoading(true);
         console.log(dat);
      const formData = new FormData();
      formData.append("name", dat?.name);
      formData.append("image", singleImage);
      formData.append("_method", "PUT");
      
    //   formData.append("image",  singleImage );
      const response = await NetworkServices.Banner.update(id,formData);
      if (response && (response.status === 201 || response?.status === 200)) {
        navigate('/dashboard/banner')
        console.log(response)
        setButtonLoading(false);
        return Toastify.Success("banner Created.");
      }
    } catch (error) {
      setButtonLoading(false);
      networkErrorHandeller(error);
    }
  };

  return (
    <>
      <section className="flex justify-between shadow-md p-4 px-6 rounded-md bg-white mb-3">
        <h2 className=" font-semibold text-xl">Banner Edit</h2>
        <Link to="/dashboard/banner">
          <span className="border border-green-500 rounded-full material-symbols-outlined p-1">
            list
          </span>
        </Link>
      </section>

      <section className="shadow-md my-5 p-4 px-6">
        <form className="px-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 lg:mb-2">
            <TextInput
              label="Banner Name"
              name="name"
              type="text"
              defaultvalue={data?data?.name:''}
              placeholder="Enter banner name"
              control={control}
              error={errors.name && errors.name.message}
              rules={{ required: "banner Name is required" }}
            />
          </div>
          <div className="mb-6 lg:mb-2 w-full">
              <p className="text-sm mb-1 text-gray-500">
                Logo
                <span className="text-red-500">*</span>
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleSingleImageChange}
                className="cursor-pointer w-full text-sm bg-white disabled:bg-gray-300 rounded-md outline-none p-[14px] border disabled:border-gray-300"
              />
            </div>
          {/* submit button */}
          <div className="my-4 flex justify-center">
            <PrimaryButton
              loading={buttonLoading}
              name="Banner create"
            ></PrimaryButton>
          </div>
        </form>
      </section>
    </>
  );
};
