var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

// for parsing application/json
app.use(bodyParser.json()); 
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 
//form-urlencoded
// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '\\index.html');
});

app.get('/chat', function(req, res) {
  res.sendFile(__dirname + '\\chat.html');
});

app.post('/chat', function(req, res) {
  res.sendFile(__dirname + '\\chat.html');
  var login = req.body.name;
  console.log(login + ' entered the chat');
  io.emit('chat message', login + ' entered the chat');
});

io.on('connection', function(socket) {
  socket.on('disconnect', function() {
    console.log('User disconnected');
  });
  socket.on('chat message', function(msg) {
    console.log(msg);
    io.emit('chat message', msg);
  });
});
http.listen(3000, function() {
  console.log('listening on *:3000');
});

/*
Homework
Here are some ideas to improve the application:

OK - Broadcast a message to connected users when someone connects or disconnects.
- Add support for nicknames.
- Don’t send the same message to the user that sent it. Instead, append the message directly as soon as he/she presses enter.
- Add “{user} is typing” functionality.
- Show who’s online.
- Add private messaging.
- Share your improvements!
*/