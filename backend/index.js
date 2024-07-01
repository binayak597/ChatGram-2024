import path from "path";
import * as dotenv from 'dotenv';
dotenv.config();
import express from "express";
import connectToDBusingMongoose from './src/config/mongooseConfig.js';
import userRouter from "./src/features/users/users.routes.js";
import cookieParser from 'cookie-parser';
import jwtAuth from './src/middlewares/jwtAuth.middleware.js';
import messageRouter from './src/features/messages/messages.routes.js';
import cors from "cors";
import { app, server } from './socket/socket.js';

const __dirname = path.resolve();

app.use(cookieParser());

app.use(express.json()); //parse the incoming req json payload data

app.use(cors());

app.use(express.static(path.join(__dirname, "frontend", "dist")));

//api gateway

//requests related to user routes
//http://localhost:8000/api/user
app.use("/api/user", userRouter);


//requests related to message routes
//http://localhost:8000/api/message
app.use("/api/message", jwtAuth, messageRouter);


app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// app.get("/", (req, res) => res.send("welcome"));

let PORT = process.env.PORT || 5000;

server.listen(PORT, () => {

    connectToDBusingMongoose();
    console.log(`server is running on ${PORT}.`);
});