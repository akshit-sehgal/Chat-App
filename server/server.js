const path=require('path');
const http=require('http');
const express=require('express');
const socketIO=require('socket.io');
const publicPath=path.join(__dirname,'../public');
const port=process.env.PORT||3000;

const app=express();
const server = http.createServer(app);
const io=socketIO(server);

app.use(express.static(publicPath));
io.on('connection',(socket)=>{
    console.log('New user connected');
    socket.on('disconnect',()=>{
        console.log('A user was disconnected');
    });
    socket.emit('newMessage',{
        from:'Blah',
        text:'How are you?',
        createdAt:123
    });
    socket.on('createMessage',(message)=>{
        console.log('Create Message',message);
    })
});
server.listen(port,()=>{
console.log(`Server is listening on port ${port}`);
});
