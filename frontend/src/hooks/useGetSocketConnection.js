import { useEffect } from "react"
import io from "socket.io-client";
import { useAuthContext } from "../context/AuthContext";
import {useDispatch, useSelector} from "react-redux"
import { getOnlineUsers, getSocketConnection, resetSocketConnection } from "../redux/reducers/socketSlice";
import { socketSelector } from "../redux/reducers/socketSlice";



const useGetSocketConnection = () => {

    const {authUser} = useAuthContext();
    const dispatch = useDispatch();
    const {socket} = useSelector(socketSelector);
    useEffect(() => {
        if(authUser){
            const socket = io("http://localhost:8000", {
                query:{
                    userId: authUser._id
                }
            });

            // console.log({...socket});
            dispatch(getSocketConnection(socket));


            socket.on("get-onlineUsers", (onlineUsers) => {
                dispatch(getOnlineUsers(onlineUsers));
            });

            //cleanup funtion call for performance optimization (unmount)
            return () => {
                socket.close();
            }
        }else{
           if(socket){
            socket.close();
            dispatch(resetSocketConnection());
           } 
        }
    }, []);
}

export default useGetSocketConnection;