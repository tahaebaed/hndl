import React from 'react';
import ReactDOM from 'react-dom';
import { ToastContainer } from 'react-toastify';
import App from './App';
import ApolloProvider from './utilities/Apollo';
import LocalizationProvider from './utilities/lang';

import 'react-toastify/dist/ReactToastify.css';
import SocketWrapper from './utilities/soket/SoketProvider';
import ErrorBoundary from './utilities/Errors/ErrorBondary';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <ApolloProvider>
        <SocketWrapper>
          <LocalizationProvider>
            <App />
            <ToastContainer position='bottom-right' />
          </LocalizationProvider>
        </SocketWrapper>
      </ApolloProvider>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root'),
);
