import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { UPDATE_INSPECTION } from '../../../../utilities/Apollo/Mutate';
import SelectInput from '../../../pages/Inspection/add_inspection/SelectInput';
import { GET_SIGNED_URL, GET_SINGLE_INSPECTION } from '../../../../utilities/Apollo/Querries';
import { DELETE_INSPECTION } from '../../../../utilities/Apollo/Delete';
import { Dropdown } from 'react-bootstrap';
import ReportInspectionIssue from '../../../pages/Inspection/add_inspection/ReportInspectionIssue';

const EditInspections = ({
  id,
  setModal,
  compData,
  employeeData,
  inspectionList,
  refetchQuery,
}) => {
  const intl = useIntl();
  const toastId = useRef(null);
  const [checked, setChecked] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const { register, handleSubmit, watch, setValue, getValues, reset } = useForm({
    updateInspectionId: null,
    inspection: {
      assignTo: null,
      endTimestamp: null,
      inspectionForm: {
        name: null,
        tasks: [
          {
            comment: null,
            description: null,
            documentUrl: null,
            name: null,
            passed: null,
            photoUrl: null,
            text: null,
            type: null,
          },
        ],
      },
      vehicle: null,
      status: null,
      startTimestamp: null,
    },
  });

  const {
    data: singleInspec,
    loading,
    error,
  } = useQuery(GET_SINGLE_INSPECTION, {
    variables: {
      getInspectionId: id,
    },
    onCompleted: (data) => {
      console.log(data);
      setValue('updateInspectionId', id);
      setValue('inspection.inspectionForm', data.getInspection.inspectionForm._id);

      setValue('inspection.vehicle', data.getInspection.vehicle._id);
      setValue('inspection.assignTo', data.getInspection.assignTo._id);
      setValue('inspection.status', data.getInspection.status);
      setValue('inspection.startTimestamp', data.getInspection.startTimestamp.slice(0, 10));
      setValue('inspection.endTimestamp', data.getInspection.endTimestamp.slice(0, 10));
      data.getInspection.inspectionForm.tasks.map((task, i) => {
        setValue(`inspection.inspectionForm.tasks.${i}.name`, task.name);
        setValue(`inspection.inspectionForm.tasks.${i}.passed`, task.passed);
        setValue(`inspection.inspectionForm.tasks.${i}.description`, task.description);
        setValue(`inspection.inspectionForm.tasks.${i}.comment`, task.comment);
        return task;
      });
    },
  });

  const [getUrl, { data: url, loading: loadurl, error: errurl }] = useLazyQuery(GET_SIGNED_URL);
  let apiUrl = 'https://storage.googleapis.com/ostouli/';

  const handleFile = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    getUrl({
      variables: {
        fileName: file.name,
        contentType: file.type,
      },
      onCompleted: async (value) => {
        try {
          const res = await fetch(value.getWriteSignedURL.signedUrl, {
            method: 'put',
            headers: {
              'Content-Type': value.getWriteSignedURL.contentType,
            },
            body: file,
          });
          setValue(
            'inspection.inspectionForm.tasks.photoUrl',
            `${apiUrl}${value.getWriteSignedURL.fileName}`,
          );
        } catch (error) {
          throw error;
        }
      },
    });
    reader.onload = () => {
      sessionStorage.setItem('imgVehicle', reader.result);
    };
    reader.onerror = function (error) {
      throw ('Error: ', error);
    };
  };

  const [deleteInspectionRow] = useMutation(DELETE_INSPECTION, {
    refetchQueries: [
      {
        query: refetchQuery,
        variables: {
          options: {
            showAll: true,
          },
        },
      },
    ],
  });

  const [updateInspectionData] = useMutation(UPDATE_INSPECTION, {
    refetchQueries: [
      {
        query: refetchQuery,
        variables: {
          options: {
            showAll: true,
          },
        },
      },
    ],
  });

  const updateInspection = (values) => {
    toastId.current = toast('updating ...', {
      autoClose: false,
    });
    updateInspectionData({
      variables: values,
      onCompleted: (data) => {
        toast.update(toastId.current, {
          render: `Inspection has been updated`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        setModal(false);
      },
      onError: (_) => {
        toast.update(toastId.current, {
          render: `Something went wrong`,
          type: toast.TYPE.WARNING,
          autoClose: 3000,
        });
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(updateInspection)}>
      <SelectInput
        inpt={compData}
        register={{
          ...register('inspection.vehicle', { required: true }),
        }}
        label='Vehicles'
      />
      <SelectInput
        inpt={inspectionList}
        register={{
          ...register('inspection.inspectionForm', { required: true }),
        }}
        label='Inspection Form'
      />
      {/* {getValues('inspection.inspectionForm') && (
        <> */}
      <h5>Vehicle Name: {singleInspec?.getInspection.vehicle.details.name}</h5>
      <h6>Form Name: {singleInspec?.getInspection.inspectionForm.name}</h6>
      <div className=' justify-content-between pt-2'>
        {singleInspec?.getInspection.inspectionForm.tasks.map((task, i) => (
          <>
            {task.type === 'Pass_Fail' ? (
              <div className='row col-12 justify-content-between align-items-center'>
                <div className='col-5 d-flex pt-2'>
                  <i className='flaticon-381-trash-1' />
                  <h4 className='px-2'>{task.name}</h4>
                </div>
                <div className='col-2'>
                  <lable htmlFor='fail'>
                    Fail
                    <input
                      id='fail'
                      disabled
                      value={false}
                      name='check'
                      type={'radio'}
                      required
                      checked={watch(`inspection.inspectionForm.tasks.${i}.passed`) === false}
                      onChange={(e) => {
                        setValue(`inspection.inspectionForm.tasks.${i}.passed`, false);
                      }}
                    />
                  </lable>
                </div>
                <div className='col-2'>
                  <lable htmlFor='passed'>
                    Pass
                    <input
                      id='passed'
                      disabled
                      value={true}
                      name='check'
                      type={'radio'}
                      required
                      checked={watch(`inspection.inspectionForm.tasks.${i}.passed`) === true}
                      onChange={(e) => {
                        setValue(`inspection.inspectionForm.tasks.${i}.passed`, true);
                      }}
                    />
                  </lable>
                </div>
              </div>
            ) : (
              <>
                <div className='row justify-content-between col-12 pt-2'>
                  <div className='col-5 d-flex pt-2'>
                    <i className='flaticon-381-trash-1' />
                    <h4 className='px-2'>{task.name}</h4>
                  </div>
                  <label className='col-5'>
                    <input
                      className='form-control'
                      type='text'
                      disabled
                      placeholder='please add your description'
                      {...register(`inspection.inspectionForm.tasks.${i}.description`, {
                        required: true,
                      })}
                    />
                  </label>
                  {/* <Dropdown className='drop text-center col-2'>
                    <Dropdown.Toggle>...</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setShowImage(i);
                        }}
                      >
                        Add Photo
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => {
                          setShowComment(i);
                        }}
                      >
                        Add Comment
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <ReportInspectionIssue
                          name={task.name}
                          vehicleId={singleInspec.getInspection.vehicle._id}
                        />
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown> */}
                </div>
              </>
            )}
            {showComment === i && (
              <div className='col'>
                <div className='d-flex justify-content-end mt-3'>
                  <label className='col-6'>
                    <input
                      className='form-control'
                      placeholder='please add your comment'
                      {...register(`inspection.inspectionForm.tasks.${i}.comment`)}
                      type={'text'}
                    />
                  </label>
                </div>
              </div>
            )}
            {showImage === i && (
              <>
                <input
                  type='file'
                  onChange={(e) => handleFile(e, i)}
                  accept='image/*'
                  className={`d-none`}
                  id='vehicleImage'
                />
              </>
            )}
          </>
        ))}
      </div>
      {/* </>
      )} */}
      <SelectInput
        inpt={employeeData}
        label='Assigned To'
        register={{ ...register('inspection.assignTo', { required: true }) }}
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
          <h6>Start Date</h6>
          <input type='date' className='form-control' {...register('inspection.startTimestamp')} />
        </label>
        <label className='col-12 col-md-6'>
          <h6>End Date</h6>
          <input type='date' className='form-control' {...register('inspection.endTimestamp')} />
        </label>
      </div>
      <div className='col-12 d-flex justify-content-between'>
        <button
          className='btn btn-danger px-5'
          type='button'
          onClick={() => {
            toastId.current = toast('updating ...', {
              autoClose: false,
            });
            deleteInspectionRow({
              variables: { deleteInspectionId: id },
              onCompleted: (data) => {
                toast.update(toastId.current, {
                  render: `Inspections has been deleted`,
                  type: toast.TYPE.SUCCESS,
                  autoClose: 3000,
                });

                setModal(false);
              },
              onError: (_) => {
                toast.update(toastId.current, {
                  render: `Something went wrong`,
                  type: toast.TYPE.WARNING,
                  autoClose: 3000,
                });
              },
            });
          }}
        >
          Delete Inspection
        </button>
        <button className='btn btn-primary px-5' type='submit'>
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditInspections;
