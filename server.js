const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require('path')

var PORT = process.env.PORT || 3000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, "public/index.html"))
})

io.on("connection", (socket) => {
  socket.on("change", (arg) => {
    console.log(arg);
    socket.broadcast.emit("change", arg);
  })
});

httpServer.listen(PORT);
