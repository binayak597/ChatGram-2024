import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { socketSelector } from "../redux/reducers/socketSlice";
import { addNewMessage, messageSelector } from "../redux/reducers/messageSlice";
import notificationSound from "../assets/sounds/notification.mp3"

const useListenMessage = () => {

    const {socket} = useSelector(socketSelector);
    const {messages} = useSelector(messageSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        socket?.on("newMessage", (message) => {

            message.shouldShake = true;
            const sound = new Audio(notificationSound);
            sound.play();
            dispatch(addNewMessage(message));


            return () => {
                socket.off("newMessage");
            }
        });

    }, [socket, messages]);
}

export default useListenMessage;