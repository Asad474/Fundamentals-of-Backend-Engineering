const http = require('http');
const WebSocketServer = require('websocket').server;
let connections = [];

const httpServer = http.createServer();

const websocket = new WebSocketServer({ httpServer });

httpServer.listen(8080, () => {
    console.log('Server is running at port 8080.');
});

websocket.on('request', request => {
    const connection = request.accept(null, request.origin);

    connection.on('message', message => {
        // Someone just send a message tell everybody.
        connections.forEach(c => c.send(`User${connection.socket.remotePort} says: ${message.utf8Data}`));
    });

    connections.push(connection);

    // Someone just connected, tell everybody
    connections.forEach(c => c.send(`User${connection.socket.remotePort} just connected.`));
});