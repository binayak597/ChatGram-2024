import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import useLogin from '../../hooks/useLogin';

const Login = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const {loading, postLoginData} = useLogin();

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    // console.log(userName, password);
    await postLoginData(userName, password);
  }
  return (
    <div className='flex flex-col justify-center items-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <h1 className='text-3xl font-semibold text-center text-gray-300'>
            Login <span className='text-blue-500'>ChatGram</span>
          </h1>

          <form onSubmit={handleSubmit}>

            <div>
              <label className='label p-2'>
                <span className='text-base label-text text-gray-300'>UserName</span>
              </label>
              <input
							type='text'
							placeholder='johndoe'
							className='w-full input input-bordered  h-10'
              value={userName}
              onChange={(ev) => setUserName(ev.target.value)}
						  />
            </div>

            <div>
              <label className='label p-2'>
                <span className='text-base label-text text-gray-300'>Password</span>
              </label>
              <input
							type='password'
							placeholder='Enter Password'
							className='w-full input input-bordered  h-10'
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
						  />
            </div>

            <Link
              to={"/signup"} 
              className="text-gray-300 text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              {"Don't"} have an account?
            </Link>

            <div>
						<button 
            className='btn btn-block btn-sm mt-2 border border-slate-700'
            disabled={loading}
            >
            {loading? <span className="loading loading-spinner loading-md"></span>: 'Login'}
						</button>
					</div>

          </form>


      </div>

      
    </div>
  )
}

export default Login