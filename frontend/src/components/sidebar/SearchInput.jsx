import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { IoSearchSharp } from "react-icons/io5";
import useGetUserConversation from '../../hooks/useGetUserConversation'
import { useDispatch } from 'react-redux';
import { retrieveSelectedUser } from '../../redux/reducers/messageSlice';

const SearchInput = () => {

	const [searchData, setSearchData] = useState("");
	const {users} = useGetUserConversation();
	const dispatch = useDispatch();


	const handleSubmit = (ev) => {

		ev.preventDefault();

		if(!searchData) return;

		if(searchData.length < 3) return toast.error("Enter atleast 3 characters long query");

		const selectedUser = users.find(user => user.fullName.toLowerCase().includes(searchData.toLowerCase()));

		if(selectedUser){
			dispatch(retrieveSelectedUser(selectedUser));
			setSearchData("");
		}else{
			toast.error("No such user found");
		}
	}
  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
			<input
				type='text'
				placeholder='Search…'
				className='input input-bordered rounded-full'
				value={searchData}
				onChange={(ev) => setSearchData(ev.target.value)}
			/>
			<button type='submit' className='btn btn-circle bg-sky-500 text-white'>
				<IoSearchSharp className='w-6 h-6 outline-none' />
			</button>
		</form>
  )
}

export default SearchInput