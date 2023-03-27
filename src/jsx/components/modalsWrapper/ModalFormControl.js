import React, { useRef } from 'react';
import { toast } from 'react-toastify';

const ModalFormControl = ({
  inputs,
  handleSubmit,
  edit,
  deleteRow,
  id,
  setModal,
  slog,
  watch,
  xsxsxs,
  compName,
  error,
  isDirty,
}) => {
  const toastId = useRef(null);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='row '>
          {inputs.map((inp, i) =>
            inp.type === 'select' ? (
              <div className='form-group col-12 col-md-6 ' key={i}>
                <label htmlFor={inp.labelTitle}>
                  <h6>
                    {inp.labelTitle} {inp.required ? '*' : ''}
                  </h6>
                </label>
                <select className='form-control' defaultValue={inp.watch} {...inp.register}>
                  <option disabled value={''}>
                    {inp.defaultOption}
                  </option>
                  {inp?.options?.map((el, i) =>
                    el.details ? (
                      <option value={el._id}>
                        {el.details.name} {el.details.type}
                      </option>
                    ) : (
                      <option value={el._id ? el._id : el.firstName}>{el.firstName}</option>
                    ),
                  )}
                  <p className='text-danger'>{error}</p>
                </select>
                <p className='text-danger'>{inp.error && inp.error}</p>
              </div>
            ) : (
              <div className='form-group col-12 col-md-6 ' key={i}>
                <label htmlFor={inp.labelTitle}>
                  <h6>
                    {inp.labelTitle} {inp.required ? '*' : ''}
                  </h6>
                </label>
                <input
                  type={inp.type}
                  id={inp.labelTitle}
                  className='form-control'
                  placeholder={inp.placeHolder}
                  {...inp.register}
                />
                <p className='text-danger'>{inp.error && inp.error}</p>
              </div>
            ),
          )}
        </div>
        {edit ? (
          <div className='col-12 d-flex justify-content-between'>
            <button
              className='btn btn-danger px-5'
              type='button'
              onClick={() => {
                console.log(id);
                toastId.current = toast('updating ...', {
                  autoClose: false,
                });
                deleteRow({
                  variables: xsxsxs && xsxsxs,
                  onCompleted: (data) => {
                    toast.update(toastId.current, {
                      render: `${slog} has been deleted`,
                      type: toast.TYPE.SUCCESS,
                      autoClose: 3000,
                    });

                    setModal(false);
                  },
                  onError: (error) => {
                    toast.update(toastId.current, {
                      render: `Something went wrong ${error}`,
                      type: toast.TYPE.ERROR,
                      autoClose: 3000,
                    });
                  },
                });
              }}
            >
              Delete {compName}
            </button>
            <button className='btn btn-primary px-5' disabled={!isDirty} type='submit'>
              Save Changes
            </button>
          </div>
        ) : (
          <div className='d-flex justify-content-end w-100'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ModalFormControl;
