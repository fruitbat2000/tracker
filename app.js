var express = require('express');
var app = express();
var port = 8080;

app.get('/', function(req, res){
	res.sendfile('index.html');
});

app.use(express.static(__dirname + '/assets'));

var io = require('socket.io').listen(app.listen(port));
console.log('listening on port ' + port);

io.sockets.on('connection', function(socket){
	socket.emit('connected', {connected: true});
	socket.on('send', function(data){
		io.sockets.emit('carData', data);
	});
});
