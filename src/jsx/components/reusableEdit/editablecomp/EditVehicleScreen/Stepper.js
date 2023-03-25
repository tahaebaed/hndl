import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import StepFour from './StepFour';
import StepOne from './StepOne';
import StepThree from './StepThree';
import StepTwo from './StepTwo';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { StepButton } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_VEHICLE, UPDATE_VEHICLE } from '../../../../../utilities/Apollo/Mutate';
import { toast } from 'react-toastify';
import {
  GET_VEHICLE,
  GET_GROUPS,
  GET_SERVICE_PROGRAMS,
} from '../../../../../utilities/Apollo/Querries';
import { DELETE_VEHICLE } from '../../../../../utilities/Apollo/Delete';

const StepperWrapper = ({ id, vehicleList, setOpenModal, refetchQuery, setlocalVehicleList,setModal,compData }) => {
  const [activeStep, setActiveStep] = useState(0);
  const toastId = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      //vehicle.specifications.dimensions.width
      vehicle: {
        currentOdometerReading: 0,
        maintenance: {
          serviceProgram: null,
        },
        specifications: {
          dimensions: {
            bedLength: 0,
            cargoVolume: 0,
            groundClearance: 0,
            height: 0,
            interiorVolume: 0,
            length: 0,
            passengerVolume: 0,
            width: 0,
          },
          engine: {
            aspiration: '',
            blockType: '',
            bore: 0,
            camType: '',
            compressionRatio: 0,
            engineBrand: '',
            fuelInduction: '',
            maxHP: 0,
            maxTorque: 0,
            numberOfCylinders: 0,
            numberOfValves: 0,
            redlineRPM: 0,
            stroke: 0,
            totalDisplacement: 0,
          },
          oils: {
            fuelConsumption: 0,
            fuelConsumptionCounterfeitRange: 0,
            fuelPrimaryTankCapacity: 0,
            fuelConsumptionSuspiciousRange: 0,
            fuelQuality: '',
            fuelType: '',
            fuelSecondaryTankCapacity: 0,
            oilCapacity: 0,
            oilType: '',
          },
          transmission: {
            numberOfGears: 0,
            transmissionBrand: '',
            transmissionType: '',
          },
          weights: {
            curbWeight: 0,
            grossVehicleWeight: 0,
            maxPayload: 0,
            towingCapacity: 0,
          },
          wheels: {
            brakeSystemType: '',
            driveType: '',
            frontTirePressure: 0,
            frontTireType: '',
            frontTrackWidth: 0,
            frontWheelDiameter: 0,
            rearAxle: 0,
            rearTirePressure: 0,
            rearTireType: '',
            rearTrackWidth: 0,
            rearWheelDiameter: 0,
            wheelBase: 0,
          },
        },
        details: {
          VIN: '',
          color: '#000',
          group: '',
          initialOdometerReading: 0,
          licensePlate: '',
          licenseRenewalDate: '',
          licenseRenewalOffice: '',
          make: '',
          model: '',
          name: '',
          photoUrl: '',
          status: '',
          type: '',
          year: '',
        },
        gps: {
          device: null,
          serialNumber: '',
          timeInterval: 0,
        },
      },
    },
  });
  const [filterGroup, setFilterGroup] = useState('');

  const {
    data: vehicle,
    loading,
    error,
  } = useQuery(GET_VEHICLE, {
    variables: {
      getVehicleId: id,
    },
    onCompleted: (data) => {
      setValue('updateVehicleId', id);
      setValue('vehicle.details.VIN', data.getVehicle.details.VIN);
      setValue('vehicle.details.assignStatus', data.getVehicle.details.assignStatus);
      setValue('vehicle.details.color', data.getVehicle.details.color);
      setValue('vehicle.details.group', data.getVehicle.details.group.name);
      setValue(
        'vehicle.details.initialOdometerReading',
        data.getVehicle.details.initialOdometerReading,
      );
      setValue(
        'vehicle.details.initialWorkingSeconds',
        data.getVehicle.details.initialWorkingSeconds,
      );
      setValue('vehicle.details.licensePlate', data.getVehicle.details.licensePlate);
      setValue(
        'vehicle.details.licenseRenewalDate',
        data.getVehicle.details.licenseRenewalDate.slice(0, 10),
      );
      setValue(
        'vehicle.details.licenseRenewalOffice',
        data.getVehicle.details.licenseRenewalOffice,
      );
      setValue('vehicle.details.make', data.getVehicle.details.make);
      setValue('vehicle.details.model', data.getVehicle.details.model);
      setValue('vehicle.details.name', data.getVehicle.details.name);
      setValue('vehicle.details.photoUrl', data.getVehicle.details.photoUrl);
      setValue('vehicle.details.status', data.getVehicle.details.status);
      setValue('vehicle.details.year', data.getVehicle.details.year);
      setValue('vehicle.details.type', data.getVehicle.details.type);
      setValue('vehicle.currentOdometerReading', data.getVehicle.details.currentOdometerReading);
      setValue('vehicle.gps.device');
    },
  });

  const {
    data: groupData,
    error: err,
    loading: load,
  } = useQuery(GET_GROUPS, {
    variables: {
      options: { showAll: true },
    },
  });

  const { data: serviceProgData } = useQuery(GET_SERVICE_PROGRAMS, {
    variables: {
      options: { showAll: true },
    },
  });

  const [updateVehicleData] = useMutation(UPDATE_VEHICLE, {
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
  const [deleteVehicleRow] = useMutation(DELETE_VEHICLE, {
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
  const onHandleSubmit = (values) => {
    if (!values.vehicle.gps.device) {
      delete values.vehicle.gps.device;
    }

    toastId.current = toast('updating ...', {
      autoClose: false,
    });

    let group = groupData.getGroups.data.find(
      (ele, i) => ele.name === values.vehicle.details.group,
    );
    updateVehicleData({
      variables: {
        updateVehicleId: id,
        vehicle: {
          ...values.vehicle,
          details: {
            ...values.vehicle.details,
            group: group._id || values.vehicle.details.group,
          },
        },
      },
      onCompleted: (data) => {
        toast.update(toastId.current, {
          render: `Vehicle has been updated`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });

        setModal(false);
      },
      onError: (error) => {
        toast.update(toastId.current, {
          render: `Something went wrong,${error.message}`,
          type: toast.TYPE.WARNING,
          autoClose: 3000,
        });
      },
      refetchQueries: [{ query: refetchQuery }],
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onHandleSubmit)}>
        <Stepper
          sx={{
            marginBottom: '2rem',
          }}
          nonLinear
          activeStep={activeStep}
        >
          {[
            { title: 'Details', label: 'Details' },
            { title: 'Maintenance', label: 'Maintenance' },
            {
              title: 'Specifications',
              label: 'Specifications',
            },
            { title: 'GPS', label: 'GPS' },
          ].map((step, index) => (
            <Step key={step.title}>
              <StepButton color='inherit' onClick={() => setActiveStep(index)}>
                {step.label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 && (
          <StepOne
            {...{
              activeStep,
              errors,
              setActiveStep,
              register,
              watch,
              control,
              setValue,
              setFilterGroup,
              groupData,
              required: true,
            }}
          />
        )}
        {activeStep === 1 && (
          <StepTwo
            {...{
              activeStep,
              errors,
              setActiveStep,
              register,
              serviceProgList: serviceProgData?.getServicePrograms?.data,
              watch,
              setValue,
              required: true,
            }}
          />
        )}
        {activeStep === 2 && (
          <StepThree {...{ activeStep, errors, setActiveStep, register, required: true }} />
        )}
        {activeStep === 3 && (
          <StepFour {...{ activeStep, setActiveStep, register, required: true, errors }} />
        )}
        <div className='col-12 d-flex justify-content-between'>
          <button
            className='btn btn-danger px-5'
            type='button'
            onClick={() => {
              toastId.current = toast('Deleting...', {
                autoClose: false,
              });
              deleteVehicleRow({
                variables: { deleteVehicleId: id },
                onCompleted: (data) => {
                  toast.update(toastId.current, {
                    render: `Vehicle has been deleted`,
                    type: toast.TYPE.SUCCESS,
                    autoClose: 3000,
                  });
                  const filter = compData.filter((v) => v._id !== data.deleteVehicle._id);
                  setlocalVehicleList(filter);
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
            Delete Vehicle
          </button>
          <button disabled={!isDirty} className='btn btn-primary px-5' type='submit'>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepperWrapper;
