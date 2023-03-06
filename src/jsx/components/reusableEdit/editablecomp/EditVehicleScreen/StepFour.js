import React from 'react';

const StepFour = ({ activeStep, setActiveStep, register, errors }) => {
  return (
    <div>
      <div>
        <div className='w-100'>
          <h4>Device </h4>
          <label className='w-100'>
            <select className='form-control' defaultValue={''} {...register('vehicle.gps.device')}>
              <option disabled value={''}>
                GPS Devices
              </option>
              <option value={'GT06N'}>GT06N</option>
            </select>
          </label>
          <p className='text-danger'>{errors?.vehicle?.gps?.device?.message}</p>
        </div>
        <div className='w-100'>
          <h4>Serial Number *</h4>
          <label className='w-100'>
            <input
              className='form-control'
              type='text'
              placeholder='Enter serial number'
              {...register('vehicle.gps.serialNumber')}
            />
          </label>
          <p className='text-danger'>{errors?.vehicle?.gps?.serialNumber?.message}</p>
        </div>
        <div className='w-100'>
          <h4>Time Interval</h4>
          <label className='w-100'>
            <input
              className='form-control w-full'
              type='number'
              value={0}
              {...register('vehicle.gps.timeInterval', {
                required: true,
                valueAsNumber: true,
              })}
            />
          </label>
        </div>
      </div>

      <div className='d-flex justify-content-end w-100 mb-4 mt-3'>
        <button
          type='button'
          className='btn btn-outline-primary px-5 btn-md mx-2'
          onClick={() => setActiveStep((prev) => prev - 1)}
        >
          back
        </button>
      </div>
    </div>
  );
};

export default StepFour;
