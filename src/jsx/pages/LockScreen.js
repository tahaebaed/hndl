import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo-full.png';

const LockScreen = () => {
  const [lockScreenData, setLockScreenData] = useState({});
  const handleBlur = (e) => {
    const newLockScreenData = { ...lockScreenData };
    newLockScreenData[e.target.name] = e.target.value;
    setLockScreenData(newLockScreenData);
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
                <h4 className='text-center mb-4 text-white'> Account Locked </h4>
                <form action='' onSubmit={(e) => e.preventDefault(submitHandler)}>
                  <div className='form-group'>
                    <label className='text-white'>
                      {' '}
                      <strong>Password</strong>{' '}
                    </label>
                    <input
                      type='password'
                      className='form-control'
                      value='password'
                      onChange={handleBlur}
                    />
                  </div>
                  <div className='text-center'>
                    <button
                      type='submit'
                      className='btn bg-white text-primary btn-block'
                      onClick={() => submitHandler}
                    >
                      {' '}
                      Unlock{' '}
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

export default LockScreen;
