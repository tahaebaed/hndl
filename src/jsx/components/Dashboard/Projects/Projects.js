import React, { Fragment, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Nav } from 'react-bootstrap';
import data from './Tabldata.js';

import Alldata from './Alldata';
import Process from './Process';
import Pending from './Pending';
import Closed from './Closed';

const tabData = [
  { number: '13', name: 'All Projects', content: <Alldata /> },
  { number: '2', name: 'On Process', content: <Process /> },
  { number: '4', name: 'Pending', content: <Pending /> },
  { number: '7', name: 'Closed', content: <Closed /> },
];

const Projects = () => {
  const sort = 10;
  const activePag = useRef(0);
  const jobData = useRef(
    data.patientTable.data.slice(activePag.current * sort, (activePag.current + 1) * sort),
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

    jobData.current = data.patientTable.data.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort,
    );
    setdemo(data.patientTable.data.slice(activePag.current * sort, (activePag.current + 1) * sort));
  };
  return (
    <Fragment>
      <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
        <div className='d-lg-flex d-block mb-3 pb-3 border-bottom'>
          <div className='card-action card-tabs mb-lg-0 mb-3  mr-auto'>
            <Nav as='ul' className='nav nav-tabs tabs-lg'>
              {tabData.map(
                (data, i) =>
                  i !== tabData.length && (
                    <Nav.Item as='li' key={i}>
                      <Nav.Link eventKey={data.name.toLowerCase()}>
                        <span>{data.number}</span>
                        {data.name}
                      </Nav.Link>
                    </Nav.Item>
                  ),
              )}
            </Nav>
          </div>
          <div>
            <Link to={'/calendar'} className='btn btn-primary rounded'>
              New Project
            </Link>
            <Link to={'#'} className='mx-4'>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3.99976 7H19.9998C20.7954 7 21.5585 6.68393 22.1211 6.12132C22.6837 5.55871 22.9998 4.79565 22.9998 4C22.9998 3.20435 22.6837 2.44129 22.1211 1.87868C21.5585 1.31607 20.7954 1 19.9998 1H3.99976C3.20411 1 2.44104 1.31607 1.87844 1.87868C1.31583 2.44129 0.999756 3.20435 0.999756 4C0.999756 4.79565 1.31583 5.55871 1.87844 6.12132C2.44104 6.68393 3.20411 7 3.99976 7Z'
                  fill='#CBCBCB'
                />
                <path
                  d='M19.9998 9H3.99976C3.20411 9 2.44104 9.31607 1.87844 9.87868C1.31583 10.4413 0.999756 11.2044 0.999756 12C0.999756 12.7956 1.31583 13.5587 1.87844 14.1213C2.44104 14.6839 3.20411 15 3.99976 15H19.9998C20.7954 15 21.5585 14.6839 22.1211 14.1213C22.6837 13.5587 22.9998 12.7956 22.9998 12C22.9998 11.2044 22.6837 10.4413 22.1211 9.87868C21.5585 9.31607 20.7954 9 19.9998 9Z'
                  fill='#CBCBCB'
                />
                <path
                  d='M19.9998 17H3.99976C3.20411 17 2.44104 17.3161 1.87844 17.8787C1.31583 18.4413 0.999756 19.2044 0.999756 20C0.999756 20.7956 1.31583 21.5587 1.87844 22.1213C2.44104 22.6839 3.20411 23 3.99976 23H19.9998C20.7954 23 21.5585 22.6839 22.1211 22.1213C22.6837 21.5587 22.9998 20.7956 22.9998 20C22.9998 19.2044 22.6837 18.4413 22.1211 17.8787C21.5585 17.3161 20.7954 17 19.9998 17Z'
                  fill='#CBCBCB'
                />
              </svg>
            </Link>
            <Link to={'#'}>
              <svg
                width='24'
                height='24'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M7.99976 0.999939H3.99976C2.3429 0.999939 0.999756 2.34308 0.999756 3.99994V7.99994C0.999756 9.65679 2.3429 10.9999 3.99976 10.9999H7.99976C9.65661 10.9999 10.9998 9.65679 10.9998 7.99994V3.99994C10.9998 2.34308 9.65661 0.999939 7.99976 0.999939Z'
                  fill='#2953E8'
                />
                <path
                  d='M19.9998 0.999939H15.9998C14.3429 0.999939 12.9998 2.34308 12.9998 3.99994V7.99994C12.9998 9.65679 14.3429 10.9999 15.9998 10.9999H19.9998C21.6566 10.9999 22.9998 9.65679 22.9998 7.99994V3.99994C22.9998 2.34308 21.6566 0.999939 19.9998 0.999939Z'
                  fill='#2953E8'
                />
                <path
                  d='M7.99976 13H3.99976C2.3429 13 0.999756 14.3431 0.999756 16V20C0.999756 21.6569 2.3429 23 3.99976 23H7.99976C9.65661 23 10.9998 21.6569 10.9998 20V16C10.9998 14.3431 9.65661 13 7.99976 13Z'
                  fill='#2953E8'
                />
                <path
                  d='M19.9998 13H15.9998C14.3429 13 12.9998 14.3431 12.9998 16V20C12.9998 21.6569 14.3429 23 15.9998 23H19.9998C21.6566 23 22.9998 21.6569 22.9998 20V16C22.9998 14.3431 21.6566 13 19.9998 13Z'
                  fill='#2953E8'
                />
              </svg>
            </Link>
          </div>
        </div>
        <Tab.Content>
          {tabData.map(
            (data, i) =>
              i !== tabData.length && (
                <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
                  <div>{data.content}</div>
                </Tab.Pane>
              ),
          )}
        </Tab.Content>
      </Tab.Container>
    </Fragment>
  );
};

export default Projects;
