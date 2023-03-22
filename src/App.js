import React, { Fragment } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  PointElement,
  CategoryScale,
  LineElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

/// Components
import Markup from './jsx';

/// Style
import './css/style.css';
// import './vendor/bootstrap-select/dist/css/bootstrap-select.min.css';

import { withResizeDetector } from 'react-resize-detector';

ChartJS.register(
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  CategoryScale,
  LineElement,
  LinearScale,
  BarElement,
  Title,
);

const App = ({ width }) => {
  const body = document.querySelector('body');

  width >= 1300
    ? body.setAttribute('data-sidebar-style', 'full')
    : width <= 1299 && width >= 767
    ? body.setAttribute('data-sidebar-style', 'mini')
    : body.setAttribute('data-sidebar-style', 'overlay');
  return (
    <Fragment>
      <Markup />
    </Fragment>
  );
};

export default withResizeDetector(App);
