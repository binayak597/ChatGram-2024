import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addNewMessage, messageSelector } from "../redux/reducers/messageSlice";
import { useState } from "react";


const useSendMessage = () => {

    const [loading, setLoading] = useState(false);
    const {selectedUser} = useSelector(messageSelector);
    const dispatch = useDispatch();

    const sendMessage = async (message) => {

        setLoading(true);
        try {
            const res = await fetch(`/api/message/send/${selectedUser?._id}`, {
                method: 'POST',
                headers: {"Content-Type": 'application/json'},
                body: JSON.stringify({message})
            });

            const data = await res.json();

            console.log(data);
            if(data.error) throw new Error(error.message);

            dispatch(addNewMessage(data.message));

        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return {loading, sendMessage}
}

export default useSendMessage;