import React from 'react';
import { Link } from 'react-router-dom';

const PageTitle = ({ headingPara, motherMenu, activeMenu }) => (
  <div className='page-titles'>
    <ol className='breadcrumb'>
      <li className='breadcrumb-item'>
        <Link to={'#'}>{motherMenu}</Link>
      </li>
      <li className='breadcrumb-item active'>
        <Link to={'#'}>{activeMenu}</Link>
      </li>
    </ol>
  </div>
);

export default PageTitle;
