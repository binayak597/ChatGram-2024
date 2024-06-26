import { Router } from "express";
import MessageController from "./messages.controller.js";

const router = Router();

//create an instance of MessageController class

const messageController = new MessageController();

//routes  related to MessageController
//http://localhost:8000/api/message/send/:receiverId

router.post("/send/:receiverId", (req, res) => {
    messageController.sendMessages(req, res);
});

//http://localhost:8000/api/message/:receiverId

router.get("/:receiverId", (req, res) => {
    messageController.retrieveMessages(req, res);
});

export default router;