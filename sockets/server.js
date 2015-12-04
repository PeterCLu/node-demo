/*
    server.js
    main server script for the socket.io chat demo
*/

var net = require('net');

//create a new network server
var server = net.createServer();

//array of connected clients
var clients = [];

server.on('connection', function(socket) {
    var name;

    function broadcast(name, message) {
        clients.forEach(function(client) {
            if (client !== socket) {
                client.write('[' + name + '] ' + message);
            }
        });
    }

    clients.push(socket);

    socket.write('Hello! What is your name?\n');

    socket.on('data', function(data) {
        if (!name) {
            name = data.toString().trim();
            socket.write('Hello ' + name + '!\n');
        } else {
            var message = data.toString();
            if (message.trim() === 'exit') {
                socket.end();
            } else {
                broadcast(name, data.toString());
            }

        }
    });
});

server.on('listening', function() {
    console.log('server listening on port 3000');
});

server.listen(3000);