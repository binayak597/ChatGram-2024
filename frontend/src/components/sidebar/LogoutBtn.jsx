import React from 'react'
import { BiLogOutCircle } from "react-icons/bi";
import useLogout from '../../hooks/useLogout';

const LogoutBtn = () => {
  const {loading, logout} = useLogout();
  return (
    <div className='mt-auto'>
			
      {loading? <span className="loading loading-spinner loading-md"></span>: (<BiLogOutCircle className='w-6 h-6 text-white cursor-pointer' onClick={logout}/>)}
				
	</div>
  )
}

export default LogoutBtn