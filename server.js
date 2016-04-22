var app = require('express')();
var http = require('http').Server(app);
var io = require("socket.io")(http);

var port = process.env.PORT || 3000;

var history = [];

app.get('/', function(req,res){
    res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket){
    console.log("client connected");
    socket.on('get history', function(){
        console.log('get history triggered', history);
        io.emit('get history', history);
    });
    socket.on('chat message', function(user){
        history.push(user);
        io.emit('chat message', user);

    });
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });


});




http.listen(port, function(){
    console.log(`listening on port: ${port}`);
});
