import ApplicationError from "../../error-handler/applicationError.js";
import ConverSationModel from "./conversation.schema.js";
import MessageModel from "./messages.schema.js";


export default class MessageRepository{

    sendMessages = async (senderId, receiverId, message) => {

        try {
            
            //findout the conversation document which has both senderId and receiverId
            let conversation = await ConverSationModel.findOne({
                participants: {
                    $all: [senderId, receiverId]
                }
            });

            //create newMessage document
            const newMessage = new MessageModel({
                senderId,
                receiverId,
                message
            });

            //if conversation doc not there create the doc and update the message array
            if(!conversation){
                conversation = new ConverSationModel({
                    participants: [senderId, receiverId]
                });

                conversation.messages.push(newMessage._id);
            
            //update the message array 
            }else{
                conversation.messages.push(newMessage._id);
            }

            // await newMessage.save();
            // await conversation.save();

            await Promise.all([newMessage.save(), conversation.save()]); //both will operate parallely

            return newMessage;

        } catch (err) {
            throw new ApplicationError("something went wrong", 500);
        }
    }

    retrieveMessages = async (senderId, receiverId) => {
        try {
            const conversation = await ConverSationModel.findOne({
                participants: {
                    $all: [senderId, receiverId]
                }
            }).populate("messages"); //not references but actual messages

            if(!conversation) return [];
            return conversation.messages;
        } catch (err) {
            throw new ApplicationError("something went wrong", 500);
        }
    }
}