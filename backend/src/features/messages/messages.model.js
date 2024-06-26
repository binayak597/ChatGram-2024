

export default class MessageModel{

    constructor(_senderId, _receiverId, _message, _id){

        this.senderId = _senderId;
        this.receiverId = _receiverId;
        this.message = _message;
        this.id = _id
    }
}