/**
 * @description
 *    this component for display the vehicles assignment list data using multiple components
 *    AddButtons =>
 *    that take :
 *        - wrapperClassName: this to add custom class and styles to the container div
 *        - title: to add the title or label for the button
 *        - addButton: to add the title or label for the button
 *        - addMultiple: boolean state to display if there is multiple button to display
 *    ReusableTable :
 *        - data: what we fetched from the API using useQuery method @param GET_VEHICLES as the query type to fetch the data
 *        - columns: the columns array to display and filter table columns data
 *        - fileName: passing the file name that will be exported/download as excel sheet
 *        - sheetName:  passing the sheet name that will be exported/download in the file
 *        - tableRef:  passing the useRef() element to watch on the table
 */

// packages imports
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useMutation, useQuery } from '@apollo/client';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

// local and components import
import AddButtons from '../../components/buttons/AddButtons';
import ReusableTable from '../../components/tableComponent/ReusableTable';
import { COLUMNS_ASSIGNMENTS } from '../../components/table/FilteringTable/Columns';
import {
  GET_OPERATORS_SELECT,
  GET_VEHICLES_ASSIGNMENTS,
  GET_VEHICLES_SELECT,
} from '../../../utilities/Apollo/Querries';
import ModalFormControl from '../../components/modalsWrapper/ModalFormControl';
import { useForm } from 'react-hook-form';
import { CREATE_VEHICLE_ASSIGNMENTS } from '../../../utilities/Apollo/Mutate';
import { toast } from 'react-toastify';
import Edit from '../../components/reusableEdit/Edit';
import EditVehicleAssignment from '../../components/reusableEdit/editablecomp/EditVehicleAssignment';
import Loader from '../../../utilities/Loader';

const VehiclesAssignment = () => {
  const columns = useMemo(() => COLUMNS_ASSIGNMENTS, []);
  const [openModal, setOpenModal] = useState(false);
  const [openVehicleModal, setOpenVehicleModal] = useState(false);
  const [ID, setID] = useState(false);
  const toastId = useRef(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    vehicleAssignments: {
      vehicle: null,
      expireAt: null,
      operator: null,
      startTimestamp: new Date().toJSON().slice(0, 16),
      trailer: null,
    },
  });
  const {
    data: vehicelAssignmentsList,
    loading,
    error,
  } = useQuery(GET_VEHICLES_ASSIGNMENTS, {
    variables: {
      options: { showAll: true },
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
      filter: {
        classification: 'Operator',
      },
      options: {
        showAll: true,
      },
    },
  });

  const [createVehicleAssignment] = useMutation(CREATE_VEHICLE_ASSIGNMENTS, {
    refetchQueries: [{ query: GET_VEHICLES_ASSIGNMENTS }],
  });

  const intl = useIntl();
  const history = useHistory();

  const tableRef = useRef(null);

  useEffect(() => {
    if (!Cookies.get('token')) {
      history.push('/page-login');
    }
  }, []);
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <p>{error}...</p>;
  }
  const handleAssignment = (values) => {
    toastId.current = toast('creating', {
      autoClose: false,
    });
    createVehicleAssignment({
      variables: {
        vehicleAssignments: {
          ...values.vehicleAssignments,
          trailer: values.vehicleAssignments?.trailer
            ? values.vehicleAssignments?.trailer
            : undefined,
        },
      },
      onCompleted: (data) => {
        toast.update(toastId.current, {
          render: `new assignment has been Added`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        setOpenModal(false);
        reset();
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
    <>
      <div className=''>
        <div className={`d-flex justify-content-between mb-5 print-table`}>
          <h1>{intl.messages.vehicles_assignment}</h1>
          <div className={`d-flex col-md-7 col-lg-5 justify-content-end`}>
            <AddButtons
              col='col-7'
              openModal={openModal}
              setOpenModal={setOpenModal}
              addButton={intl.messages.add_assignment_button}
            >
              <ModalFormControl
                handleSubmit={handleSubmit(handleAssignment)}
                watch={watch}
                inputs={[
                  {
                    type: 'select',
                    labelTitle: 'Vehicle',
                    required: true,
                    register: register('vehicleAssignments.vehicle', {
                      required: { value: true, message: 'vehicle is required' },
                    }),
                    defaultOption: 'select Vehicle',
                    options:
                      vehicleSelect &&
                      vehicleSelect.getVehicles?.data.filter(
                        (type) => type.details.type !== 'Trailer',
                      ),
                    error: errors?.vehicleAssignments?.vehicle?.message,
                  },
                  {
                    type: 'select',
                    labelTitle: 'Operator',
                    required: true,
                    register: register('vehicleAssignments.operator', {
                      required: { value: true, message: 'vehicle is required' },
                    }),
                    defaultOption: 'select Operator',
                    options: operatorsSelect?.getEmployees?.data.filter(
                      (trailer) => trailer.classification === 'Operator',
                    ),
                    error: errors?.vehicleAssignments?.operator?.message,
                  },
                  {
                    type: 'select',
                    labelTitle: 'Trailer',
                    register: register('vehicleAssignments.trailer'),
                    defaultOption: 'select Trailer',
                    options:
                      vehicleSelect &&
                      vehicleSelect.getVehicles?.data.filter(
                        (type) => type.details.type === 'Trailer',
                      ),
                  },
                  {
                    type: 'datetime-local',
                    labelTitle: 'Start Date',
                    register: register('vehicleAssignments.startTimestamp', {
                      valueAsDate: true,
                    }),
                  },
                  {
                    type: 'datetime-local',
                    labelTitle: 'End Date',
                    register: register('vehicleAssignments.expireAt', {
                      valueAsDate: true,
                    }),
                  },
                ]}
              />
            </AddButtons>
          </div>
        </div>

        <ReusableTable
          data={vehicelAssignmentsList.getVehicleAssignments.data}
          columns={columns}
          setId={setID}
          setModal={setOpenVehicleModal}
          tableRef={tableRef}
          fileName='Vehicle Assignment List'
          sheetName='vehicles Assignments'
        />

        <Edit
          buttonTitle='Edit Vehicle Assignment'
          setModal={setOpenVehicleModal}
          modal={openVehicleModal}
        >
          <EditVehicleAssignment
            setModal={setOpenVehicleModal}
            compData={vehicelAssignmentsList}
            refetchQuery={GET_VEHICLES_ASSIGNMENTS}
            id={ID}
          />
        </Edit>
      </div>
    </>
  );
};

export default VehiclesAssignment;
