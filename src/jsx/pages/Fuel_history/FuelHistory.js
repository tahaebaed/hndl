/**
 * @description
 *    this component for display the fule history data using multiple components
 *    AddButtons =>
 *    that take :
 *        - wrapperClassName: this to add custom class and styles to the container div
 *        - title: to add the title or label for the button
 *        - addButton: to add the title or label for the button
 *        - addMultiple: boolean state to display if there is multiple button to display
 *    ReusableTable :
 *        - data: what we fetched from the API using useQuery method @param GET_FULE_HISTORY as the query type to fetch the data
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
import { FUEL_HISTORY_COLUMNS, FULE_HISTORY_COLUMNS } from '../../components/table/FilteringTable/Columns';
import { GET_CONTACT, GET_FUEL_HISTORY, GET_VEHICLES } from '../../../utilities/Apollo/Querries';
import FormControl from '../Employees/employee_fromcontrol/FormControl';
import { useForm } from 'react-hook-form';
import '../Employees/employees.css';
import { CREATE_FUEL_HISTORY } from '../../../utilities/Apollo/Mutate';
import { toast } from 'react-toastify';
import Edit from '../../components/reusableEdit/Edit';
import EditFuelHistory from '../../components/reusableEdit/editablecomp/EditFuelHistory';
import Loader from '../../../utilities/Loader';

const FuelHistory = () => {
  const columns = useMemo(() => FUEL_HISTORY_COLUMNS, []);
  const intl = useIntl();
  const history = useHistory();
  const tableRef = useRef(null);
  const toastId = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [openVehicleModal, setOpenVehicleModal] = useState(false);
  const [ID, setID] = useState(false);
  const {
    data: fuleHistory,
    loading,
    error,
  } = useQuery(GET_FUEL_HISTORY, {
    variables: {
      options: { showAll: true },
    },
  });

  const { data: vehicle } = useQuery(GET_VEHICLES, {
    variables: {
      options: { showAll: true },
    },
  });

  const { data: contactData } = useQuery(GET_CONTACT, {
    variables: {
      options: {
        showAll: true,
      },
    },
  });

  useEffect(() => {
    if (!Cookies.get('token')) {
      history.push('/page-login');
    }
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    fuelHistory: {
      documentUrl: null,
      filledAmount: 0,
      fuelConsumptionRate: null,
      fuelCost: 0,
      fuelCostPerTraveledDistanceUnit: null,
      fuelTotalCost: 0,
      isTankFilled: null,
      odometerReading: 0,
      receiptDate: null,
      photoUrl: null,
      traveledDistance: null,
      vehicle: null,
      vendor: null,
    },
  });

  const [createFuel] = useMutation(CREATE_FUEL_HISTORY, {
    refetchQueries: [
      {
        query: GET_FUEL_HISTORY,
        variables: {
          options: {
            showAll: true,
          },
        },
      },
    ],
  });

  const handleFuel = (values) => {
    toastId.current = toast('Creating...', {
      autoClose: false,
    });
    createFuel({
      variables: values,
      onCompleted: () => {
        toast.update(toastId.current, {
          render: `Adding Fuel Entry to the list`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        setOpenModal(false);
      },
      onError: (error) => {
        toast.update(toastId.current, {
          render: `Something went wrong,${error}`,
          type: toast.TYPE.WARNING,
          autoClose: 3000,
        });
      },
    });
  };

  const onError = (error) => {
    throw ('error', error);
  };

  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p>error {error.message}</p>;
  }
  return (
    <>
      <div className='container'>
        <div className={`d-flex justify-content-between mb-5 print-table`}>
          <h1>{intl.messages.fuel_history}</h1>
          <div className={`d-flex col-md-7 col-lg-5 justify-content-end`}>
            <AddButtons
              col='col-7'
              addButton={intl.messages.add_fuel_history_button}
              setOpenModal={setOpenModal}
              openModal={openModal}
            >
              <form className='employees_form' onSubmit={handleSubmit(handleFuel)}>
                <FormControl
                  type='select'
                  label='Vehicle'
                  defaultOption='Select Vehicle'
                  required={true}
                  options={vehicle?.getVehicles?.data.map((vehicle) => ({
                    id: vehicle._id,
                    name: vehicle.details.name,
                  }))}
                  register={register('fuelHistory.vehicle', {
                    required: { value: true, message: 'vehicle is required' },
                  })}
                  error={errors?.fuelHistory?.vehicle?.message}
                />
                <FormControl
                  type='datetime'
                  label='Receipt Date'
                  required={true}
                  register={register('fuelHistory.receiptDate', {
                    required: { value: true, message: 'Receipt Date is required' },
                    valueAsDate: true,
                  })}
                  error={errors?.fuelHistory?.receiptDate?.message}
                />
                <FormControl
                  type='number'
                  label='Odometer Reading'
                  min={0}
                  register={register('fuelHistory.odometerReading', {
                    valueAsNumber: true,
                  })}
                  placeholder='add meter reading'
                />
                <FormControl
                  type='select'
                  label='Vendor'
                  required={true}
                  defaultOption='Select Vendor'
                  options={contactData?.getContacts?.data.map((contact) => ({
                    id: contact._id,
                    name: contact.name,
                  }))}
                  register={register('fuelHistory.vendor', {
                    required: { value: true, message: 'vendor is required' },
                  })}
                  error={errors?.fuelHistory?.vendor?.message}
                />
                <FormControl
                  min={0}
                  type='number'
                  required={true}
                  label='Filled Amount'
                  register={register('fuelHistory.filledAmount', {
                    required: { value: true, message: 'Filled Amount is required' },
                    valueAsNumber: true,
                    min: 0,
                  })}
                  placeholder='add filled amount'
                  error={errors?.fuelHistory?.filledAmount?.message}
                />
                <FormControl
                  type='radio'
                  label='Tank Filled'
                  watch={watch('fuelHistory.isTankFilled')}
                  setValue={setValue}
                  radios={[
                    {
                      label: 'Yes',
                      id: true,
                      name: 'filled',
                      cond: 'fuelHistory.isTankFilled',
                    },
                    {
                      label: 'No',
                      id: false,
                      name: 'filled',
                      cond: 'fuelHistory.isTankFilled',
                    },
                  ]}
                />
                <FormControl
                  type='number'
                  min={0}
                  required={true}
                  label='Fuel Cost'
                  register={register('fuelHistory.fuelCost', {
                    required: { value: true, message: 'Fuel Cost is required' },
                    valueAsNumber: true,
                  })}
                  placeholder='add fuel cost'
                  error={errors?.fuelHistory?.fuelCost?.message}
                />
                <FormControl
                  type='document'
                  label='Document'
                  register={register('fuelHistory.documentUrl')}
                />
                <FormControl
                  type='image'
                  label='Photo'
                  setValue={setValue}
                  setPhoto='fuelHistory.photoUrl'
                  register={register('fuelHistory.photoUrl')}
                />
                <div className='col-12 d-flex justify-content-end'>
                  <button className='btn btn-primary px-5' type='submit'>
                    Save Changes
                  </button>
                </div>
              </form>
            </AddButtons>
          </div>
        </div>
        <ReusableTable
          tableRef={tableRef}
          data={fuleHistory.getFuelHistories.data}
          columns={columns}
          setId={setID}
          setModal={setOpenVehicleModal}
          fileName={intl.messages.fuel_history}
          sheetName='fuel_history'
        />
      </div>

      <Edit buttonTitle='Edit Vehicle List' setModal={setOpenVehicleModal} modal={openVehicleModal}>
        <EditFuelHistory
          setModal={setOpenVehicleModal}
          compData={fuleHistory}
          refetchQuery={GET_FUEL_HISTORY}
          id={ID}
        />
      </Edit>
    </>
  );
};

export default FuelHistory;
