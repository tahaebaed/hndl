import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useFieldArray, useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_WAREHOUSE } from '../../../../utilities/Apollo/Mutate';
import SelectInput from '../../../pages/Inspection/add_inspection/SelectInput';
import {
  GET_CONTACT,
  GET_GROUPS,
  GET_MANUFACTURERS,
  GET_PART_TYPES,
  GET_SINGLE_CONTACT,
  GET_SINGLE_EMPLOYEE,
  GET_SINGLE_INSPECTION,
  GET_SINGLE_WAREHOUSE,
} from '../../../../utilities/Apollo/Querries';
import FormControl from '../../../pages/Employees/employee_fromcontrol/FormControl';
import ModalFormControl from '../../modalsWrapper/ModalFormControl';
import { DELETE_WAREHOUSE } from '../../../../utilities/Apollo/Delete';

const EditWarehouse = ({ id, setModal, compData, refetchQuery }) => {
  const intl = useIntl();
  const toastId = useRef(null);
  const [checked, setChecked] = useState(false);

  const [showPurchases, setShowPurchases] = useState(false);
  const [imgData, setImgData] = useState();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    control,
    formState: { errors, isDirty },
  } = useForm({
    updateContactId: null,
    warehouse: {
      category: null,
      description: null,
      documentUrl: null,
      itemNumber: null,
      manufacturer: null,
      name: null,
      partType: null,
      photoUrl: null,
      purchases: [
        {
          quantity: null,
          unitCost: null,
          vendor: null,
        },
      ],
    },
  });

  const classificationsArr = [
    { id: 'Fleet_Manager', value: 'Fleet Manager' },
    { id: 'Fleet_Supervisor', value: 'Fleet Supervisor' },
    { id: 'Warehouse_Supervisor', value: 'Warehouse Supervisor' },
    { id: 'Operator', value: 'Operator' },
  ];

  const {
    data: service,
    loading,
    error,
  } = useQuery(GET_SINGLE_WAREHOUSE, {
    variables: {
      getWarehouseId: id,
    },
    onCompleted: (data) => {
      console.log(data);
      setValue('updateWarehouseId', id);
      setValue('warehouse.name', data.getWarehouse.name);
      setValue('warehouse.itemNumber', data.getWarehouse.itemNumber);
      setValue('warehouse.category', data.getWarehouse.category);
      setValue('warehouse.partType', data.getWarehouse.partType._id);
      setValue('warehouse.manufacturer', data.getWarehouse.manufacturer.name);
      setValue('warehouse.purchases', data.getWarehouse.purchases);
      setValue('warehouse.description', data.getWarehouse.description);
      setValue('warehouse.photoUrl', data.getWarehouse.photoUrl);
      setImgData(data.getWarehouse.photoUrl)
      setValue('warehouse.documentUrl', data.getWarehouse.documentUrl);
    },
  });
  const [deleteWarehouseRow] = useMutation(DELETE_WAREHOUSE, {
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

  const [updateWarehouseData] = useMutation(UPDATE_WAREHOUSE, {
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

  const {
    data: groupData,
    error: err,
    loading: load,
  } = useQuery(GET_GROUPS, {
    variables: {
      options: {
        showAll: null,
      },
    },
  });
  const {
    data: contactData,
    loading: loadContect,
    error: errContect,
  } = useQuery(GET_CONTACT, {
    variables: {
      options: {
        showAll: null,
      },
    },
  });

  const {
    data: partsData,
    loading: loadPart,
    error: errPart,
  } = useQuery(GET_PART_TYPES, {
    variables: {
      options: { showAll: true },
    },
  });

  const {
    data: ManuData,
    loading: loadManu,
    error: errManu,
  } = useQuery(GET_MANUFACTURERS, {
    variables: {
      options: { showAll: true },
    },
  });
  const classification = [
    { firstName: 'Fuel' },
    { firstName: 'Service_Center' },
    { firstName: 'Spare_Parts' },
    { firstName: 'Tires' },
    { firstName: 'Others' },
  ];
  const handleWarehouse = (values) => {
    toastId.current = toast('updating ...', {
      autoClose: false,
    });
    let manu = ManuData?.getManufacturers?.data.find(
      (ele, i) => ele.name === values.warehouse.manufacturer,
    );
    updateWarehouseData({
      // variables: values,
      variables: {
        ...values,
        warehouse: {
          ...values.warehouse,
          manufacturer: manu._id || values.warehouse.manufacturer,
        },
      },
      onCompleted: (data) => {
        toast.update(toastId.current, {
          render: `Warehouse has been updated`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        setModal(false);
      },
      onError: (error) => {
        toast.update(toastId.current, {
          render: `Something went wrong, ${error.message}`,
          type: toast.TYPE.ERROR,
          autoClose: 3000,
        });
      },
    });
  };
  console.log(watch());

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'warehouse.purchases',
  });

  const categories = [
    { id: 'Fuel', value: 'Fuel' },
    { id: 'Service_Center', value: 'Service Center' },
    { id: 'Spare_Parts', value: 'Spare Parts' },
    { id: 'Tires', value: 'Tires' },
    { id: 'Others', value: 'Others' },
  ];
  return (
    <form className='employees_form' onSubmit={handleSubmit(handleWarehouse)}>
      <FormControl
        type='text'
        label='Part Name'
        required={true}
        register={register('warehouse.name', {
          required: { value: true, message: 'Name is required' },
        })}
        placeholder='enter name'
        error={errors?.warehouse?.name?.message}
      />
      <FormControl
        type='select'
        label='Part Types'
        required={true}
        options={partsData?.getPartTypes?.data.map((part) => ({
          id: part._id,
          name: part.name,
        }))}
        register={register('warehouse.partType', {
          required: { value: true, message: 'Part Type is required' },
        })}
        error={errors?.warehouse?.partType?.message}
      />
      <FormControl
        type='text'
        label='Item Number'
        required={true}
        register={register('warehouse.itemNumber', {
          required: {
            value: true,
            message: 'Item Number is required',
          },
        })}
        placeholder='enter item Number'
        error={errors?.warehouse?.itemNumber?.message}
      />
      <FormControl
        type='datalist'
        label='Manufacturers'
        id='manufacturers'
        placeholder='Please Select or Add new Manufacturers'
        required={true}
        options={ManuData?.getManufacturers?.data.map((manufactures) => ({
          id: manufactures._id,
          name: manufactures.name,
        }))}
        register={register('warehouse.manufacturer', {
          required: { value: true, message: 'Manufacturer is required' },
        })}
        error={errors?.warehouse?.manufacturer?.message}
      />
      <FormControl
        type='select'
        label='Category'
        required={true}
        options={categories?.map((category) => ({
          id: category.id,
          name: category.value,
        }))}
        register={register('warehouse.category', {
          required: { value: true, message: 'Category is required' },
        })}
        error={errors?.warehouse?.category?.message}
      />
      {/* <FormControl
                  type="select"
                  label="Suppliers"
                  required={true}
                  defaultOption="Select Suppliers"
                  options={contactData?.getContacts?.data.map((contact) => ({
                    id: contact._id,
                    name: contact.name,
                  }))}
                  register={register("warehouse.vendor", {
                    required: true,
                  })}
                /> */}
      <label className='employee_form_inp'>
        <h6>Description</h6>
        <textarea
          className='form-control'
          rows='1'
          register={register('warehouse.description')}
        ></textarea>
      </label>

      <div className='employee_form_inp'>
        <FormControl
          type='image'
          label='Photo'
          setValue={setValue}
          setPhoto='warehouse.photoUrl'
          register={register('warehouse.photoUrl')}
        />
        <div className='employee_form_inp'>
          <img className='w-100' src={imgData} />
        </div>
      </div>
      <FormControl
        type='document'
        label='Document'
        setValue={setValue}
        setPhoto='warehouse.documentUrl'
        register={register('warehouse.documentUrl')}
      />
      <div>
        <button
          className='btn btn-primary'
          type='button'
          onClick={() => {
            setShowPurchases(!showPurchases);
          }}
        >
          Add Purchases
        </button>
      </div>
      {showPurchases ? (
        <div>
          <div className='text-center col-12'>
            <button
              type='button'
              className='btn btn-success'
              onClick={() => {
                append({ quantity: '', unitCost: '', vendor: '' });
              }}
            >
              Add Form
            </button>
          </div>
          {fields.map((x, i) => (
            <div className='d-flex justify-content-between pt-2' key={i}>
              <div className='col-12 d-flex'>
                <div className='d-flex align-items-center col-1'>
                  <i
                    className='flaticon-381-trash-1 bin'
                    onClick={() => {
                      remove(i);
                    }}
                  />
                </div>
                <div className='d-flex'>
                  <label className='employee_form_inp col-3'>
                    <h6>Quantity</h6>
                    <input
                      className='form-control'
                      min={0}
                      type='number'
                      onChange={(e) =>
                        setValue(`warehouse.purchases.${i}.quantity`, parseInt(e.target.value))
                      }
                    />
                  </label>
                  {/* <label className="employee_form_inp">
                              <h6>vendor</h6>
                              <input
                                className="form-control"
                                type="text"
                                onChange={(e) =>

                                  setValue(
                                    `warehouse.purchases.${i}.vendor`,
                                    parseInt(e.target.value)
                                  )
                                }
                              />
                              <datalist id='suppliers' aria-label="Default select example">
                                {contactData?.getContacts?.data.map((option) => (
                                  <option value={option._id} key={option._id}>
                                    {console.log(option)}
                                    {option.name}
                                  </option>
                                ))}
                              </datalist>
                            </label> */}
                  <FormControl
                    type='datalist'
                    label='Suppliers'
                    id='suppliers'
                    placeholder='Please Select or Add Suppliers'
                    required={true}
                    options={contactData?.getContacts?.data.map((manufactures) => ({
                      id: manufactures._id,
                      name: manufactures.name,
                    }))}
                    register={register(`warehouse.purchases.${i}.vendor`, {
                      required: true,
                    })}
                  />
                  {/* <FormControl
                              type="datalist"
                              label="Suppliers"
                              id="suppliers"
                              placeholder="Please Select or Add a Supply"
                              required={true}
                              options={contactData?.getContacts?.data.map(
                                (supply) => ({
                                  id: supply._id,
                                  name: supply.name,
                                })
                              )} /> */}
                  <label className='employee_form_inp col-3'>
                    <h6>unitCost</h6>
                    <input
                      className='form-control'
                      min={0}
                      type='number'
                      onChange={(e) =>
                        setValue(`warehouse.purchases.${i}.unitCost`, parseInt(e.target.value))
                      }
                    />
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      <div className='col-12 d-flex justify-content-between'>
        <button
          className='btn btn-danger px-5'
          type='button'
          onClick={() => {
            toastId.current = toast('updating ...', {
              autoClose: false,
            });
            deleteWarehouseRow({
              variables: { deleteWarehouseId: id },
              onCompleted: (data) => {
                toast.update(toastId.current, {
                  render: `Warehouse has been deleted`,
                  type: toast.TYPE.SUCCESS,
                  autoClose: 3000,
                });

                setModal(false);
              },
              onError: (_) => {
                toast.update(toastId.current, {
                  render: `Something went wrong`,
                  type: toast.TYPE.ERROR,
                  autoClose: 3000,
                });
              },
            });
          }}
        >
          Delete Warehouse
        </button>
        <button className='btn btn-primary px-5' type='submit'>
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditWarehouse;
