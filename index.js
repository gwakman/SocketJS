var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '\\index.html');
});

app.get('/chat', function(req, res) {
  res.sendFile(__dirname + '\\chat.html');
});

io.on('connection', function(socket) {
  console.log('A user connected');

  socket.on('disconnect', function() {
    console.log('User disconnected');
  });

  socket.on('log in', function(login) {
    console.log(login + ' entered the chat');
    io.emit('chat message', login + ' entered the chat');
    io.emit('redirect', './chat');
  });

  socket.on('chat message', function(msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});


/*
Homework
Here are some ideas to improve the application:

- Broadcast a message to connected users when someone connects or disconnects.
- Add support for nicknames.
- Don’t send the same message to the user that sent it. Instead, append the message directly as soon as he/she presses enter.
- Add “{user} is typing” functionality.
- Show who’s online.
- Add private messaging.
- Share your improvements!
*/

//node index.js
//ngrok http -hostname=gwakman.eu.ngrok.io 3000