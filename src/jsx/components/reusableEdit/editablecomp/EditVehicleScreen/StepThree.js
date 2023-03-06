import React from 'react';
import Fieldset from './Fieldset';

import './stepThree.css';

const StepThree = ({ activeStep, setActiveStep, register }) => {
  return (
    <div>
      <Fieldset
        legend='Dimension'
        inputs={[
          {
            title: 'width',
            placeholder: 'Dimension width',
            span: 'cm',
            type: 'number',
            register: register('vehicle.specifications.dimensions.width', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Height',
            placeholder: 'Dimension height',
            span: 'cm',
            type: 'number',
            register: register('vehicle.specifications.dimensions.height', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Length',
            placeholder: 'Dimension length',

            span: 'cm',
            type: 'number',
            register: register('vehicle.specifications.dimensions.length', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Passenger Volume',
            placeholder: 'Dimension Passenger',

            span: 'cm',
            sup: 3,
            type: 'number',
            register: register('vehicle.specifications.dimensions.passengerVolume', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Interior Volume',
            placeholder: 'Dimension Interior',

            span: 'cm',
            sup: 3,
            type: 'number',
            register: register('vehicle.specifications.dimensions.interiorVolume', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Cargo Volume',
            placeholder: 'Dimension Cargo',

            span: 'cm',
            sup: 3,
            type: 'number',
            register: register('vehicle.specifications.dimensions.cargoVolume', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Ground Clearance',
            placeholder: 'Dimension Ground',

            span: 'cm',
            type: 'number',
            register: register('vehicle.specifications.dimensions.groundClearance', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Bed Length',
            placeholder: 'Dimension Bed length',

            span: 'cm',
            type: 'number',
            register: register('vehicle.specifications.dimensions.bedLength', {
              valueAsNumber: true,
            }),
          },
        ]}
      />
      <Fieldset
        legend='Weight & Performance'
        inputs={[
          {
            title: 'Curb Weight',
            placeholder: 'W&P Weight',
            span: 'kg',
            type: 'number',
            register: register('vehicle.specifications.weights.curbWeight', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Gross Vehicle',
            placeholder: 'W&P Gross',

            span: 'kg',
            type: 'number',
            register: register('vehicle.specifications.weights.grossVehicleWeight', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Towing Capacity',
            placeholder: 'W&P Capacity',

            span: 'kg',
            type: 'number',
            register: register('vehicle.specifications.weights.towingCapacity', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Max Payload',
            placeholder: 'W&P Payload',

            span: 'kg',
            type: 'number',
            register: register('vehicle.specifications.weights.maxPayload', {
              valueAsNumber: true,
            }),
          },
        ]}
      />
      <Fieldset
        legend='Fuel & Oil'
        inputs={[
          {
            title: 'Fuel Type*',
            type: 'select',
            options: [
              { value: '', label: 'Choose Type', disabled: true },
              { value: 'Diesel', label: 'Diesel' },
              { value: 'Gasoline_80', label: 'Gasoline 80' },
              { value: 'Gasoline_92', label: 'Gasoline 92' },
              { value: 'Gasoline_95', label: 'Gasoline 95' },
              { value: 'Natural_Gas', label: 'Natural Gas' },
            ],
            register: register('vehicle.specifications.oils.fuelType', {
              require: { value: true, message: 'Fuel type is required' },
            }),
          },
          {
            title: 'Fuel Quality',
            type: 'text',
            register: register('vehicle.specifications.oils.fuelQuality'),
            placeholder: 'Fuel Quality',
          },
          {
            title: 'Fuel Tank 1 Capacity',
            span: 'liter',
            type: 'number',
            register: register('vehicle.specifications.oils.fuelPrimaryTankCapacity', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Fuel Tank 2 Capacity',
            span: 'liter',
            type: 'number',
            register: register('vehicle.specifications.oils.fuelSecondaryTankCapacity', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Oil Capacity',
            span: 'liter',
            type: 'number',
            register: register('vehicle.specifications.oils.oilCapacity', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Oil Type',
            type: 'text',
            register: register('vehicle.specifications.oils.oilType'),
            placeholder: 'Oil Type',
          },
        ]}
      />
      <Fieldset
        legend='Engine'
        inputs={[
          {
            title: 'Engine Brand',
            type: 'text',
            register: register('vehicle.specifications.engine.engineBrand'),
            placeholder: 'Engine Brand',
          },
          {
            title: 'Aspiration',
            type: 'text',
            register: register('vehicle.specifications.engine.aspiration'),
            placeholder: 'Engine Aspiration',
          },
          {
            title: 'Block Type',
            type: 'text',
            register: register('vehicle.specifications.engine.blockType'),
            placeholder: 'Engine Block Type',
          },
          {
            title: 'Bore',
            type: 'number',
            span: 'mm',
            register: register('vehicle.specifications.engine.bore', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Cam Type',
            type: 'text',
            register: register('vehicle.specifications.engine.camType'),
            placeholder: 'Engine Cam Type',
          },
          {
            title: 'Compression Ratio',
            type: 'number',
            register: register('vehicle.specifications.engine.compressionRatio', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Number Of Cylinders',
            type: 'number',
            register: register('vehicle.specifications.engine.numberOfCylinders', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Total Displacement',
            type: 'number',
            span: 'cm',
            sup: 3,
            register: register('vehicle.specifications.engine.totalDisplacement', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Fuel Induction',
            type: 'text',
            register: register('vehicle.specifications.engine.fuelInduction'),
            placeholder: 'Fuel Induction',
          },
          {
            title: 'Max HP',
            type: 'number',
            span: 'HP',
            register: register('vehicle.specifications.engine.maxHP', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Max Torque',
            type: 'number',
            span: 'N.m',
            register: register('vehicle.specifications.engine.maxTorque', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Redline RPM',
            type: 'number',
            span: 'RPM',
            register: register('vehicle.specifications.engine.redlineRPM', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Stroke',
            type: 'number',
            span: 'mm',
            register: register('vehicle.specifications.engine.stroke', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Number Of Valves',
            type: 'number',
            register: register('vehicle.specifications.engine.numberOfValves', {
              valueAsNumber: true,
            }),
          },
        ]}
      />
      <Fieldset
        legend='Transmission'
        inputs={[
          {
            title: 'Transmission Brand',
            type: 'text',
            register: register('vehicle.specifications.transmission.transmissionBrand'),
            placeholder: 'Transmission Brand',
          },
          {
            title: 'Transmission Type',
            type: 'text',
            register: register('vehicle.specifications.transmission.transmissionType'),
            placeholder: 'Transmission Type',
          },
          {
            title: 'Number Of Gear',
            type: 'number',
            register: register('vehicle.specifications.transmission.numberOfGears', {
              valueAsNumber: true,
            }),
          },
        ]}
      />
      <Fieldset
        legend='Wheels & Tires'
        inputs={[
          {
            title: 'Wheel Base',
            type: 'number',
            span: 'mm',
            register: register('vehicle.specifications.wheels.wheelBase', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Drive Type',
            type: 'text',
            register: register('vehicle.specifications.wheels.driveType'),
            placeholder: 'wheels Drive Type',
          },
          {
            title: 'Brake System Type',
            type: 'text',
            register: register('vehicle.specifications.wheels.brakeSystemType'),
            placeholder: 'wheels Brake System Type',
          },
          {
            title: 'Front Track Width',
            type: 'number',
            span: 'mm',
            register: register('vehicle.specifications.wheels.frontTrackWidth', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Front Wheel Diameter',
            type: 'number',
            span: 'mm',
            register: register('vehicle.specifications.wheels.frontWheelDiameter', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Front Tire Type',
            type: 'text',
            register: register('vehicle.specifications.wheels.frontTireType'),
            placeholder: 'wheels Front Tire Type',
          },
          {
            title: 'Front Tire Pressure',
            type: 'number',
            span: 'PSI',
            register: register('vehicle.specifications.wheels.frontTirePressure', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Rear Track Width',
            type: 'number',
            span: 'mm',
            register: register('vehicle.specifications.wheels.rearTrackWidth', {
              valueAsNumber: true,
            }),
          },

          {
            title: 'Rear Wheel Diameter',
            type: 'number',
            span: 'in',
            register: register('vehicle.specifications.wheels.rearWheelDiameter', {
              valueAsNumber: true,
            }),
          },
          {
            title: 'Rear Axle',
            type: 'number',
            span: 'cm',
            sup: '3',
            register: register('vehicle.specifications.wheels.rearAxle', {
              valueAsNumber: true,
            }),
          },

          {
            title: 'Rear Tire Type',
            type: 'text',
            register: register('vehicle.specifications.wheels.rearTireType'),
            placeholder: 'wheels Rear Tire Type',
          },
          {
            title: 'Rear Tire Pressure',
            type: 'number',
            span: 'PSI',
            register: register('vehicle.specifications.wheels.rearTirePressure', {
              valueAsNumber: true,
            }),
          },
        ]}
      />

      <div className='d-flex justify-content-end w-100 mt-3 mb-4'>
        <button
          type='button'
          className='btn btn-outline-primary px-5 btn-md mx-2'
          onClick={() => setActiveStep((prev) => prev - 1)}
        >
          back
        </button>
        <button
          type='button'
          className='btn btn-primary px-5 btn-md'
          onClick={() => setActiveStep((prev) => prev + 1)}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default StepThree;
