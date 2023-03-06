import React, { useContext, useEffect, useState } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Link, useHistory } from 'react-router-dom';
import logo from '../../images/logo-full.png';
import { AUTHENTICATE_EMPLOYEE } from '../../utilities/Apollo/Querries';
import Cookies from 'js-cookie';
import { SOCKETCxt } from '../../utilities/soket/SoketProvider';

const Login = () => {
  const history = useHistory();
  const [loginData, setLoginData] = useState({});
  const [displayMessage, setDisplayMessage] = useState();

  const { CoreSocket } = useContext(SOCKETCxt);

  useEffect(() => {
    if (Cookies.get('token')) {
      history.push('/vehicles-list');
    }
  }, []);

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const [logIn, { loading, error, data }] = useLazyQuery(AUTHENTICATE_EMPLOYEE, {
    onCompleted: (someData) => {
      Cookies.set('token', someData.authenticateEmployee.token);
      Cookies.set('accessType', someData.authenticateEmployee.employee.accessType);
      Cookies.set('classification', someData.authenticateEmployee.employee.classification);
      Cookies.set('firstName', someData.authenticateEmployee.employee.firstName);
      Cookies.set('userID', someData.authenticateEmployee.employee._id);
      // CoreSocket.emit('join', someData.authenticateEmployee.employee._id)
      CoreSocket.emit('join', someData.authenticateEmployee.employee.accessType);
      // CoreSocket.emit('join', someData.authenticateEmployee.employee.classification)
      history.push('/vehicles-list');
    },
    onError: (error) => {
      setDisplayMessage(error.graphQLErrors[0].message);
      throw error.graphQLErrors[0].message;
    },
  });
  const submitHandler = (e) => {
    e.preventDefault();
    logIn({ variables: loginData });
  };
  return (
    <div className='row justify-content-center h-100 align-items-center h-80'>
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
                <h4 className='text-center mb-4 text-white'>Sign in your account</h4>
                <form action='' onSubmit={submitHandler}>
                  <div className='form-group'>
                    <label className='mb-1 text-white'>
                      <strong>Email</strong>
                    </label>
                    <input
                      type='email'
                      name='email'
                      className='form-control'
                      placeholder='hello@example.com'
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className='form-group'>
                    <label className='mb-1 text-white '>
                      <strong>Password</strong>
                    </label>
                    <input
                      type='password'
                      name='password'
                      className='form-control'
                      placeholder='Password'
                      onChange={handleLoginChange}
                    />
                  </div>
                  <div className='form-row d-flex justify-content-between mt-4 mb-2'>
                    <div className='form-group'>
                      <div className='custom-control custom-checkbox ml-1 '>
                        <input
                          type='checkbox'
                          className='custom-control-input'
                          id='basic_checkbox_1'
                        />
                        <label
                          className='custom-control-label text-white'
                          htmlFor='basic_checkbox_1'
                        >
                          Remember my preference
                        </label>
                      </div>
                    </div>
                    <div className='form-group'>
                      <Link className='text-white' to='/page-forgot-password'>
                        Forgot Password?
                      </Link>
                    </div>
                  </div>
                  {/* error msg */}
                  {displayMessage && (
                    <div className='alert alert-danger text-center'>{displayMessage}</div>
                  )}
                  <div className='text-center'>
                    <button
                      type='submit'
                      className='btn bg-white text-primary btn-block'
                      onClick={() => submitHandler}
                    >
                      Sign Me In
                    </button>
                  </div>
                </form>
                <div className='new-account mt-3'>
                  <p className='text-white'>
                    Don't have an account?
                    <Link className='text-primary' to='/page-register'>
                      Sign up
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
