import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


const useLogin = () => {

    const [loading, setLoading] = useState(false);
    const {setAuthUserData} = useAuthContext();

    const navigate = useNavigate();

    const postLoginData = async (userName, password) => {

        const success = validateSignupData(userName, password);
        if(!success) return;

        setLoading(true);

        try {
        
            const res = await fetch("/api/user/signin", {
                method: "POST", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({userName, password})
            });

            const data = await res.json();
            console.log(data);

            if(data.error) throw new Error(data.error);

            setAuthUserData(data);

            localStorage.setItem("authUser-info", JSON.stringify(data));
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    return {loading, postLoginData}
}

export default useLogin;


//hendle signup data validation

const validateSignupData = (userName, password) => {

    if(!userName || !password){
        toast.error("Please fill in all fields");
        return false;
    }

    return true;
}
