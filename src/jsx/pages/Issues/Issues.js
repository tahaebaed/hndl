import { useMutation, useQuery } from '@apollo/client';
import Cookies from 'js-cookie';
import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { CREATE_ISSUE } from '../../../utilities/Apollo/Mutate';
import { GET_EMPLOYEE, GET_ISSUES_List, GET_VEHICLES } from '../../../utilities/Apollo/Querries';
import AddButtons from '../../components/buttons/AddButtons';
import { ISSUES_COLUMNS } from '../../components/table/FilteringTable/Columns';
import ReusableTable from '../../components/tableComponent/ReusableTable';
import CreateIssue from './CreateIusse/CreateIssue';
import { toast } from 'react-toastify';
import Loader from '../../../utilities/Loader';
import Edit from '../../components/reusableEdit/Edit';
import EditIssue from '../../components/reusableEdit/editablecomp/EditIssu';

const Issues = () => {
  const columns = useMemo(() => ISSUES_COLUMNS, []);
  const toastId = useRef(null);
  const tableRef = useRef(null);
  const [openModal, setOpenModal] = useState(false);
  const [openIssueModal, setOpenIssueModal] = useState(false);
  const [ID, setID] = useState(false);
  const {
    data: issuesList,
    loading,
    error,
  } = useQuery(GET_ISSUES_List, {
    variables: {
      options: { showAll: true },
    },
  });
  const { data: vehiclesList } = useQuery(GET_VEHICLES, {
    variables: {
      options: { showAll: true },
    },
  });
  const { data: employeesList } = useQuery(GET_EMPLOYEE, {
    variables: {
      options: { showAll: true },
    },
  });
  const intl = useIntl();
  const history = useHistory();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      issue: {
        assignTo: '',
        comment: '',
        documentUrl: '',
        endTimestamp: '',
        name: '',
        photoUrl: '',
        reportedAt: new Date().toJSON().slice(0, 16),
        reportedBy: '',
        vehicle: '',
      },
    },
  });

  const [createIssue, { data: createdIssue }] = useMutation(CREATE_ISSUE, {
    refetchQueries: [
      {
        query: GET_ISSUES_List,
        variables: {
          options: {
            showAll: true,
          },
        },
      },
    ],
  });
  const handelCeateIssue = (values) => {
    toastId.current = toast('Creating...', {
      autoClose: false,
    });
    let issue = issuesList.getIssues.data.find((ele, i) => ele.name === values.issue.name);
    createIssue({
      variables: {
        issue: {
          ...values.issue,
        },
      },
      onCompleted: (data) => {
        toast.update(toastId.current, {
          render: `A new issue has been Added`,
          type: toast.TYPE.SUCCESS,
          autoClose: 3000,
        });
        setOpenModal(false);
        reset();
      },
      onError: (error) => {
        toast.update(toastId.current, {
          render: `Something went wrong ${error}`,
          type: toast.TYPE.WARNING,
          autoClose: 3000,
        });
      },
    });
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
      <div className=''>
        <div className={`d-flex justify-content-between mb-5 print-table`}>
          <h1>{intl.messages.issues}</h1>
          <div className={`d-flex col-md-7 col-lg-5 justify-content-end`}>
            <AddButtons
              col='col-7'
              addButton={'Create Issue'}
              setOpenModal={setOpenModal}
              openModal={openModal}
            >
              <CreateIssue
                vehicles={vehiclesList?.getVehicles.data}
                employees={employeesList?.getEmployees.data}
                err={errors}
                dirty={isDirty}
                {...{ register, watch, setValue }}
                handleSubmit={handleSubmit(handelCeateIssue)}
              />
            </AddButtons>
          </div>
        </div>
        <ReusableTable
          tableRef={tableRef}
          data={issuesList.getIssues.data}
          columns={columns}
          setId={setID}
          setModal={setOpenIssueModal}
          fileName='Issue'
          sheetName='Issue'
        />
        <Edit
          buttonTitle='Edit Issue'
          setModal={setOpenIssueModal}
          modal={openIssueModal}
        >
          <EditIssue
            setModal={setOpenIssueModal}
            vehicles={vehiclesList?.getVehicles.data}
            employees={employeesList?.getEmployees.data}
            refetchQuery={GET_ISSUES_List}
            id={ID}
          />
        </Edit>
      </div>
    </>
  );
};

export default Issues;
