import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ReusableModal = ({ openModal, buttontitle, setOpenModal, children }) => {
  return (
    <div>
      <Modal
        className='fade modal-content-size'
        onHide={() => setOpenModal(false)}
        show={openModal}
      >
        <Modal.Header>
          <Modal.Title>{buttontitle}</Modal.Title>
          <Button type='button' variant='' className='close' onClick={() => setOpenModal(false)}>
            <span>&times;</span>
          </Button>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  );
};

export default ReusableModal;
