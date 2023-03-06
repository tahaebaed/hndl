import React, { useState } from 'react';
import ReusableModal from '../modalComponent/ReusableModal';
import { useIntl } from 'react-intl';

const AddMultiButton = ({ addMultiple, wrapperClassName, secButton, children, outLine }) => {
  const [openSecModal, setOpenSecModal] = useState(false);
  const [buttontitle, setButtonTitle] = useState();
  const intl = useIntl();
  return (
    <>
      <button
        className={`col-6 btn ${
          outLine ? outLine : 'btn-outline-primary btn-text-primary btn-icon-primary'
        } `}
        onClick={() => {
          setOpenSecModal(true);
          setButtonTitle(secButton);
        }}
      >
        <i className='flaticon-381-add-2 multi-button' />
        <i className='flaticon-381-layer-1  multi-button mx-2' />
        {secButton}
      </button>
      <ReusableModal
        openModal={openSecModal}
        setOpenModal={setOpenSecModal}
        buttontitle={buttontitle}
      >
        {children}
      </ReusableModal>
    </>
  );
};

export default AddMultiButton;
