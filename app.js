const express = require('express');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('public'));
server.listen(3000, () => console.log('Servidor iniciado en 3000'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  console.log('socket conectado',socket.id);
  io.emit('socket_conectado', {texto: 'Nuevo socket conectado: ' + socket.id +`<br>`} );

  socket.on('disconnect', () => {
  	console.log('socket desconectado',socket.id);
    io.emit('socket_desconectado', {texto: 'Socket desconectado.'+ socket.id +`<br>`});
  
  });

  socket.on('chat:mensaje', (data)=>{
    io.emit('chat:mensaje', data);
  })
  
  socket.on('chat:escribiendo', (usuario)=>{
    socket.broadcast.emit('chat:escribiendo', usuario)
  })
});

