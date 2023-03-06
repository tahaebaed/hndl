import React, { useState } from 'react';
import ReusableModal from '../modalComponent/ReusableModal';

const AddButtons = ({ col, addButton, children, outLine, openModal, setOpenModal }) => {
  const [buttontitle, setButtonTitle] = useState();

  return (
    <>
      {addButton && (
        <button
          className={`${col} btn ${outLine ? outLine : 'btn-primary'}`}
          onClick={() => {
            setOpenModal(true);
            setButtonTitle(addButton);
          }}
        >
          {outLine ? (
            <>
              <i className='flaticon-381-add-2 multi-button' />
              <i className='flaticon-381-layer-1  multi-button mx-2' />
            </>
          ) : (
            <i className='flaticon-381-add-2 add-button mx-2' />
          )}
          {addButton}
        </button>
      )}

      <ReusableModal openModal={openModal} setOpenModal={setOpenModal} buttontitle={buttontitle}>
        {children}
      </ReusableModal>
    </>
  );
};

export default AddButtons;
