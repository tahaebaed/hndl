import React from 'react';

const SelectInput = ({ inpt, label, register, err }) => {
  return (
    <label className='w-100 mb-2'>
      <h6>
        {label}
        <sup>*</sup>
      </h6>
      <select className='form-control' defaultValue='' {...register}>
        <option value='' disabled={true}>
          Choose one
        </option>
        {inpt.map((option, index) => (
          <option key={index} value={option.id} disabled={option.disabled}>
            {option.name}
          </option>
        ))}
      </select>
      <p className='text-danger'>{err}</p>
    </label>
  );
};

export default SelectInput;
