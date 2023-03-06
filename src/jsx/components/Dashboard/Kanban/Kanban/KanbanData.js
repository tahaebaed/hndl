import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';

//import pic11 from './../../../../images/contacts/pic11.jpg';
//import pic22 from './../../../../images/contacts/pic22.jpg';
//import pic33 from './../../../../images/contacts/pic33.jpg';
//import pic222 from './../../../../images/contacts/pic222.jpg';

import user1 from '../../../../../images/users/1.jpg';
import user2 from '../../../../../images/users/2.jpg';
import user3 from '../../../../../images/users/3.jpg';
import user4 from '../../../../../images/users/4.jpg';
import user5 from '../../../../../images/users/5.jpg';
import user6 from '../../../../../images/users/6.jpg';
import user7 from '../../../../../images/users/7.jpg';
import user8 from '../../../../../images/users/8.jpg';
import user9 from '../../../../../images/users/9.jpg';
import user10 from '../../../../../images/users/10.jpg';
import user11 from '../../../../../images/users/11.jpg';
import user12 from '../../../../../images/users/12.jpg';

function ColumnHeader1() {
  return (
    <>
      <div className='line bg-warning'></div>
      <div className='card-header shadow-sm'>
        <div>
          <h4 className='fs-20 mb-0 font-w600 text-black'>OnProgress (2)</h4>
          <span className='fs-14'>Lorem ipsum dolor sit amet</span>
        </div>
        <Link to={'/contacts'} className='plus-icon'>
          <i className='fa fa-plus' aria-hidden='true'></i>
        </Link>
      </div>
    </>
  );
}
function ColumnHeader2() {
  return (
    <>
      <div className='line bg-success'></div>
      <div className='card-header shadow-sm'>
        <div>
          <h4 className='fs-20 mb-0 font-w600 text-black'>Done (3)</h4>
          <span className='fs-14'>Lorem ipsum dolor sit amet</span>
        </div>
        <Link to={'/contacts'} className='plus-icon'>
          <i className='fa fa-plus' aria-hidden='true'></i>
        </Link>
      </div>
    </>
  );
}
function ColumnHeader3() {
  return (
    <>
      <div className='line bg-danger'></div>
      <div className='card-header shadow-sm'>
        <div>
          <h4 className='fs-20 mb-0 font-w600 text-black'>Revised (0)</h4>
          <span className='fs-14'>Lorem ipsum dolor sit amet</span>
        </div>
        <Link to={'/contacts'} className='plus-icon'>
          <i className='fa fa-plus' aria-hidden='true'></i>
        </Link>
      </div>
    </>
  );
}
function ColumnHeader4() {
  return (
    <>
      <div className='line bg-secondary'></div>
      <div className='card-header shadow-sm'>
        <div>
          <h4 className='fs-20 mb-0 font-w600 text-black'>To-Do List (24)</h4>
          <span className='fs-14'>Lorem ipsum dolor sit amet</span>
        </div>
        <Link to={'/contacts'} className='plus-icon'>
          <i className='fa fa-plus' aria-hidden='true'></i>
        </Link>
      </div>
    </>
  );
}

function SubCard1() {
  return (
    <>
      <div className='card draggable-handle draggable'>
        <div className='card-body'>
          <div className='border-bottom pb-4'>
            <Link to={'#'} className='btn btn-sm btn-success rounded-xl mb-2'>
              Graphic Deisgner
            </Link>
            <p className='font-w600'>
              <Link to={'/post-details'} className='text-black'>
                Visual Graphic for Presentation to Client
              </Link>
            </p>
            <div className='row justify-content-between'>
              <ul className='users col-6'>
                <li>
                  <img src={user1} alt='' />
                </li>
                <li>
                  <img src={user2} alt='' />
                </li>
                <li>
                  <img src={user3} alt='' />
                </li>
                <li>
                  <img src={user4} alt='' />
                </li>
              </ul>
              <div className='col-6 pl-0'>
                <h6 className='fs-14'>
                  Progress
                  <span className='pull-right font-w600'>24%</span>
                </h6>
                <div className='progress' style={{ height: '7px' }}>
                  <div
                    className='progress-bar bg-primary progress-animated'
                    style={{ width: '24%', height: '7px' }}
                    role='progressbar'
                  >
                    <span className='sr-only'>24% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SubCard2() {
  return (
    <>
      <div className='card draggable-handle draggable'>
        <div className='card-body'>
          <div className='border-bottom pb-4'>
            <Link to={'#'} className='btn btn-sm btn-secondary rounded-xl mb-2'>
              Digital Marketing
            </Link>
            <p className='font-w600'>
              <Link to={'/post-details'} className='text-black'>
                Build Database Design for Fasto Admin v2
              </Link>
            </p>
            <div className='row justify-content-between'>
              <ul className='users col-6'>
                <li>
                  <img src={user5} alt='' />
                </li>
                <li>
                  <img src={user6} alt='' />
                </li>
                <li>
                  <img src={user7} alt='' />
                </li>
                <li>
                  <img src={user8} alt='' />
                </li>
              </ul>
              <div className='col-6 pl-0'>
                <h6 className='fs-14'>
                  Progress
                  <span className='pull-right font-w600'>79%</span>
                </h6>
                <div className='progress' style={{ height: '7px' }}>
                  <div
                    className='progress-bar bg-primary progress-animated'
                    style={{ width: '79%', height: '7px' }}
                    role='progressbar'
                  >
                    <span className='sr-only'>79% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function SubCard3() {
  return (
    <>
      <div className='card draggable-handle draggable'>
        <div className='card-body'>
          <div className='border-bottom pb-'>
            <Link to={'#'} className='btn btn-sm btn-warning rounded-xl mb-2'>
              Programmer
            </Link>
            <p className='font-w600'>
              <Link to={'/post-details'} className='text-black'>
                Make Promotional Ads for Instagram Fasto’s
              </Link>
            </p>
            <div className='row justify-content-between'>
              <ul className='users col-6'>
                <li>
                  <img src={user9} alt='' />
                </li>
                <li>
                  <img src={user10} alt='' />
                </li>
                <li>
                  <img src={user11} alt='' />
                </li>
                <li>
                  <img src={user12} alt='' />
                </li>
              </ul>
              <div className='col-6 pl-0'>
                <h6 className='fs-14'>
                  Progress
                  <span className='pull-right font-w600'>36%</span>
                </h6>
                <div className='progress' style={{ height: '7px' }}>
                  <div
                    className='progress-bar bg-primary progress-animated'
                    style={{ width: '36%', height: '7px' }}
                    role='progressbar'
                  >
                    <span className='sr-only'>36% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function SubCard4() {
  return (
    <>
      <div className='card draggable-handle draggable'>
        <div className='card-body'>
          <div className='border-bottom pb-4'>
            <Link to={'#'} className='btn btn-sm btn-info rounded-xl mb-2'>
              UX Writer
            </Link>
            <p className='font-w600'>
              <Link to={'post-details'} className='text-black'>
                Caption description for onboarding screens
              </Link>
            </p>
            <div className='row justify-content-between'>
              <ul className='users col-6'>
                <li>
                  <img src={user1} alt='' />
                </li>
                <li>
                  <img src={user2} alt='' />
                </li>
                <li>
                  <img src={user3} alt='' />
                </li>
                <li>
                  <img src={user4} alt='' />
                </li>
              </ul>
              <div className='col-6 pl-0'>
                <h6 className='fs-14'>
                  Progress
                  <span className='pull-right font-w600'>24%</span>
                </h6>
                <div className='progress' style={{ height: '7px' }}>
                  <div
                    className='progress-bar bg-primary progress-animated'
                    style={{ width: '24%', height: '7px' }}
                    role='progressbar'
                  >
                    <span className='sr-only'>24% Complete</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
function DropdownBox() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant='' as='div' className='i-false'>
        <Link to={'#'} data-toggle='dropdown' aria-expanded='false'>
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='3.5' cy='11.5' r='2.5' transform='rotate(-90 3.5 11.5)' fill='#717579' />
            <circle cx='11.5' cy='11.5' r='2.5' transform='rotate(-90 11.5 11.5)' fill='#717579' />
            <circle cx='19.5' cy='11.5' r='2.5' transform='rotate(-90 19.5 11.5)' fill='#717579' />
          </svg>
        </Link>
      </Dropdown.Toggle>
      <Dropdown.Menu className='dropdown-menu-right' menuAlign='right'>
        <Dropdown.Item>Edit </Dropdown.Item>
        <Dropdown.Item>Delete </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
const board = {
  columns: [
    {
      id: 1,
      //title: "Q&A",
      title: <ColumnHeader1 />,
      cards: [
        {
          id: 1,
          title: <SubCard1 />,
          //description: "Card content"
        },
        {
          id: 2,
          title: <SubCard2 />,
        },
        {
          id: 3,
          title: <SubCard2 />,
        },
        {
          id: 4,
          title: <SubCard1 />,
        },
      ],
    },
    {
      id: 2,
      title: <ColumnHeader2 />,
      cards: [
        {
          id: 5,
          title: <SubCard1 />,
        },
        {
          id: 6,
          title: <SubCard3 />,
        },
        {
          id: 7,
          title: <SubCard3 />,
        },
      ],
    },
    {
      id: 3,

      title: <ColumnHeader3 />,
      cards: [
        {
          id: 8,
          title: <SubCard1 />,
        },
        {
          id: 9,
          title: <SubCard4 />,
        },
        {
          id: 10,
          title: <SubCard1 />,
        },
      ],
    },
    {
      id: 4,
      //title: "Q&A",
      title: <ColumnHeader4 />,
      cards: [
        {
          id: 14,
          title: <SubCard3 />,
        },
        {
          id: 15,
          title: <SubCard3 />,
        },
      ],
    },
  ],
};

const KanbanData = () => {
  return <></>;
};

export {
  ColumnHeader1,
  ColumnHeader2,
  ColumnHeader3,
  ColumnHeader4,
  SubCard1,
  SubCard2,
  SubCard3,
  SubCard4,
  board,
};
export default KanbanData;
