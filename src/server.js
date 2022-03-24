const express = require("express");
const http= require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: "http://localhost:8080"
  },
});

//const messagesArray = []

/*
const messages = [
  {
    author: "Diego",
    message: "Hola"
  },
  {
    author: "Jorge",
    message: "Cómo están"
  },
  {
    author: "Ana",
    message: "Hola grupo"
  }
]
*/

const productos = [
  {
    nombre: "calculadora",
    precio: 123.45,
    foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png"
  },
  {   nombre: "reloj",
      precio: 59.34,
      foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png"
  },
  {
    nombre: "pizzarón",
    precio: 215.33,
    foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/board-math-class-school-128.png"
  },
  {
    nombre: "lápiz",
    precio: 25.22,
    foto: "https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-128.png"
  }
]

io.on('connection', (socket) => {
  // Mensaje de bienvenida al usuario
  console.log('😄 Nuevo usuario conectado');
  socket.emit('mensajeConexion', '🔥 Bienvenidos al websocket Coderhouse');
  // Comparto los mensajes
  io.sockets.emit('messageBack', productos);
  
  socket.on('disconnect',() => {
    console.log('🥺 Usuario desconectado');
  });

  socket.on('mensajeRespuesta', (data) => {
    console.log(data);
  })

  // Recibimos los mensajes desde el frontend
  socket.on('messageFront', (data) => {
    productos.push(data);
    //io.sockets.emit('message', data);
    io.sockets.emit('messageBack', productos);
  })
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

app.get('/', (req,res) => {
  res.sendFile('index.html')
})

const PORT = 8080;
server.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`),
);

server.on("error", (err) => console.log(err));
