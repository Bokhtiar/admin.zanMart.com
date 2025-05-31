import React from "react";
import usePost from "../../../hooks/api/usePost";
import CreateForm from "../components/CreateForm";
import { useForm } from "react-hook-form";
import useFetch from "../../../hooks/api/useFetch";
import { useNavigate } from "react-router-dom";

const CreateUpozila = () => {
   const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });
  const { postData, loading, data, error } = usePost();
    const { data: districtData } = useFetch("admin/district-dropdown");
  console.log("districtData",districtData);
  const onSubmit = async (data) => {
    const updateData = {
      ...data,
      district_id: data?.district_id?.id,
    };
    postData("admin/upazila", updateData);
  };
    if (data) {
    // console.log(data)
    navigate(`/dashboard/division`);  
  }
  
  if (loading) return;

  return (
    <div>
      <CreateForm onSubmit={handleSubmit(onSubmit)} control={control} errors={errors} btnName="Create Zone"
              id="district_id"
        idData={districtData?.data?.map((item) => {
          return {
            ...item,
            value: item?.id,
            label: item?.name,
          };
        })}
        setValue={setValue}
         />
    </div>
  );
};

export default CreateUpozila;
