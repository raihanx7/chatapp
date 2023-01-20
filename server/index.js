const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config()
const app = express();
const PORT = 4000;

const http = require('http').Server(app);
const cors = require('cors');
app.use(cors());

// Set up socket.io
const socketIO = require('socket.io')(http, {
  cors: {
      origin: "http://localhost:3000"
  }
});

// Set up MongoDB 
let uri = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.CLUSTER_NAME}.mongodb.net/?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Mongo has connected succesfully')
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected')
})

// Set up schema for messages
const messageSchema = new mongoose.Schema({
  name: String,
  text: String,
  time: String,
  socketID: String
});

const MessageModel = mongoose.model('Message', messageSchema);

// Array of users in chat room
let users = [];

// On connection
socketIO.on('connection', (socket) => {
  console.log(`+++ : ${socket.id} user just connected!`);

  // On message sent
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);

    const messageSent = new MessageModel({
      name: data.name,
      text: data.text,
      time: data.time,
      socketID: data.socketID
    });
    
    messageSent.save((err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Message added to DB! Result: " + res);
      }
    });
  });

  // On new user joined
  socket.on('newUser', (data) => {
    users.push(data);
    socketIO.emit('newUserResponse', users);
  });

  // On user disconnect
  socket.on('disconnect', () => {
    console.log(`--- : ${socket.id} user disconnected`);
    users = users.filter((user) => user.socketID !== socket.id);
    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });
});

app.get("/api", (req, res) => {
  res.json({message: "Hello"})
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});