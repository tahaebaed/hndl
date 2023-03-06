import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CoreSocket from './CoreSocket';
import Cookies from 'js-cookie';

export const SOCKETCxt = React.createContext(null);

const SocketWrapper = ({ children }) => {
  const [socketId, setSocketId] = useState('');

  useEffect(() => {
    try {
      CoreSocket.on('connect', () => {
        console.log('====================================');
        console.log('Conencted');
        console.log('====================================');
        setSocketId(CoreSocket.socket.id);
      });
      // CoreSocket.emit('join', Cookies.get('userID'))
      CoreSocket.emit('join', Cookies.get('accessType'));
      // CoreSocket.emit('join', Cookies.get('classification'))
    } catch (err) {
      console.log(err);
    }

    return () => {
      CoreSocket.off('disconnect', () => {
        console.log('====================================');
        console.log('disconect');
        console.log('====================================');
        setSocketId(CoreSocket.socket.id);
      });
    };
  }, []);

  return <SOCKETCxt.Provider value={{ CoreSocket, socketId }}>{children}</SOCKETCxt.Provider>;
};

SocketWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SocketWrapper;
