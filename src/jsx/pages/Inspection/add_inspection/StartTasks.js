import React, { useRef, useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import plHolder from '../../../../images/placeholder-view.png';
import { useForm } from 'react-hook-form';
import ReportInspectionIssue from './ReportInspectionIssue';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_TASKS_INSPECTIONS } from '../../../../utilities/Apollo/Mutate';
import { GET_INSPECTION_LIST, GET_SINGLE_INSPECTION } from '../../../../utilities/Apollo/Querries';
import { toast } from 'react-toastify';

const StartTasks = ({ selectInspection, setStartAction, selectInspectionId, setOpenModal }) => {
  const [showComment, setShowComment] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imgPlaceHolder, setImgPlaceHolder] = useState(plHolder);
  const toastId = useRef(null);

  const { register, handleSubmit, reset, setValue, getValues } = useForm({
    updateInspectionId: null,
    inspection: {
      inspectionForm: {
        name: null,
        tasks: {
          comment: null,
          description: null,
          documentUrl: null,
          name: null,
          photoUrl: null,
          passed: null,
          type: null,
        },
      },
    },
  });

  const {
    data: singleInspec,
    error: inspecError,
    loading: loadinspec,
  } = useQuery(GET_SINGLE_INSPECTION, {
    variables: { getInspectionId: selectInspectionId._id },
    onCompleted: (data) => {
      setValue('inspection.inspectionForm.name', data?.getInspection.inspectionForm.name);
      setValue('updateInspectionId', selectInspectionId._id);
    },
  });

  const handleImg = (e, i) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    setValue(`inspection.inspectionForm.tasks.${i}.photoUrl`, file);
    reader.onload = () => {
      setImgPlaceHolder(reader.result);
    };
    reader.onerror = function (error) {
      throw ('Error: ', error);
    };
  };
  const [createInspection, { data: createdInspection }] = useMutation(UPDATE_TASKS_INSPECTIONS, {
    refetchQueries: [{
      query: GET_INSPECTION_LIST,
      variables: {
        options: {
          showAll: true,
        },
      },
    }],
  });

  const handleSubmitTasks = (values) => {
    toastId.current = toast('Creating...', {
      autoClose: false,
    });
    createInspection({
      variables: { ...values },
      onCompleted: (data) => {
        toast.update(toastId.current, {
          render: `A new open inspection has been Added`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        setOpenModal(false)
        reset();
      },
      onError: (errors) => {
        toast.update(toastId.current, {
          render: `Something went wrong`,
          type: toast.TYPE.ERROR,
          autoClose: 3000,
        });
      },
    });
  };

  return (
    <>
      <>
        <button
          type='button'
          className='btn btn-primary mb-3'
          onClick={() => {
            setStartAction(false);
          }}
        >
          back
        </button>
        <form onSubmit={handleSubmit(handleSubmitTasks)}>
          <h5>Vehicle Name: {singleInspec?.getInspection.vehicle.details.name}</h5>
          <h6>Form Name: {singleInspec?.getInspection.inspectionForm.name}</h6>
          <div className=' justify-content-between pt-2'>
            {singleInspec?.getInspection.inspectionForm.tasks.map((task, i) => (
              <>
                {setValue(`inspection.inspectionForm.tasks.${i}.name`, task.name)}
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
                          value={false}
                          name='check'
                          type={'radio'}
                          required
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
                          value={true}
                          name='check'
                          type={'radio'}
                          required
                          onChange={(e) => {
                            setValue(`inspection.inspectionForm.tasks.${i}.passed`, true);
                          }}
                        />
                      </lable>
                    </div>
                    <Dropdown className='drop text-center col-2'>
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
                            vehicleId={selectInspectionId.vehicle._id}
                          />
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
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
                          placeholder='please add your description'
                          {...register(`inspection.inspectionForm.tasks.${i}.description`, {
                            required: true,
                          })}
                        />
                      </label>
                      <Dropdown className='drop text-center col-2'>
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
                              vehicleId={selectInspectionId.vehicle._id}
                            />
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
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
                    <label htmlFor='vehicleImage' className={`vehicle-placeholder`}>
                      <img src={imgPlaceHolder} alt='' />
                    </label>
                    <input
                      type='file'
                      onChange={(e) => handleImg(e, i)}
                      accept='image/*'
                      className={`d-none`}
                      id='vehicleImage'
                    />
                  </>
                )}
              </>
            ))}
          </div>
          <div>
            <button className='btn btn-primary' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </>
    </>
  );
};

export default StartTasks;
