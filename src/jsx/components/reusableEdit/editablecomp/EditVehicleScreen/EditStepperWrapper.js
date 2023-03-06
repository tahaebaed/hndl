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

const EditStepperWrapper = ({
  id,
  vehicleList,
  setOpenModal,
  refetchQuery,
  setModal,
  setlocalVehicleList,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [checked, setChecked] = useState(false);
  const toastId = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors, isDirty },
  } = useForm({
    updateVehicleId: null,
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
      // Details
      setValue('vehicle.currentOdometerReading', data.getVehicle.currentOdometerReading);
      setValue('vehicle.details.VIN', data?.getVehicle?.details?.VIN);
      setValue('vehicle.details.assignStatus', data?.getVehicle?.details?.assignStatus);
      setValue('vehicle.details.color', data?.getVehicle?.details?.color);
      setValue('vehicle.details.group', data?.getVehicle?.details?.group.name);
      setValue(
        'vehicle.details.initialOdometerReading',
        data?.getVehicle?.details?.initialOdometerReading,
      );
      setValue(
        'vehicle.details.initialWorkingSeconds',
        data?.getVehicle?.details?.initialWorkingSeconds,
      );
      setValue('vehicle.details.licensePlate', data?.getVehicle?.details?.licensePlate);
      setValue(
        'vehicle.details.licenseRenewalDate',
        data?.getVehicle?.details?.licenseRenewalDate.slice(0, 10),
      );
      setValue(
        'vehicle.details.licenseRenewalOffice',
        data?.getVehicle?.details?.licenseRenewalOffice,
      );
      setValue('vehicle.details.make', data?.getVehicle?.details?.make);
      setValue('vehicle.details.model', data?.getVehicle?.details?.model);
      setValue('vehicle.details.name', data?.getVehicle?.details?.name);
      setValue('vehicle.details.photoUrl', data?.getVehicle?.details?.photoUrl);
      setValue('vehicle.details.status', data?.getVehicle?.details?.status);
      setValue('vehicle.details.year', data?.getVehicle?.details?.year);
      setValue('vehicle.details.type', data?.getVehicle?.details?.type);

      // Specification
      // Dimension
      setValue(
        'vehicle.specifications.dimensions.cargoVolume',
        data?.getVehicle?.specifications?.dimensions?.cargoVolume,
      );
      setValue(
        'vehicle.specifications.dimensions.bedLength',
        data?.getVehicle?.specifications?.dimensions?.bedLength,
      );
      setValue(
        'vehicle.specifications.dimensions.groundClearance',
        data?.getVehicle?.specifications?.dimensions?.groundClearance,
      );
      setValue(
        'vehicle.specifications.dimensions.height',
        data?.getVehicle?.specifications?.dimensions?.height,
      );
      setValue(
        'vehicle.specifications.dimensions.interiorVolume',
        data?.getVehicle?.specifications?.dimensions?.interiorVolume,
      );
      setValue(
        'vehicle.specifications.dimensions.length',
        data?.getVehicle?.specifications?.dimensions?.length,
      );
      setValue(
        'vehicle.specifications.dimensions.passengerVolume',
        data?.getVehicle?.specifications?.dimensions?.passengerVolume,
      );
      setValue(
        'vehicle.specifications.dimensions.width',
        data?.getVehicle?.specifications?.dimensions?.width,
      );
      // Weight & performance
      setValue(
        'vehicle.specifications.weights.curbWeight',
        data?.getVehicle?.specifications?.weights?.curbWeight,
      );
      setValue(
        'vehicle.specifications.weights.grossVehicleWeight',
        data?.getVehicle?.specifications?.weights?.grossVehicleWeight,
      );
      setValue(
        'vehicle.specifications.weights.maxPayload',
        data?.getVehicle?.specifications?.weights?.maxPayload,
      );
      setValue(
        'vehicle.specifications.weights.towingCapacity',
        data?.getVehicle?.specifications?.weights?.towingCapacity,
      );

      // Fuel & Oil
      setValue(
        'vehicle.specifications.oils.fuelType',
        data?.getVehicle?.specifications?.oils?.fuelType,
      );
      setValue(
        'vehicle.specifications.oils.fuelConsumption',
        data?.getVehicle?.specifications?.oils?.fuelConsumption,
      );
      setValue(
        'vehicle.specifications.oils.fuelConsumptionCounterfeitRange',
        data?.getVehicle?.specifications?.oils?.fuelConsumptionCounterfeitRange,
      );
      setValue(
        'vehicle.specifications.oils.fuelConsumptionSuspiciousRange',
        data?.getVehicle?.specifications?.oils?.fuelConsumptionSuspiciousRange,
      );
      setValue(
        'vehicle.specifications.oils.fuelPrimaryTankCapacity',
        data?.getVehicle?.specifications?.oils?.fuelPrimaryTankCapacity,
      );
      setValue(
        'vehicle.specifications.oils.fuelQuality',
        data?.getVehicle?.specifications?.oils?.fuelQuality,
      );
      setValue(
        'vehicle.specifications.oils.fuelSecondaryTankCapacity',
        data?.getVehicle?.specifications?.oils?.fuelSecondaryTankCapacity,
      );
      setValue(
        'vehicle.specifications.oils.oilCapacity',
        data?.getVehicle?.specifications?.oils?.oilCapacity,
      );
      setValue(
        'vehicle.specifications.oils.oilType',
        data?.getVehicle?.specifications?.oils?.oilType,
      );

      // Engine
      setValue(
        'vehicle.specifications.engine.aspiration',
        data?.getVehicle?.specifications?.engine?.aspiration,
      );
      setValue(
        'vehicle.specifications.engine.blockType',
        data?.getVehicle?.specifications?.engine?.blockType,
      );
      setValue(
        'vehicle.specifications.engine.bore',
        data?.getVehicle?.specifications?.engine?.bore,
      );
      setValue(
        'vehicle.specifications.engine.camType',
        data?.getVehicle?.specifications?.engine?.camType,
      );
      setValue(
        'vehicle.specifications.engine.compressionRatio',
        data?.getVehicle?.specifications?.engine?.compressionRatio,
      );
      setValue(
        'vehicle.specifications.engine.engineBrand',
        data?.getVehicle?.specifications?.engine?.engineBrand,
      );
      setValue(
        'vehicle.specifications.engine.fuelInduction',
        data?.getVehicle?.specifications?.engine?.fuelInduction,
      );

      setValue(
        'vehicle.specifications.engine.maxHP',
        data?.getVehicle?.specifications?.engine?.maxHP,
      );
      setValue(
        'vehicle.specifications.engine.maxTorque',
        data?.getVehicle?.specifications?.engine?.maxTorque,
      );
      setValue(
        'vehicle.specifications.engine.numberOfCylinders',
        data?.getVehicle?.specifications?.engine?.numberOfCylinders,
      );
      setValue(
        'vehicle.specifications.engine.numberOfValves',
        data?.getVehicle?.specifications?.engine?.numberOfValves,
      );
      setValue(
        'vehicle.specifications.engine.redlineRPM',
        data?.getVehicle?.specifications?.engine?.redlineRPM,
      );
      setValue(
        'vehicle.specifications.engine.stroke',
        data?.getVehicle?.specifications?.engine?.stroke,
      );
      setValue(
        'vehicle.specifications.engine.totalDisplacement',
        data?.getVehicle?.specifications?.engine?.totalDisplacement,
      );

      // Transmission
      setValue(
        'vehicle.specifications.transmission.numberOfGears',
        data?.getVehicle?.transmission?.numberOfGears,
      );
      setValue(
        'vehicle.specifications.transmission.transmissionBrand',
        data?.getVehicle?.transmission?.transmissionBrand,
      );
      setValue(
        'vehicle.specifications.transmission.transmissionType',
        data?.getVehicle?.transmission?.transmissionType,
      );
      // Wheel and tire
      setValue(
        'vehicle.specifications.wheels.brakeSystemType',
        data?.getVehicle?.wheels?.brakeSystemType,
      );
      setValue('vehicle.specifications.wheels.driveType', data?.getVehicle?.wheels?.driveType);
      setValue(
        'vehicle.specifications.wheels.frontTirePressure',
        data?.getVehicle?.wheels?.frontTirePressure,
      );
      setValue(
        'vehicle.specifications.wheels.frontTireType',
        data?.getVehicle?.wheels?.frontTireType,
      );
      setValue(
        'vehicle.specifications.wheels.frontTrackWidth',
        data?.getVehicle?.wheels?.frontTrackWidth,
      );
      setValue(
        'vehicle.specifications.wheels.frontWheelDiameter',
        data?.getVehicle?.wheels?.frontWheelDiameter,
      );
      setValue('vehicle.specifications.wheels.rearAxle', data?.getVehicle?.wheels?.rearAxle);
      setValue(
        'vehicle.specifications.wheels.rearTirePressure',
        data?.getVehicle?.wheels?.rearTirePressure,
      );
      setValue(
        'vehicle.specifications.wheels.rearTireType',
        data?.getVehicle?.wheels?.rearTireType,
      );
      setValue(
        'vehicle.specifications.wheels.rearTrackWidth',
        data?.getVehicle?.wheels?.rearTrackWidth,
      );
      setValue(
        'vehicle.specifications.wheels.rearWheelDiameter',
        data?.getVehicle?.wheels?.rearWheelDiameter,
      );
      setValue('vehicle.specifications.wheels.wheelBase', data?.getVehicle?.wheels?.wheelBase);

      // GPS
      if (data?.getVehicle?.gps?.device) {
        setValue('vehicle.gps.device', data?.getVehicle?.gps?.device);
        setValue('vehicle.gps.serialNumber', data?.getVehicle?.gps?.serialNumber);
        setValue('vehicle.gps.timeInterval', data?.getVehicle?.gps?.timeInterval);
      }
      // Maintenance
      if (data?.getVehicle?.maintenance?.serviceProgram?._id) {
        setValue(
          'vehicle.maintenance.serviceProgram',
          data?.getVehicle?.maintenance?.serviceProgram?._id,
        );
        setChecked(true);
      }
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
    refetchQueries: [{ query: refetchQuery }],
    variables: {
      options: {
        showAll: true,
      },
    },
  });
  const [deleteVehicleRow] = useMutation(DELETE_VEHICLE, {
    refetchQueries: [{ query: refetchQuery }],
    variables: {
      options: {
        showAll: true,
      },
    },
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
              checked,
              setChecked,
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

export default EditStepperWrapper;
