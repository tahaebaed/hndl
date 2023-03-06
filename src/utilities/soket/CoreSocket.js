import socketIOClient from 'socket.io-client';

class CoreSocket {
  constructor() {
    this.socket = socketIOClient('https://fleet-management.tk');
  }

  emit(event, data, clientId) {
    if (clientId) {
      return this.socket.sockets.to(clientId).emit(event, data);
    } else {
      return this.socket.emit(event, data);
    }
  }

  on(event, callBack) {
    return this.socket.on(event, callBack);
  }

  off(event) {
    this.socket.off(event);
  }
}

export default new CoreSocket();
