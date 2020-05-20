import io from 'socket.io-client';

const socketserver = 'https://cs52-multiplayer-online-game.herokuapp.com/';

const socket = io(socketserver);
socket.on('connect', () => { console.log('socket.io connected'); });
socket.on('disconnect', () => { console.log('socket.io disconnected'); });
socket.on('reconnect', () => { console.log('socket.io reconnected'); });
socket.on('error', (error) => { console.log(error); });

export default socket;
