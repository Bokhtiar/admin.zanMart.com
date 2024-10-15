import Select,{components} from "react-select";

export function SearchDropdownWithSingle({options,setValue,handleChange,...rest}) {
    const handleInputChange = (value) => {
      console.log('Search Text:', value); // Log the search text
      // setInputValue(value); // Update the input value state
    };
    
    return (
      <Select
        options={options}
        onChange={handleChange} 
        components={{ SingleValue: CustomSingleValue, Option: CustomOption }}
        onInputChange={handleInputChange}
        isClearable
        className="py-2.5"
        styles={customStyles}
        defaultValue={options[1]}
        {...rest}
      />
    );
  }
   
   
  const CustomSingleValue = (props) => (
    <components.SingleValue {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }} className="py-2.5">
       
        {props.data.category_name} 
      </div>
    </components.SingleValue>
  );
  
  const CustomOption = (props) => (
    <components.Option {...props}>
      <div style={{ display: 'flex', alignItems: 'center' }}  >
         
        {props.data?.category_name} 
        <div className="bg-red-900 w-full flex justify-end">
           
        </div>
      </div>
    </components.Option>
  );
  
  
   
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '50px', // Set minimum height of the select input
      height: '50px', // Set the fixed height
      borderColor: state.isFocused ? '#fff' : '#fff',
      boxShadow: state.isFocused ? '0 0 0 1px #2684FF' : 'none',
      '&:hover': {
        borderColor: '#fff',
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: '50px', // Adjust value container to align content
      padding: '0 8px',
    }),
    input: (provided) => ({
      ...provided,
      margin: '0px', // Align text properly
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: '50px', // Align the dropdown indicator
    }),
  };
  