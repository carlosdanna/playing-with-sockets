var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);

var port = process.env.PORT || 3000;

var history = [];
var players = [];
var id = 1;


app.use('/assets', express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket){
    console.log("client connected");
    socket.on('create players', function(_player){
        _player.id = id;
        ++id;
        players[_player.id] = _player;
        io.emit('id player', _player.id);
        io.emit('create players', players);
    });

    socket.on('update player', function(_player){
        players[_player.id] = _player;
        console.log(players);
        io.emit('update players', players);
    });

    socket.on('disconnect', function(){
        // players =[];
        // id = 1;
        console.log('user disconnected');
    });
});

http.listen(port, function(){
    console.log(`listening on port: ${port}`);
});
