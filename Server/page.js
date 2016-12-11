express = require('express');  //web server
app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);       //web socket server
var mqtt = require('mqtt')
var client  = mqtt.connect('http://192.168.1.90')


server.listen(8080); //start the webserver on port 8080
app.use(express.static('public')); //tell the server that ./public/ contains the static webpages


io.sockets.on('connection', function (socket) { //gets called whenever a client connects

        socket.on('led', function (data) { //makes the socket react to 'led' packets by calling this function
        console.log(data.value);
        client.publish('color', data.value);
        });

});
console.log("running");
