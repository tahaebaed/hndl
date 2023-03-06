/**
 * @description
 *    this component for display the warehouse data using multiple components
 *    AddButtons =>
 *    that take :
 *        - wrapperClassName: this to add custom class and styles to the container div
 *        - title: to add the title or label for the button
 *        - addButton: to add the title or label for the button
 *        - addMultiple: boolean state to display if there is multiple button to display
 *    ReusableTable :
 *        - data: what we fetched from the API using useQuery method @param GET_WAREHOUSE as the query type to fetch the data
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
import { WAREHOUSE_COLUMNS, WAREHOUSE_COLUMNS_MULTIPLE } from '../../components/table/FilteringTable/Columns';
import {
  GET_CONTACT,
  GET_MANUFACTURERS,
  GET_PART_TYPES,
  GET_WAREHOUSE,
} from '../../../utilities/Apollo/Querries';
import { useFieldArray, useForm } from 'react-hook-form';
import { CREATE_MULTIPLE_WAREHOUSE, CREATE_WARE_HOUSE } from '../../../utilities/Apollo/Mutate';
import FormControl from '../Employees/employee_fromcontrol/FormControl';
import '../Employees/employees.css';
import TableExcel from '../../components/importExportExcel/TableExcel';
import DownloadExcel from '../../components/importExportExcel/DownloadExcel';
import { toast } from 'react-toastify';
import Edit from '../../components/reusableEdit/Edit';
import EditWarehouse from '../../components/reusableEdit/editablecomp/EditWarehouse';
import Loader from '../../../utilities/Loader';

const Warehouse = () => {
  const columns = useMemo(() => WAREHOUSE_COLUMNS, []);
  const columnsMulti = useMemo(() => WAREHOUSE_COLUMNS_MULTIPLE, []);
  const intl = useIntl();
  const history = useHistory();
  const tableRef = useRef(null);
  const tableRefMulti = useRef(null);
  const toastId = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModall, setOpenModall] = useState(false);
  const [showPurchases, setShowPurchases] = useState(false);

  const [openVehicleModal, setOpenVehicleModal] = useState(false);
  const [ID, setID] = useState(false);

  useEffect(() => {
    if (!Cookies.get('token')) {
      history.push('/page-login');
    }
  }, []);

  const {
    data: warehouse,
    loading,
    error,
  } = useQuery(GET_WAREHOUSE, {
    variables: {
      options: { showAll: true },
    },
  });

  const { data: partsData } = useQuery(GET_PART_TYPES, {
    variables: {
      options: { showAll: true },
    },
  });

  const { data: ManuData } = useQuery(GET_MANUFACTURERS, {
    variables: {
      options: { showAll: true },
    },
  });

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm({
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

  const { data: contactData } = useQuery(GET_CONTACT, {
    variables: {
      options: {
        showAll: true,
      },
    },
  });

  const instructions = 'In Category choose one of the following ENUM (1- Fuel , 2- Service_Center, 3- Spare_Parts , 4- Tires 5- Others )'

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

  const [createWarehouse] = useMutation(CREATE_WARE_HOUSE, {
    refetchQueries: [
      {
        query: GET_WAREHOUSE,
        variables: {
          options: {
            showAll: true,
          },
        },
      },
    ],
  });



  const [AddWarehouses] = useMutation(CREATE_MULTIPLE_WAREHOUSE, {
    refetchQueries: [
      {
        query: GET_WAREHOUSE,
        variables: {
          options: {
            showAll: true,
          },
        },
      },
    ],
  });

  const [convertedData, setConvertedData] = useState()

  const convertExcelDataToNeededArray = (Arr) => {
    const CONVERTED = Arr.map((col) => ({
      name: col['Name'],
      manufacturer: col['Manufacturer'],
      itemNumber: col['Item Number'],
      category: col['Category'],
      partType: col['Part Type'],
    }));
    // setConvertedData(CONVERTED)
    AddWarehouses({
      variables: {
        warehouse: CONVERTED,
      },
    });
  };

  // const handelSubmitMultiple = () => {
  //   console.log('ssssss', convertedData);

  // }

  const handleWarehouse = (values) => {
    toastId.current = toast('Creating...', {
      autoClose: false,
    });
    let manu = ManuData?.getManufacturers?.data.find(
      (ele, i) => ele.name === values.warehouse.manufacturer,
    );
    createWarehouse({
      variables: {
        warehouse: {
          ...values.warehouse,
          manufacturer: manu._id || values.warehouse.manufacturer,
        },
      },
      onCompleted: () => {
        toast.update(toastId.current, {
          render: `Adding New part to the list`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        setOpenModal(false);
        reset();
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

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>error {error.message}</p>;
  }
  return (
    <>
      <div className=''>
        <div className={`d-flex justify-content-between mb-5 print-table`}>
          <h1>{intl.messages.warehouse}</h1>
          <div className={`d-flex col-md-7 col-lg-5 justify-content-between`}>
            <AddButtons
              col='col-5'
              addButton={intl.messages.add_warehouse_button}
              setOpenModal={setOpenModal}
              openModal={openModal}
            >
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
                  defaultOption='Select Part Types'
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
                    required: {
                      value: true,
                      message: 'Manufacturer is required',
                    },
                  })}
                  error={errors?.warehouse?.manufacturer?.message}
                />
                <FormControl
                  type='select'
                  label='Category'
                  required={true}
                  defaultOption='Select Category'
                  options={categories?.map((category) => ({
                    id: category.id,
                    name: category.value,
                  }))}
                  register={register('warehouse.category', {
                    required: {
                      value: true,
                      message: 'Category is required',
                    },
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
                <FormControl
                  type='document'
                  label='Document'
                  register={register('warehouse.documentUrl')}
                />
                <FormControl
                  type='image'
                  label='Photo'
                  setValue={setValue}
                  setPhoto='warehouse.photoUrl'
                  register={register('warehouse.photoUrl')}
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
                                  setValue(
                                    `warehouse.purchases.${i}.quantity`,
                                    parseInt(e.target.value),
                                  )
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
                              type='select'
                              label='Suppliers'
                              id='suppliers'
                              // placeholder='Please Select or Add Suppliers'
                              defaultOption='Select Suppliers'
                              // required={true}
                              options={contactData?.getContacts?.data.map((vendor) => ({
                                id: vendor._id,
                                name: vendor.name,
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
                                  setValue(
                                    `warehouse.purchases.${i}.unitCost`,
                                    parseInt(e.target.value),
                                  )
                                }
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
                <div className='col-12 d-flex justify-content-end'>
                  <button className='btn btn-primary px-5' type='submit'>
                    Save Changes
                  </button>
                </div>
              </form>
            </AddButtons>
            <AddButtons
              col='col-6'
              outLine={'btn-outline-primary'}
              addButton={intl.messages.add_multiple_button}
              setOpenModal={setOpenModall}
              openModal={openModall}
            >
              <DownloadExcel
                tableRefMulti={tableRefMulti}
                fileName={intl.messages.warehouses}
                instructions={instructions}
                convert={convertExcelDataToNeededArray}
                handelSubmitMultiple={handelSubmitMultiple}
                sheetName={intl.messages.warehouses}
              />
            </AddButtons>
          </div>
        </div>
        <TableExcel columns={columnsMulti} tableRefMulti={tableRefMulti} />
        <ReusableTable
          tableRef={tableRef}
          data={warehouse.getWarehouses.data}
          columns={columns}
          setModal={setOpenVehicleModal}
          setId={setID}
          fileName={intl.messages.warehouse}
          sheetName='warehouse'
        />

        <Edit
          buttonTitle='Edit Vehicle List'
          setModal={setOpenVehicleModal}
          modal={openVehicleModal}
        >
          <EditWarehouse
            setModal={setOpenVehicleModal}
            compData={warehouse}
            refetchQuery={GET_WAREHOUSE}
            id={ID}
          />
        </Edit>
      </div>
    </>
  );
};

export default Warehouse;
