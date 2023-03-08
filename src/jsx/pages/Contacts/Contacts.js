/**
 * @description
 *    this component for display the contacts data using multiple components
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
import { CONTACT_COLUMNS } from '../../components/table/FilteringTable/Columns';
import { GET_CONTACT, GET_EMPLOYEE } from '../../../utilities/Apollo/Querries';
import ModalFormControl from '../../components/modalsWrapper/ModalFormControl';
import { useForm } from 'react-hook-form';
import { CREATE_CONTACT, UPDATE_CONTACT_MULTIPLE } from '../../../utilities/Apollo/Mutate';
import DownloadExcel from '../../components/importExportExcel/DownloadExcel';
import TableExcel from '../../components/importExportExcel/TableExcel';
import { toast } from 'react-toastify';
import Edit from '../../components/reusableEdit/Edit';
import EditContact from '../../components/reusableEdit/editablecomp/EditContact';
import Loader from '../../../utilities/Loader';

const Contacts = () => {
  const columns = useMemo(() => CONTACT_COLUMNS, []);
  const [active, setActive] = useState(null);
  const toastId = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [openModall, setOpenModall] = useState(false);
  const [contacts, setContacts] = useState([]);

  const [openEmployeeModal, setOpenEmployeeModal] = useState(false);
  const [ID, setID] = useState(false);

  const { loading, error, refetch } = useQuery(GET_CONTACT, {
    variables: {
      filter: null,
      options: { showAll: true },
    },
    onCompleted: (data) => {
      setContacts(data.getContacts.data);
    },
  });

  // const instructions = [
  //   { dt: 'In Classification choose one of the following ENUM', dd: ['Fuel', 'Service_Center', 'Spare_Parts', 'Tires', 'Others'] }
  // ]
  const instructions = 'In Classification choose one of the following ENUM (1- Fuel , 2- Service_Center, 3- Spare_Parts , 4- Tires 5- Others )'

  const intl = useIntl();
  const history = useHistory();
  const tableRef = useRef(null);
  const tableRefMulti = useRef(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    contact: {
      classification: null,
      email: null,
      firstAddress: null,
      firstMobile: null,
      name: null,
      secondAddress: null,
      secondMobile: null,
      website: null,
    },
  });
  const classification = [
    { firstName: 'Fuel' },
    { firstName: 'Service_Center' },
    { firstName: 'Spare_Parts' },
    { firstName: 'Tires' },
    { firstName: 'Others' },
  ];

  const [AddContacts] = useMutation(UPDATE_CONTACT_MULTIPLE, {
    refetchQueries: [{
      query: GET_CONTACT,
      variables: {
        options: {
          showAll: true,
        },
      },
    },
    ],
  });

  const convertExcelDataToNeededArray = (Arr) => {
    const CONVERTED = Arr.map((col) => ({
      name: col['Name'],
      firstMobile: `${col['Mobile']}`,
      email: col['Mail'],
      classification: col['Classification'],
      firstAddress: col['Address'],
      website: col['Website'],
    }));
    AddContacts({
      variables: {
        contacts: CONVERTED,
      },
    });
  };
  const [createContact] = useMutation(CREATE_CONTACT, {
    refetchQueries: [
      {
        query: GET_CONTACT,
        variables: {
          options: {
            showAll: true,
          },
        },
      },
    ],
  });
  
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
  


  const handleContact = (values) => {
    toastId.current = toast('Creating...', {
      autoClose: false,
    });


    createContact({
      variables: values,
      onCompleted: (value) => {
        toast.update(toastId.current, {
          render: `Adding New Contact to the list`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        setContacts((prev) => [...prev, value.createContact]);
        setOpenModal(false);
        reset();
      },
      onError: (error) => {
        toast.update(toastId.current, {
          render: `Something went wrong,${error}`,
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
          <h1>{intl.messages.contacts}</h1>
          <div className={`d-flex col-md-7 col-lg-5 justify-content-between`}>
            <AddButtons
              col='col-5'
              setOpenModal={setOpenModal}
              openModal={openModal}
              addButton={intl.messages.add_contacts_button}
            >
              <ModalFormControl
                handleSubmit={handleSubmit(handleContact)}
                watch={watch}
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
                instructions={instructions}
                convert={convertExcelDataToNeededArray}
                fileName={intl.messages.contacts}
                sheetName={intl.messages.contacts}
              />
            </AddButtons>
          </div>
        </div>
        <ul className='d-flex'>
          <li>
            <button
              type='button'
              className={`btn btn-text-dark ${active === null ? 'active' : ''}`}
              onClick={() => {
                setActive(null);
                refetch({ filter: null });
              }}
            >
              {intl.messages.all_button}
            </button>
          </li>
          {classification.map((x, i) => (
            <li>
              <button
                type='button'
                className={`btn btn-text-dark ${active === x.firstName ? 'active' : ''}`}
                onClick={() => {
                  setActive(x.firstName);
                  refetch({
                    filter: {
                      classification: x.firstName,
                    },
                  });
                }}
              >
                {x.firstName}
              </button>
            </li>
          ))}
        </ul>
        <TableExcel columns={columns} tableRefMulti={tableRefMulti} />
        <ReusableTable
          tableRef={tableRef}
          data={contacts}
          columns={columns}
          setId={setID}
          setModal={setOpenEmployeeModal}
          fileName={intl.messages.contacts}
          sheetName='contacts'
        />

        <Edit
          buttonTitle='Edit Vehicle List'
          setModal={setOpenEmployeeModal}
          modal={openEmployeeModal}
        >
          <EditContact
            setModal={setOpenEmployeeModal}
            // compData={employee}
            refetchQuery={GET_CONTACT}
            id={ID}
          />
        </Edit>
      </div>
    </>
  );
};

export default Contacts;
