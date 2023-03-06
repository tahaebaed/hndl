import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo-full.png';

const ForgotPassword = () => {
  const [forgotData, setForgotData] = useState({});
  const handleBlur = (e) => {
    const newForgotData = { ...forgotData };
    newForgotData[e.target.name] = e.target.value;
    setForgotData(newForgotData);
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className='row justify-content-center  align-items-center h-80'>
      <div className='col-md-6'>
        <div className='authincation-content'>
          <div className='row no-gutters'>
            <div className='col-xl-12'>
              <div className='auth-form'>
                <div className='text-center mb-3'>
                  <Link to={'/'}>
                    <img src={logo} alt='' />
                  </Link>
                </div>
                <h4 className='text-center mb-4 text-white'> Forgot Password</h4>
                <form action='./' onSubmit={(e) => e.preventDefault(submitHandler)}>
                  <div className='form-group'>
                    <label className='mb-1 text-white'>
                      {' '}
                      <strong>Email</strong>{' '}
                    </label>
                    <input
                      type='email'
                      className='form-control'
                      value='hello@example.com'
                      onChange={handleBlur}
                    />
                  </div>
                  <div className='text-center mt-4'>
                    <button
                      type='submit'
                      className='btn bg-white text-primary btn-block'
                      onClick={() => submitHandler}
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
