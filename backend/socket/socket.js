import http from 'http';
import { Server } from 'socket.io';
import express from 'express';

const app = express();

//implement socket server on the top of express 
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"]
    }
});

export const getSocketUserId = (recieverId) => {

    return connectedUserMap[recieverId];
}


const connectedUserMap = {}; //{userId: socketId}

//.on() is used to listen events ....can be used both on client and server side
io.on("connection", (socket) => {

    console.log("a user is connected", socket.id);

    const userId = socket.handshake.query.userId;

    if(userId !== undefined){
        connectedUserMap[userId] = socket.id;
    }

    //.emit() is used to send events to all the connected clients

    io.emit("get-onlineUsers", Object.keys(connectedUserMap));

    socket.on("disconnect", () => {
        console.log("user is disconnected");

        //when a user will disconnect we will delete that user from our connectedUserMap obj

        delete connectedUserMap[userId];
        io.emit("get-onlineUsers", Object.keys(connectedUserMap));
    });
});

export {app, server, io};