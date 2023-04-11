/**
 * @description
 *    this component for display the service list data using multiple components
 *    AddButtons =>
 *    that take :
 *        - wrapperClassName: this to add custom class and styles to the container div
 *        - title: to add the title or label for the button
 *        - addButton: to add the title or label for the button
 *        - addMultiple: boolean state to display if there is multiple button to display
 *    ReusableTable :
 *        - data: what we fetched from the API using useQuery method @param GET_SERVICE_LIST as the query type to fetch the data
 *        - columns: the columns array to display and filter table columns data
 *        - fileName: passing the file name that will be exported/download as excel sheet
 *        - sheetName:  passing the sheet name that will be exported/download in the file
 *        - tableRef:  passing the useRef() element to watch on the table
 */

// packages imports
import Cookies from 'js-cookie';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

// local and components import
import AddButtons from '../../components/buttons/AddButtons';
import ReusableTable from '../../components/tableComponent/ReusableTable';
import { COLUMNS_SERVICE_LIST } from '../../components/table/FilteringTable/Columns';
import {
  GET_EMPLOYEE,
  GET_SERVICE_LIST,
  GET_VEHICLES,
  GET_WAREHOUSE,
} from '../../../utilities/Apollo/Querries';
import { useFieldArray, useForm } from 'react-hook-form';
import { CREATE_SERVICE } from '../../../utilities/Apollo/Mutate';
import { toast } from 'react-toastify';
import Service from './serviceItem/Service';
import Loader from '../../../utilities/Loader';

const ServiceList = () => {
  const columns = useMemo(() => COLUMNS_SERVICE_LIST, []);
  const [active, setActive] = useState(null);
  const [localServiceList, setLocalServiceList] = useState([]);

  const { loading, error, refetch } = useQuery(GET_SERVICE_LIST, {
    variables: {
      options: {
        showAll: true,
      },
    },
    onCompleted: (values) => {
      setLocalServiceList(values.getServices.data);
    },
  });

  const toastId = React.useRef(null);

  const { data: vehiclesList } = useQuery(GET_VEHICLES, {
    variables: {
      options: {
        showAll: true,
      },
    },
  })
  const { data: employeesList } = useQuery(GET_EMPLOYEE, {
    variables: {
      options: {
        showAll: true,
      },
    },
  })

  const {
    register,
    watch,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      service: {
        assignTo: '',
        photoUrl: '',
        vehicle: null,
        status: 'Open',
        endTimestamp: null,
        startTimestamp: new Date().toJSON().slice(0, 16),
        repairPriorityClass: 'Scheduled',
        task: null,
      },
    },
  });

  const { data: warehouse } = useQuery(GET_WAREHOUSE, {
    variables: {
    },
  });

  const [createService] = useMutation(CREATE_SERVICE, {
    refetchQueries: [
      {
        query: GET_SERVICE_LIST,
        variables: {
          options: {
            showAll: true,
          },
        },
      },
    ],
  });
  const [modal, setModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [ID, setID] = useState('');

  const onsubmit = (values) => {
    console.log(values);
    toastId.current = toast('Creating...', {
      autoClose: false,
    });

    createService({
      variables: values,
      onCompleted: (data) => {
        setLocalServiceList((prev) => [...prev, data.createService]);
        toast.update(toastId.current, {
          render: `service has been Created`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        reset();
        setCreateModal(false);
      },
      onError: (error) => {
        toast.update(toastId.current, {
          render: `Something went wrong ${error}`,
          type: toast.TYPE.ERROR,
          autoClose: 3000,
        });
      },
      refetchQueries: { include: 'active' },
    });
  };

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

  const intl = useIntl();
  const history = useHistory();

  const tableRef = useRef(null);

  useEffect(() => {
    if (!Cookies.get('token')) {
      history.push('/page-login');
    }
  }, []);
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p>error {error.message}</p>;
  }
  return (
    <>
      <div className='contianer'>
        <div className=''>
          <div className={`d-flex justify-content-between mb-5 print-table`}>
            <h1>{intl.messages.service_list}</h1>
            <div className={`d-flex col-md-7 col-lg-5 justify-content-end`}>
              <AddButtons
                openModal={createModal}
                setOpenModal={setCreateModal}
                addButton={intl.messages.add_service_button}
              >
                <form onSubmit={handleSubmit(onsubmit)}>
                  <label className='w-100'>
                    <h6>Vehicle*</h6>
                    <select
                      className='form-control'
                      defaultValue={''}
                      {...register('service.vehicle', {
                        required: {
                          value: true,
                          message: 'vehicle is required',
                        },
                      })}
                    >
                      <option value={''}>Please Choose</option>
                      {vehiclesList?.getVehicles.data.map((option, index) => (
                        <option key={index} value={option._id}>
                          {option.details.name}
                        </option>
                      ))}
                    </select>
                    <p className='text-danger'>{errors?.service?.vehicle?.message}</p>
                  </label>
                  <label className='w-100'>
                    <h6>Service Task*</h6>
                    <input
                      className='form-control'
                      type='text'
                      placeholder='enter you task name'
                      {...register('service.task', {
                        required: {
                          value: true,
                          message: 'task name is required',
                        },
                      })}
                    />
                    <p className='text-danger'>{errors?.service?.task?.message}</p>
                  </label>
                  <label className='w-100'>
                    <h6>Status*</h6>
                    <select
                      className='form-control'
                      {...register('service.status', {
                        required: {
                          value: true,
                          message: 'status is required',
                        },
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
                        required: {
                          value: true,
                          message: 'Priority is required',
                        },
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
                      {...register('service.startTimestamp', {
                        valueAsDate: true,
                      })}
                    />
                  </label>
                  <label className='col-6 p-0'>
                    <h6>End Date & Time</h6>
                    <input
                      className='form-control'
                      type='datetime-local'
                      {...register('service.endTimestamp', {
                        valueAsDate: true,
                      })}
                    />
                  </label>
                  <label className='w-100'>
                    <h6>Assigned To*</h6>
                    <select
                      className='form-control'
                      defaultValue={''}
                      {...register('service.assignTo', {
                        required: {
                          value: true,
                          message: 'Assigned is required',
                        },
                      })}
                    >
                      <option value={''}>Please Choose</option>

                      {employeesList?.getEmployees.data.map((option, index) => (
                        <option key={index} value={option._id}>
                          {option.firstName} {option.lastName}
                        </option>
                      ))}
                    </select>
                    <p className='text-danger'>{errors?.service?.assignTo?.message}</p>
                  </label>
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
                                    {...register(
                                      `service.receipt.warehouseItems.${index}.quantity`,
                                      {
                                        required: {
                                          value: true,
                                          message: 'quantity required',
                                        },
                                        valueAsNumber: true,
                                      },
                                    )}
                                  />
                                  <p className='text-danger'>
                                    {
                                      errors?.service?.receipt?.warehouseItems[index]?.quantity
                                        ?.message
                                    }
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
                          <input
                            className='form-control'
                            type='file'
                            {...register('service.photoUrl')}
                          />
                        </label>
                        <label className='col'>
                          <h6>Document</h6>
                          <input
                            className='form-control'
                            type='file'
                            {...register('service.photoUrl')}
                          />
                        </label>
                      </div>
                    </>
                  )}
                  <div className='d-flex justify-content-end'>
                    <button type='submit' className='btn btn-md btn-primary'>
                      save
                    </button>
                  </div>
                </form>
              </AddButtons>
            </div>
          </div>
        </div>

        <ul className='d-flex'>
          <li>
            <button
              type='button'
              className={`btn btn-text-dark ${active === null ? 'active' : ''}`}
              onClick={() => {
                setActive(null);
                refetch({
                  filter: {},
                });
              }}
            >
              {intl.messages.all_button}
            </button>
          </li>
          <li>
            <button
              type='button'
              className={`btn btn-text-dark ${active === 'Open' ? 'active' : ''}`}
              onClick={() => {
                setActive('Open');
                refetch({
                  filter: {
                    status: 'Open',
                  },
                });
              }}
            >
              Open
            </button>
          </li>
          <li>
            <button
              type='button'
              className={`btn btn-text-dark ${active === 'Overdue' ? 'active' : ''}`}
              onClick={() => {
                setActive('Overdue');
                refetch({
                  filter: {
                    status: 'Overdue',
                  },
                });
              }}
            >
              Overdue
            </button>
          </li>
        </ul>

        <ReusableTable
          tableRef={tableRef}
          data={localServiceList.filter((service) => service.status !== 'Completed')}
          setModal={setModal}
          setId={setID}
          columns={columns}
          fileName={intl.messages.service_list}
          sheetName='service list'
        />

        {ID && <Service
          id={ID}
          modal={modal}
          serviceList={localServiceList}
          setServiceList={setLocalServiceList}
          setModal={setModal}
        />}
      </div>
    </>
  );
};

export default ServiceList;
