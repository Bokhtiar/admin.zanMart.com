import React from "react";
import usePost from "../../../hooks/api/usePost";
import CreateForm from "../components/CreateForm";
import { useForm } from "react-hook-form";
import useFetch from "../../../hooks/api/useFetch";
import { useNavigate } from "react-router-dom";

const CreateDistrict = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      status: 0,
    },
  });
  const { postData, loading, data, error } = usePost();
  const { data: divisionData } = useFetch("admin/division-dropdown");
  console.log(divisionData);
  const onSubmit = async (data) => {
    const updateData = {
      ...data,
      division_id: data?.division_id?.id,
    };
    postData("admin/district", updateData);
  };
    if (data) {
    // console.log(data)
    navigate(`/dashboard/district`);  
  }
  if (loading) return;
  return (
    <div>
      <CreateForm
        onSubmit={handleSubmit(onSubmit)}
        control={control}
        errors={errors}
        btnName="Create District"
        id="division_id"
        idData={divisionData?.data?.map((item) => {
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

export default CreateDistrict;
