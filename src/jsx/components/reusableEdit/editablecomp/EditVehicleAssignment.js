import { useMutation, useQuery } from '@apollo/client';
import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import {
  GET_OPERATORS_SELECT,
  GET_SINGLE_VEHICLE_ASSIGNMENT,
  GET_VEHICLES_SELECT,
} from '../../../../utilities/Apollo/Querries';
import ModalFormControl from '../../modalsWrapper/ModalFormControl';
import { UPDATE_VEHICLE_ASSIGNMENTS } from '../../../../utilities/Apollo/Mutate';
import { toast } from 'react-toastify';
import { DELETE_VEHICLE_ASSIGNMENT } from '../../../../utilities/Apollo/Delete';

const EditVehicleAssignment = ({ id, setModal, refetchQuery }) => {
  const intl = useIntl();
  const toastId = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm({
    updateVehicleAssignmentId: null,
    vehicleAssignment: {
      operator: null,
      startTimestamp: new Date().toJSON().slice(0, 16),
      trailer: null,
      vehicle: null,
      expireAt: new Date().toJSON().slice(0, 16),
    },
  });
  const { data: vehicleSelect } = useQuery(GET_VEHICLES_SELECT, {
    variables: {
      options: {
        showAll: true,
      },
    },
  });
  const { data: operatorsSelect } = useQuery(GET_OPERATORS_SELECT, {
    variables: {
      options: { showAll: true },
    },
  });
  const { data: vehicleAssignment } = useQuery(GET_SINGLE_VEHICLE_ASSIGNMENT, {
    variables: {
      getVehicleAssignmentId: id,
    },
    onCompleted: (data) => {
      setValue('updateVehicleAssignmentId', id);
      setValue('vehicleAssignment.operator', data.getVehicleAssignment.operator._id);
      setValue(
        'vehicleAssignment.startTimestamp',
        data.getVehicleAssignment.startTimestamp.slice(0, 16),
      );
      setValue('vehicleAssignment.vehicle', data.getVehicleAssignment.vehicle._id);
      setValue('vehicleAssignment.trailer', data.getVehicleAssignment.trailer._id);
      setValue('vehicleAssignment.expireAt', data.getVehicleAssignment.expireAt.slice(0, 16));
    },
  });
  const [deleteVehicleAssignmentRow] = useMutation(DELETE_VEHICLE_ASSIGNMENT, {
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
  const [updateAssignment] = useMutation(UPDATE_VEHICLE_ASSIGNMENTS, {
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

  const updateVehicleAssignment = (values) => {
    toastId.current = toast('updating ...', {
      autoClose: false,
    });
    updateAssignment({
      variables: {
        ...values,
        vehicleAssignment: {
          ...values.vehicleAssignment,
          trailer: values.vehicleAssignments?.trailer
            ? values.vehicleAssignments?.trailer
            : undefined,
        },
      },
      onCompleted: () => {
        toast.update(toastId.current, {
          render: `Vehicle Assignment has been updated`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        setModal(false);
      },
      onError: () => {
        toast.update(toastId.current, {
          render: `Something went wrong`,
          type: toast.TYPE.WARNING,
          autoClose: 3000,
        });
      },
    });
  };
  return (
    <ModalFormControl
      handleSubmit={handleSubmit(updateVehicleAssignment)}
      watch={watch}
      xsxsxs={{ deleteVehicleAssignmentId: id }}
      deleteRow={deleteVehicleAssignmentRow}
      id={id}
      compName='Vehicle Assignment'
      setModal={setModal}
      edit={true}
      slog={vehicleAssignment?.getVehicleAssignment?.vehicle?.details?.name}
      isDirty={isDirty}
      inputs={[
        {
          type: 'select',
          labelTitle: 'Vehicle',
          required: true,
          register: register('vehicleAssignment.vehicle', {
            required: {
              value: true,
              message: 'vehicle Trailer is required',
            },
          }),
          defaultOption: 'Please Select Vehicle',
          options:
            vehicleSelect &&
            vehicleSelect.getVehicles?.data.filter((type) => type.details.type !== 'Trailer'),
          error: errors?.vehicleAssignment?.vehicle?.message,
        },
        {
          type: 'select',
          labelTitle: 'Operator',
          required: true,
          defaultOption: 'Please Select Operator',
          register: register('vehicleAssignment.operator', {
            required: {
              value: true,
              message: 'vehicle Trailer is required',
            },
          }),
          options: operatorsSelect?.getEmployees?.data.filter(
            (trailer) => trailer.classification === 'Operator',
          ),
          error: errors?.vehicleAssignment?.operator?.message,
        },
        {
          type: 'select',
          defaultOption: 'select trailer',
          labelTitle: 'Trailer',
          register: register('vehicleAssignment.trailer'),
          options:
            vehicleSelect &&
            vehicleSelect.getVehicles?.data.filter((type) => type.details.type === 'Trailer'),
        },
        {
          type: 'datetime-local',
          labelTitle: 'Start Date',
          register: register('vehicleAssignment.startTimestamp', {
            valueAsDate: true,
          }),
        },
        {
          type: 'datetime-local',
          labelTitle: 'End Date',
          register: register('vehicleAssignment.expireAt', {
            valueAsDate: true,
          }),
        },
      ]}
    />
  );
};

export default EditVehicleAssignment;
