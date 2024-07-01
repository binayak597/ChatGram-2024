
//this hook is responsible for retrieve all users who are online

import { useState, useEffect } from "react"
import toast from "react-hot-toast";

const useGetUserConversation = () => {

    const [loading, setLoading] =useState(false);
    //rightnow we are retrieving all the users of this application except the loggedInUser later will modify it to retrieve the users who are only friends of this loggedInUser
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getAllOnlineUsers = async () => {
        
            setLoading(true);
            try {
              const res = await fetch("/api/user");
              
              const data = await res.json();
    
              console.log(data);
               
              if(data.error) throw new Error(error.message);

              setUsers(data.users);
            } catch (error) {
                toast.error(error.message);
            }
        }

        getAllOnlineUsers();
    }, []);

    return {loading, users};
}

export default useGetUserConversation;