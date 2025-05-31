import React from "react";
import usePost from "../../../hooks/api/usePost";
import CreateForm from "../components/CreateForm";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateDivision = () => {
   const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });
  const { postData, loading, data, error } = usePost();
  const onSubmit = async(data) =>{
       postData( "admin/division", data);
  }  
  if (data) {
    // console.log(data)
    navigate(`/dashboard/division`);  
  }
  
  return (
    <div>
      <CreateForm onSubmit={handleSubmit(onSubmit)} control={control} errors={errors} btnName="Create Division" />
    </div>
  );
};

export default CreateDivision;
