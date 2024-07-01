import React, { useState } from 'react'
import GenderCheckBox from './GenderCheckBox'
import {Link, useNavigate} from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

const Signup = () => {

  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: ""
  });

  const {loading, postSignupData} = useSignup();
  const navigate = useNavigate();

  const handleGenderCheckbox = (gender) => {

    setInputs({...inputs, gender});
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    // console.log(inputs);
    await postSignupData(inputs);
  }

  return (
    <div className='flex flex-col justify-center items-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <h1 className='text-3xl font-semibold text-center text-gray-300'>
            Signup <span className='text-blue-500'>ChatGram</span>
          </h1>

          <form onSubmit={handleSubmit}>

            <div>
              <label className='label p-2'>
                <span className='text-base label-text text-gray-300'>Full Name</span>
              </label>
              <input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered  h-10'
              value={inputs.fullName}
              onChange={(ev) => setInputs({...inputs, fullName: ev.target.value})}
						  />
            </div>

            <div>
              <label className='label p-2'>
                <span className='text-base label-text text-gray-300'>UserName</span>
              </label>
              <input
							type='text'
							placeholder='johndoe'
							className='w-full input input-bordered  h-10'
              value={inputs.userName}
              onChange={(ev) => setInputs({...inputs, userName: ev.target.value})}
						  />
            </div>

            <div>
              <label className='label p-2'>
                <span className='text-base label-text text-gray-300'>Email</span>
              </label>
              <input
							type='email'
							placeholder='Enter your email address'
							className='w-full input input-bordered  h-10'
              value={inputs.email}
              onChange={(ev) => setInputs({...inputs, email: ev.target.value})}
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
              value={inputs.password}
              onChange={(ev) => setInputs({...inputs, password: ev.target.value})}
						  />
            </div>

            <div>
              <label className='label p-2'>
                <span className='text-base label-text text-gray-300'>Confirm Password</span>
              </label>
              <input
							type='password'
							placeholder='Confirm Password'
							className='w-full input input-bordered  h-10'
              value={inputs.confirmPassword}
              onChange={(ev) => setInputs({...inputs, confirmPassword: ev.target.value})}
						  />
            </div>
            <GenderCheckBox onChangeGender={handleGenderCheckbox} selectedGender={inputs.gender} />
            <Link
              to={"/login"}
              className="text-gray-300 text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              Already have an account?
            </Link>

            <div>
            <button
             className='btn btn-block btn-sm mt-2 border border-slate-700'
             disabled={loading}
             >
							{loading? <span className="loading loading-spinner loading-md"></span>: 'Signup'}
						</button>
          </div>

          </form>

          

      </div>

      
    </div>
  )
}

export default Signup