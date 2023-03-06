import { useMutation, useQuery } from '@apollo/client';
import React, { useRef, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { DELETE_SERVICE, UPDATE_SERVICE } from '../../../../utilities/Apollo/Mutate';
import { GET_EMPLOYEE, GET_SERVICE, GET_WAREHOUSE } from '../../../../utilities/Apollo/Querries';
import Loader from '../../../../utilities/Loader';
import ReusableModal from '../../../components/modalComponent/ReusableModal';

const Service = ({ id, modal, setModal, serviceList, setServiceList }) => {
  const toastId = useRef(null);
  const { loading, error } = useQuery(GET_SERVICE, {
    variables: {
      getServiceId: id,
    },
    onCompleted: (data) => {
      setValue('service.assignTo', data.getService.assignTo._id);
      setValue('service.vehicle', data.getService.vehicle._id);
      setValue('service.status', data.getService.status);
      setValue(
        'service.endTimestamp',
        data?.getService.endTimestamp && data?.getService.endTimestamp.slice(0, 16),
      );
      setValue(
        'service.startTimestamp',
        data?.getService.startTimestamp && data?.getService.startTimestamp.slice(0, 16),
      );
      setValue('service.repairPriorityClass', data?.getService.repairPriorityClass);
      setValue('service.task', data.getService.task);
    },
  });

  const [deleteService] = useMutation(DELETE_SERVICE);

  const { data: employeesList } = useQuery(GET_EMPLOYEE);

  const [updateService] = useMutation(UPDATE_SERVICE, {});

  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      service: {
        assignTo: null,
        comment: null,
        documentUrl: null,
        endTimestamp: null,
        photoUrl: null,
        receipt: {},
        repairPriorityClass: null,
        startTimestamp: new Date().toJSON().slice(0, 16),
        status: null,
        task: null,
        vehicle: null,
      },
    },
  });

  const [itemRecipe, setItemRecipe] = useState('');

  const {
    fields: warehouseItems,
    append: appendWarehouse,
    remove: removeWarehouse,
  } = useFieldArray({
    control,
    name: 'service.receipt.warehouseItems',
  });
  const {
    fields: otherItems,
    append: appendOtherItems,
    remove: removeOtherItems,
  } = useFieldArray({
    control,
    name: 'service.receipt.otherItems',
  });
  const onSubmit = (values) => {
    toastId.current = toast('Updating...', {
      autoClose: false,
    });
    updateService({
      variables: {
        updateServiceId: id,
        service: values.service,
      },
      onCompleted: (value) => {
        toastId.current = toast.update(toastId.current, {
          render: `program ${value.updateService.name} has been updated`,
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
  const { data: warehouse } = useQuery(GET_WAREHOUSE, {
    variables: {
      options: { showAll: true },
    },
  });

  // const [openModal, setOpenModal] = useState(false)

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <ReusableModal openModal={modal} setOpenModal={setModal} buttontitle='Edit Service List'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className='w-100'>
            <h6>Service Task*</h6>
            <input
              className='form-control'
              type='text'
              placeholder='enter you task name'
              {...register('service.task', {
                required: { value: true, message: 'task name is required' },
              })}
            />
            <p className='text-danger'>{errors?.service?.task?.message}</p>
          </label>
          <label className='w-100'>
            <h6>Status*</h6>
            <select
              className='form-control'
              {...register('service.status', {
                required: { value: true, message: 'task status is required' },
              })}
            >
              {[
                { id: 1, label: 'Open' },
                { id: 2, label: 'Overdue' },
                { id: 3, label: 'Completed' },
              ].map((option, index) => (
                <option key={index} value={option.label}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className='text-danger'>{errors?.service?.status?.message}</p>
          </label>
          <label className='w-100'>
            <h6>Repair Priority Class</h6>

            <select
              className='form-control'
              {...register('service.repairPriorityClass', {
                required: { value: true, message: 'task Priority is required' },
              })}
            >
              {[
                { id: 'Scheduled', label: 'Scheduled' },
                { id: 'Non_Scheduled', label: 'Non Scheduled' },
                { id: 'Emergency', label: 'Emergency' },
              ].map((option, index) => (
                <option key={index} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className='text-danger'>{errors?.service?.repairPriorityClass?.message}</p>
          </label>
          <label className='col-6 p-0 pr-2'>
            <h6>Start Date & Time</h6>
            <input
              className='form-control'
              type='datetime-local'
              {...register('service.startTimestamp', { valueAsDate: true })}
            />
          </label>
          <label className='col-6 p-0'>
            <h6>End Date & Time</h6>
            <input
              className='form-control'
              type='datetime-local'
              {...register('service.endTimestamp', { valueAsDate: true })}
            />
          </label>
          <label className='w-100'>
            <h6>Assigned To*</h6>
            <select
              className='form-control'
              {...register('service.assignTo', {
                required: {
                  value: true,
                  message: 'task Assigned to is required',
                },
              })}
            >
              {employeesList?.getEmployees.data.map((option, index) => (
                <option key={index} value={option._id}>
                  {option.firstName} {option.lastName}
                </option>
              ))}
            </select>
            <p className='text-danger'>{errors?.service?.assignTo?.message}</p>

            <p className='mt-3'>
              Note: if you set the status to Completed will show other inputs to fill
            </p>

            {watch('service.status') === 'Completed' && (
              <>
                <div className='row d-flex align-items-center justify-content-between'>
                  <label className='col-4'>
                    vendor
                    <select
                      className='form-control'
                      defaultValue=''
                      onChange={(e) => {
                        setItemRecipe(e.target.value);
                      }}
                    >
                      <option value='' disabled>
                        Select Vendor
                      </option>
                      <option value='Outside'>Outside</option>
                      <option value='Warehouse'>Warehouse</option>
                    </select>
                  </label>
                  <div className='col-4 d-flex align-items-center justify-content-end'>
                    <button
                      type='button'
                      className=' btn btn-info'
                      onClick={() => {
                        itemRecipe === 'Warehouse' &&
                          appendWarehouse({
                            item: null,
                            quantity: 0,
                          });
                        itemRecipe === 'Outside' &&
                          appendOtherItems({
                            description: null,
                            item: null,
                            quantity: null,
                            unitCost: null,
                            vendor: null,
                          });
                      }}
                    >
                      add receipt
                    </button>
                  </div>
                </div>
                {warehouseItems.length > 0 && (
                  <div>
                    <h5>Warehouse</h5>
                    <div className='row ml-2'>
                      {warehouseItems.map((recipe, index) => (
                        <div key={index} className='row ml-2 '>
                          <div className='d-flex align-items-center justify-content-center mt-2 mr-2'>
                            <button
                              type='button'
                              className='btn btn-outline-success'
                              onClick={() =>
                                appendWarehouse({
                                  item: null,
                                  quantity: null,
                                })
                              }
                            >
                              +
                            </button>
                          </div>
                          <label className='col-4 p-0 mr-3'>
                            <h6>Item</h6>
                            <select
                              defaultValue=''
                              className='form-control'
                              {...register(`service.receipt.warehouseItems.${index}.item`, {
                                required: {
                                  value: true,
                                  message: 'choose item',
                                },
                              })}
                            >
                              <option value='' disabled>
                                select item
                              </option>
                              {warehouse.getWarehouses.data.map((item) => (
                                <option key={item._id} value={item._id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                            <p className='text-danger'>
                              {errors?.service?.receipt?.warehouseItems[index]?.item?.message}
                            </p>
                          </label>
                          <label className='col-4 p-0 me-3'>
                            <h6>Quantity</h6>
                            <input
                              className='form-control'
                              type='number'
                              {...register(`service.receipt.warehouseItems.${index}.quantity`, {
                                required: {
                                  value: true,
                                  message: 'quantity required',
                                },
                                valueAsNumber: true,
                              })}
                            />
                            <p className='text-danger'>
                              {errors?.service?.receipt?.warehouseItems[index]?.quantity?.message}
                            </p>
                          </label>
                          <div className='d-flex align-items-center justify-content-center mt-2 mx-2'>
                            <button
                              type='button'
                              className='btn btn-outline-danger'
                              onClick={() => removeWarehouse(index)}
                            >
                              X
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {otherItems.length > 0 && (
                  <div>
                    <h5>Outside Vendor</h5>
                    <div className='row ml-2'>
                      {otherItems.map((recipe, index) => (
                        <div key={index} className='row ml-2 '>
                          <div className='d-flex align-items-center justify-content-center mt-2 mr-2'>
                            <button
                              type='button'
                              className='btn btn-outline-success'
                              onClick={() =>
                                appendOtherItems({
                                  description: null,
                                  item: null,
                                  quantity: null,
                                  unitCost: null,
                                  vendor: null,
                                })
                              }
                            >
                              +
                            </button>
                          </div>
                          <label className='col-2 p-0 mr-3'>
                            <h6>vendor</h6>
                            <input
                              className='form-control'
                              type='text'
                              {...register(`service.receipt.otherItems.${index}.vendor`, {
                                required: {
                                  value: true,
                                  message: 'vendor is required',
                                },
                              })}
                            />
                            <p className='text-danger'>
                              {errors?.service?.receipt?.otherItems[index]?.vendor?.message}
                            </p>
                          </label>
                          <label className='col-1 p-0 mr-3'>
                            <h6>Item</h6>
                            <input
                              className='form-control'
                              type='text'
                              {...register(`service.receipt.otherItems.${index}.item`, {
                                required: {
                                  value: true,
                                  message: 'item is required',
                                },
                              })}
                            />
                            <p className='text-danger'>
                              {errors?.service?.receipt?.otherItems[index]?.item?.message}
                            </p>
                          </label>
                          <label className='col-2 p-0 mr-3'>
                            <h6>Description</h6>
                            <input
                              className='form-control'
                              type='text'
                              {...register(`service.receipt.otherItems.${index}.description`)}
                            />
                          </label>
                          <label className='col-1 p-0 mr-3'>
                            <h6> unit cost</h6>
                            <input
                              className='form-control'
                              type='number'
                              {...register(`service.receipt.otherItems.${index}.unitCost`, {
                                valueAsNumber: true,
                                required: {
                                  value: true,
                                  message: 'item cost is required',
                                },
                              })}
                            />
                            <p className='text-danger'>
                              {errors?.service?.receipt?.otherItems[index]?.unitCost?.message}
                            </p>
                          </label>
                          <label className='col-1 p-0 mr-3'>
                            <h6>Quantity</h6>
                            <input
                              className='form-control'
                              type='number'
                              {...register(`service.receipt.otherItems.${index}.quantity`, {
                                valueAsNumber: true,
                                required: {
                                  value: true,
                                  message: 'item quantity is required',
                                },
                              })}
                            />
                            <p className='text-danger'>
                              {errors?.service?.receipt?.otherItems[index]?.quantity?.message}
                            </p>
                          </label>
                          <div className='d-flex align-items-center justify-content-center col-2 mt-2 mr-2'>
                            <p>
                              total:{' '}
                              {+watch(`service.receipt.otherItems.${index}.quantity`) *
                                +watch(`service.receipt.otherItems.${index}.unitCost`) || 0}
                            </p>
                          </div>
                          <div className='d-flex align-items-center justify-content-center mt-2 mr-2'>
                            <button
                              type='button'
                              className='btn btn-outline-danger'
                              onClick={() => removeOtherItems(index)}
                            >
                              X
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <label className='w-100'>
                  <h6>Comment</h6>
                  <textarea
                    className='form-control'
                    placeholder='add comment'
                    {...register('service.comment')}
                  />
                </label>
                <div className='row'>
                  <label className='col'>
                    <h6>Photo</h6>
                    <input className='form-control' type='file' {...register('service.photoUrl')} />
                  </label>
                  <label className='col'>
                    <h6>Document</h6>
                    <input className='form-control' type='file' {...register('service.photoUrl')} />
                  </label>
                </div>
              </>
            )}
          </label>
          <div className='d-flex justify-content-end'>
            <button
              type='button'
              onClick={() => {
                toast.current = toast('Deleting', {
                  autoClose: false,
                });
                deleteService({
                  variables: {
                    deleteServiceId: id,
                  },
                  onCompleted: (value) => {
                    toast.update(toastId.current, {
                      render: `service has been Deleted`,
                      type: toast.TYPE.SUCCESS,
                      autoClose: 3000,
                    });
                    setServiceList(
                      serviceList.filter((serve) => serve._id !== value.deleteService._id),
                    );
                    setModal(false);
                  },
                  onError: (_) => {
                    toast.update(toastId.current, {
                      render: `Something went wrong`,
                      type: toast.TYPE.WARNING,
                      autoClose: 3000,
                    });
                  },
                  refetchQueries: [{ include: ['active'] }],
                });
              }}
              className='btn btn-md btn-outline-danger mr-3'
            >
              Delete
            </button>
            <button type='submit' className='btn btn-md btn-primary'>
              Update
            </button>
          </div>
        </form>
      </ReusableModal>
    </>
  );
};

export default Service;
