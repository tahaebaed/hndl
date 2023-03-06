import React, { useEffect } from 'react';
import { Dropdown, ListGroup } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import ExportExcel from '../exportExcel/ExportExcel';

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);
  return <input type='checkbox' ref={resolvedRef} {...rest} />;
});

const PrintAndExcel = ({ toggleColumns, columns, tableRef, fileName, sheetName }) => {
  const intl = useIntl();

  return (
    <>
      <div className='container mb-4 print-table'>
        <div className='row justify-content-between'>
          <div className='col-12 col-md-6 col-lg-4 d-flex justify-content-between'>
            {/* <DownloadTableExcel
              filename={fileName}
              sheet={sheetName}
              currentTableRef={tableRef.current}
            >
              <button className='btn btn-success'>
                <i className='flaticon-381-folder-4 mx-2' />
                {intl.messages.excle_button}
              </button>
            </DownloadTableExcel> */}
            <ExportExcel
              jsonData={tableRef.current}
              sheetName={sheetName}
              fileName={fileName}
            />
            <button
              className='btn btn-secondary px-4'
              onClick={() => {
                window.print();
              }}
            >
              <i className='flaticon-381-file-1 mx-2' />
              {intl.messages.print_button}
            </button>
          </div>
          <div className='col-12 col-md-6 col-lg-4 d-flex justify-content-end'>
            <Dropdown>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                <i className='flaticon-381-settings-4 mx-2' />
                {intl.messages.config_button}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <ListGroup className='config-buttons'>
                  <ListGroup.Item>
                    <IndeterminateCheckbox {...toggleColumns()} /> Toggle All
                  </ListGroup.Item>
                  {columns.map((column) => (
                    <ListGroup.Item key={column.id}>
                      <label>
                        <input type='checkbox' {...column.getToggleHiddenProps()} />
                        {column.Header}
                      </label>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrintAndExcel;
