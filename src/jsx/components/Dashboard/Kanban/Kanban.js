import React, { Fragment, Component, useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import Board, { moveCard } from '@asseinfo/react-kanban';
import { board } from './Kanban/KanbanData';

import user1 from '../../../../images/users/1.jpg';
import user2 from '../../../../images/users/2.jpg';
import user3 from '../../../../images/users/3.jpg';
import user4 from '../../../../images/users/4.jpg';
import user5 from '../../../../images/users/5.jpg';
import user6 from '../../../../images/users/6.jpg';
import user7 from '../../../../images/users/7.jpg';
import user8 from '../../../../images/users/8.jpg';
import user9 from '../../../../images/users/9.jpg';
import user10 from '../../../../images/users/10.jpg';
import user11 from '../../../../images/users/11.jpg';
import user12 from '../../../../images/users/12.jpg';

import user14 from '../../../../images/users/14.png';
import user15 from '../../../../images/users/15.png';
import user16 from '../../../../images/users/16.png';
import user17 from '../../../../images/users/17.png';
import user18 from '../../../../images/users/18.png';
import user19 from '../../../../images/users/19.png';
import user20 from '../../../../images/users/20.png';

function ControlledBoard() {
  // You need to control the state yourself.
  const [controlledBoard, setBoard] = useState(board);

  function handleCardMove(_card, source, destination) {
    const updatedBoard = moveCard(controlledBoard, source, destination);
    setBoard(updatedBoard);
  }
  return (
    <Board onCardDragEnd={handleCardMove} disableColumnDrag>
      {controlledBoard}
    </Board>
  );
}

class Kanban extends Component {
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
        <div className='row'>
          <div className='col-xl-12'>
            <div className='card'>
              <div className='card-body'>
                <div className='d-md-flex d-block mb-md-4 mb-3 align-items-end'>
                  <div className='mr-auto pr-3 mb-md-0 mb-3'>
                    <h2 className='title-num text-black font-w600'>Base Vora’s Project v2.4</h2>
                    <span className='fs-14'>Created by Lidya Chan on June 31, 2020</span>
                  </div>
                  <ul className='users-lg'>
                    <li>
                      <img src={user14} alt='' />
                    </li>
                    <li>
                      <img src={user15} alt='' />
                    </li>
                    <li>
                      <img src={user16} alt='' />
                    </li>
                    <li>
                      <img src={user17} alt='' />
                    </li>
                    <li>
                      <img src={user18} alt='' />
                    </li>
                    <li>
                      <img src={user19} alt='' />
                    </li>
                    <li>
                      <img src={user20} alt='' />
                    </li>
                  </ul>
                </div>
                <div className='row'>
                  <p className='fs-14 mr-auto col-lg-6'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                  <div className='col-lg-6 text-lg-right text-left'>
                    <Link
                      to={'#'}
                      onClick={this.handleShow}
                      data-toggle='modal'
                      data-target='#addOrderModal'
                      className='btn btn-primary rounded mr-3 mb-sm-0 mb-2'
                    >
                      <i className='fa fa-user mr-3 scale5' aria-hidden='true'></i>
                      New Contact
                    </Link>
                    <Link to={'#'} className='btn btn-light rounded mr-3 mb-sm-0 mb-2'>
                      <i className='fa fa-pencil-square mr-3 scale5' aria-hidden='true'></i>
                      Edit
                    </Link>
                    <Link to={'#'} className='btn btn-light rounded mb-sm-0 mb-2'>
                      <i className='fa fa-lock mr-3 scale5' aria-hidden='true'></i>
                      Private
                    </Link>
                  </div>
                  {/* <!-- Add Order modal --> */}
                  <Modal
                    className='modal fade'
                    show={this.state.show}
                    onHide={this.handleClose}
                    id='addOrderModal'
                  >
                    <div role='document'>
                      <div className='modal-content'>
                        <div className='modal-header'>
                          <h5 className='modal-title'>Add Contact</h5>
                          <button
                            type='button'
                            className='close'
                            onClick={this.handleClose}
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
                              <button type='button' className='btn btn-primary'>
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
            </div>
          </div>
        </div>
        <div className='kanban-bx'>
          <div className='kanbanPreview-bx'>
            <div className='draggable-zone dropzoneContainer '>
              <ControlledBoard />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Kanban;
