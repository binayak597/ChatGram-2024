import { createContext, useContext, useState } from "react";


//create the context
const AuthContext = createContext();

export const useAuthContext = () => {
    const value = useContext(AuthContext);
    return value;
}


export const AuthContextPovider = ({children}) => {

    const [authUser, setAuthUser] = useState(() => {
        const info = JSON.parse(localStorage.getItem("authUser-info"));
        if(info) return info;
        return null;
    });

    const setAuthUserData = (data) => {
        setAuthUser(data);
    }

    const logoutUser = () => {
        setAuthUser(null);
    }
    return (
        <AuthContext.Provider value={{authUser, setAuthUserData, logoutUser}}>
        {children}
    </AuthContext.Provider>
    );
};

