const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
//Server is inbuilt method in socket.io..
const { Server } = require("socket.io");
app.use(cors());


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
//.on is event trigered when a clint connects to server
io.on("connection", (socket) => {
    console.log('user connected:' + socket.id);
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log("connected room: " + socket.id + "joined room is : " + data);

    });


    socket.on("mesdata", (data) => {
        //emit data to a specific room
        socket.to(data.room_no).emit("receive_message",data);

       // console.log("message enterd", data);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    });
});



server.listen(3001, function () {
    console.log("server running in port 3001");
})
