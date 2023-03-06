import React, { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_EMPLOYEE } from '../../../../utilities/Apollo/Mutate';
import SelectInput from '../../../pages/Inspection/add_inspection/SelectInput';
import { GET_GROUPS, GET_SINGLE_EMPLOYEE } from '../../../../utilities/Apollo/Querries';
import FormControl from '../../../pages/Employees/employee_fromcontrol/FormControl';
import { DELETE_EMPLOYEE } from '../../../../utilities/Apollo/Delete';

const EditEmployee = ({ id, setModal, compData, refetchQuery }) => {
  const intl = useIntl();
  const toastId = useRef(null);
  const [checked, setChecked] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    updateEmployeeId: null,
    employee: {
      accessType: null,
      address: null,
      birthdate: null,
      city: null,
      classification: null,
      country: null,
      email: null,
      employeeNumber: null,
      firstMobile: null,
      firstName: null,
      group: null,
      jobTitle: null,
      licenseClass: null,
      lastName: null,
      licenseRenewalDate: null,
      middleName: null,
      nationalId: null,
      photoUrl: null,
      secondMobile: null,
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
  } = useQuery(GET_SINGLE_EMPLOYEE, {
    variables: {
      getEmployeeId: id,
    },
    onCompleted: (data) => {
      console.log(data.getEmployee.licenseRenewalDate.slice(0, 10));
      setValue('updateEmployeeId', id);
      setValue('employee.firstName', data.getEmployee.firstName);
      setValue('employee.lastName', data.getEmployee.lastName);
      setValue('employee.middleName', data.getEmployee.middleName);
      setValue('employee.firstMobile', data.getEmployee.firstMobile);
      setValue('employee.secondMobile', data.getEmployee.secondMobile);
      setValue('employee.group', data.getEmployee.group._id);
      setValue('employee.classification', data.getEmployee.classification);
      setValue('employee.accessType', data.getEmployee.accessType);
      setValue('employee.email', data.getEmployee.email);
      setValue('employee.address', data.getEmployee.address);
      setValue('employee.employeeNumber', data.getEmployee.employeeNumber);
      setValue('employee.jobTitle', data.getEmployee.jobTitle);
      setValue('employee.city', data.getEmployee.city);
      setValue('employee.country', data.getEmployee.country);
      setValue('employee.birthdate', data.getEmployee.birthdate.slice(0, 10));
      setValue('employee.nationalId', data.getEmployee.nationalId);
      setValue('employee.licenseClass', data.getEmployee.licenseClass);
      setValue('employee.licenseRenewalDate', data.getEmployee.licenseRenewalDate.slice(0, 10));
    },
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

  const [deleteEmployeeRow] = useMutation(DELETE_EMPLOYEE, {
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

  const [updateEmployeeData] = useMutation(UPDATE_EMPLOYEE, {
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
  const updateInspection = (values) => {
    toastId.current = toast('updating ...', {
      autoClose: false,
    });
    updateEmployeeData({
      variables: values,
      onCompleted: (data) => {
        toast.update(toastId.current, {
          render: `Employee has been updated`,
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
    <form className='employees_form' onSubmit={handleSubmit(updateInspection)}>
      <FormControl
        type='text'
        label='First Name'
        required={true}
        register={register('employee.firstName', {
          required: {
            value: true,
            message: 'first name is required',
          },
        })}
        error={errors.employee?.firstName?.message}
        placeholder='enter first name'
      />
      <FormControl
        type='text'
        label='Middle Name'
        register={register('employee.middleName')}
        placeholder='enter Middle name'
      />
      <FormControl
        type='text'
        label='Last Name'
        required={true}
        register={register('employee.lastName', {
          required: {
            value: true,
            message: 'Last name is required',
          },
        })}
        placeholder='enter last name'
        error={errors.employee?.lastName?.message}
      />
      <FormControl
        type='text'
        label='First Mobile'
        required={true}
        watch={watch()?.employee?.firstMobile}
        register={register('employee.firstMobile', {
          required: {
            value: true,
            message: 'Mobile is required',
          },
        })}
        placeholder='enter mobile'
        error={errors.employee?.firstMobile?.message}
      />
      <FormControl
        type='text'
        label='Second Mobile'
        register={register('employee.secondMobile')}
        placeholder='enter second mobile'
      />
      <FormControl
        type='text'
        label='Job title'
        required={true}
        register={register('employee.jobTitle', {
          required: { value: true, message: 'job title is required' },
        })}
        placeholder='enter job title'
        error={errors.employee?.jobTitle?.message}
      />
      <FormControl
        type='text'
        label='Employee Number'
        required={true}
        register={register('employee.employeeNumber', {
          required: { value: true, message: 'number is required' },
        })}
        placeholder='enter number'
        error={errors.employee?.employeeNumber?.message}
      />
      <FormControl
        type='select'
        label='Group'
        required={true}
        options={groupData?.getGroups?.data.map((group) => ({
          id: group._id,
          name: group.name,
        }))}
        register={register('employee.group', {
          required: { value: true, message: 'group is required' },
        })}
        error={errors.employee?.group?.message}
      />
      <FormControl
        type='select'
        label='Classifications'
        required={true}
        defaultOption='Select Classification'
        options={classificationsArr.map((classification) => ({
          id: classification.id,
          name: classification.value,
        }))}
        register={register('employee.classification', {
          required: {
            value: true,
            message: 'classification is required',
          },
        })}
        error={errors.employee?.classification?.message}
      />
      <FormControl
        type='radio'
        label='Access Type'
        setValue={setValue}
        watch={watch('employee.accessType')}
        radios={[
          {
            label: 'Admin',
            id: 'Admin',
            cond: 'employee.accessType',
            noBoolean: true,
          },
          {
            label: 'User',
            id: 'User',
            cond: 'employee.accessType',
            noBoolean: true,
          },
          {
            label: 'Employee',
            id: 'Employee',
            cond: 'employee.accessType',
            noBoolean: true,
          },
          {
            label: 'No Access',
            id: 'No_Access',
            cond: 'employee.accessType',
            noBoolean: true,
          },
        ]}
        required={true}
        error={errors.employee?.accessType?.message}
      />
      <FormControl
        type='email'
        label='Email'
        required={true}
        register={register('employee.email', {
          required: { value: true, message: 'email is required' },
        })}
        placeholder='enter email'
        error={errors.employee?.email?.message}
      />
      <FormControl
        type='text'
        label='Address'
        required={true}
        register={register('employee.address', {
          required: { value: true, message: 'address is required' },
        })}
        placeholder='enter address'
        error={errors.employee?.address?.message}
      />
      <FormControl
        type='text'
        label='City'
        required={true}
        register={register('employee.city', {
          required: { value: true, message: 'city is required' },
        })}
        placeholder='enter city'
        error={errors.employee?.city?.message}
      />
      <FormControl
        type='text'
        label='Country'
        required={true}
        register={register('employee.country', {
          required: { value: true, message: 'country is required' },
        })}
        placeholder='enter country'
        error={errors.employee?.country?.message}
      />
      <FormControl
        type='date'
        label='Birth date'
        required={true}
        register={register('employee.birthdate', {
          required: {
            value: true,
            message: 'birth date is required',
          },
          valueAsDate: true,
        })}
        error={errors.employee?.birthdate?.message}
      />
      <FormControl
        type='text'
        label='National ID'
        required={true}
        register={register('employee.nationalId', {
          required: {
            value: true,
            message: 'national ID is required',
          },
        })}
        placeholder='enter national ID'
        error={errors.employee?.nationalId?.message}
      />
      <FormControl
        type='radio'
        watch={watch()?.employee?.licenseClass}
        label='License Class'
        setValue={setValue}
        radios={[
          {
            label: 'First',
            id: 'First_Class',
            cond: 'employee.licenseClass',
            noBoolean: true,
          },
          {
            label: 'Second',
            id: 'Second_Class',
            cond: 'employee.licenseClass',
            noBoolean: true,
          },
          {
            label: 'Third',
            id: 'Third_Class',
            cond: 'employee.licenseClass',
            noBoolean: true,
          },
          {
            label: 'Private',
            id: 'Private',
            cond: 'employee.licenseClass',
            noBoolean: true,
          },
        ]}
      />
      <FormControl
        type='date'
        label='License Renewal Date'
        required={true}
        register={register('employee.licenseRenewalDate', {
          required: {
            value: true,
            message: 'license renewal date is required',
          },
        })}
        error={errors.employee?.licenseRenewalDate?.message}
      />
      <FormControl
        type='image'
        label='Photo'
        setValue={setValue}
        setPhoto='employee.photoUrl'
        register={register('employee.photoUrl')}
      />
      <div className='col-12 d-flex justify-content-between'>
        <button
          className='btn btn-danger px-5'
          type='button'
          onClick={() => {
            toastId.current = toast('updating ...', {
              autoClose: false,
            });
            deleteEmployeeRow({
              variables: { deleteEmployeeId: id },
              onCompleted: (data) => {
                toast.update(toastId.current, {
                  render: `Employee has been deleted`,
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
          Delete Employee
        </button>
        <button className='btn btn-primary px-5' type='submit'>
          Save Changes
        </button>
      </div>
    </form>
  );
};

export default EditEmployee;
