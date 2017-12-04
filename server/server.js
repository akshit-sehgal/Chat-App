const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;

const app=express();
const server = http.createServer(app);
const io=socketIO(server);
const {generateMessage, generateLocationMessage}=require('./utils/message');
const {isRealString}=require('./utils/validation');
app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.on('disconnect',()=>{
        console.log('A user was disconnected');
    });
    socket.on('createMessage',(message,callback)=>{
       io.emit('newMessage',generateMessage(message.from,message.text));
       callback();
    });
    socket.emit('newMessage',generateMessage('Admin','Welcome to the Chat App!'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','A new user has joined'))
    socket.on('createLocationMessage',(coords)=>{
        io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
    });
    socket.on('join',(params,callback)=>{
        if(!isRealString(params.name)||!isRealString(params.room))
        callback('Name & Room Name are required.')
        callback();
    });
});
server.listen(port,()=>{
console.log(`Server is listening on port ${port}`);
});
