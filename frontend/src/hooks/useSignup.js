import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const useSignup = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const postSignupData = async ({fullName, userName, email, password, confirmPassword, gender}) => {

        const success = validateSignupData({fullName, userName, email,  password, confirmPassword, gender});

        if(!success) return;
    
        setLoading(true);
        try {
            const res = await fetch("/api/user/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({fullName, userName, email, password, confirmPassword, gender})

            });

            const data = await res.json();
            console.log(data);
            if(data.error) throw new Error(data.error);
            navigate("/login");

        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }

    };
    
    return {loading, postSignupData}
}

export default useSignup;



//hendle signup data validation

const validateSignupData = ({fullName, userName, email, password, confirmPassword, gender}) => {

    if(!fullName || !userName || !email || !password || !confirmPassword || !gender){
        toast.error("Please fill in all fields");
        return false;
    }

    if(password !== confirmPassword){
        toast.error("Password doesnot match");
        return false;
    }

    if(password.length < 6){
        toast.error("Password must be atleast 6 characters");
        return false;
    }

    return true;
}