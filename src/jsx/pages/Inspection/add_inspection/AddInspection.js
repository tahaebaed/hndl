import React, { useState } from 'react';
import SelectInput from './SelectInput';

const AddInspection = ({
  vehiclesList,
  employeesList,
  inspectionList,
  register,
  watch,
  errors,
}) => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <SelectInput
        inpt={vehiclesList}
        register={{
          ...register('inspection.vehicle', {
            required: {
              value: true,
              message: 'Vehicle is required',
            },
          }),
        }}
        err={errors?.inspection?.vehicle?.message}
        label='Vehicles'
      />
      <SelectInput
        inpt={inspectionList}
        register={{
          ...register('inspection.inspectionForm', {
            required: {
              value: true,
              message: 'inspection Form is required',
            },
          }),
        }}
        err={errors?.inspection?.inspectionForm?.message}
        label='Inspection Form'
      />
      <SelectInput
        inpt={employeesList}
        label='Assigned To'
        register={{
          ...register('inspection.assignTo', {
            required: {
              value: true,
              message: 'assignTo is required',
            },
          }),
        }}
        err={errors?.inspection?.assignTo?.message}
      />
      <div className='container row align-items-center '>
        <h6 className='mr-2 mt-2'>Repeat </h6>
        <label className='d-flex align-items-center col-1 mt-2'>
          <input type='radio' checked={checked} onClick={() => setChecked((prev) => !prev)} />
        </label>
        <h6 className={`${!checked ? 'text-dark' : ''}`}>Repeat Every</h6>
        <div className='d-flex ml-4 col'>
          <input
            className='form-control mr-3'
            type='number'
            disabled={!checked}
            {...register('inspection.repeatTimeInterval.value', {
              valueAsNumber: true,
            })}
          />
          <select
            className={`form-control  ${!checked ? 'text-dark' : ''}`}
            disabled={!checked}
            {...register('inspection.repeatTimeInterval.unit')}
          >
            {['Day', 'Month', 'Year'].map((unit) => (
              <option value={unit} key={unit}>
                {unit}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='w-100 row justify-content-between mt-3 '>
        <label className='col-12 col-md-6'>
          <h6>
            Start Date<sup>*</sup>
          </h6>
          <input
            type='date'
            className='form-control'
            {...register('inspection.startTimestamp', { required: true })}
          />
        </label>
        <label className='col-12 col-md-6'>
          <h6>
            End Date<sup>*</sup>
          </h6>
          <input
            type='date'
            className='form-control'
            {...register('inspection.endTimestamp', { required: true })}
          />
        </label>
      </div>
    </div>
  );
};

export default AddInspection;
