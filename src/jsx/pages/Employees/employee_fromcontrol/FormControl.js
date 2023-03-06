import React, { useState } from 'react';
import plHolder from '../../../../images/placeholder-view.png';
import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_SIGNED_URL } from '../../../../utilities/Apollo/Querries';

const FormControl = ({
  type,
  register,
  radios,
  options,
  label,
  required,
  defaultOption,
  checked,
  id,
  placeholder,
  watch,
  setValue,
  min,
  error,
  setFile,
  setPhoto,
  formateStyle,
  ...rest
}) => {
  const [imgPlaceholder, setImgPlaceHolder] = useState(plHolder);

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
          console.log('setFile', setPhoto);
          setValue(setPhoto, `${apiUrl}${value.getWriteSignedURL.fileName}`);
        } catch (error) {
          throw error;
        }
      },
    });
    reader.onload = () => {
      setImgPlaceHolder(reader.result);
      sessionStorage.setItem('imgVehicle', reader.result);
    };
    reader.onerror = function (error) {
      throw ('Error: ', error);
    };
  };

  switch (type) {
    case 'select':
      return (
        <label className={`${formateStyle ? 'fin-formate' : 'employee_form_inp'}`}>
          <h6>
            {label} {required ? '*' : ''}
          </h6>
          <select
            defaultValue={''}
            className='form-control'
            // required={required ? true : false}
            {...register}
          >
            <option disabled value={''}>
              {defaultOption}
            </option>
            {options?.map((option) => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
          <p className='text-danger'>{error && error}</p>
        </label>
      );
    case 'datalist':
      return (
        <label className={`${formateStyle ? 'fin-formate' : 'employee_form_inp'}`}>
          <h6>
            {label} {required ? '*' : ''}
          </h6>
          <input
            list={id}
            name={id}
            className='form-control'
            placeholder={placeholder}
            {...register}
          // required={required ? true : false}
          />
          <datalist id={id} aria-label='Default select example'>
            {options &&
              options?.map((option) => (
                <option value={option.name} key={option.id}>
                  {option.name}
                </option>
              ))}
          </datalist>
          <p className='text-danger'>{error && error}</p>
        </label>
      );
    case 'radio':
      return (
        <div className='employee_form_inp '>
          <h6 className='w-100'>
            {label} {required ? '*' : ''}
          </h6>
          <div className='radio_wrapper'>
            {radios.map((radio, index) => (
              <label htmlFor={radio.id} key={index}>
                {radio.label}{' '}
                <input
                  id={radio.id}
                  type={type}
                  checked={watch === radio.id}
                  value={radio.id}
                  name={radio.name}
                  onChange={() => {
                    if (radio.noBoolean) {
                      setValue(radio.cond, radio.id);
                    } else {
                      setValue(radio.cond, Boolean(radio.id));
                    }
                  }}
                />
              </label>
            ))}
            <p className='text-danger'>{error && error}</p>
          </div>
        </div>
      );
    case 'image':
      return (
        <>
          <label
            htmlFor='inp-img'
            className={`${formateStyle ? 'fin-formate' : 'employee_form_inp'}`}
          >
            <h6>
              {label} {required ? '*' : ''}
            </h6>
            <input
              id='inp-img'
              onChange={handleFile}
              // required={required ? true : false}
              type='file'
              accept='image/*'
            />
            <p className='text-danger'>{error && error}</p>
          </label>
        </>
      );

    case 'document':
      return (
        <label className={`${formateStyle ? 'fin-formate' : 'employee_form_inp'}`}>
          <h6>
            {label} {required ? '*' : ''}
          </h6>
          <input
            className='form-control'
            // required={required ? true : false}
            onChange={handleFile}
            type='file'
            accept='application/*'
          />
          <p className='text-danger'>{error && error}</p>
        </label>
      );
    case 'datetime':
      return (
        <label className={`${formateStyle ? 'fin-formate' : 'employee_form_inp'}`}>
          <h6>
            {label} {required ? '*' : ''}
          </h6>
          <input
            className='form-control'
            // required={required ? true : false}
            type='datetime-local'
            {...register}
            {...rest}
          />
          <p className='text-danger'>{error && error}</p>
        </label>
      );
    default:
      return (
        <label className={`${formateStyle ? 'fin-formate' : 'employee_form_inp'}`}>
          <h6>
            {label} {required ? '*' : ''}
          </h6>
          <input
            className='form-control'
            // required={required ? true : false}
            min={min}
            placeholder={placeholder}
            type={type}
            {...register}
            {...rest}
          />
          <p className='text-danger'>{error && error}</p>
        </label>
      );
  }
};

export default FormControl;
