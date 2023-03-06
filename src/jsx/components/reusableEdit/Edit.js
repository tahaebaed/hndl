import React from 'react';
import ReusableModal from '../modalComponent/ReusableModal';
import { useMutation } from '@apollo/client';

const Edit = ({
  children,
  modal,
  setModal,
  buttonTitle,
  id,
  mutationFun,
  compData,
  refetchQuery,
}) => {
  return (
    <div>
      <ReusableModal id={id} openModal={modal} setOpenModal={setModal} buttontitle={buttonTitle}>
        {children}
      </ReusableModal>
    </div>
  );
};

export default Edit;
