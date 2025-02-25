const { port } = require("./settings").SERVER;
const WebSocket = require('ws');

const wss = new WebSocket.Server({ noServer:true });
const clients = new Set();
wss.on('connection', (client) => {
  clients.add(client);
  client.on('close', () => {
    clients.delete(client);
  });
  client.on('message', (message) => {
    console.log('Received message:', message);
  });
});

wss.on('error', (err) => {
  console.error('WebSocket server error:', err);
});

module.exports = {
  wss, clients
};