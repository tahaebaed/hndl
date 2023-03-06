import React, { useRef } from 'react';
import { useMutation } from '@apollo/client';
import { SET_ISSUE_EMERGENCE_TO_SERVICE } from '../../../utilities/Apollo/Mutate';
import { toast } from 'react-toastify';
import { GET_ISSUES_List } from '../../../utilities/Apollo/Querries';

const IssueToService = (id) => {
  const toastId = useRef(null);

  const [issueToService, { data: assginment, loading: loadAssginment, error: errAssginment }] =
    useMutation(SET_ISSUE_EMERGENCE_TO_SERVICE, {
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
  return (
    <div>
      <button
        type='button'
        className='btn btn-danger'
        onClick={(e) => {
          e.stopPropagation()
          toastId.current = toast('updating ...', {
            autoClose: false,
          });
          issueToService({
            variables: { setIssueEmergencyServiceId: id.id },
            onCompleted: (data) => {
              toast.update(toastId.current, {
                render: `Issue has been send to service successfully`,
                type: toast.TYPE.SUCCESS,
                autoClose: 3000,
              });
            },
            onError: (error) => {
              toast.update(toastId.current, {
                render: `Something went wrong ${error}`,
                type: toast.TYPE.DEFAULT,
                autoClose: 3000,
              });
            },
          });
        }}
      >
        Send
      </button>
    </div>
  );
};

export default IssueToService;
