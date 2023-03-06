import React, { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ISSUE } from '../../../../utilities/Apollo/Mutate';
import { GET_INSPECTION_LIST } from '../../../../utilities/Apollo/Querries';
import { toast } from 'react-toastify';

const ReportInspectionIssue = ({ name, vehicleId }) => {
  const toastId = useRef(null);

  const [createIssue, { data: createdIssue }] = useMutation(CREATE_ISSUE, {
    refetchQueries: [{
      query: GET_INSPECTION_LIST,
      variables: {
        options: {
          showAll: true,
        },
      },
    }],
  });

  return (
    <div>
      <p
        className='m-0'
        onClick={() => {
          toastId.current = toast('Creating...', {
            autoClose: false,
          });
          createIssue({
            variables: { issue: { name: name, vehicle: vehicleId } },
            onCompleted: (data) => {
              toast.update(toastId.current, {
                render: `The Issue has been reported successfully`,
                type: toast.TYPE.SUCCESS,
                autoClose: 3000,
              });
            },
            onError: (errors) => {
              console.log(errors);
              toast.update(toastId.current, {
                render: `Something went wrong ,${errors}`,
                type: toast.TYPE.ERROR,
                autoClose: 3000,
              });
            },
          });
        }}>
        Report Issue
      </p>
    </div>
  );
};

export default ReportInspectionIssue;
