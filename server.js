var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);

var port = process.env.PORT || 3000;

var history = [];
var players = [];
var id = 9001;


app.use('/assets', express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket){
    console.log("client connected");
    socket.on('create player', function(_player){
        _player.id = id;
        ++id;
        players.push(_player);
        io.emit('id player', _player.id);
        io.emit('create player', players);
    });

    socket.on('update players', function(_player){
        players[0] = _player;
        console.log(players);
        io.emit('update players', players);
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});

http.listen(port, function(){
    console.log(`listening on port: ${port}`);
});
