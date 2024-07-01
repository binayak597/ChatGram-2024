import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { retrieveSelectedUser } from "../redux/reducers/messageSlice";


const useLogout = () => {

    const [loading,setLoading] = useState(false);
    const {logoutUser} = useAuthContext();
    const dispatch = useDispatch();

    const logout = async () => {

        setLoading(true);

        try {

            const res = await fetch("/api/user/signout", {
                method: "POST"
            });

            const data = await res.json();
            // console.log(data);

            logoutUser();
            // dispatch(retrieveSelectedUser());
            localStorage.removeItem("authUser-info");
            if(data.error) throw new Error(data.error);
            
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return {loading, logout};
}

export default useLogout;