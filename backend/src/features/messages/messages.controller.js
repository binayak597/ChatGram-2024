import MessageRepository from "./messages.repository.js";


export default class MessageController{

    constructor(){
        this.messageRepository = new MessageRepository();
    }

    sendMessages = async (req, res) => {

        try {
            const {receiverId} = req.params;
            const {message} = req.body;
            const senderId = req.userId;

            const newMessage = await this.messageRepository.sendMessages(senderId, receiverId, message);

            return res.status(201).json({message: newMessage});
        } catch (err) {
            console.error("Error in sendMessage controller -> ", err.message);
            return res.status(err.statusCode).json({error: err.message});
        }


    }

    retrieveMessages = async (req, res) => {

        try {
            const {receiverId} = req.params;
            const senderId = req.userId;
            const messages = await this.messageRepository.retrieveMessages(senderId, receiverId);

            return res.status(200).json({messages});
        } catch (err) {
            console.error("Error in retrieveMessages controller -> ", err.message);
            return res.status(err.statusCode).json({error: err.message});
        }
    }
}