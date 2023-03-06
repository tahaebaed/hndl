import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Dropdown, Form } from 'react-bootstrap'
import { useLazyQuery, useQuery } from '@apollo/client'
import vehiclePlaceHolder from '../../../images/v-placeholder.png'
import { intlFormat } from 'date-fns'
import { useIntl } from 'react-intl'
import { GET_SIGNED_URL } from '../../../utilities/Apollo/Querries'

const StepOne = ({
  activeStep,
  setActiveStep,
  register,
  watch,
  setValue,
  groupData,
  setFilterGroup,
  required,
}) => {
  const intl = useIntl()

  const [imgPlaceHolder, setImgPlaceHolder] = useState(vehiclePlaceHolder)
  const [selectedImg, setSelectedImg] = useState()

  useEffect(() => {
    setSelectedImg(sessionStorage.getItem('imgVehicle'))
  }, [selectedImg])

  const [getUrl, { data: url, loading: loadurl, error: errurl }] =
    useLazyQuery(GET_SIGNED_URL)
  let apiUrl = 'https://storage.googleapis.com/ostouli/'

  const handleImg = e => {
    let file = e.target.files[0]
    let reader = new FileReader()
    reader.readAsDataURL(file)
    getUrl({
      variables: {
        fileName: file.name,
        contentType: file.type,
      },
      onCompleted: async value => {
        try {
          const res = await fetch(value.getWriteSignedURL.signedUrl, {
            method: 'put',
            headers: {
              'Content-Type': value.getWriteSignedURL.contentType,
            },
            body: file,
          })
          setValue(
            'vehicle.details.photoUrl',
            `${apiUrl}${value.getWriteSignedURL.fileName}`
          )
        } catch (error) {
          throw error
        }
      },
    })
    reader.onload = () => {
      setImgPlaceHolder(reader.result)
      sessionStorage.setItem('imgVehicle', reader.result)
    }
    reader.onerror = function (error) {
      throw ('Error: ', error)
    }
  }
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
  ]

  return (
    <div className='steps_container'>
      <div className='row'>
        <div className='form-group col-12 col-md-6 '>
          <label for='name'>
            <h6>
              {intl.messages.name} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'text'}
            id='name'
            className='form-control'
            placeholder={intl.messages.name}
            {...register('vehicle.details.name', { required: true })}
          />
        </div>
        <div className='form-group col-12 col-md-6 '>
          <label for='year'>
            <h6>
              {intl.messages.year} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'text'}
            onWheel={e => e.target.blur()}
            className='form-control'
            placeholder={intl.messages.year}
            {...register('vehicle.details.year', { required: true })}
          />
        </div>
      </div>
      <div className='row'>
        <div className='form-group col-12 col-md-6 '>
          <label for='make'>
            <h6>
              {intl.messages.make} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'text'}
            id='make'
            className='form-control'
            placeholder={intl.messages.make}
            {...register('vehicle.details.make', { required: true })}
          />
        </div>
        <div className='form-group col-12 col-md-6 '>
          <label for='model'>
            <h6>
              {intl.messages.model} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'text'}
            id='model'
            className='form-control'
            placeholder={intl.messages.model}
            {...register('vehicle.details.model', { required: true })}
          />
        </div>
      </div>
      <div className='row'>
        <div className='form-group col-12 col-md-6 '>
          <label for='color'>
            <h6>
              {intl.messages.color} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'color'}
            id='color'
            className='form-control'
            {...register('vehicle.details.color', { required: true })}
          />
        </div>
        <div className='form-group col-12 col-md-6 '>
          <label for='type'>
            <h6>
              {intl.messages.type} {required ? '*' : ''}
            </h6>
          </label>
          {/* <input
                        type={'text'}
                        id='type'
                        className='form-control'
                        placeholder={intl.messages.type}
                        {...register('vehicle.details.type', { required: true })}
                    /> */}
          <select
            className='form-control'
            defaultValue={''}
            {...register('vehicle.details.type', { required: true })}
          >
            <option disabled value={''}>
              Car Type
            </option>
            {vehicleType.map((el, i) => (
              <option>{el}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='row'>
        <div className='form-group col-12 col-md-6 '>
          <label for='VIN'>
            <h6>
              {intl.messages.vin} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'text'}
            id='VIN'
            className='form-control'
            placeholder={intl.messages.vin}
            {...register('vehicle.details.VIN', { required: true })}
          />
        </div>
        <div className='form-group col-12 col-md-6 '>
          <label for='licensePlate'>
            <h6>
              {intl.messages.license_plate} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'text'}
            id='licensePlate'
            className='form-control'
            placeholder={intl.messages.license_plate}
            {...register('vehicle.details.licensePlate', { required: true })}
          />
        </div>
      </div>
      <div className='row'>
        <div className='form-group col-12 col-md-6 '>
          <label for='licenseRenewalDate'>
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
              required: true,
            
            })}
          />
        </div>
        <div className='form-group col-12 col-md-6 '>
          <label for='licenseRenewalOffice'>
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
              required: true,
            })}
          />
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
            {...register('vehicle.details.group', { required: true })}
          />
          <datalist id='groups' aria-label='Default select example'>
            {groupData &&
              groupData.getGroups.data.map((x, i) => (
                <option value={x.name}>{x.name}</option>
              ))}
          </datalist>
          {/* <select id='groups'>
            <option disabled value={''}></option>
            {data &&
              data.getGroups.data.map((x, i) => (
                <option value={x._id}>{x.name}</option>
              ))}
          </select>{' '} */}
          {/* <datalist
              className='form-control'
              id='group'
              aria-label='Default select example'
              {...register('vehicle.details.group', { required: true })}
            >
              <option disabled value={''}></option>
              {data &&
                data.getGroups.data.map((x, i) => (
                  <option value={x._id}>{x.name}</option>
                ))}
            </datalist> */}
        </div>
        <div className='form-group col-12 col-md-6 '>
          <label for='initialOdometerReading'>
            <h6>
              {intl.messages.odometer_reading} {required ? '*' : ''}
            </h6>
          </label>
          <input
            type={'number'}
            onWheel={e => e.target.blur()}
            id='initialOdometerReading'
            className='form-control'
            placeholder={intl.messages.odometer_reading}
            {...register('vehicle.details.initialOdometerReading', {
              required: true,
              valueAsNumber: true,
            })}
          />
        </div>
        <div className='col-12 col-md-6'>
          <label className='mx-2' for='out'>
            <h6>{intl.messages.image}</h6>
          </label>
          <input
            type='file'
            onChange={handleImg}
            accept='image/*'
            id='vehicleImage'
          />
        </div>
        <div className=' col-12 col-md-6 d-flex justify-content-between '>
          <div>
            <label className='mx-2' for='active'>
              <h6>
                {intl.messages.active} {required ? '*' : ''}
              </h6>
            </label>
            <input
              type={'radio'}
              value='Active'
              name='status'
              id='active'
              {...register('vehicle.details.status', { required: true })}
            />
          </div>
          <div>
            <label className='mx-2' for='inactive'>
              <h6>
                {intl.messages.inactive} {required ? '*' : ''}
              </h6>
            </label>
            <input
              type={'radio'}
              value='Inactive'
              name='status'
              id='inactive'
              {...register('vehicle.details.status', { required: true })}
            />
          </div>
          <div>
            <label className='mx-2' for='inshop'>
              <h6>
                {intl.messages.inshop} {required ? '*' : ''}
              </h6>
            </label>
            <input
              type={'radio'}
              value='In_Shop'
              name='status'
              id='inshop'
              {...register('vehicle.details.status', { required: true })}
            />
          </div>
          <div>
            <label className='mx-2' for='out'>
              <h6>
                {intl.messages.out_of_service} {required ? '*' : ''}
              </h6>
            </label>
            <input
              type={'radio'}
              value='Out_Of_Service'
              name='status'
              id='out'
              {...register('vehicle.details.status', { required: true })}
            />
          </div>
        </div>
      </div>
      <div className='d-flex justify-content-end w-100'>
        <button
          type='button'
          className='btn btn-primary px-5 btn-md'
          onClick={() => setActiveStep(prev => prev + 1)}
        >
          next
        </button>
      </div>
    </div>
  )
}

export default StepOne
