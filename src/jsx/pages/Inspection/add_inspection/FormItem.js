import React, { useEffect, useRef, useState } from 'react';
import FormControl from '../../Employees/employee_fromcontrol/FormControl';
import { Dropdown } from 'react-bootstrap';
import { useForm, useFieldArray } from 'react-hook-form';
import plHolder from '../../../../images/placeholder-view.png';
import { CREATE_INSPECTION_FORM } from '../../../../utilities/Apollo/Mutate';
import { useMutation } from '@apollo/client';
import { is } from 'date-fns/locale';
import { toast } from 'react-toastify';
import { GET_INSPECTION_LIST } from '../../../../utilities/Apollo/Querries';

const FormItem = ({ setShowAddItemForm, showAddItemForm, setOpenModal }) => {
  const toastId = useRef(null);

  const types = [
    { id: 'Pass_Fail', value: 'Pass_Fail' },
    { id: 'Text', value: 'Text' },
  ];
  const [data, setData] = useState({
    itemName: '',
    itemType: '',
  });
  const [formItems, setFormItems] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imgPlaceHolder, setImgPlaceHolder] = useState(plHolder);

  const {
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
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
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'inspectionForm.tasks',
  });

  const [
    createInspectionForm,
    { data: assginment, loading: loadAssginment, error: errAssginment },
  ] = useMutation(CREATE_INSPECTION_FORM, {
    refetchQueries: [{
      query: GET_INSPECTION_LIST,
      variables: {
        options: {
          showAll: true,
        },
      },
    }],
  });

  const handleAddItems = (values) => {
    toastId.current = toast('Creating...', {
      autoClose: false,
    });
    values.inspectionForm.tasks.forEach(function (v) {
      if (v.itemType == 'Pass_Fail') {
        delete v.itemType;
        v.type = 'Pass_Fail';
      } else {
        delete v.itemType;
        delete v.passed;
        v.type = 'Text';
      }
      setShowAddItemForm(false);
    });
    createInspectionForm({
      variables: values,
      onCompleted: (data) => {
        toast.update(toastId.current, {
          render: `A new Form has been Added`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        setOpenModal(false)
      },
      onError: (errors) => {
        console.log(errors);
        toast.update(toastId.current, {
          render: `Something went wrong ,${errors}`,
          type: toast.TYPE.ERROR,
          autoClose: 3000,
        });
      },
    });
  };
  return (
    <form onSubmit={handleSubmit(handleAddItems)}>
      <div className='d-flex justify-content-between'>
        <div className='col-6'>
          <label className='col-12'>
            <h6>Form Name</h6>
            <input
              className='form-control'
              placeholder='Set name to the Form'
              type={'text'}
              {...register('inspectionForm.name', {
                required: {
                  value: true,
                  message: 'Vehicle year is required',
                },
              })}
            />
            <p className='text-danger'>{errors?.inspectionForm?.name?.message}</p>
          </label>
          <button
            type='button'
            className='btn btn-primary d-block'
            disabled={
              watch('inspectionForm.name') == undefined || watch('inspectionForm.name') == ''
                ? true
                : false
            }
            onClick={() => {
              setShowAddItemForm(!showAddItemForm);
            }}
          >
            Add Inspection Item
          </button>
        </div>
        <div className={`${showAddItemForm ? showAddItemForm : 'd-none'} col-6`}>
          <label className='employee_form_inp col-12 p-0'>
            <h6>Inspection Item Name</h6>
            <input
              className='form-control'
              value={data.itemName}
              name='itemName'
              placeholder='Set item name'
              type={'text'}
              onChange={(e) => {
                setData({ ...data, [e.target.name]: e.target.value });
              }}
            />
          </label>
          <div className='d-block'>
            <label className='employee_form_inp col-12 p-0'>
              <h6>Inspection Item Type</h6>
              <select
                defaultValue={''}
                value={data.itemType}
                name='itemType'
                className='form-control'
                onChange={(e) => {
                  setData({ ...data, [e.target.name]: e.target.value });
                }}
              >
                <option disabled value={''}>
                  Select Item
                </option>
                {types.map((option) => (
                  <option value={option.id} key={option.id}>
                    {option.value}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button
            className='btn btn-primary mb-3'
            type='button'
            onClick={() => {
              // setFormItems([...formItems, data])
              setData({
                itemName: '',
                itemType: '',
              });
              append({
                name: data.itemName,
                passed: null,
                type: null,
                description: null,
                itemType: data.itemType,
                comment: null,
                photoUrl: null,
              });
            }}
          >
            Add To Item List
          </button>
        </div>
      </div>
      <div>
        {fields.map((x, i) =>
          x.itemType === 'Pass_Fail' ? (
            <div className='d-flex justify-content-between pt-2' key={i}>
              <div className='col-6 d-flex'>
                <i
                  className='flaticon-381-trash-1'
                  onClick={() => {
                    remove(i);
                  }}
                />
                <p className='px-3'>{x.name}</p>
              </div>
              <div className='col-6 d-flex justify-content-between align-items-center'>
                <p>{x.itemType}</p>
              </div>
            </div>
          ) : (
            <div className='d-flex justify-content-between pt-2' key={i}>
              <div className='col-6 d-flex pt-2'>
                <i
                  className='flaticon-381-trash-1'
                  onClick={() => {
                    fields.filter((remove) => remove.id !== x.id);
                  }}
                />
                <p>{x.name}</p>
              </div>
              <div className='col-6 d-flex justify-content-between align-items-center'>
                <p>{x.itemType}</p>
              </div>
            </div>
          ),
        )}
      </div>
      <div className='text-center'>
        <button className='btn btn-primary px-5 mt-4' disabled={!isDirty} type='submit'>
          Save
        </button>
      </div>
    </form>
  );
};

export default FormItem;
