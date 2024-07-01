import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { messageSelector } from "../redux/reducers/messageSlice";
import toast from "react-hot-toast";
import { retrieveMessages } from "../redux/reducers/messageSlice";


const useGetMessages = () => {

    const [loading, setLoading] = useState(false);
    const {selectedUser, messages} = useSelector(messageSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        const getMessages = async () => {

            setLoading(true);

            try {
                const res = await fetch(`/api/message/${selectedUser?._id}`);

                const data = await res.json();

                // console.log(data);

                if(data.error) throw new Error(data.error);
                dispatch(retrieveMessages(data.messages));
            } catch (error) {
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }

        getMessages();
    }, [selectedUser]);

    return {loading,messages}
};

export default useGetMessages;