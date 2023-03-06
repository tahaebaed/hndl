import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useIntl } from 'react-intl';

/// Image
import profile from '../../../images/profile/17.jpg';
import { LocaleContext } from '../../../utilities/lang';
import Cookies from 'js-cookie';

const Header = ({ onNote, toggle, onProfile, onActivity, onNotification }) => {
  var path = window.location.pathname.split('/');
  var name = path[path.length - 1].split('-');
  var filterName = name.length >= 3 ? name.filter((n, i) => i > 0) : name;
  var finalName = filterName.includes('app')
    ? filterName.filter((f) => f !== 'app')
    : filterName.includes('ui')
    ? filterName.filter((f) => f !== 'ui')
    : filterName.includes('uc')
    ? filterName.filter((f) => f !== 'uc')
    : filterName.includes('basic')
    ? filterName.filter((f) => f !== 'basic')
    : filterName.includes('form')
    ? filterName.filter((f) => f !== 'form')
    : filterName.includes('table')
    ? filterName.filter((f) => f !== 'table')
    : filterName.includes('page')
    ? filterName.filter((f) => f !== 'page')
    : filterName.includes('email')
    ? filterName.filter((f) => f !== 'email')
    : filterName.includes('ecom')
    ? filterName.filter((f) => f !== 'ecom')
    : filterName.includes('chart')
    ? filterName.filter((f) => f !== 'chart')
    : filterName.includes('editor')
    ? filterName.filter((f) => f !== 'editor')
    : filterName;

  var page_name = finalName.join(' ') === '' ? 'Dashboard' : finalName.join(' ');

  const intl = useIntl();
  const { locale, setLocale } = useContext(LocaleContext);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [userNme, setUserNme] = useState();
  const [userClassification, setUserClassification] = useState();
  const history = useHistory();
  const handleLogout = () => {
    Cookies.remove('classification');
    Cookies.remove('firstName');
    Cookies.remove('token');
    Cookies.remove('accessType');
    history.push('/page-login');
  };

  useEffect(() => {
    setUserNme(Cookies.get('firstName'));
    setUserClassification(Cookies.get('classification'));
  }, []);

  return (
    <div className='header'>
      <div className='header-content'>
        <nav className='navbar navbar-expand'>
          <div className='collapse navbar-collapse justify-content-between'>
            <div className='header-left'>
              <div className='dashboard_bar' style={{ textTransform: 'capitalize' }}>
                {intl.messages[page_name.replace(' ', '_')]}
              </div>
            </div>

            <ul className='navbar-nav header-right'>
              <li className='nav-item'>
                <div className='input-group search-area d-lg-inline-flex d-none'>
                  <div className='input-group-append'>
                    <span className='input-group-text'>
                      <Link to='#'>
                        <i className='flaticon-381-search-2'></i>
                      </Link>
                    </span>
                  </div>
                  <input type='text' className='form-control' placeholder='Search here...' />
                </div>
              </li>
              <li className='nav-item'>
                <select
                  defaultValue={locale}
                  onChange={(e) => {
                    localStorage.setItem('lang', e.target.value);
                    setLocale(e.target.value);
                  }}
                >
                  <option value='en'>en</option>
                  <option value='ar'>ar</option>
                </select>
              </li>
              <li
                className={`nav-item dropdown header-profile ${toggle === 'profile' ? 'show' : ''}`}
                onClick={() => onProfile()}
              >
                <Link to={'#'} className='nav-link' role='button' data-toggle='dropdown'>
                  <img src={profile} width='20' alt='' />
                  <div className='header-info'>
                    <span className='text-black'>{userNme}</span>
                    <p className='fs-12 mb-0'>{userClassification}</p>
                  </div>
                </Link>
                <div
                  className={`dropdown-menu dropdown-menu-right ${
                    toggle === 'profile' ? 'show' : ''
                  }`}
                >
                  <Link to='/app-profile' className='dropdown-item ai-icon'>
                    <svg
                      id='icon-user1'
                      xmlns='http://www.w3.org/2000/svg'
                      className='text-primary'
                      width='18'
                      height='18'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path>
                      <circle cx='12' cy='7' r='4'></circle>
                    </svg>
                    <span className='ml-2'>Profile </span>
                  </Link>
                  <Link to='/email-inbox' className='dropdown-item ai-icon'>
                    <svg
                      id='icon-inbox'
                      xmlns='http://www.w3.org/2000/svg'
                      className='text-success'
                      width='18'
                      height='18'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path>
                      <polyline points='22,6 12,13 2,6'></polyline>
                    </svg>
                    <span className='ml-2'>Inbox </span>
                  </Link>
                  <div onClick={handleLogout} className='dropdown-item ai-icon'>
                    <svg
                      id='icon-logout'
                      xmlns='http://www.w3.org/2000/svg'
                      className='text-danger'
                      width='18'
                      height='18'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
                      <polyline points='16 17 21 12 16 7'></polyline>
                      <line x1='21' y1='12' x2='9' y2='12'></line>
                    </svg>
                    <span className='ml-2'>Logout </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
