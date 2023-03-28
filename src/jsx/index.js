//import React from "react";

import React, { useState } from 'react';

/// React router dom
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

/// Css
import './index.css';
import './chart.css';

/// Layout
import Nav from './layouts/nav';
import Footer from './layouts/Footer';
import ScrollToTop from './pages/ScrollToTop';

/// Pages
import Registration from './pages/Registration';
import Login from './pages/Login';
import LockScreen from './pages/LockScreen';
import Error400 from './pages/Error400';
import Error403 from './pages/Error403';
import Error404 from './pages/Error404';
import Error500 from './pages/Error500';
import Error503 from './pages/Error503';
import ForgotPassword from './pages/ForgotPassword';
/// Widget
import Widget from './pages/Widget';

/// Deshboard
import Home from './components/Dashboard/Home/Home';

/// Form
import Element from './components/Forms/Element/Element';
import Wizard from './components/Forms/Wizard/Wizard';
import SummerNote from './components/Forms/Summernote/SummerNote';
import Pickers from './components/Forms/Pickers/Pickers';
import jQueryValidation from './components/Forms/jQueryValidation/jQueryValidation';

/// Pulgin
import Select2 from './components/PluginsMenu/Select2/Select2';
import MainNouiSlider from './components/PluginsMenu/NouiSlider/MainNouiSlider';
import Toastr from './components/PluginsMenu/Toastr/Toastr';
import JqvMap from './components/PluginsMenu/JqvMap/JqvMap';
import Lightgallery from './components/PluginsMenu/Lightgallery/Lightgallery';
import {
  Contacts,
  Employees,
  FinanceHistory,
  Finances,
  FuelHistory,
  InspectionForm,
  InspectionList,
  Issues,
  Map,
  ServiceHistory,
  ServiceList,
  ServiceProgram,
  SmartCardsManagement,
  SmartCardsReq,
  VehiclesAssignment,
  VehiclesList,
  Warehouse,
} from './layouts/lazyLoading';
import Loader from '../utilities/Loader';

const Markup = () => {
  let path = window.location.pathname;
  path = path.split('/');
  path = path[path.length - 1];
  let pagePath = path.split('-').includes('page');

  const [activeEvent, setActiveEvent] = useState(!path);

  const routes = [
    /// Form
    { url: 'form-element', component: Element },
    { url: 'form-wizard', component: Wizard },
    { url: 'form-wizard', component: Wizard },
    { url: 'form-editor-summernote', component: SummerNote },
    { url: 'form-pickers', component: Pickers },
    { url: 'form-validation-jquery', component: jQueryValidation },

    /// Plugin

    { url: 'uc-select2', component: Select2 },
    { url: 'uc-noui-slider', component: MainNouiSlider },
    { url: 'uc-toastr', component: Toastr },
    { url: 'map-jqvmap', component: JqvMap },
    { url: 'uc-lightgallery', component: Lightgallery },

    /// pages
    { url: 'widget-basic', component: Widget },
    { url: 'page-register', component: Registration },
    { url: 'page-lock-screen', component: LockScreen },
    { url: 'page-login', component: Login },
    { url: 'page-error-400', component: Error400 },
    { url: 'page-error-403', component: Error403 },
    { url: 'page-error-404', component: Error404 },
    { url: 'page-error-500', component: Error500 },
    { url: 'page-error-503', component: Error503 },
    { url: 'page-forgot-password', component: ForgotPassword },

    // our routes
    //dashboard
    { url: '', component: Home },

    //vehicles
    { url: 'vehicles-list', component: VehiclesList },
    { url: 'vehicles-assignment', component: VehiclesAssignment },

    // Inspection
    { url: 'inspection-list', component: InspectionList },
    { url: 'inspection-form', component: InspectionForm },

    // Issues
    { url: 'issues', component: Issues },

    // Service
    { url: 'service-list', component: ServiceList },
    { url: 'service-history', component: ServiceHistory },
    { url: 'service-Program', component: ServiceProgram },

    // Employees
    { url: 'employees', component: Employees },

    // Contacts
    { url: 'contacts', component: Contacts },

    // Warehouse
    { url: 'warehouse', component: Warehouse },

    // Warehouse
    { url: 'fuel-history', component: FuelHistory },

    // Smart Cards
    { url: 'smart-cards-request', component: SmartCardsReq },
    { url: 'smart-cards-management', component: SmartCardsManagement },

    // Map
    { url: 'Map', component: Map },

    // Finances
    { url: 'finances', component: Finances },
    { url: 'expenses-history', component: FinanceHistory },
  ];

  return (
    <Router basename='/'>
      <div
        id={`${!pagePath ? 'main-wrapper' : ''}`}
        className={`${!pagePath ? 'show' : 'mh100vh'}`}
      >
        {!pagePath && (
          <Nav
            onClick={() => setActiveEvent(!activeEvent)}
            activeEvent={activeEvent}
            onClick2={() => setActiveEvent(false)}
            onClick3={() => setActiveEvent(true)}
          />
        )}

        <div
          className={` ${!path && activeEvent ? 'rightside-event' : ''} ${
            !pagePath ? 'content-body' : ''
          }`}
        >
          <div className={`${!pagePath ? 'container-fluid' : ''}`}>
            <React.Suspense fallback={<Loader />}>
              <Switch>
                {routes.map((data, i) => (
                  <Route key={i} exact path={`/${data.url}`} component={data.component} />
                ))}
              </Switch>
            </React.Suspense>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
      <ScrollToTop />
    </Router>
  );
};

export default Markup;
