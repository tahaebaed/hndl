import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_FUEL_HISTORY } from '../../../../utilities/Apollo/Mutate';
import SelectInput from '../../../pages/Inspection/add_inspection/SelectInput';
import {
  GET_CONTACT,
  GET_GROUPS,
  GET_SINGLE_CONTACT,
  GET_SINGLE_EMPLOYEE,
  GET_SINGLE_FUEL_HISTORY,
  GET_SINGLE_INSPECTION,
  GET_SINGLE_WAREHOUSE,
  GET_VEHICLES,
} from '../../../../utilities/Apollo/Querries';
import FormControl from '../../../pages/Employees/employee_fromcontrol/FormControl';
import ModalFormControl from '../../modalsWrapper/ModalFormControl';
import { DELETE_FUEL_HISTORY } from '../../../../utilities/Apollo/Delete';

const EditFuelHistory = ({ id, setModal, compData, refetchQuery }) => {
  const intl = useIntl();
  const toastId = useRef(null);
  const [checked, setChecked] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    updateFuelHistoryId: null,
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

  const classificationsArr = [
    { id: 'Fleet_Manager', value: 'Fleet Manager' },
    { id: 'Fleet_Supervisor', value: 'Fleet Supervisor' },
    { id: 'Warehouse_Supervisor', value: 'Warehouse Supervisor' },
    { id: 'Operator', value: 'Operator' },
  ];

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
    data: Fhistory,
    loading,
    error,
  } = useQuery(GET_SINGLE_FUEL_HISTORY, {
    variables: {
      getFuelHistoryId: id,
    },
    onCompleted: (data) => {
      setValue('updateFuelHistoryId', id);
      setValue('fuelHistory.vehicle', data.getFuelHistory.vehicle._id);
      setValue('fuelHistory.vendor', data.getFuelHistory.vendor._id);
      setValue('fuelHistory.filledAmount', data.getFuelHistory.filledAmount);

      setValue(
        'fuelHistory.fuelCostPerTraveledDistanceUnit',
        data.getFuelHistory.fuelCostPerTraveledDistanceUnit,
      );
      setValue('fuelHistory.odometerReading', data.getFuelHistory.odometerReading);
      setValue('fuelHistory.traveledDistance', data.getFuelHistory.traveledDistance);
      setValue('fuelHistory.fuelConsumptionRate', data.getFuelHistory.fuelConsumptionRate);
      setValue('fuelHistory.fuelConsumptionStatus', data.getFuelHistory.fuelConsumptionStatus);
      setValue('fuelHistory.photoUrl', data.getFuelHistory.photoUrl);
      setValue('fuelHistory.documentUrl', data.getFuelHistory.documentUrl);
      setValue('fuelHistory.fuelTotalCost', data.getFuelHistory.fuelTotalCost);
      setValue('fuelHistory.fuelCost', data.getFuelHistory.fuelCost);
      setValue('fuelHistory.receiptDate', data.getFuelHistory.receiptDate.slice(0, 16));
      setValue('fuelHistory.filledAmount', data.getFuelHistory.filledAmount);
      setValue('fuelHistory.isTankFilled', data.getFuelHistory.isTankFilled);
    },
  });

  const [deleteFuelHistoryRow] = useMutation(DELETE_FUEL_HISTORY, {
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

  const [updateFuelHistoryData] = useMutation(UPDATE_FUEL_HISTORY, {
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
    data: vehicle,
    loading: loadVehicle,
    error: errVehicle,
  } = useQuery(GET_VEHICLES, {
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
  const handleFuel = (values) => {
    toastId.current = toast('updating ...', {
      autoClose: false,
    });
    updateFuelHistoryData({
      variables: values,
      onCompleted: (data) => {
        toast.update(toastId.current, {
          render: `Fuel History has been updated`,
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
  return (
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
          required: true,
        })}
      />
      <FormControl
        type='datetime'
        label='Receipt Date'
        required={true}
        register={register('fuelHistory.receiptDate', {
          required: true,
        })}
      />
      <FormControl
        type='number'
        label='Odometer Reading'
        min={0}
        register={register('fuelHistory.odometerReading', {
          valueAsNumber: true,
        })}
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
          required: true,
        })}
      />
      <FormControl
        min={0}
        type='number'
        required={true}
        label='Filled Amount'
        register={register('fuelHistory.filledAmount', {
          valueAsNumber: true,
        })}
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
          required: { value: true, message: 'fuel cost is required' },
          valueAsNumber: true,
        })}
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
      <div className='col-12 d-flex justify-content-between'>
        <button
          className='btn btn-danger px-5'
          type='button'
          onClick={() => {
            toastId.current = toast('updating ...', {
              autoClose: false,
            });
            deleteFuelHistoryRow({
              variables: { deleteFuelHistoryId: id },
              onCompleted: (data) => {
                toast.update(toastId.current, {
                  render: `Fuel History has been deleted`,
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
          }}
        >
          Delete Fuel
        </button>
        <button className='btn btn-primary px-5' type='submit'>
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditFuelHistory;
