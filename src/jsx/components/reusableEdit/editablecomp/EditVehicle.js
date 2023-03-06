import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../../pages/Employees/employees.css';
import { useIntl } from 'react-intl';
import { useMutation, useQuery } from '@apollo/client';
import { GET_GROUPS, GET_VEHICLE } from '../../../../utilities/Apollo/Querries';
import vehiclePlaceHolder from '../../../../images/v-placeholder.png';
import { UPDATE_VEHICLE } from '../../../../utilities/Apollo/Mutate';
import { toast } from 'react-toastify';
import { DELETE_VEHICLE } from '../../../../utilities/Apollo/Delete';

const EditVehicle = ({ compData, refetchQuery, id, setModal, setlocalVehicleList }) => {
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
    updateVehicleId: null,
    vehicle: {
      details: {
        VIN: null,
        assignStatus: null,
        color: null,
        group: null,
        initialOdometerReading: null,
        initialWorkingSeconds: null,
        licensePlate: null,
        licenseRenewalDate: new Date().toJSON().slice(0, 16),
        licenseRenewalOffice: null,
        make: null,
        model: null,
        name: null,
        photoUrl: null,
        status: null,
        type: null,
        year: null,
      },
      currentOdometerReading: null,
    },
  });

  // let editableData = compData && compData?.getVehicles.data.filter((ele, i) => ele._id === id)
  const vehicleType = [
    'Car',
    'SUV',
    'Van',
    'Pickup_Truck',
    'Bus',
    'Semi_Truck',
    'Truck',
    'Trailer',
    'Forklift',
    'Loader',
    'Equipment',
    'Others',
  ];
  const {
    data: groupData,
    error: err,
    loading: load,
  } = useQuery(GET_GROUPS, {
    variables: {
      options: { showAll: true },
    },
  });

  useEffect(() => {
    setSelectedImg(sessionStorage.getItem('imgVehicle'));
  }, [selectedImg]);

  useEffect(() => {}, [compData]);

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
  const [updateVehicleData] = useMutation(UPDATE_VEHICLE, {
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
  const [deleteVehicleRow] = useMutation(DELETE_VEHICLE, {
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

  const updateVehicle = (values) => {
    toastId.current = toast('updating ...', {
      autoClose: false,
    });

    let group = groupData.getGroups.data.find(
      (ele, i) => ele.name === values.vehicle.details.group,
    );
    updateVehicleData({
      variables: {
        updateVehicleId: id,
        vehicle: {
          ...values.vehicle,
          details: {
            ...values.vehicle.details,
            group: group._id || values.vehicle.details.group,
          },
        },
      },
      onCompleted: (data) => {
        toast.update(toastId.current, {
          render: `Vehicle has been updated`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });

        setModal(false);
      },
      onError: (error) => {
        toast.update(toastId.current, {
          render: `Something went wrong,${error.message}`,
          type: toast.TYPE.WARNING,
          autoClose: 3000,
        });
      },
      refetchQueries: [{ query: refetchQuery }],
    });
  };
  return (
    <form className='employees_form' onSubmit={handleSubmit(updateVehicle)}>
      <label className='employee_form_inp'>
        <h6>{intl.messages.name}</h6>
        <input
          type={'text'}
          id='name'
          className='form-control'
          placeholder={intl.messages.name}
          {...register('vehicle.details.name', {
            required: {
              value: true,
              message: 'Vehicle name is required',
            },
          })}
        />
        <p className='text-danger'>{errors?.vehicle?.details?.name?.message}</p>
      </label>

      <label className='employee_form_inp' htmlFor='year'>
        <h6>{intl.messages.year}</h6>
        <input
          type={'text'}
          onWheel={(e) => e.target.blur()}
          className='form-control'
          placeholder={intl.messages.year}
          {...register('vehicle.details.year', {
            required: {
              value: true,
              message: 'Vehicle year is required',
            },
          })}
        />
        <p className='text-danger'>{errors?.vehicle?.details?.year?.message}</p>
      </label>
      <label className='employee_form_inp' htmlFor='make'>
        <h6>{intl.messages.make}</h6>
        <input
          type={'text'}
          id='make'
          className='form-control'
          placeholder={intl.messages.make}
          {...register('vehicle.details.make', {
            required: {
              value: true,
              message: 'Vehicle make is required',
            },
          })}
        />
        <p className='text-danger'>{errors?.vehicle?.details?.make?.message}</p>
      </label>

      <label className='employee_form_inp' htmlFor='model'>
        <h6>{intl.messages.model}</h6>
        <input
          type={'text'}
          id='model'
          className='form-control'
          placeholder={intl.messages.model}
          {...register('vehicle.details.model', {
            required: {
              value: true,
              message: 'Vehicle model is required',
            },
          })}
        />
        <p className='text-danger'>{errors?.vehicle?.details?.model?.message}</p>
      </label>

      <label className='employee_form_inp' htmlFor='color'>
        <h6>{intl.messages.color}</h6>
        <input
          type={'color'}
          id='color'
          className='form-control'
          {...register('vehicle.details.color', {
            required: {
              value: true,
              message: 'Vehicle color is required',
            },
          })}
        />
        <p className='text-danger'>{errors?.vehicle?.details?.color?.message}</p>
      </label>

      <label className='employee_form_inp' htmlFor='type'>
        <h6>{intl.messages.type}</h6>
        <select
          className='form-control'
          {...register('vehicle.details.type', {
            required: {
              value: true,
              message: 'Vehicle type is required',
            },
          })}
        >
          {vehicleType.map((el, i) => (
            <option key={i} value={el}>
              {el}
            </option>
          ))}
        </select>
        <p className='text-danger'>{errors?.vehicle?.details?.type?.message}</p>
      </label>

      <label className='employee_form_inp' htmlFor='VIN'>
        <h6>{intl.messages.vin}</h6>
        <input
          type={'text'}
          id='VIN'
          className='form-control'
          placeholder={intl.messages.vin}
          {...register('vehicle.details.VIN', {
            required: {
              value: true,
              message: 'Vehicle VIN is required',
            },
          })}
        />
        <p className='text-danger'>{errors?.vehicle?.details?.VIN?.message}</p>
      </label>

      <label className='employee_form_inp' htmlFor='licensePlate'>
        <h6>{intl.messages.license_plate}</h6>
        <input
          type={'text'}
          id='licensePlate'
          className='form-control'
          placeholder={intl.messages.license_plate}
          {...register('vehicle.details.licensePlate', {
            required: {
              value: true,
              message: 'Vehicle license Plate is required',
            },
          })}
        />
        <p className='text-danger'>{errors?.vehicle?.details?.licensePlate?.message}</p>
      </label>
      <label className='employee_form_inp' htmlFor='licenseRenewalDate'>
        <h6>{intl.messages.renewal_date}</h6>
        <input
          type={'date'}
          id='licenseRenewalDate'
          className='form-control'
          placeholder={intl.messages.renewal_date}
          {...register('vehicle.details.licenseRenewalDate', {
            required: {
              value: true,
              message: 'Vehicle license Renewal Date is required',
            },
          })}
        />
        <p className='text-danger'>{errors?.vehicle?.details?.licenseRenewalDate?.message}</p>
      </label>

      <label className='employee_form_inp' htmlFor='licenseRenewalOffice'>
        <h6>{intl.messages.renewal_office}</h6>
        <input
          type={'text'}
          id='licenseRenewalOffice'
          className='form-control'
          placeholder={intl.messages.renewal_office}
          {...register('vehicle.details.licenseRenewalOffice', {
            required: {
              value: true,
              message: 'Vehicle license Renewal Office is required',
            },
          })}
        />
        <p className='text-danger'>{errors?.vehicle?.details?.licenseRenewalOffice?.message}</p>
      </label>

      <label className='employee_form_inp' htmlFor='groups'>
        <h6>{intl.messages.group}</h6>
        <input
          list='groups'
          name='groups'
          id='group'
          className='form-control'
          placeholder='choose group or create new one'
          {...register('vehicle.details.group', {
            required: {
              value: true,
              message: 'Vehicle group is required',
            },
          })}
        />
        <datalist id='groups' aria-label='Default select example'>
          {groupData &&
            groupData.getGroups.data.map((x, i) => (
              <option key={i} value={x.name}>
                {x.name}
              </option>
            ))}
        </datalist>
        <p className='text-danger'>{errors?.vehicle?.details?.group?.message}</p>
      </label>

      <label className='employee_form_inp' htmlFor='initialOdometerReading'>
        <h6>{intl.messages.odometer_reading}</h6>
        <input
          type={'number'}
          onWheel={(e) => e.target.blur()}
          id='initialOdometerReading'
          className='form-control'
          placeholder={intl.messages.odometer_reading}
          {...register('vehicle.details.initialOdometerReading', {
            required: {
              value: true,
              message: 'Vehicle group is required',
            },
            valueAsNumber: true,
          })}
        />
        <p className='text-danger'>{errors?.vehicle?.details?.group?.message}</p>
      </label>
      <label htmlFor='vehicleImage' className={`employee_form_inp`}>
        <h6>{intl.messages.image}</h6>
        <input type='file' onChange={handleImg} accept='image/*' id='vehicleImage' />
      </label>
      <div className='employee_form_inp row text-center justify-content-between'>
        <label htmlFor='active'>
          <h6>{intl.messages.active}</h6>
          <input
            type={'radio'}
            value='Active'
            name='status'
            id='active'
            checked={watch('vehicle.details.status') === 'Active'}
            {...register('vehicle.details.status', {
              required: {
                value: true,
                message: 'Vehicle status is required',
              },
            })}
          />
        </label>
        <label htmlFor='inactive'>
          <h6>{intl.messages.inactive}</h6>
          <input
            type={'radio'}
            value='Inactive'
            name='status'
            id='inactive'
            checked={watch('vehicle.details.status') === 'Inactive'}
            {...register('vehicle.details.status', {
              required: {
                value: true,
                message: 'Vehicle status is required',
              },
            })}
          />
        </label>
        <label htmlFor='inshop'>
          <h6>{intl.messages.inshop}</h6>
          <input
            type={'radio'}
            value='In_Shop'
            name='status'
            checked={watch('vehicle.details.status') === 'In_Shop'}
            id='inshop'
            {...register('vehicle.details.status', {
              required: {
                value: true,
                message: 'Vehicle status is required',
              },
            })}
          />
        </label>
        <label htmlFor='out'>
          <h6>{intl.messages.out_of_service}</h6>
          <input
            type={'radio'}
            value='Out_Of_Service'
            name='status'
            checked={watch('vehicle.details.status') === 'Out_Of_Service'}
            id='out'
            {...register('vehicle.details.status', {
              required: {
                value: true,
                message: 'Vehicle status is required',
              },
            })}
          />
        </label>
        <p className='text-danger'>{errors?.vehicle?.details?.status?.message}</p>
      </div>

      <div className='col-12 d-flex justify-content-between'>
        <button
          className='btn btn-danger px-5'
          type='button'
          onClick={() => {
            toastId.current = toast('Deleting...', {
              autoClose: false,
            });
            deleteVehicleRow({
              variables: { deleteVehicleId: id },
              onCompleted: (data) => {
                toast.update(toastId.current, {
                  render: `Vehicle has been deleted`,
                  type: toast.TYPE.SUCCESS,
                  autoClose: 3000,
                });
                const filter = compData.filter((v) => v._id !== data.deleteVehicle._id);
                setlocalVehicleList(filter);
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
          Delete Vehicle
        </button>
        <button disabled={!isDirty} className='btn btn-primary px-5' type='submit'>
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditVehicle;
