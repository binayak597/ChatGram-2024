
import { useAuthContext } from '../../context/AuthContext'
import Login from '../../pages/login/Login';

const Protected = ({children}) => {
    const {authUser} = useAuthContext();
  
    if(authUser) return children;
    return <Login />
}

export default Protected