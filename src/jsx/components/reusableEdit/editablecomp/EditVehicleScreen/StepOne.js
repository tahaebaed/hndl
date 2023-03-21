import { useQuery } from '@apollo/client';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';

import { GET_GROUPS } from '../../../../../utilities/Apollo/Querries';

const StepOne = ({
  compData,
  refetchQuery,
  id,
  setModal,
  register,
  errors,
  setValue,
  watch,
  required,
  setActiveStep,
}) => {
  const [selectedImg, setSelectedImg] = useState();
  const intl = useIntl();
  const toastId = useRef(null);

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

  const { data: groupData } = useQuery(GET_GROUPS, {
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
      sessionStorage.setItem('imgVehicle', reader.result);
      setSelectedImg(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  };

  return (
    <div className='steps_container'>
      <div className='row'>
        <div className='form-group col-12 col-md-6 '>
          <label htmlFor='name'>
            <h6>
              {intl.messages.name} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'text'}
            id='name'
            className='form-control'
            placeholder={intl.messages.name}
            {...register('vehicle.details.name', {
              required: { value: true, message: 'Vehicle nme is required' },
            })}
          />
          <p className='text-danger'>{errors?.vehicle?.details?.name?.message}</p>
        </div>
        <div className='form-group col-12 col-md-6 '>
          <label htmlFor='year'>
            <h6>
              {intl.messages.year} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'text'}
            onWheel={(e) => e.target.blur()}
            className='form-control'
            placeholder={intl.messages.year}
            {...register('vehicle.details.year', {
              required: { value: true, message: 'year is required' },
            })}
          />
          <p className='text-danger'>{errors?.vehicle?.details?.year?.message}</p>
        </div>
      </div>
      <div className='row'>
        <div className='form-group col-12 col-md-6 '>
          <label htmlFor='make'>
            <h6>
              {intl.messages.make} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'text'}
            id='make'
            className='form-control'
            placeholder={intl.messages.make}
            {...register('vehicle.details.make', {
              required: { value: true, message: 'make is required' },
            })}
          />
        </div>
        <div className='form-group col-12 col-md-6 '>
          <label htmlFor='model'>
            <h6>
              {intl.messages.model} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'text'}
            id='model'
            className='form-control'
            placeholder={intl.messages.model}
            {...register('vehicle.details.model', {
              required: { value: true, message: 'model is required' },
            })}
          />
          <p className='text-danger'>{errors?.vehicle?.details?.model?.message}</p>
        </div>
      </div>
      <div className='row'>
        <div className='form-group col-12 col-md-6 '>
          <label htmlFor='color'>
            <h6>
              {intl.messages.color} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'color'}
            id='color'
            className='form-control'
            {...register('vehicle.details.color')}
          />
        </div>
        <div className='form-group col-12 col-md-6 '>
          <label htmlFor='type'>
            <h6>
              {intl.messages.type} {required ? '*' : ''}
            </h6>
          </label>

          <select
            className='form-control'
            defaultValue={''}
            {...register('vehicle.details.type', {
              required: { value: true, message: 'year is required' },
            })}
          >
            <option disabled value={''}>
              Car Type
            </option>
            {vehicleType.map((el, i) => (
              <option key={i} value={el}>
                {el.replace('_', ' ')}
              </option>
            ))}
          </select>
          <p className='text-danger'>{errors?.vehicle?.details?.type?.message}</p>
        </div>
      </div>
      <div className='row'>
        <div className='form-group col-12 col-md-6 '>
          <label htmlFor='VIN'>
            <h6>
              {intl.messages.vin} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'text'}
            id='VIN'
            className='form-control'
            placeholder={intl.messages.vin}
            {...register('vehicle.details.VIN', {
              required: { value: true, message: 'VIN is required' },
            })}
          />
        </div>
        <div className='form-group col-12 col-md-6 '>
          <label htmlFor='licensePlate'>
            <h6>
              {intl.messages.license_plate} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'text'}
            id='licensePlate'
            className='form-control'
            placeholder={intl.messages.license_plate}
            {...register('vehicle.details.licensePlate', {
              required: { value: true, message: 'License Plate is required' },
            })}
          />
          <p className='text-danger'>{errors?.vehicle?.details?.licensePlate?.message}</p>
        </div>
      </div>
      <div className='row'>
        <div className='form-group col-12 col-md-6 '>
          <label htmlFor='licenseRenewalDate'>
            <h6>
              {intl.messages.renewal_date} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'date'}
            id='licenseRenewalDate'
            className='form-control'
            placeholder={intl.messages.renewal_date}
            {...register('vehicle.details.licenseRenewalDate', {
              required: {
                value: true,
                message: 'License renewal date is required',
              },
            })}
          />
          <p className='text-danger'>{errors?.vehicle?.details?.licenseRenewalDate?.message}</p>
        </div>
        <div className='form-group col-12 col-md-6 '>
          <label htmlFor='licenseRenewalOffice'>
            <h6>
              {intl.messages.renewal_office} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'text'}
            id='licenseRenewalOffice'
            className='form-control'
            placeholder={intl.messages.renewal_office}
            {...register('vehicle.details.licenseRenewalOffice', {
              required: {
                value: true,
                message: 'license Renewal Office is required',
              },
            })}
          />
          <p className='text-danger'>{errors?.vehicle?.details?.licenseRenewalOffice?.message}</p>
        </div>
      </div>
      <div className='row'>
        <div className='form-group col-12 col-md-6 '>
          <label htmlFor='groups'>
            <h6>
              {intl.messages.group} {required ? '*' : ''}
            </h6>
          </label>
          <input
            list='groups'
            name='groups'
            id='group'
            className='form-control'
            placeholder='choose group or create new one'
            {...register('vehicle.details.group', {
              required: { value: true, message: 'group is required' },
            })}
          />
          <datalist id='groups' aria-label='Default select example'>
            {groupData &&
              groupData.getGroups.data.map((x, i) => <option value={x.name}>{x.name}</option>)}
          </datalist>
          <p className='text-danger'>{errors?.vehicle?.details?.group?.message}</p>
        </div>
        <div className='form-group col-12 col-md-6 '>
          <label htmlFor='initialOdometerReading'>
            <h6>
              {intl.messages.odometer_reading} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'number'}
            onWheel={(e) => e.target.blur()}
            id='initialOdometerReading'
            className='form-control'
            placeholder={intl.messages.odometer_reading}
            {...register('vehicle.details.initialOdometerReading', {
              required: {
                value: true,
                message: 'the meter reading is required',
              },
              valueAsNumber: true,
            })}
          />
          <p className='text-danger'>{errors?.vehicle?.details?.initialOdometerReading?.message}</p>
        </div>
        <div className='col-12 col-md-6'>
          <label className='mx-2' htmlFor='out'>
            <h6>{intl.messages.image}</h6>
          </label>
          <label className='d-flex align-items-end'>
            <img src={selectedImg || watch('vehicle.details.photoUrl')} className='w-25 mr-3' />
            <input type='file' onChange={handleImg} accept='image/*' id='vehicleImage' />
          </label>
        </div>
        <div className=' col-12 col-md-6 d-flex justify-content-between mb-4'>
          <div>
            <label className='mx-2' htmlFor='active'>
              <h6>
                {intl.messages.active} {required ? '*' : ''}
              </h6>
            </label>
            <input
              type={'radio'}
              value='Active'
              name='status'
              id='active'
              {...register('vehicle.details.status', {
                required: { value: true, message: 'status is required' },
              })}
            />
          </div>
          <div>
            <label className='mx-2' htmlFor='inactive'>
              <h6>
                {intl.messages.inactive} {required ? '*' : ''}
              </h6>
            </label>
            <input
              type={'radio'}
              value='Inactive'
              name='status'
              id='inactive'
              {...register('vehicle.details.status', {
                required: { value: true, message: 'status is required' },
              })}
            />
          </div>
          <div>
            <label className='mx-2' htmlFor='inshop'>
              <h6>
                {intl.messages.inshop} {required ? '*' : ''}
              </h6>
            </label>
            <input
              type={'radio'}
              value='In_Shop'
              name='status'
              id='inshop'
              {...register('vehicle.details.status', {
                required: { value: true, message: 'status is required' },
              })}
            />
          </div>
          <div>
            <label className='mx-2' htmlFor='out'>
              <h6>
                {intl.messages.out_of_service} {required ? '*' : ''}
              </h6>
            </label>
            <input
              type={'radio'}
              value='Out_Of_Service'
              name='status'
              id='out'
              {...register('vehicle.details.status', {
                required: { value: true, message: 'status is required' },
              })}
            />
          </div>
          <p className='text-danger'>{errors?.vehicle?.details?.status?.message}</p>
        </div>
        <div className='d-flex justify-content-end w-100 mb-4 mt-3'>
          <button
            type='button'
            className='btn btn-primary px-5 btn-md'
            onClick={() => setActiveStep((prev) => prev + 1)}
          >
            next
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
