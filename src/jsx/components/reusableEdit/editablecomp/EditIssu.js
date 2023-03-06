import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../../pages/Employees/employees.css';
import { useIntl } from 'react-intl';
import { useMutation, useQuery } from '@apollo/client';
import { GET_GROUPS, GET_SINGLE_ISSUE } from '../../../../utilities/Apollo/Querries';
import vehiclePlaceHolder from '../../../../images/v-placeholder.png';
import { UPDATE_ISSUE, UPDATE_VEHICLE } from '../../../../utilities/Apollo/Mutate';
import { toast } from 'react-toastify';
import { DELETE_ISSUE } from '../../../../utilities/Apollo/Delete';

const EditIssue = ({ vehicles, employees, refetchQuery, id, setModal, modal }) => {
  const [imgPlaceHolder, setImgPlaceHolder] = useState(vehiclePlaceHolder);
  const [selectedImg, setSelectedImg] = useState();
  const intl = useIntl();
  const toastId = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    updateIssueId: null,
    issue: {
      vehicle: null,
      comment: null,
      reportedAt: null,
      reportedBy: null,
      name: null,
      assignTo: null,
      documentUrl: null,
      photoUrl: null,
      endTimestamp: null,
    },
  });
  const {
    data: service,
    loading,
    error,
  } = useQuery(GET_SINGLE_ISSUE, {
    variables: {
      getIssueId: id,
    },
    onCompleted: (data) => {
      console.log(data);
      setValue('updateIssueId', id);
      setValue('issue.vehicle', data.getIssue.vehicle._id);
      setValue('issue.reportedAt', data.getIssue.reportedAt.slice(0, 16));
      setValue('issue.reportedBy', data.getIssue.reportedBy._id);
      setValue('issue.name', data.getIssue.name);
      setValue('issue.assignTo', data.getIssue.assignTo._id);
      setValue('issue.endTimestamp', data.getIssue.endTimestamp.slice(0, 16));
    },
  });
  useEffect(() => {
    setSelectedImg(sessionStorage.getItem('imgVehicle'));
  }, [selectedImg]);

  const handleImg = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    setValue('vehicle.details.photoUrl', file);
    reader.onload = () => {
      setImgPlaceHolder((imgUpload) => (imgUpload = reader.result));
      sessionStorage.setItem('imgVehicle', reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  const [deleteIssueRow] = useMutation(DELETE_ISSUE, {
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

  const [updateIssueData] = useMutation(UPDATE_ISSUE, {
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

  const updateIssue = (values) => {
    toastId.current = toast('updating ...', {
      autoClose: false,
    });
    updateIssueData({
      variables: values,
      onCompleted: (data) => {
        toast.update(toastId.current, {
          render: `Issue has been updated`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        setModal(false);
        reset();
      },
      onError: (error) => {
        toast.update(toastId.current, {
          render: `Something went wrong ${error}`,
          type: toast.TYPE.DEFAULT,
          autoClose: 3000,
        });
      },
    });
  };
  return (
    <form className='employees_form' onSubmit={handleSubmit(updateIssue)}>
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
        <p className='text-danger'>{errors?.issue?.vehicle?.message}</p>
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
        <p className='text-danger'>{errors?.issue?.name?.message}</p>
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
                message: 'Reported at time is required',
              },
              valueAsDate: true,
            })}
          />
          <p className='text-danger'>{errors?.issue?.reportedAt?.message}</p>
        </label>
        <label className='col-6 '>
          <h6>Reported By*</h6>
          <select
            className={`form-control`}
            {...register('issue.reportedBy', {
              required: { value: true, message: 'Reported By is required' },
            })}
          >
            <option value={''}>Please select...</option>
            {employees.map((unit) => (
              <option value={unit._id} key={unit._id}>
                {unit.firstName}
              </option>
            ))}
          </select>
          <p className='text-danger'>{errors?.issue?.reportedBy?.message}</p>
        </label>
      </div>
      <div className='row align-items-center justify-content-between '>
        <label className='col-6 '>
          <h6>Due Date & Time*</h6>
          <input
            className='form-control'
            type='datetime-local'
            {...register('issue.endTimestamp', {
              valueAsDate: true,
            })}
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
      <div className='col-12 d-flex justify-content-between'>
        <button
          className='btn btn-danger px-5'
          type='button'
          onClick={() => {
            toastId.current = toast('Deleting ...', {
              autoClose: false,
            });
            deleteIssueRow({
              variables: { deleteIssueId: id },
              onCompleted: () => {
                toast.update(toastId.current, {
                  render: `the Issue has been deleted`,
                  type: toast.TYPE.SUCCESS,
                  autoClose: 3000,
                });
                setModal(false);
              },
              onError: (error) => {
                toast.update(toastId.current, {
                  render: `Something went wrong ${error}`,
                  type: toast.TYPE.ERROR,
                  autoClose: 3000,
                });
              },
            });
          }}
        >
          Delete Issue
        </button>
        <button disabled={!isDirty} className='btn btn-primary px-5' type='submit'>
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditIssue;
