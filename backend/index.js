import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connectToDBusingMongoose from './src/config/mongooseConfig.js';
import userRouter from "./src/features/users/users.routes.js";
import cookieParser from 'cookie-parser';
import jwtAuth from './src/middlewares/jwtAuth.middleware.js';
import messageRouter from './src/features/messages/messages.routes.js';

const app = express();

app.use(cookieParser());

app.use(express.json()); //parse the incoming req json payload data

//api gateway

//requests related to user routes
//http://localhost:8000/api/user
app.use("/api/user", userRouter);


//requests related to message routes
//http://localhost:8000/api/message
app.use("/api/message", jwtAuth, messageRouter);

app.get("/", (req, res) => res.send("welcome"));

let PORT = process.env.PORT || 3200;

app.listen(PORT, () => {

    connectToDBusingMongoose();
    console.log(`server is running on ${PORT}.`);
});