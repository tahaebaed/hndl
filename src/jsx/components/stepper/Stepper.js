import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import StepFour from './StepFour'
import StepOne from './StepOne'
import StepThree from './StepThree'
import StepTwo from './StepTwo'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import { StepButton } from '@mui/material'
import { useMutation, useQuery } from '@apollo/client'
import { CREATE_VEHICLE } from '../../../utilities/Apollo/Mutate'
import { GET_GROUPS, GET_SERVICE_PROGRAMS } from '../../../utilities/Apollo/Querries'
import { toast } from 'react-toastify'

const StepperWrapper = ({ vehicleList, setOpenModal, refetchQuery, setlocalVehiclesList }) => {
  const [activeStep, setActiveStep] = useState(0)
  const toastId = useRef(null)
  const { register, handleSubmit, watch, setValue, control } = useForm({
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
          device: '',
          serialNumber: '',
          timeInterval: 0,
        },
      },
    },
  })
  const [filterGroup, setFilterGroup] = useState('')

  const [createVehicle, { data, loading, error }] = useMutation(CREATE_VEHICLE, {
    refetchQueries: [{ query: refetchQuery }],
    variables: {
      options: {
        showAll: true,
      },
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
  })

  const { data: serviceProgData } = useQuery(GET_SERVICE_PROGRAMS, {
    variables: {
      options: { showAll: true },
    },
  });
  const onHandleSubmit = values => {
    toastId.current = toast('Creating...', {
      autoClose: false,
    })
    let group = groupData.getGroups.data.find(
      (ele, i) => ele.name === values.vehicle.details.group
    )

    createVehicle({
      variables: {
        vehicle: {
          ...values.vehicle,
          details: {
            ...values.vehicle.details,
            group: group._id || values.vehicle.details.group,
          },
        },
      },
      onCompleted: (data) => {
        sessionStorage.removeItem('imgVehicle')
        toast.update(toastId.current, {
          render: `Adding ${values.vehicle.details.name} to the list`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        })
        setlocalVehiclesList(prev => [...prev, data.createVehicle])
        setOpenModal(false)
      },
      onError: error => {
        toast.update(toastId.current, {
          render: `Something went wrong,${error}`,
          type: toast.TYPE.WARNING,
          autoClose: 3000,
        })
      },
      refetchQueries: [{ query: refetchQuery }],
    })
  }

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
          <StepThree
            {...{ activeStep, setActiveStep, register, required: true }}
          />
        )}
        {activeStep === 3 && (
          <StepFour
            {...{ activeStep, setActiveStep, register, required: true }}
          />
        )}
      </form>
    </div>
  )
}

export default StepperWrapper
