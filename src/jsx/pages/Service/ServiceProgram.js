/**
 * @description
 *    this component for display the service list data using multiple components
 *    AddButtons =>
 *    that take :
 *        - wrapperClassName: this to add custom class and styles to the container div
 *        - title: to add the title or label for the button
 *        - addButton: to add the title or label for the button
 *        - addMultiple: boolean state to display if there is multiple button to display
 *    ReusableTable :
 *        - data: what we fetched from the API using useQuery method @param GET_SERVICE_LIST as the query type to fetch the data
 *        - columns: the columns array to display and filter table columns data
 *        - fileName: passing the file name that will be exported/download as excel sheet
 *        - sheetName:  passing the sheet name that will be exported/download in the file
 *        - tableRef:  passing the useRef() element to watch on the table
 */

// packages imports
import Cookies from 'js-cookie';
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';

// local and components import
import AddButtons from '../../components/buttons/AddButtons';

import {
  GET_GROUPS,
  GET_SERVICE_PROGRAM,
  GET_SERVICE_PROGRAMS,
  GET_VEHICLES,
} from '../../../utilities/Apollo/Querries';

import './services.css';
import { Dropdown, Modal, ModalBody } from 'react-bootstrap';
import {
  CREATE_SERVICE_PROGRAM,
  DELETE_SERVICE_PROGRAM,
  UPDATE_SERVICE_PROGRAM,
} from '../../../utilities/Apollo/Mutate';
import { useFieldArray, useForm } from 'react-hook-form';
import AddTask from './serviceItem/AddTask';
import AddProgram from './serviceItem/AddProgram';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import EditProgram from './serviceItem/EditProgram';
import { toast } from 'react-toastify';

const ServiceProgram = () => {
  // const columns = useMemo(() => COLUMNS_SERVICE_LIST, [])
  const [localProgramList, setProgramList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [addNewTask, setAddNewTask] = useState(false);
  const [edit, setEdit] = useState('');
  const [checked, setChecked] = useState('');
  const [editProgram, setEditProgram] = useState(false);

  const toastId = useRef(null);

  const { loading, error } = useQuery(GET_SERVICE_PROGRAMS, {
    variables: {
      options: { showAll: true },
    },
    onCompleted: (values) => {
      setProgramList(values.getServicePrograms.data);
    },
  });

  const [getProgram, { data: programData, loading: loadProgram }] =
    useLazyQuery(GET_SERVICE_PROGRAM);
  const [updateProgram] = useMutation(UPDATE_SERVICE_PROGRAM);
  const [createProgram] = useMutation(CREATE_SERVICE_PROGRAM);
  const [deleteProgram] = useMutation(DELETE_SERVICE_PROGRAM);
  const { data: vehiclesList } = useQuery(GET_VEHICLES);
  const { data: groupList } = useQuery(GET_GROUPS);

  const vehicleType = [
    'Car',
    'SUV',
    'Van',
    'Pickup_Truck',
    'Bus',
    'Semi_Truck',
    'Truck',
    'Trailer',
    'Forklift',
    'Loader',
    'Equipment',
    'Others',
  ];
  const {
    register: programRegister,
    handleSubmit: handleProgramSubmit,
    control,
    setValue,
    formState: { errors: createProgramErrors },
  } = useForm({
    defaultValues: {
      serviceProgram: {
        name: '',
        relatedTo: 'All_Vehicles',
        relatedGroups: '',
        relatedVehiclesTypes: [],
      },
    },
  });
  const {
    register: editProgramRegister,
    handleSubmit: handleEditProgramSubmit,
    control: editControl,
    setValue: setEditValue,
    formState: { errors: editProgramErrors },
  } = useForm({
    defaultValues: {
      serviceProgram: {
        name: '',
        relatedTo: 'All_Vehicles',
        relatedGroups: '',
        tasks: [],
        relatedVehiclesTypes: [],
      },
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'serviceProgram.tasks',
  });
  const {
    fields: editFields,
    append: editAppend,
    remove: editRemove,
  } = useFieldArray({
    control: editControl,
    name: 'serviceProgram.tasks',
  });

  const {
    register: taskRegister,
    handleSubmit,
    reset: addTaskReset,
  } = useForm({
    defaultValues: {
      name: null,
      description: null,
      workingHoursInterval: 0,
      workingHoursIntervalDueSoonThreshold: 0,
      distanceInterval: 0,
      distanceIntervalDueSoonThreshold: 0,
      timeInterval: { unit: 'Day', value: 0 },
      timeIntervalDueSoonThreshold: { unit: 'Day', value: 0 },
    },
  });

  const handleSubmitAddTask = (values) => {
    append(values);
    addTaskReset();
    setAddNewTask(false);
  };
  const handleSubmitAddEditTask = (values) => {
    editAppend(values);
    addTaskReset();
    setAddNewTask(false);
  };
  const handleSubmitProgram = (values) => {
    toastId.current = toast('Creating...', {
      autoClose: false,
    });

    createProgram({
      variables: values,
      onCompleted: (data) => {
        setProgramList((prev) => [...prev, data.createServiceProgram]);
        toast.update(toastId.current, {
          render: `program ${data.createServiceProgram.name} has been Added`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        setOpenModal(false);
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
  const handleEditProgram = (values) => {
    console.log(values);
    toastId.current = toast('Editing...', {
      autoClose: false,
    });

    updateProgram({
      variables: {
        updateServiceProgramId: programData?.getServiceProgram._id,
        serviceProgram: {
          ...values.serviceProgram,
        },
      },
      onCompleted: (value) => {
        toast.update(toastId.current, {
          render: `program ${value.updateServiceProgram.name} has been Edited`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        setEditProgram(false);
      },
      onError: (value) => {
        toast.update(toastId.current, {
          render: `Something went wrong`,
          type: toast.TYPE.WARNING,
          autoClose: 3000,
        });
      },
      refetchQueries: [{ query: GET_SERVICE_PROGRAMS }],
    });
  };

  const intl = useIntl();
  const history = useHistory();
  useEffect(() => {
    if (!Cookies.get('token')) {
      history.push('/page-login');
    }
  }, [history]);

  return (
    <>
      <div className='contianer'>
        <div className={`d-flex justify-content-between mb-5 print-table`}>
          <h1>{intl.messages.service_program}</h1>
          <div className={`d-flex col-md-7 col-lg-5 justify-content-end`}>
            <AddButtons
              wrapperClassName='d-flex justify-content-end mb-5'
              setOpenModal={setOpenModal}
              openModal={openModal}
              title={intl.messages.service_program}
              addButton={intl.messages.add_service_program_button}
            >
              <AddProgram
                checked={checked}
                getProgram={getProgram}
                edit={edit}
                serviceProgramList={localProgramList}
                fields={fields}
                groupList={groupList}
                handleProgramSubmit={handleProgramSubmit(handleSubmitProgram)}
                programRegister={programRegister}
                remove={remove}
                setAddNewTask={setAddNewTask}
                setChecked={setChecked}
                setEdit={setEdit}
                setValue={setValue}
                vehicleType={vehicleType}
                vehiclesList={vehiclesList}
                error={createProgramErrors}
              />
              <AddTask
                setOpenModal={setOpenModal}
                openModal={openModal}
                addNewTask={addNewTask}
                taskRegister={taskRegister}
                handleSubmit={handleSubmit(handleSubmitAddTask)}
              />
            </AddButtons>
          </div>
        </div>
        {loading && <p>Loading programs...</p>}

        {error && <p>error {error.message}</p>}

        {localProgramList.length === 0 ? (
          <h3 className='text-center'>There is no programs for now...</h3>
        ) : (
          <div className='service__program-cards__wrapper'>
            {localProgramList.map((card, index) => (
              <div className='' key={index}>
                <div className='d-flex align-items-center justify-content-between'>
                  <h4 className='text-primary'>{card.name}</h4>
                  <Dropdown id='dropdown-autoclose-true'>
                    <Dropdown.Toggle className='service__program-card__toggle'>...</Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          setEditProgram((prev) => !prev);

                          getProgram({
                            variables: {
                              getServiceProgramId: card._id,
                            },
                            onCompleted: (data) => {
                              const tasks = data.getServiceProgram.tasks.map(
                                ({ __typename, ...task }) => ({
                                  ...task,
                                  timeInterval: {
                                    value: +task.timeInterval.value,
                                    unit: task.timeInterval.unit,
                                  },
                                  timeIntervalDueSoonThreshold: {
                                    value: +task.timeIntervalDueSoonThreshold.value,
                                    unit: task.timeIntervalDueSoonThreshold.unit,
                                  },
                                }),
                              );

                              setEditValue('serviceProgram.name', data.getServiceProgram.name);
                              setEditValue(
                                'serviceProgram.relatedTo',
                                data.getServiceProgram.relatedTo || ''
                              );
                              setEditValue(
                                'serviceProgram.relatedGroups',
                                data.getServiceProgram.relatedGroups[0]._id || '',
                              );
                              setEditValue('serviceProgram.tasks', tasks);
                            },
                          });
                        }}
                      >
                        Edit
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => {
                          toastId.current = toast('Copying...', {
                            autoClose: false,
                          });

                          createProgram({
                            onCompleted: (value) => {
                              setProgramList((prev) => [...prev, value.createServiceProgram]);
                              toast.update(toastId.current, {
                                render: `program ${card.name} has been copied`,
                                type: toast.TYPE.SUCCESS,
                                autoClose: 3000,
                              });
                            },
                            onError: (value) => {
                              toast.update(toastId.current, {
                                render: `Something went wrong`,
                                type: toast.TYPE.WARNING,
                                autoClose: 3000,
                              });
                            },
                            variables: {
                              serviceProgram: {
                                name: `${card.name}-duplicated-${
                                  Math.floor(Math.random() * 100) + 1
                                }`,
                                tasks: card.tasks.map((task) => ({
                                  name: task.name,
                                  description: task.description,
                                  workingHoursInterval: +task.workingHoursInterval,
                                  workingHoursIntervalDueSoonThreshold:
                                    +task.workingHoursIntervalDueSoonThreshold,
                                  distanceInterval: +task.distanceInterval,
                                  distanceIntervalDueSoonThreshold: task.distanceInterval,
                                  timeInterval: {
                                    value: +task.timeInterval.value || 0,
                                    unit: task.timeInterval.unit || 'Day',
                                  },
                                  timeIntervalDueSoonThreshold: {
                                    value: +task.timeIntervalDueSoonThreshold.value || 0,
                                    unit: task.timeIntervalDueSoonThreshold.unit || 'Day',
                                  },
                                })),
                                relatedTo: card.relatedTo,
                                relatedGroups: card.relatedGroups.map((group) => group._id),
                                relatedVehiclesTypes: card.relatedVehiclesTypes,
                              },
                            },
                          });
                        }}
                      >
                        Copy Program
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item
                        onClick={() => {
                          toastId.current = toast('Deleting...', {
                            autoClose: false,
                          });
                          const currentIndex = localProgramList.indexOf(card);
                          const newFilteredArr = localProgramList.filter(
                            (_, i) => i !== currentIndex,
                          );
                          setProgramList(newFilteredArr);
                          deleteProgram({
                            variables: {
                              deleteServiceProgramId: card._id,
                            },
                            onCompleted: (_) => {
                              toast.update(toastId.current, {
                                render: `program ${card.name} has been deleted`,
                                type: toast.TYPE.INFO,
                                autoClose: 3000,
                              });
                            },
                            onError: (_) => {
                              toast.update(toastId.current, {
                                render: `Something went wrong`,
                                type: toast.TYPE.WARNING,
                                autoClose: 3000,
                              });
                            },
                            refetchQueries: [{ query: GET_SERVICE_PROGRAMS }],
                          });
                        }}
                      >
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <ul>
                  {[
                    { label: 'Tasks', number: card.tasks.length },
                    {
                      label: 'Number of vehicle',
                      number: card.assignedVehiclesCount || 0,
                    },

                    { label: 'Groups', number: card.relatedGroups.length || 0 },
                    {
                      label: 'Types',
                      number: card.relatedVehiclesTypes ? card.relatedVehiclesTypes.length : 0,
                    },
                  ].map((li, index) => (
                    <li className='d-flex justify-content-between align-items-center' key={index}>
                      <h6>{li.label}</h6>
                      <p className='service__program-card__info'>{li.number}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <div>
          <Modal
            className='fade modal-content-size'
            show={editProgram}
            onHide={() => setEditProgram(false)}
          >
            {loadProgram ? (
              <ModalBody>
                <p>Loading program</p>
              </ModalBody>
            ) : (
              <>
                <ModalHeader>
                  <h3>Edit {programData?.getServiceProgram.name}</h3>
                </ModalHeader>
                <ModalBody>
                  <EditProgram
                    checked={checked}
                    edit={edit}
                    id={programData?.getServiceProgram._id}
                    fields={editFields}
                    groupList={groupList}
                    getProgram={getProgram}
                    serviceProgramList={localProgramList}
                    handleProgramSubmit={handleEditProgramSubmit(handleEditProgram)}
                    programRegister={editProgramRegister}
                    remove={editRemove}
                    setAddNewTask={setAddNewTask}
                    setChecked={setChecked}
                    setEdit={setEdit}
                    setValue={setEditValue}
                    vehicleType={vehicleType}
                    vehiclesList={vehiclesList}
                    error={createProgramErrors}
                  />
                  <AddTask
                    addNewTask={addNewTask}
                    taskRegister={taskRegister}
                    handleSubmit={handleSubmit(handleSubmitAddEditTask)}
                    error={createProgramErrors}
                  />
                </ModalBody>
              </>
            )}
          </Modal>
        </div>
      </div>
    </>
  );
};
export default ServiceProgram;
