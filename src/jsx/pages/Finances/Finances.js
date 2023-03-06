import { useMutation, useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { GET_FINANCES_LIST, GET_VEHICLES } from '../../../utilities/Apollo/Querries';
import AddButtons from '../../components/buttons/AddButtons';
import { EXPENSES_COLUMNS } from '../../components/table/FilteringTable/Columns';
import ReusableTable from '../../components/tableComponent/ReusableTable';
import { ADD_EXPENSE } from '../../../utilities/Apollo/Mutate';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormControl from '../Employees/employee_fromcontrol/FormControl';
import '../Employees/employees.css';
import Edit from '../../components/reusableEdit/Edit';
import EditFin from '../../components/reusableEdit/editablecomp/EditFin';
import Loader from '../../../utilities/Loader';

const Finances = () => {
  const columns = useMemo(() => EXPENSES_COLUMNS, []);
  const intl = useIntl();
  const history = useHistory();
  const tableRef = useRef(null);
  const toastId = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [openFinanceModal, setOpenFinanceModal] = useState(false);
  const [ID, setID] = useState(false);

  const {
    data: financesList,
    loading,
    error,
  } = useQuery(GET_FINANCES_LIST, {
    variables: {
      options: { showAll: null },
    },
  });
  const { data: vehicleList } = useQuery(GET_VEHICLES, {
    variables: {
      options: { showAll: true },
    },
  });

  useEffect(() => {
    if (!Cookies.get('token')) {
      history.push('/page-login');
    }
  }, []);
  const { register, handleSubmit, setValue, reset } = useForm({
    vehicle: null,
    expense: {
      cost: null,
      description: null,
      documentUrl: null,
      photoUrl: null,
      type: null,
    },
  });

  const expenseType = [
    { id: 'Fuel', value: 'Fuel' },
    { id: 'Service', value: 'Service' },
    { id: 'Other', value: 'Other' },
  ];

  const [addExpense] = useMutation(ADD_EXPENSE, {
    refetchQueries: [
      {
        query: GET_FINANCES_LIST,
        variables: {
          options: {
            showAll: true,
          },
        },
      },
    ],
  });

  const handleExpense = (values) => {
    toastId.current = toast('Creating...', {
      autoClose: false,
    });
    addExpense({
      variables: values,
      onCompleted: () => {
        toast.update(toastId.current, {
          render: `Adding New Expense to the list`,
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
          <h1>{intl.messages.finances}</h1>
          <div className={`d-flex col-md-7 col-lg-5 justify-content-end`}>
            <AddButtons
              setOpenModal={setOpenModal}
              openModal={openModal}
              col='col-6'
              addButton={intl.messages.add_expense_button}
            >
              <form className='employees_form' onSubmit={handleSubmit(handleExpense)}>
                <FormControl
                  type='select'
                  label='Vehicle'
                  defaultOption='Select Vehicle'
                  required={true}
                  options={vehicleList?.getVehicles?.data.map((vehicle) => ({
                    id: vehicle._id,
                    name: vehicle.details.name,
                  }))}
                  register={register('vehicle', {
                    required: true,
                  })}
                />
                <FormControl
                  type='select'
                  label='Type'
                  defaultOption='Select Type'
                  required={true}
                  options={expenseType.map((type) => ({
                    id: type.id,
                    name: type.value,
                  }))}
                  register={register('expense.type', {
                    required: true,
                  })}
                />
                <FormControl
                  type='number'
                  label='Cost'
                  required={true}
                  register={register('expense.cost', {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
                <label className='employee_form_inp'>
                  <h6>Description</h6>
                  <textarea
                    className='form-control'
                    rows='1'
                    register={register('expense.description')}
                  ></textarea>
                </label>
                <FormControl
                  type='document'
                  label='Document'
                  register={register('expense.documentUrl')}
                />
                <FormControl
                  type='image'
                  label='Photo'
                  setValue={setValue}
                  setPhoto='expense.photoUrl'
                />
                <div className='col-12 d-flex justify-content-end'>
                  <button className='btn btn-primary px-5' type='submit'>
                    Save Expense
                  </button>
                </div>
              </form>
            </AddButtons>
          </div>
        </div>
        <ul className='d-flex'>
          <li>
            <button type='button' className='btn btn-text-dark'>
              All
            </button>
          </li>
          <li>
            <button type='button' className='btn btn-text-dark'>
              Service Expenses
            </button>
          </li>
          <li>
            <button type='button' className='btn btn-text-dark'>
              Fuel Expenses
            </button>
          </li>
          <li>
            <button type='button' className='btn btn-text-dark'>
              Other Expenses
            </button>
          </li>
        </ul>

        <ReusableTable
          tableRef={tableRef}
          data={financesList.getFinances.data}
          columns={columns}
          setModal={setOpenFinanceModal}
          setId={setID}
          fileName='Finance List'
          sheetName='Finance'
        />

        <Edit
          buttonTitle='Edit Vehicle List'
          setModal={setOpenFinanceModal}
          modal={openFinanceModal}
        >
          <EditFin
            setModal={setOpenFinanceModal}
            compData={financesList}
            refetchQuery={GET_FINANCES_LIST}
            id={ID}
          />
        </Edit>
      </div>
    </>
  );
};

export default Finances;
