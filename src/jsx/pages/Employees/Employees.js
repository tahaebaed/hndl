/**
 * @description
 *    this component for display the employee data using multiple components
 *    AddButtons =>
 *    that take :
 *        - wrapperClassName: this to add custom class and styles to the container div
 *        - title: to add the title or label for the button
 *        - addButton: to add the title or label for the button
 *        - addMultiple: boolean state to display if there is multiple button to display
 *    ReusableTable :
 *        - data: what we fetched from the API using useQuery method @param GET_EMPLOYEE as the query type to fetch the data
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
import { EMPLOYEES_COLUMNS } from '../../components/table/FilteringTable/Columns';
import { GET_EMPLOYEE, GET_GROUPS } from '../../../utilities/Apollo/Querries';
import { useForm } from 'react-hook-form';
import FormControl from './employee_fromcontrol/FormControl';
import './employees.css';
import { ADD_EMPLOYEE, ADD_EMPLOYEES } from '../../../utilities/Apollo/Mutate';
import DownloadExcel from '../../components/importExportExcel/DownloadExcel';
import TableExcel from '../../components/importExportExcel/TableExcel';
import { toast } from 'react-toastify';
import Edit from '../../components/reusableEdit/Edit';
import EditEmployee from '../../components/reusableEdit/editablecomp/EditEmployee';
import Loader from '../../../utilities/Loader';

const Employees = () => {
  const columns = useMemo(() => EMPLOYEES_COLUMNS, []);
  const intl = useIntl();
  const history = useHistory();
  const tableRef = useRef(null);
  const tableRefMulti = useRef(null);
  const toastId = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModall, setOpenModall] = useState(false);
  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);
  const [ID, setID] = useState(false);
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
    reset,
    formState: { errors },
  } = useForm({
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
      lastName: null,
      licenseClass: null,
      licenseRenewalDate: null,
      middleName: null,
      nationalId: null,
      photoUrl: null,
      secondMobile: null,
    },
  });
  const {
    data: employee,
    loading,
    error,
  } = useQuery(GET_EMPLOYEE, {
    variables: {
      options: {
        showAll: true,
      },
    },
  });

  const { data: groupData } = useQuery(GET_GROUPS, {
    variables: {
      options: {
        showAll: null,
      },
    },
  });

  const [AddEmployee] = useMutation(ADD_EMPLOYEE, {
    refetchQueries: [
      {
        query: GET_EMPLOYEE,
        variables: {
          options: {
            showAll: true,
          },
        },
      },
    ],
  });
  const [AddEmployees] = useMutation(ADD_EMPLOYEES, {
    refetchQueries: [
      {
        query: GET_EMPLOYEE,
        variables: {
          options: {
            showAll: true,
          },
        },
      },
    ],
  });

  const classificationsArr = [
    { id: 'Fleet_Manager', value: 'Fleet Manager' },
    { id: 'Fleet_Supervisor', value: 'Fleet Supervisor' },
    { id: 'Warehouse_Supervisor', value: 'Warehouse Supervisor' },
    { id: 'Operator', value: 'Operator' },
  ];

  const instructions = 'In Classification choose one of the following ENUM (1- Fleet_Manager , 2- Fleet_Supervisor, 3- Warehouse_Supervisor , 4- Operator)'

  const handleEmployee = (values) => {
    toastId.current = toast('Creating...', {
      autoClose: false,
    });
    AddEmployee({
      variables: values,
      onCompleted: () => {
        toast.update(toastId.current, {
          render: `Adding New Employee to the list`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        setOpenModal(false);
        reset();
      },
      onError: (error) => {
        toast.update(toastId.current, {
          render: `Something went wrong,${error}`,
          type: toast.TYPE.ERROR,
          autoClose: 3000,
        });
      },
    });
  };

  const convertExcelDataToNeededArray = (Arr) => {
    const CONVERTED = Arr.map((col) => ({
      accessType: col['Access Type'],
      classification: col['Classification'],
      email: col['Mail'],
      jobTitle: 'Driver',
      firstName: col['Name'].split(' ')[0],
      group: col['Group'],
      lastName: col['Name'].split(' ')[1],
      licenseRenewalDate: new Date(col['License Renewal Date']),
    }));
    AddEmployees({
      variables: {
        employees: CONVERTED,
      },
      refetchQueries: [GET_EMPLOYEE],
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
      <div className='container'>
        <div className={`d-flex justify-content-between mb-5 print-table`}>
          <h1>{intl.messages.employees}</h1>
          <div className={`d-flex col-md-7 col-lg-5 justify-content-between`}>
            <AddButtons
              setOpenModal={setOpenModal}
              openModal={openModal}
              col='col-5'
              addButton={intl.messages.add_employee_button}
            >
              <form className='employees_form' onSubmit={handleSubmit(handleEmployee)}>
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
                  type='datalist'
                  label='Group'
                  id='Group'
                  required={true}
                  defaultOption='Choose a Group'
                  placeholder='Please Select or Add new Group'
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
                  watch={watch()?.employee?.accessType}
                  label='Access Type'
                  setValue={setValue}
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
                  placeholder='enter contry'
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
                  label='License Class'
                  setValue={setValue}
                  watch={watch()?.employee?.licenseClass}
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
                <div className='col-12 d-flex justify-content-end'>
                  <button className='btn btn-primary px-5' type='submit'>
                    Save Employee
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
                convert={convertExcelDataToNeededArray}
                instructions={instructions}
                fileName={intl.messages.employees}
                sheetName={intl.messages.employees}
              />
            </AddButtons>
          </div>
        </div>
        <TableExcel columns={columns} tableRefMulti={tableRefMulti} />

        <ReusableTable
          tableRef={tableRef}
          data={employee.getEmployees.data}
          columns={columns}
          setId={setID}
          setModal={setOpenEmployeeModal}
          fileName={intl.messages.employees}
          sheetName='employee'
        />

        <Edit
          buttonTitle='Edit Vehicle List'
          setModal={setOpenEmployeeModal}
          modal={openEmployeeModal}
        >
          <EditEmployee
            setModal={setOpenEmployeeModal}
            // compData={employee}
            refetchQuery={GET_EMPLOYEE}
            id={ID}
          />
        </Edit>
      </div>
    </>
  );
};

export default Employees;
