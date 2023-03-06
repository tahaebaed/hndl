import React from 'react';

const EditProgram = ({
  programRegister,
  setValue,
  handleProgramSubmit,
  setChecked,
  vehiclesList,
  checked,
  vehicleType,
  groupList,
  getProgram,
  serviceProgramList,
  setAddNewTask,
  fields,
  edit,
  id,
  remove,
  setEdit,
}) => {
  return (
    <form onSubmit={handleProgramSubmit}>
      <div>
        <h4>Genral Information</h4>
        <div className='row'>
          <label className='col-6'>
            <h5>Name*</h5>
            <input
              className='form-control'
              type='text'
              {...programRegister(`serviceProgram.name`, {
                required: true,
              })}
            />
          </label>
          <label className='col-6'>
            <h5>Template</h5>
            <select
              className='form-control'
              defaultValue={id}
              onChange={(e) => {
                getProgram({
                  variables: {
                    getServiceProgramId: e.target.value,
                  },
                  onCompleted: (data) => {
                    const tasks = data.getServiceProgram.tasks.map(({ __typename, ...task }) => ({
                      ...task,
                      timeInterval: {
                        value: +task.timeInterval.value,
                        unit: task.timeInterval.unit,
                      },
                      timeIntervalDueSoonThreshold: {
                        value: +task.timeIntervalDueSoonThreshold.value,
                        unit: task.timeIntervalDueSoonThreshold.unit,
                      },
                    }));
                    setValue('serviceProgram.relatedTo', data.getServiceProgram.relatedTo);
                    setValue(
                      'serviceProgram.relatedGroups',
                      data.getServiceProgram.relatedGroups[0]._id,
                    );
                    setValue('serviceProgram.tasks', tasks);
                  },
                });
              }}
            >
              {serviceProgramList.map((program) => (
                <option key={program._id} value={program._id}>
                  {program.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div>
        <h4>Assign Vehicles</h4>
        <div className='row'>
          <label className='col-3'>
            <input
              type='radio'
              value='All_Vehicles'
              name='test'
              defaultChecked
              onChange={(e) => {
                setValue('serviceProgram.relatedTo', e.target.value);
                setValue('serviceProgram.relatedGroups', null);
                setValue('serviceProgram.relatedVehiclesTypes', null);
              }}
            />
            <span>All Vehicles</span>
          </label>
          <label className='col-3'>
            <input
              type='radio'
              value='Custom_Vehicles'
              onChange={(e) => {
                setChecked(e.target.value);
                setValue('serviceProgram.relatedTo', e.target.value);
                setValue('serviceProgram.relatedVehiclesTypes', null);
                setValue('serviceProgram.relatedGroups', null);
              }}
              name='test'
            />
            <span>Specific Vehicle</span>
            <select
              className='form-control'
              type='text'
              disabled={checked !== 'Custom_Vehicles'}
              {...programRegister(`serviceProgram.relatedTo`)}
            >
              {vehiclesList?.getVehicles.data.map((vehicle) => (
                <option key={vehicle._id} value={vehicle._id}>
                  {vehicle.details.name}
                </option>
              ))}
            </select>
          </label>
          <label className='col-3'>
            <input
              type='radio'
              name='test'
              value='Type'
              onChange={(e) => {
                setChecked(e.target.value);
                setValue('serviceProgram.relatedTo', null);
                setValue('serviceProgram.relatedGroups', null);
              }}
            />
            <span>Type</span>
            <select
              className='form-control'
              disabled={checked !== 'Type'}
              {...programRegister(`serviceProgram.relatedVehiclesTypes`)}
            >
              {vehicleType.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>
          <label className='col-3'>
            <span>Group*</span>
            <select
              className='form-control'
              {...programRegister(`serviceProgram.relatedGroups`, {
                required: true,
              })}
            >
              {groupList?.getGroups.data.map((group) => (
                <option key={group._id} value={group._id}>
                  {group.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>
      <div>
        <div className='d-flex justify-content-between align-items-center'>
          <h4>tasks</h4>
          <button
            type='button'
            className='btn btn-info btn-sm'
            onClick={() => {
              setAddNewTask((prev) => !prev);
              console.log('clicked');
            }}
          >
            add task
          </button>
        </div>
        <div>
          {fields.map((task, index) => (
            <React.Fragment key={index}>
              {console.log(task)}
              <div className='row justify-content-between w-25 mt-5'>
                <h5>{task.name}</h5>
              </div>
              <div className='row ml-1 justify-content-between'>
                <label className='d-flex align-items-baseline'>
                  <h5 className='mr-2'>Time Interval:</h5>{' '}
                  {edit === task.id ? (
                    <span className='row'>
                      <input
                        className='form-control col-5 ml-3'
                        type='text'
                        {...programRegister(`serviceProgram.tasks.${index}.timeInterval.value`, {
                          valueAsNumber: true,
                        })}
                      />
                      <select
                        className='form-control col-5'
                        {...programRegister(`serviceProgram.tasks.${index}.timeInterval.unit`)}
                      >
                        {['Day', 'Month', 'Year'].map((unit) => (
                          <option key={unit} value={unit}>
                            {unit}
                          </option>
                        ))}
                      </select>
                    </span>
                  ) : (
                    <span>
                      {task.timeInterval?.value}
                      {task.timeInterval?.unit}
                    </span>
                  )}
                </label>
                <label className='d-flex align-items-baseline'>
                  <h5 className='mr-2'>Distance Interval:</h5>{' '}
                  {edit === task.id ? (
                    <span>
                      <input
                        type='number'
                        className='form-control'
                        {...programRegister(`serviceProgram.tasks.${index}.distanceInterval`, {
                          valueAsNumber: true,
                        })}
                      />
                    </span>
                  ) : (
                    <span> {task.distanceInterval}km</span>
                  )}
                </label>
                <label className='d-flex align-items-baseline'>
                  <h5 className='mr-2'>Working Hour Interval:</h5>
                  {edit === task.id ? (
                    <span>
                      <input
                        className='form-control'
                        type='number'
                        {...programRegister(`serviceProgram.tasks.${index}.workingHoursInterval`, {
                          valueAsNumber: true,
                        })}
                      />
                    </span>
                  ) : (
                    <span> {task.workingHoursInterval}hr</span>
                  )}
                </label>
              </div>
              <div className='d-flex justify-content-end'>
                <button
                  type='button'
                  className='btn btn-outline-danger  btn-sm mr-3'
                  onClick={() => remove(index)}
                >
                  delete
                </button>

                {edit === task.id ? (
                  <>
                    <button
                      type='button'
                      className='btn btn-outline-info mr-2 btn-sm '
                      onClick={() => setEdit('')}
                    >
                      cancel
                    </button>
                    <button
                      type='button'
                      className='btn btn-info btn-sm '
                      onClick={() => setEdit('')}
                    >
                      save
                    </button>
                  </>
                ) : (
                  <button
                    type='button'
                    className='btn btn-info  btn-sm'
                    onClick={() => setEdit(task.id)}
                  >
                    edit
                  </button>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className='d-flex justify-content-end mt-4'>
        <button type='submit' className='btn btn-success'>
          Save
        </button>
      </div>
    </form>
  );
};

export default EditProgram;
