import React, { Fragment, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Table, Pagination, Dropdown } from 'react-bootstrap';
import data from './Tabldata.js';

const Closed = () => {
  const sort = 7;
  let jobPagination = Array(Math.ceil(data.closePatient.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = useRef(
    data.closePatient.slice(activePag.current * sort, (activePag.current + 1) * sort),
  );

  const pendingPatient = [];
  const processPatient = [];
  const closePatient = [];
  jobData.current.map((d, i) =>
    d.act === 'Pending'
      ? pendingPatient.push(d)
      : d.act === 'Process'
      ? processPatient.push(d)
      : d.act === 'Closed'
      ? closePatient.push(d)
      : '',
  );

  const [demo, setdemo] = useState();
  const onClick = (i) => {
    activePag.current = i;

    jobData.current = data.closePatient.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort,
    );
    setdemo(data.closePatient.slice(activePag.current * sort, (activePag.current + 1) * sort));
  };
  return (
    <Fragment>
      <div className='row'>
        <div className='col-lg-12'>
          <div className='tab-content'>
            <div className='tab-pane fade show active' id='navpills-1' role='tabpanel'>
              <Table responsive className='table-responsive card-table rounded table-hover fs-14'>
                <div id='example_wrapper' className='dataTables_wrapper'>
                  <table
                    id='example'
                    className='table border-no display mb-4 dataTablesCard project-bx'
                  >
                    <thead>
                      <tr role='row'>
                        {data.patientTable.columns.map((d, i) => (
                          <th key={i}>{d}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {jobData.current.map((d, i) => (
                        <tr key={i}>
                          <td>
                            <div>
                              <p className='text-primary mb-sm-2 mb-0'>{d.id}</p>
                              <h4 className='title font-w600 mb-2'>
                                <Link to={'/post-details'} className='text-black'>
                                  {d.title}
                                </Link>
                              </h4>
                              <div className='text-dark  text-nowrap'>
                                <i className='fa fa-calendar-o mr-3' aria-hidden='true'></i>
                                Created on Sep 8th, 2020
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className='d-flex align-items-center'>
                              <span className='bolt-icon mr-sm-3 mr-2'>
                                <i className='fa fa-bolt' aria-hidden='true'></i>
                              </span>
                              <div>
                                <p className='mb-sm-1 mb-0 text-dark'>Deadline</p>
                                <span className='text-black font-w600 text-nowrap'>{d.dat}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className='d-flex align-items-center'>
                              <img
                                src={d.Cimg}
                                alt=''
                                className='rounded-circle mr-sm-3 mr-2 img-2'
                              />
                              <div>
                                <p className='mb-sm-1 mb-0 text-dark text-nowrap'>Client</p>
                                <span className='text-black font-w600'>{d.st}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className='d-flex align-items-center'>
                              <img
                                src={d.Pimg}
                                alt=''
                                className='rounded-circle mr-sm-3 mr-2 img-2'
                              />
                              <div>
                                <p className='mb-sm-1 mb-0 text-dark'>Person in charge</p>
                                <span className='text-black font-w600 text-nowrap'>Alex Noer</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            {d.act === 'Process' ? (
                              <Link to={'#'} className='btn btn-info d-block rounded'>
                                {' '}
                                {d.act}{' '}
                              </Link>
                            ) : d.act === 'Closed' ? (
                              <Link to={'#'} className='btn btn-danger d-block rounded'>
                                {' '}
                                {d.act}{' '}
                              </Link>
                            ) : d.act === 'Pending' ? (
                              <Link to={'#'} className='btn btn-warning d-block rounded'>
                                {' '}
                                {d.act}{' '}
                              </Link>
                            ) : (
                              ''
                            )}
                          </td>
                          <td>
                            <Dropdown>
                              <Dropdown.Toggle variant className='icon-false table-dropdown'>
                                <svg
                                  width='24'
                                  height='24'
                                  viewBox='0 0 24 24'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                >
                                  <path
                                    d='M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z'
                                    stroke='#575757'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  ></path>
                                  <path
                                    d='M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z'
                                    stroke='#575757'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  ></path>
                                  <path
                                    d='M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z'
                                    stroke='#575757'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                  ></path>
                                </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item to='#'>Edit</Dropdown.Item>
                                <Dropdown.Item to='#'>Delete </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className='d-flex justify-content-between align-items-center mt-3'>
                    <div className='dataTables_info'>
                      Showing {activePag.current * sort + 1} to
                      {data.patientTable.data.length < (activePag.current + 1) * sort
                        ? data.patientTable.data.length
                        : (activePag.current + 1) * sort}
                      of {data.patientTable.data.length} entries
                    </div>
                    <div className='dataTables_paginate paging_simple_numbers'>
                      <Pagination size='lg'>
                        <li
                          className='page-item page-indicator '
                          onClick={() => activePag.current > 0 && onClick(activePag.current - 1)}
                        >
                          {/* <Link className="page-link" to="#">  <i className="la la-angle-left" /></Link> */}
                          <Link className='paginate_button previous' to='#'>
                            {' '}
                            Previous
                          </Link>
                        </li>
                        {jobPagination.map((number, i) => (
                          <Pagination.Item
                            className={activePag.current === i ? 'active' : ''}
                            onClick={() => onClick(i)}
                          >
                            {number}
                          </Pagination.Item>
                        ))}
                        <li
                          className='page-item page-indicator'
                          onClick={() =>
                            activePag.current + 1 < jobPagination.length &&
                            onClick(activePag.current + 1)
                          }
                        >
                          {/* <Link className="page-link" to="#"><i className="la la-angle-right" /></Link> */}
                          <Link className='paginate_button next' to='#'>
                            {' '}
                            Next
                          </Link>
                        </li>
                      </Pagination>
                    </div>
                  </div>
                </div>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Closed;
