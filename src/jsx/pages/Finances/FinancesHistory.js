import React, { useMemo, useRef, useState } from 'react';
import { useIntl } from 'react-intl';
import AddButtons from '../../components/buttons/AddButtons';

const FinancesHistory = () => {
  // const columns = useMemo(() => EXPENSES_COLUMNS, []);
  const [openModal, setOpenModal] = useState(false);
  const intl = useIntl();
  const tableRef = useRef(null);
  const toastId = useRef(null);

  return (
    <div className='container'>
      <div className={`d-flex justify-content-between mb-5 print-table`}>
        <h1>{intl.messages.expenses_history}</h1>
        <div className={`d-flex col-md-7 col-lg-5 justify-content-end`}>
          <AddButtons
            setOpenModal={setOpenModal}
            openModal={openModal}
            col='col-6'
            addButton={intl.messages.add_expense_button}
          ></AddButtons>
        </div>
      </div>
    </div>
  );
};

export default FinancesHistory;
