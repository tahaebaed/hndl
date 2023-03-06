import React, { useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useForm, useFieldArray } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_EXPENSES_HISTORY, UPDATE_INSPECTION } from '../../../../utilities/Apollo/Mutate';
import SelectInput from '../../../pages/Inspection/add_inspection/SelectInput';
import { GET_SINGLE_FINANCES, GET_VEHICLES } from '../../../../utilities/Apollo/Querries';
import { DELETE_FINANCE } from '../../../../utilities/Apollo/Delete';
import FormControl from '../../../pages/Employees/employee_fromcontrol/FormControl';
import Loader from '../../../../utilities/Loader';
const EditFin = ({ id, setModal, compData, refetchQuery }) => {
  const intl = useIntl();
  const tableRef = useRef(null);
  const toastId = useRef(null);
  const [checked, setChecked] = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm({
    updateFinanceId: null,
    finance: {
      expenses: [
        {
          cost: null,
          description: null,
          documentUrl: null,
          photoUrl: null,
          type: null,
        },
      ],
      vehicle: null,
    },
  });

  const expenseType = [
    { id: 'Fuel', value: 'Fuel' },
    { id: 'Service', value: 'Service' },
    { id: 'Other', value: 'Other' },
  ];
  const {
    data: financeData,
    loading: loadExpense,
    error: errorExpense,
  } = useQuery(GET_SINGLE_FINANCES, {
    variables: {
      getFinanceId: id,
    },
    onCompleted: (data) => {
      setValue('updateFinanceId', id);
      setValue('finance.vehicle', data?.getFinance?.vehicle?._id);
      data.getFinance.expenses.map((expense, i) => {
        setValue(`finance.expenses[${i}].type`, expense.type);
        setValue(`finance.expenses.${i}.cost`, expense.cost);
        setValue(`finance.expenses.${i}.description`, expense.description);
        setValue(`finance.expenses.${i}.photoUrl`, expense.photoUrl);
        setValue(`finance.expenses.${i}.documentUrl`, expense.documentUrl);
        return expense;
      });
    },
  });

  const { data: vehicleList } = useQuery(GET_VEHICLES, {
    variables: {
      filter: null,
      options: { showAll: true },
    },
  });

  const [deleteFinanceRow] = useMutation(DELETE_FINANCE, {
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
  console.log(refetchQuery);
  const [updateExpensesData] = useMutation(UPDATE_EXPENSES_HISTORY, {
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

  const convertDate = (date) => {
    return date.slice(0, 10);
  };

  const updateFin = (values) => {
    toastId.current = toast('updating ...', {
      autoClose: false,
    });
    updateExpensesData({
      variables: values,
      onCompleted: (data) => {
        toast.update(toastId.current, {
          render: `Expenses has been updated`,
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
  if (loadExpense) {
    return <Loader />;
  }
  return (
    <>
      <form onSubmit={handleSubmit(updateFin)}>
        <FormControl
          type='select'
          label='Vehicle'
          defaultOption='Select Vehicle'
          required={true}
          options={vehicleList?.getVehicles?.data.map((vehicle) => ({
            id: vehicle._id,
            name: vehicle.details.name,
          }))}
          register={register('finance.vehicle', {
            required: true,
          })}
        />
        {financeData?.getFinance?.expenses.map((x, i) => (
          <>
            <div className='d-block'>
              <h5>{convertDate(x.createdAt)}</h5>
            </div>
            <div className='employees_form'>
              <FormControl
                formateStyle={true}
                type='select'
                label='Type'
                defaultOption='Select Type'
                required={true}
                options={expenseType.map((type) => ({
                  id: type.id,
                  name: type.value,
                }))}
                register={register(`finance.expenses.${i}.type`, {
                  required: true,
                })}
              />
              <FormControl
                formateStyle={true}
                type='number'
                label='Cost'
                required={true}
                register={register(`finance.expenses.${i}.cost`, {
                  required: true,
                  valueAsNumber: true,
                })}
              />
              <label className='fin-formate'>
                <h6>Description</h6>
                <textarea
                  className='form-control'
                  rows='1'
                  register={register(`finance.expenses.${i}.description`)}
                ></textarea>
              </label>
              <FormControl
                formateStyle={true}
                type='document'
                label='Document'
                register={register(`finance.expenses.${i}.documentUrl`)}
              />
              <FormControl
                formateStyle={true}
                type='image'
                label='Photo'
                register={register(`finance.expenses.${i}.photoUrl`)}
              />
            </div>
          </>
        ))}
        <div className='col-12 d-flex justify-content-between'>
          <button
            className='btn btn-danger px-5'
            type='button'
            onClick={() => {
              toastId.current = toast('updating ...', {
                autoClose: false,
              });
              deleteFinanceRow({
                variables: { deleteFinanceId: id },
                onCompleted: (data) => {
                  toast.update(toastId.current, {
                    render: `Inspections has been deleted`,
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
            Delete Inspection
          </button>
          <button className='btn btn-primary px-5' type='submit'>
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default EditFin;
