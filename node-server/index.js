const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => res.send('Hello World!'));

io.on('connection', function(socket) {
  console.log('a user connected');
});

server.listen(8080, () => console.log('Example app listening on port 8080!'));
