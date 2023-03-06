/**
 * @description
 *    this component for display the service history data using multiple components
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
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// local and components import
import AddButtons from '../../components/buttons/AddButtons';
import ReusableTable from '../../components/tableComponent/ReusableTable';
import { COLUMNS_SERVICE_HISTORY } from '../../components/table/FilteringTable/Columns';
import { GET_SERVICE_LIST } from '../../../utilities/Apollo/Querries';
import Loader from '../../../utilities/Loader';

const ServiceHistory = () => {
  const columns = useMemo(() => COLUMNS_SERVICE_HISTORY, []);

  const {
    data: serviceList,
    loading,
    error,
  } = useQuery(GET_SERVICE_LIST, {
    variables: {
      options: {
        showAll: true,
      },
      filter: {
        status: 'Completed',
      },
    },
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
    return <p>error {error.message}</p>;
  }
  return (
    <>
      <div className='contianer'>
        <div className={`d-flex justify-content-between mb-5 print-table`}>
          <h1>{intl.messages.service_history}</h1>
          <div className={`d-flex col-md-7 col-lg-5 justify-content-end`}>
            <AddButtons
              wrapperClassName='d-flex justify-content-between mb-5'
              title={intl.messages.service_history || 'service history'}
            />
          </div>
        </div>
        <ReusableTable
          tableRef={tableRef}
          data={serviceList.getServices.data.filter((resolved) => resolved.status === 'Completed')}
          columns={columns}
          fileName={intl.messages.service_history}
          sheetName='service history'
        />
      </div>
    </>
  );
};
export default ServiceHistory;
