import React from 'react';
import Fieldset from '../../../components/stepper/Fieldset';

const AddTask = ({ addNewTask, handleSubmit, taskRegister, error }) => {
  return (
    <div>
      {addNewTask && (
        <form onSubmit={handleSubmit}>
          <h5>Add New Task</h5>
          <label className='w-50'>
            <h6>Service Task Name*</h6>
            <input
              className='form-control'
              type='text'
              placeholder='task name'
              {...taskRegister('name', {
                required: { value: true, message: 'task name is required' },
              })}
            />
          </label>
          <div className='info-wrapper'>
            <div className='info-wrapper_inputs'>
              <label className='row '>
                <h6 className='col-12'>Time Interval</h6>
                <input
                  className='form-control col-5 ml-3'
                  type='text'
                  {...taskRegister('timeInterval.value', {
                    valueAsNumber: true,
                  })}
                />
                <select className='form-control col-5' {...taskRegister('timeInterval.unit')}>
                  {['Day', 'Month', 'Year'].map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </label>
              <label className='row'>
                <h6 className='col-12'>Time Due Soon Threshold</h6>
                <input
                  className='form-control col-5'
                  type='text'
                  {...taskRegister('timeIntervalDueSoonThreshold.value', {
                    valueAsNumber: true,
                  })}
                />
                <select
                  className='form-control col-5'
                  defaultValue='Day'
                  {...taskRegister('timeInterval.unit')}
                >
                  {['Day', 'Month', 'Year'].map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <Fieldset
            legend={''}
            inputs={[
              {
                title: 'Distance Interval',
                span: 'km',
                type: 'number',
                register: taskRegister('distanceInterval', {
                  valueAsNumber: true,
                }),
              },
              {
                title: 'Distance Due Soon Threshold',
                span: 'km',
                type: 'number',
                register: taskRegister('distanceDueSoonThreshold', {
                  valueAsNumber: true,
                }),
              },
              {
                title: 'Working Interval',
                span: 'hr',
                type: 'number',
                register: taskRegister('workingHoursInterval', {
                  valueAsNumber: true,
                }),
              },
              {
                title: 'Working Due Soon Threshold',
                span: 'hr',
                type: 'number',
                register: taskRegister('workingHoursIntervalDueSoonThreshold', {
                  valueAsNumber: true,
                }),
              },
            ]}
          />

          <div className='d-flex justify-content-end'>
            <button type='submit ' className=' btn btn-info btn-sm'>
              Add
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddTask;
