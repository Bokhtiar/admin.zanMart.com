export const colorField = [
  {
    label: "Color Name",
    name: "name",
    type: "text",
    placeholder: "Enter Color name",
    rules: "Color Name is required",
  },
  
]
 
export const unitField = [
  {
    label: "Unit Name",
    name: "name",
    type: "text",
    placeholder: "Enter Unit name",
    rules: "Unit Name is required",
  }, 
]
export const attributeField = [
  {
    label: "Atrribute Name",
    name: "name",
    type: "text",
    placeholder: "Enter Attribute name",
    rules: "Unit Attribute is required",
  }, 
{
    label: "Unit Name",
    name: "unit_id",
    type: "select",
    placeholder: "Enter Unit name",
    rules: "Unit Name is required",
  }, 
]
    // label=" Select Attributes"
    //                   name={`variant.${index}.attributes`}
    //                   error={
    //                     errors?.variant?.[index]?.attributes &&
    //                     errors?.variant?.[index]?.attributes?.message
    //                   }
    //                   control={control}
    //                   isClearable={true}
    //                   placeholder="Select Attributes"
    //                   options={attributes}
    //                   rules={{ required: "Attributes is required" }}