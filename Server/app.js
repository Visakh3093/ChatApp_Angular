const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./router/authRoute');
const userRouter = require('./router/userRoute');
const chatRouter = require('./router/chatRoute')
const { createServer } = require('node:http');
const { Server } = require('socket.io');
require('dotenv').config();
const colors = require('colors');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:55726', 'http://127.0.0.1:55726'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
});
app.use(express.static('public'));

app.use(cors({
    origin: ['http://localhost:55726', 'http://127.0.0.1:55726'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization']
}));    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db_url = process.env.DB;
const PORT = process.env.PORT || 5000;

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);          
app.use('/api/chat', chatRouter)
  

// this is used to handle real-time communication between the server and the client
// whenever a user connects to the server, a new socket is created and the 'connection' event is triggered
// the 'message' event is triggered whenever a user sends a message to the server
// the 'disconnect' event is triggered whenever a user disconnects from the server

// io.on('connection', (socket) => {
//     console.log("User Connected: ", socket.id);
//     socket.on('message', (data) => {
//         console.log("message: ------", data, " id: ", socket.id);
        
//     })
//     socket.on('disconnect', () => {
//         console.log("User Disconnected: ", socket.id);
//     });
// });

 
mongoose.connect(db_url).then(() => {
    console.log("Database Connected");
    server.listen(PORT, () => {
        console.log(`Server Started on port ${PORT} `.red.bold);
    });
}).catch((err) => {
    console.log("Database not connected: ", err);
});
