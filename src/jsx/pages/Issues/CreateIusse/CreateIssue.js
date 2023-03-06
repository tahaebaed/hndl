import React from 'react';
import FormControl from '../../Employees/employee_fromcontrol/FormControl';

const CreateIssue = ({
  vehicles,
  employees,
  register,
  watch,
  err,
  dirty,
  setValue,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label className='w-100'>
        <h6>Vehicle*</h6>
        <select
          className={`form-control`}
          defaultValue=''
          {...register('issue.vehicle', {
            required: {
              value: true,
              message: 'Vehicle name is required',
            },
          })}
        >
          <option value={''}>Please select...</option>
          {vehicles.map((unit) => (
            <option value={unit._id} key={unit._id}>
              {unit.details.name}
            </option>
          ))}
        </select>
        <p className='text-danger'>{err?.issue?.vehicle?.message}</p>
      </label>
      <label className='w-100'>
        <h6>Issue*</h6>
        <input
          type='text'
          className={`form-control`}
          placeholder='Please enter issue name...'
          {...register('issue.name', {
            required: {
              value: true,
              message: 'Issue name is required',
            },
          })}
        />
        <p className='text-danger'>{err?.issue?.name?.message}</p>
      </label>
      <div className='row align-items-center justify-content-between '>
        <label className='col-6 '>
          <h6>Reported Date & Time*</h6>
          <input
            className='form-control'
            type='datetime-local'
            {...register('issue.reportedAt', {
              required: {
                value: true,
                message: 'Reported at name is required',
              },
            })}
          />
          <p className='text-danger'>{err?.issue?.reportedAt?.message}</p>
        </label>
        <label className='col-6 '>
          <h6>Reported By</h6>
          <select className={`form-control`} {...register('issue.reportedBy')}>
            <option value={''}>Please select...</option>
            {employees.map((unit) => (
              <option value={unit._id} key={unit._id}>
                {unit.firstName}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className='row align-items-center justify-content-between '>
        <label className='col-6 '>
          <h6>Due Date & Time</h6>
          <input
            className='form-control'
            type='datetime-local'
            {...register('issue.endTimestamp')}
          />
        </label>
        <label className='col-6 '>
          <h6>Assigned To</h6>
          <select className={`form-control`} {...register('issue.assignTo')}>
            <option value={''}>Please select...</option>
            {employees.map((unit) => (
              <option value={unit._id} key={unit._id}>
                {unit.firstName}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className='w-100'>
        <h6>Comment</h6>
        <textarea
          className='form-control'
          placeholder='add comment'
          {...register('issue.comment')}
        />
      </label>

      <div className='row'>
        <FormControl label='Image' type='image' setFile={'issue.photoUrl'} setValue={setValue} />
        <FormControl
          label='Document'
          type='document'
          setFile={'issue.documentUrl'}
          setValue={setValue}
        />
      </div>
      <div className='d-flex justify-content-end'>
        <button type='submit' disabled={!dirty} className='btn btn-primary'>
          submit
        </button>
      </div>
    </form>
  );
};

export default CreateIssue;
