import React, { useEffect } from 'react';
import { useIntl } from 'react-intl';

/// Link
import { Link } from 'react-router-dom';

/// Scroll
import PerfectScrollbar from 'react-perfect-scrollbar';

/// Menu
import MetisMenu from '@metismenu/react';
import 'metismenujs/dist/metismenujs.css';

export const MM = ({ children }) => (
  <div className='mm-wrapper'>
    <MetisMenu id='menu' className='metismenu'>
      {children}
    </MetisMenu>
  </div>
);

const SideBar = (props) => {
  /// Open menu

  const intl = useIntl();

  useEffect(() => {
    // sidebar open/close
    const btn = document.querySelector('.nav-control');
    const aaa = document.querySelector('#main-wrapper');

    function toggleFunc() {
      return aaa.classList.toggle('menu-toggle');
    }

    btn.addEventListener('click', toggleFunc);
  }, []);

  /// Path
  let path = window.location.pathname;
  path = path.split('/');
  path = path[path.length - 1];

  const vehicles = ['vehicles-list', 'vehicles-assignment'],
    inspection = ['inspection-list', 'inspection-form'],
    service = ['service-list', 'service-program', 'service-history'],
    smartCards = ['smart-cards-request', 'smart-cards-management'],
    finance = ['finances', 'finances-history'];

  return (
    <div className='dlabnav print-table'>
      <PerfectScrollbar className='dlabnav-scroll'>
        <MM className='metismenu' id='menu'>
          <li className={`${path === '' ? 'mm-active' : ''}`}>
            <Link className='ai-icon' to='/' onClick={() => props.onClick3()}>
              <i className='flaticon-381-networking'></i>
              <span className='nav-text'>{intl.messages.dashboard}</span>
            </Link>
          </li>
          <li className={`${vehicles.includes(path) ? 'mm-active' : ''}`}>
            <Link className='has-arrow ai-icon' to='#'>
              <i className='flaticon-381-black-truck'></i>
              <span className='nav-text'>{intl.messages.vehicles}</span>
            </Link>
            <ul>
              <li>
                <Link to='/vehicles-list' onClick={() => props.onClick()}>
                  {intl.messages.vehicles_list}
                </Link>
              </li>
              <li>
                <Link to='/vehicles-assignment' onClick={() => props.onClick()}>
                  {intl.messages.vehicles_assignment}
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${inspection.includes(path) ? 'mm-active' : ''}`}>
            <Link className='ai-icon' to='/inspection-list' onClick={() => props.onClick3()}>
              <i className='flaticon-381-search-3'></i>
              <span className='nav-text'>{intl.messages.inspection}</span>
            </Link>
            {/* <ul>
              <li>
                <Link to='/inspection-list' onClick={() => props.onClick()}>
                  {intl.messages.inspection_list}
                </Link>
              </li>
              <li>
                <Link to='/inspection-form' onClick={() => props.onClick()}>
                  {intl.messages.inspection_forms}
                </Link>
              </li>
            </ul> */}
          </li>
          <li className={`${path === 'issues' ? 'mm-active' : ''}`}>
            <Link className='ai-icon' to='/issues' onClick={() => props.onClick3()}>
              <i className='flaticon-381-warning-1'></i>
              <span className='nav-text'>{intl.messages.issues}</span>
            </Link>
          </li>
          <li className={`${service.includes(path) ? 'mm-active' : ''}`}>
            <Link className='has-arrow ai-icon' to='#' onClick={() => props.onClick3()}>
              <i className='flaticon-381-equip'></i>
              <span className='nav-text'>{intl.messages.service}</span>
            </Link>
            <ul>
              <li>
                <Link to='/service-list' onClick={() => props.onClick()}>
                  {intl.messages.service_list}
                </Link>
              </li>
              <li>
                <Link to='/service-program' onClick={() => props.onClick()}>
                  {intl.messages.service_program}
                </Link>
              </li>
              <li>
                <Link to='/service-history' onClick={() => props.onClick()}>
                  {intl.messages.service_history}
                </Link>
              </li>
            </ul>
          </li>
          <li className={`${path === 'employees' ? 'mm-active' : ''}`}>
            <Link className='ai-icon' to='/employees' onClick={() => props.onClick3()}>
              <i className='flaticon-381-user-9'></i>
              <span className='nav-text'>{intl.messages.employees}</span>
            </Link>
          </li>

          <li className={`${path === 'contacts' ? 'mm-active' : ''}`}>
            <Link className='ai-icon' to='/contacts' onClick={() => props.onClick3()}>
              <i className='flaticon-381-reading'></i>
              <span className='nav-text'>{intl.messages.contacts}</span>
            </Link>
          </li>
          <li className={`${path === 'warehouse' ? 'mm-active' : ''}`}>
            <Link className='ai-icon' to='/warehouse'>
              <i className='flaticon-381-home-2'></i>
              <span className='nav-text'>{intl.messages.warehouse}</span>
            </Link>
          </li>

          <li className={`${path === 'fuel-history' ? 'mm-active' : ''}`}>
            <Link className='ai-icon' to='/fuel-history' onClick={() => props.onClick3()}>
              <i className='flaticon-381-fuel'></i>
              <span className='nav-text'>{intl.messages.fuel_history}</span>
            </Link>
          </li>

          <li className={`${smartCards.includes(path) ? 'mm-active' : ''}`}>
            <Link className='has-arrow ai-icon' to='#' onClick={() => props.onClick3()}>
              <i className='flaticon-381-id-card'></i>
              <span className='nav-text'>{intl.messages.smart_cards}</span>
            </Link>
            <ul>
              <li>
                <Link to='/smart-cards-request' onClick={() => props.onClick()}>
                  {intl.messages.smart_cards_requests}
                </Link>
              </li>
              <li>
                <Link to='/smart-cards-management' onClick={() => props.onClick()}>
                  {intl.messages.smart_cards_management}
                </Link>
              </li>
            </ul>
          </li>

          <li className={`${path === 'map' ? 'mm-active' : ''}`}>
            <Link className='ai-icon' to='/map' onClick={() => props.onClick3()}>
              <i className='flaticon-381-map-2'></i>
              <span className='nav-text'>{intl.messages.map}</span>
            </Link>
          </li>
          <li className={`${finance.includes(path) ? 'mm-active' : ''}`}>
            <Link className='has-arrow ai-icon' to='#' onClick={() => props.onClick3()}>
              <i className='flaticon-381-dollar'></i>
              <span className='nav-text'> {intl.messages.finances}</span>
            </Link>
            <ul>
              <li>
                <Link to='/finances' onClick={() => props.onClick()}>
                  {intl.messages.finances}
                </Link>
              </li>
              <li>
                <Link to='/expenses-history' onClick={() => props.onClick()}>
                  {intl.messages.expenses_history}
                </Link>
              </li>
            </ul>
          </li>
        </MM>
        <div className='copyright'>
          <p className='text-center'>
            <strong>Ostouli Fleet Management Admin Dashboard</strong> © 2022 All Rights Reserved
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
