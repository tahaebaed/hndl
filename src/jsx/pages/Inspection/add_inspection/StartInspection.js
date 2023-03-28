import React, { useRef, useState } from 'react';
import StartTasks from './StartTasks';
import { useMutation } from '@apollo/client';
import { CREATE_INSPECTION } from '../../../../utilities/Apollo/Mutate';
import { GET_INSPECTION_LIST } from '../../../../utilities/Apollo/Querries';
import { toast } from 'react-toastify';

const StartInspection = ({ vehiclesList, inspectionForm, inspectionLocalList, setOpenModal }) => {
  const [scheduled, setScheduled] = useState(false);
  const [newScheduled, setNewScheduled] = useState(false);
  const [startAction, setStartAction] = useState(false);
  const [vehicleInspection, setVehicleInspection] = useState('');
  const [formInspection, setFormInspection] = useState('');
  const [selectInspection, setSelectInspection] = useState('');
  const [selectInspectionId, setSelectInspectionId] = useState('');
  const toastId = useRef(null);

  const [createInspection, { data: createdInspection, loading }] = useMutation(CREATE_INSPECTION, {
    refetchQueries: [{
      query: GET_INSPECTION_LIST,
      variables: {
        options: {
          showAll: true,
        },
      },
    }],
  });

  return (
    <div>
      {!startAction ? (
        <>
          <div className='text-center mb-3'>
            <h5>Please choose New Inspection or Scheduled Inspection</h5>
          </div>
          <div className='d-flex justify-content-between mb-3'>
            <h4>New Inspection</h4>
            <h4>Scheduled Inspection</h4>
          </div>
          <div className='d-flex justify-content-between'>
            <div className='col-5'>
              <div className='radio_wrapper text-center'>
                <label htmlFor='schedule'>
                  {/* <h6>Chose New Schedule </h6> */}
                  <input
                    id='schedule'
                    name='scheduledOption'
                    type='radio'
                    onChange={(e) => {
                      setNewScheduled(true);
                      setScheduled(false);
                    }}
                  />
                </label>
              </div>
              <fieldset disabled={newScheduled ? false : true}>
                <label className='employee_form_inp col-12 p-0'>
                  <h6>Vehicle</h6>
                  <select
                    defaultValue={''}
                    name='itemType'
                    className='form-control'
                    onChange={(e) => {
                      // setVehicle(e.t)
                      setVehicleInspection(e.target.value);
                    }}
                  >
                    <option disabled value={''}>
                      Select Vehicle
                    </option>
                    {vehiclesList &&
                      vehiclesList.map((vehicle, i) => (
                        <option id={i} value={vehicle._id} key={i}>
                          {vehicle.details.name}
                        </option>
                      ))}
                  </select>
                </label>
                <label className='employee_form_inp col-12 p-0'>
                  <h6>Inspection Form</h6>
                  <select
                    defaultValue={''}
                    name='itemType'
                    className='form-control'
                    onChange={(e) => {
                      // setVehicle(e.t)
                      setFormInspection(e.target.value);
                    }}
                  >
                    <option disabled value={''}>
                      Select Form
                    </option>
                    {inspectionForm &&
                      inspectionForm.map((form, i) => (
                        <option id={i} value={form._id} key={i}>
                          {form.name}
                        </option>
                      ))}
                  </select>
                </label>
              </fieldset>
            </div>
            <div className='break'></div>
            <div className='col-5'>
              <div className='radio_wrapper text-center'>
                <label htmlFor='alreadyScheduled'>
                  {/* <h6>Chose Already Scheduled </h6> */}
                  <input
                    id='alreadyScheduled'
                    name='scheduledOption'
                    type='radio'
                    onChange={(e) => {
                      setScheduled(true);
                      setNewScheduled(false);
                    }}
                  />
                </label>
              </div>
              <fieldset disabled={scheduled ? false : true}>
                <label className='employee_form_inp col-12 p-0'>
                  <h6>Select Inspection</h6>
                  <select
                    defaultValue={''}
                    name='itemType'
                    className='form-control'
                    onChange={(e) => {
                      let id = inspectionLocalList?.filter((inspec) => inspec._id == e.target.value);
                      let x = inspectionForm.filter((form) => form._id == id[0].inspectionForm._id);
                      setSelectInspectionId(id[0]);
                      setSelectInspection(x);
                    }}
                  >
                    <option disabled value={''}>
                      Select Item
                    </option>
                    {inspectionLocalList &&
                      inspectionLocalList.filter(e=> e.status !== 'Submitted').map((inspection, i) => (
                        <option id={i} value={inspection._id} key={i}>
                          {inspection?.vehicle?.details?.name}
                        </option>
                      ))}
                  </select>
                </label>
              </fieldset>
            </div>
          </div>
          <div className='mt-3 text-center'>
            <button
              className='btn btn-primary'
              type='button'
              disabled={loading}
              onClick={() => {
                if (newScheduled && vehicleInspection && formInspection) {
                  createInspection({
                    variables: {
                      inspection: {
                        vehicle: vehicleInspection,
                        inspectionForm: formInspection,
                      },
                    },
                    onCompleted: (data) => {
                      let id = inspectionLocalList.filter(
                        (inspec) => inspec._id === data.createInspection._id,
                      );
                      let x = inspectionForm.filter(
                        (form) => form._id == data.createInspection.inspectionForm._id,
                      );
                      setSelectInspectionId(data.createInspection);
                      setSelectInspection(x);
                      setStartAction(true);
                      toast.update(toastId.current, {
                        render: `A new inspection has been Added`,
                        type: toast.TYPE.SUCCESS,
                        autoClose: 3000,
                      });
                    },
                    onError: (errors) => {
                      toast.update(toastId.current, {
                        render: `Something went wrong`,
                        type: toast.TYPE.WARNING,
                        autoClose: 3000,
                      });
                    },
                  });
                }
                if (scheduled) {
                  setStartAction(true);
                }
              }}
            >
              Start Inspection
            </button>
          </div>
        </>
      ) : (
        <StartTasks
          selectInspection={selectInspection}
          setStartAction={setStartAction}
          setOpenModal={setOpenModal}
          selectInspectionId={selectInspectionId}
        />
      )}
    </div>
  );
};

export default StartInspection;
