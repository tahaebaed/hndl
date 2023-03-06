import React, { Fragment, Component } from 'react';
import { Link } from 'react-router-dom';
import { Tab, Nav, Modal } from 'react-bootstrap';

import user13 from '../../../../images/users/13.jpg';
import user14 from '../../../../images/users/14.jpg';
import user15 from '../../../../images/users/15.jpg';
import user16 from '../../../../images/users/16.jpg';
import user17 from '../../../../images/users/17.jpg';
import user18 from '../../../../images/users/18.jpg';
import user19 from '../../../../images/users/19.jpg';
import user20 from '../../../../images/users/20.jpg';
import user21 from '../../../../images/users/21.jpg';
import user22 from '../../../../images/users/22.jpg';
import user23 from '../../../../images/users/23.jpg';
import user24 from '../../../../images/users/24.jpg';
import user25 from '../../../../images/users/25.jpg';

const contactBlog = [
  { image: user13, name: 'Abdul Kean' },
  { image: user14, name: 'Fanny Saragih' },
  { image: user15, name: 'Angela Moss' },
  { image: user16, name: 'Abigail Smurt' },
  { image: user17, name: 'Bella Syuqr' },
  { image: user18, name: 'Benny Juann' },
  { image: user19, name: 'Chloe Simatup' },
  { image: user20, name: 'Denny Juann' },
  { image: user21, name: 'Franklin CS' },
  { image: user22, name: 'Fanny Saragih' },
  { image: user23, name: 'Hermanto' },
  { image: user24, name: 'Lulu Salam' },
];
const pendingBlog = [
  { image: user14, name: 'Afiff Skunder' },
  { image: user22, name: 'Fanny Saragih' },
  { image: user13, name: 'Abdul Kean' },
  { image: user21, name: 'Franklin CS' },
  { image: user17, name: 'Bella Syuqr' },
  { image: user23, name: 'Hermanto' },
  { image: user18, name: 'Benny ' },
  { image: user24, name: 'Lulu Salam' },
  { image: user19, name: 'Chloe Simatup' },
  { image: user16, name: 'Abigail Smurt' },
  { image: user20, name: 'Denny Juan' },
  { image: user15, name: 'Angela Moss' },
];

const Allcontact1 = () => {
  return (
    <Fragment>
      <div className='row loadmore-content' id='RecentActivitiesContent'>
        {contactBlog.map((item, index) => (
          <div className='col-xl-4 col-xxl-6 col-sm-6' key={index}>
            <div className='card contact-bx'>
              <div className='card-body'>
                <div className='media'>
                  <div className='image-bx mr-3'>
                    <img src={item.image} alt='' className='rounded-circle' width='90' />
                    <span className='active'></span>
                  </div>
                  <div className='media-body'>
                    <h6 className='fs-20 font-w600 mb-0'>
                      <Link to={'/app-profile'} className='text-black'>
                        {item.name}
                      </Link>
                    </h6>
                    <p className='fs-14'>Highspeed Inc.</p>
                    <ul>
                      <li>
                        <Link to={'#'}>
                          <i className='fa fa-phone' aria-hidden='true'></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={'#'}>
                          <i className='fa fa-video-camera' aria-hidden='true'></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={'/messages'}>
                          <i className='las la-sms'></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

const Pendingdata = () => {
  return (
    <Fragment>
      <div className='row loadmore-content' id='RecentActivities2Content'>
        {pendingBlog.map((item, index) => (
          <div className='col-xl-4 col-xxl-6 col-sm-6' key={index}>
            <div className='card contact-bx'>
              <div className='card-body'>
                <div className='media'>
                  <div className='image-bx mr-3'>
                    <img src={item.image} alt='' className='rounded-circle' width='90' />
                    <span className='active'></span>
                  </div>
                  <div className='media-body'>
                    <h6 className='fs-20 font-w600 mb-0'>
                      <Link to={'/app-profile'} className='text-black'>
                        {item.name}
                      </Link>
                    </h6>
                    <p className='fs-14'>Highspeed Inc.</p>
                    <ul>
                      <li>
                        <Link to={'#'}>
                          <i className='fa fa-phone' aria-hidden='true'></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={'#'}>
                          <i className='fa fa-video-camera' aria-hidden='true'></i>
                        </Link>
                      </li>
                      <li>
                        <Link to={'/messages'}>
                          <i className='las la-sms'></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

const tabData = [
  { number: '851', name: 'All Contacts', content: <Allcontact1 /> },
  { number: '62', name: 'Pending Invitation', content: <Pendingdata /> },
];

class Contacts extends Component {
  state = {
    // initial state
    show: false,
  };

  handleClose = () => {
    this.setState({ show: false });
  };
  handleShow = () => {
    this.setState({ show: true });
  };

  render() {
    return (
      <Fragment>
        <Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
          <div className='d-md-flex d-block mb-3 pb-3 border-bottom'>
            <div className='card-action card-tabs mb-md-0 mb-3  mr-auto'>
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
              <Link
                to={'#'}
                onClick={this.handleShow}
                data-toggle='modal'
                data-target='#addOrderModal'
                className='btn btn-primary rounded'
              >
                <i className='fa fa-user mr-2 scale5' aria-hidden='true'></i>+ New Contact
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
              {/* <!-- Add Order --> */}
              <Modal
                show={this.state.show}
                onHide={this.handleClose}
                className='modal fade'
                id='addOrderModal'
              >
                <div role='document'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h5 className='modal-title'>Add Contact</h5>
                      <button
                        type='button'
                        onClick={this.handleClose}
                        className='close'
                        data-dismiss='modal'
                      >
                        <span>&times;</span>
                      </button>
                    </div>
                    <div className='modal-body'>
                      <form>
                        <div className='form-group'>
                          <label className='text-black font-w500'>First Name</label>
                          <input type='text' className='form-control' />
                        </div>
                        <div className='form-group'>
                          <label className='text-black font-w500'>Last Name</label>
                          <input type='text' className='form-control' />
                        </div>
                        <div className='form-group'>
                          <label className='text-black font-w500'>Address</label>
                          <input type='text' className='form-control' />
                        </div>
                        <div className='form-group'>
                          <button type='submit' className='btn btn-primary'>
                            SAVE
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Modal>
            </div>
          </div>
          <div className='row'>
            <div className='col-xl-9 col-xxl-8 col-lg-8'>
              <div className='tab-content'>
                <div className='tab-pane fade show active' id='navpills-1' role='tabpanel'>
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
                  <div className='row'>
                    <div className='col-xl-12 mb-4 text-center'>
                      <Link
                        className='btn btn-outline-primary mx-auto dlab-load-more'
                        to={'#'}
                        id='RecentActivities'
                      >
                        Load More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-3 col-xxl-4 col-lg-4'>
              <div className='row'>
                <div className='col-xl-12'>
                  <div className='card profile-card'>
                    <div className='card-body pb-0 text-center'>
                      <div className='image-bx mb-3'>
                        <img src={user25} alt='' width='120' className='rounded-circle' />
                        <span className='active'></span>
                      </div>
                      <h4 className='fs-20 mb-0'>
                        <Link to={'/app-profile'} className='text-black'>
                          Angela Moss
                        </Link>
                      </h4>
                      <p className='fs-14'>Highspeed Inc.</p>
                      <ul>
                        <li>
                          <Link to={'#'}>
                            <i className='fa fa-phone' aria-hidden='true'></i>
                          </Link>
                        </li>
                        <li>
                          <Link to={'#'}>
                            <i className='fa fa-video-camera' aria-hidden='true'></i>
                          </Link>
                        </li>
                        <li>
                          <Link to={'/messages'}>
                            <i className='las la-sms'></i>
                          </Link>
                        </li>
                      </ul>
                      <div className='row'>
                        <div className='col-6'>
                          <Link
                            to={'/app-profile'}
                            className='btn btn-sm btn-outline-primary rounded d-block'
                          >
                            Edit
                          </Link>
                        </div>
                        <div className='col-6'>
                          <Link
                            to={'/app-profile'}
                            className='btn btn-sm btn-outline-dark rounded d-block'
                          >
                            Remove
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className='card-body'>
                      <h6 className='fs-16 text-black font-w600'>About</h6>
                      <p className='fs-14'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tab.Container>
      </Fragment>
    );
  }
}

export default Contacts;
