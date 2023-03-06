import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useMutation, useQuery } from '@apollo/client';
import SelectInput from '../../../pages/Inspection/add_inspection/SelectInput';
import {
  GET_GROUPS,
  GET_SINGLE_CONTACT,
  GET_SINGLE_EMPLOYEE,
  GET_SINGLE_INSPECTION,
} from '../../../../utilities/Apollo/Querries';
import ModalFormControl from '../../modalsWrapper/ModalFormControl';
import { UPDATE_CONTACT } from '../../../../utilities/Apollo/Mutate';
import { DELETE_CONTACT } from '../../../../utilities/Apollo/Delete';

const EditContact = ({ id, setModal, compData, refetchQuery }) => {
  const intl = useIntl();
  const toastId = useRef(null);
  const [checked, setChecked] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    updateContactId: null,
    contact: {
      _id: null,
      name: null,
      email: null,
      firstMobile: null,
      secondMobile: null,
      firstAddress: null,
      secondAddress: null,
      website: null,
      classification: null,
    },
  });

  const classificationsArr = [
    { id: 'Fleet_Manager', value: 'Fleet Manager' },
    { id: 'Fleet_Supervisor', value: 'Fleet Supervisor' },
    { id: 'Warehouse_Supervisor', value: 'Warehouse Supervisor' },
    { id: 'Operator', value: 'Operator' },
  ];

  const {
    data: service,
    loading,
    error,
  } = useQuery(GET_SINGLE_CONTACT, {
    variables: {
      getContactId: id,
    },
    onCompleted: (data) => {
      setValue('updateContactId', id);
      setValue('contact.name', data.getContact.name);
      setValue('contact.email', data.getContact.email);

      setValue('contact.firstMobile', data.getContact.firstMobile);
      setValue('contact.secondMobile', data.getContact.secondMobile);
      setValue('contact.firstAddress', data.getContact.firstAddress);
      setValue('contact.secondAddress', data.getContact.secondAddress);
      setValue('contact.website', data.getContact.website);
      setValue('contact.classification', data.getContact.classification);
    },
  });

  const [deleteContactRow] = useMutation(DELETE_CONTACT, {
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

  const [updateContactData] = useMutation(UPDATE_CONTACT, {
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
  const classification = [
    { firstName: 'Fuel' },
    { firstName: 'Service_Center' },
    { firstName: 'Spare_Parts' },
    { firstName: 'Tires' },
    { firstName: 'Others' },
  ];
  const handleContact = (values) => {
    toastId.current = toast('updating ...', {
      autoClose: false,
    });
    updateContactData({
      variables: values,
      onCompleted: (data) => {
        toast.update(toastId.current, {
          render: `Contact has been updated`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        setModal(false);
      },
      onError: (res) => {
        toast.update(toastId.current, {
          render: `Something went wrong` + res.errors[0].message,
          type: toast.TYPE.WARNING,
          autoClose: 3000,
        });
      },
      refetchQueries: [{ query: refetchQuery }],
    });
  };
  return (
    <ModalFormControl
      handleSubmit={handleSubmit(handleContact)}
      watch={watch}
      xsxsxs='deleteContactId'
      deleteRow={deleteContactRow}
      id={id}
      compName='Contact'
      setModal={setModal}
      edit={true}
      isDirty={isDirty}
      inputs={[
        {
          type: 'text',
          labelTitle: 'Name',
          required: true,
          placeHolder: 'Enter Name',
          register: register('contact.name', {
            required: { value: true, message: 'name is required' },
          }),
          error: errors?.contact?.name.message,
        },
        {
          type: 'text',
          labelTitle: 'Email',
          register: register('contact.email'),
          placeHolder: 'Enter Email',
        },
        {
          type: 'number',
          labelTitle: 'First Mobile',
          register: register('contact.firstMobile'),
          placeHolder: 'Enter Your Number',
        },
        {
          type: 'number',
          labelTitle: 'Second Mobile',
          register: register('contact.secondMobile'),
          placeHolder: 'Enter Your Second Number',
        },
        {
          type: 'text',
          labelTitle: 'First Address',
          register: register('contact.firstAddress'),
          placeHolder: 'Enter Your Address',
        },
        {
          type: 'text',
          labelTitle: 'Second Address',
          register: register('contact.secondAddress'),
          placeHolder: 'Enter Your Another Address',
        },
        {
          type: 'text',
          labelTitle: 'Website',
          register: register('contact.website'),
          placeHolder: 'Enter Your Website',
        },
        {
          type: 'select',
          labelTitle: 'Classification',
          register: register('contact.classification'),
          required: true,
          defaultOption: 'Select Classification',
          options: classification,
        },
      ]}
    />
  );
};

export default EditContact;
