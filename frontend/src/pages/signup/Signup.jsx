import React from 'react'
import GenderCheckBox from './GenderCheckBox'
import {Link} from 'react-router-dom'

const Signup = () => {
  return (
    <div className='flex flex-col justify-center items-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
          <h1 className='text-3xl font-semibold text-center text-gray-300'>
            Signup <span className='text-blue-500'>ChatGram</span>
          </h1>

          <form>

            <div>
              <label className='label p-2'>
                <span className='text-base label-text text-gray-300'>Full Name</span>
              </label>
              <input
							type='text'
							placeholder='John Doe'
							className='w-full input input-bordered  h-10'
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
						  />
            </div>
            <GenderCheckBox />
            <Link
              to={"/login"}
              className="text-gray-300 text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              Already have an account?
            </Link>

          </form>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700'>
							Signup
						</button>
          </div>

      </div>

      
    </div>
  )
}

export default Signup