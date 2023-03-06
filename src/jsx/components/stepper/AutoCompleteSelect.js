import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";

const filter = createFilterOptions();

export default function AutoCompleteSelect({
  groupData,
  label,
  handleChangeValue,
  ...rest
}) {
  return (
    <Autocomplete
      {...rest}
      onChange={(event, newValue) => {
        if (typeof newValue === "string") {
          handleChangeValue(newValue);
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          handleChangeValue(newValue.inputValue);
        } else {
          handleChangeValue(newValue.name || newValue);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== "" && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={groupData}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option.name === "string") {
          return option.name;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => (
        <li {...props}>{option.name || option.title || option}</li>
      )}
      freeSolo
      renderInput={(params) => <TextField {...params} label={label} />}
      //   renderInput={params => (
      //     <input className='form-control' type='texts' {...params} placeholder="" />
      //   )}
    />
  );
}
