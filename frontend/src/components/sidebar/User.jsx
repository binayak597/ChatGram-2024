import React from 'react'
import { messageSelector, retrieveSelectedUser } from '../../redux/reducers/messageSlice'
import {useDispatch, useSelector} from 'react-redux';
import { socketSelector } from '../../redux/reducers/socketSlice';

const User = ({user, emoji, lastIdx}) => {
  
  const {selectedUser} = useSelector(messageSelector);
  const dispatch = useDispatch();
  const isSelected = selectedUser?._id === user._id;
  const {onlineUsers} = useSelector(socketSelector);

  const isUserOnline = onlineUsers.includes(user._id);
  return (
    <>
 			<div 
			className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected && 'bg-sky-500'}`}
			onClick={() => {dispatch(retrieveSelectedUser(user))}}
			 >
				<div className={`avatar ${isUserOnline && 'online'}`}>
					<div className='w-12 rounded-full'>
					<img
							src={user.profilePic}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{user.fullName}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
  )
}

export default User;



// 'https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png'