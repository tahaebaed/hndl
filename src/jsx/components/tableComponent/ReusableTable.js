// packages imports
import React, { useMemo } from 'react';

// local and component imports
import { GlobalFilter } from '../table/FilteringTable/GlobalFilter';

//styles imports
import './filtering.css';

import { useFilters, useGlobalFilter, usePagination, useTable } from 'react-table';
import PrintAndExcel from '../buttons/PrintAndExcel';
import { useRef } from 'react';
import { setISODay } from 'date-fns';

const ReusableTable = ({ data: list, columns, fileName, sheetName, tableRef, setId, setModal }) => {
  const data = useMemo(() => list, [list]);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useFilters,
    useGlobalFilter,
    usePagination,
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    gotoPage,
    pageCount,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  return (
    <>
      {tableRef && (
        <PrintAndExcel
          tableRef={tableRef}
          toggleColumns={tableInstance.getToggleHideAllColumnsProps}
          columns={tableInstance.allColumns}
          rows={tableInstance.page}
          fileName={fileName}
          sheetName={sheetName}
        />
      )}
      {/* <PageTitle activeMenu="Filtering" motherMenu="Table" /> */}
      <div className='card'>
        <div className='card-body'>
          <div className='table-responsive'>
            <div className='print-table'>
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            </div>
            <table ref={tableRef} {...getTableProps()} className='table dataTable display'>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render('Header')}
                        {column.canFilter ? column.render('Filter') : null}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()} className=''>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      onClick={(e) => {
                        setModal(true);
                        setId(row.original._id);
                      }}
                      className='table-row'
                      {...row.getRowProps()}
                    >
                      {row.cells.map((cell) => {
                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className='d-flex justify-content-between print-table'>
              <span>
                Page
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>
              </span>
              <span className='table-index'>
                Go to page :
                <input
                  type='number'
                  className='ml-2'
                  defaultValue={pageIndex + 1}
                  min={1}
                  onWheel={(e) => e.stopPropagation()}
                  max={pageOptions.length}
                  onChange={(e) => {
                    const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
                    gotoPage(pageNumber);
                  }}
                />
              </span>
            </div>
            <div className='text-center mb-2 print-table'>
              <div className='filter-pagination  mt-3'>
                <button
                  type='button'
                  className='previous-button'
                  onClick={() => gotoPage(0)}
                  disabled={!canPreviousPage}
                >
                  {'<<'}
                </button>

                <button
                  type='button'
                  className='previous-button'
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>
                <button
                  type='button'
                  className='next-button'
                  onClick={() => nextPage()}
                  disabled={!canNextPage}
                >
                  Next
                </button>
                <button
                  type='button'
                  className='next-button'
                  onClick={(e) => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  {'>>'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ReusableTable;
