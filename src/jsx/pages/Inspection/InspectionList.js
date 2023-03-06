import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { CREATE_INSPECTION } from '../../../utilities/Apollo/Mutate';
import {
  GET_EMPLOYEE,
  GET_INSPECTION_LIST,
  GET_INSPECTION_FORM,
  GET_VEHICLES,
} from '../../../utilities/Apollo/Querries';
import AddButtons from '../../components/buttons/AddButtons';
import { INSPECTION_COLUMNS } from '../../components/table/FilteringTable/Columns';
import ReusableTable from '../../components/tableComponent/ReusableTable';
import AddInspection from './add_inspection/AddInspection';
import { Dropdown } from 'react-bootstrap';
import ReusableModal from '../../components/modalComponent/ReusableModal';
import FormItem from './add_inspection/FormItem';
import './inspection.css';
import StartInspection from './add_inspection/StartInspection';
import { toast } from 'react-toastify';
import Edit from '../../components/reusableEdit/Edit';
import EditInspections from '../../components/reusableEdit/editablecomp/EditInspections';
import Loader from '../../../utilities/Loader';

const InspectionList = () => {
  const columns = useMemo(() => INSPECTION_COLUMNS, []);
  const intl = useIntl();
  const history = useHistory();
  const tableRef = useRef(null);
  const toastId = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [openInspection, setOpenInspection] = useState(false);
  const [ID, setID] = useState(false);
  const { loading, error } = useQuery(GET_INSPECTION_LIST, {
    onCompleted: (data) => {
      setInspectionLocalList(data.getInspections.data);
    },
    variables: {
      options: {
        showAll: true,
      },
    },
  });
  const { data: vehiclesList } = useQuery(GET_VEHICLES, {
    variables: {
      options: {
        showAll: true,
      },
    },
  });
  const { data: employeesList } = useQuery(GET_EMPLOYEE, {
    variables: {
      options: {
        showAll: true,
      },
    },
  });
  const { data: inspectionForm } = useQuery(GET_INSPECTION_FORM, {
    variables: {
      options: {
        showAll: true,
      },
    },
  });

  const [inspectionLocalList, setInspectionLocalList] = useState([]);
  const [schedule, setSchedule] = useState(false);
  const [scheduleName, setScheduleName] = useState('');
  const [create, setCreate] = useState(false);
  const [createName, setCreateName] = useState('');
  const [showAddItemForm, setShowAddItemForm] = useState(false);
  const {
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      inspection: {
        assignTo: null,
        createdAt: null,
        endTimestamp: null,
        inspectionForm: null,
        repeatTimeInterval: {
          unit: 'Day',
          value: 0,
        },
        startTimestamp: new Date().toJSON().slice(0, 16),
        vehicle: null,
      },
    },
  });
  const [createInspection] = useMutation(CREATE_INSPECTION, {
    refetchQueries: [{
      query: GET_INSPECTION_LIST,
      variables: {
        options: {
          showAll: true,
        },
      },
    }],
  });

  const onSubmit = (values) => {
    toastId.current = toast('Creating...', {
      autoClose: false,
    });
    createInspection({
      variables: values,
      onCompleted: (data) => {
        setInspectionLocalList((prev) => [...prev, data.createInspection]);
        toast.update(toastId.current, {
          render: `A new inspection has been Added`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        setSchedule(false);
        reset();
      },
      onError: (errors) => {
        toast.update(toastId.current, {
          render: `Something went wrong`,
          type: toast.TYPE.WARNING,
          autoClose: 3000,
        });
      },
    });
    reset();
  };

  useEffect(() => {
    if (!Cookies.get('token')) {
      history.push('/page-login');
    }
  }, []);
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p>error {error.message}</p>;
  }

  return (
    <>
      <div className={`d-flex justify-content-between mb-5 print-table`}>
        <h1>{intl.messages.inspection_list}</h1>
        <div className={`d-flex col-md-7 col-lg-5 justify-content-between`}>
          <Dropdown>
            <Dropdown.Toggle variant='primary' id='dropdown-basic'>
              ...
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setSchedule(true);
                  setScheduleName(intl.messages.schedule_inspection);
                }}
              >
                {intl.messages.schedule_inspection}
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  setCreate(true);
                  setCreateName(intl.messages.create_inspection);
                }}
              >
                {intl.messages.create_inspection}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <AddButtons
            col='col-7'
            addButton={intl.messages.start_inspection}
            setOpenModal={setOpenModal}
            openModal={openModal}
          >
            <StartInspection
              setOpenModal={setOpenModal}
              vehiclesList={vehiclesList?.getVehicles.data}
              inspectionLocalList={inspectionLocalList}
              inspectionForm={inspectionForm?.getInspectionForms.data}
            />
          </AddButtons>
        </div>
      </div>
      <ReusableModal openModal={schedule} setOpenModal={setSchedule} buttontitle={scheduleName}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AddInspection
            vehiclesList={vehiclesList?.getVehicles.data.map((vehicle) => ({
              id: vehicle._id,
              name: vehicle.details.name,
            }))}
            employeesList={employeesList?.getEmployees.data.map((employee) => ({
              id: employee._id,
              name: employee.firstName,
            }))}
            inspectionList={inspectionForm?.getInspectionForms.data.map((inspect) => ({
              id: inspect._id,
              name: inspect.name,
            }))}
            {...{ register, watch, errors }}
          />
          <div className='d-flex justify-content-end mt-3'>
            <button type='submit' disabled={!isDirty} className='btn btn-primary'>
              Add Inspection
            </button>
          </div>
        </form>
      </ReusableModal>
      <ReusableModal openModal={create} setOpenModal={setCreate} buttontitle={createName}>
        <FormItem setOpenModal={setCreate} showAddItemForm={showAddItemForm} setShowAddItemForm={setShowAddItemForm} />
      </ReusableModal>
      <ReusableTable
        tableRef={tableRef}
        data={inspectionLocalList}
        setId={setID}
        setModal={setOpenInspection}
        columns={columns}
        fileName='Vehicle List'
        sheetName='vehicles'
      />
      <Edit buttonTitle='Edit Inspection' setModal={setOpenInspection} modal={openInspection}>
        <EditInspections
          setModal={setOpenInspection}
          compData={vehiclesList?.getVehicles.data.map((vehicle) => ({
            id: vehicle._id,
            name: vehicle.details.name,
          }))}
          employeeData={employeesList?.getEmployees.data.map((employee) => ({
            id: employee._id,
            name: employee.firstName,
          }))}
          inspectionList={inspectionForm?.getInspectionForms.data.map((inspect) => ({
            id: inspect._id,
            name: inspect.name,
          }))}
          refetchQuery={GET_INSPECTION_LIST}
          id={ID}
        />
      </Edit>
    </>
  );
};
export default InspectionList;
