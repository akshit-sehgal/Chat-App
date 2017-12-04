const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;

const app=express();
const server = http.createServer(app);
const io=socketIO(server);
const {generateMessage}=require('./utils/message');
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.on('disconnect',()=>{
        console.log('A user was disconnected');
    });
    socket.on('createMessage',(message)=>{
       io.emit('newMessage',generateMessage(message.from,message.text));
    });
    socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App!'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','A new user has joined'))
});
server.listen(port,()=>{
console.log(`Server is listening on port ${port}`);
console.log(generateMessage);
});
