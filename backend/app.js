const express=require("express");

const app=express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.get("/",(req,res)=>{
    res.send("<h1>hello</h1>")
});

io.on('connection', socket => {
    console.log("user connected");
    socket.on('chat-msg',(msg)=>{
        console.log('message: '+JSON.stringify(msg));
    io.emit("chat-msg",msg);

    })
});

server.listen(3001,(req,res)=>{
    console.log("server is running at port 3001")
});