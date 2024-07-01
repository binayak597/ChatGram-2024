import React, {useEffect} from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import NoChatSelected from './NoChatSelected';
import { useSelector, useDispatch } from 'react-redux';
import { messageSelector, resetSelectedUser } from '../../redux/reducers/messageSlice';
import {useAuthContext} from '../../context/AuthContext'

const MessageContainer = () => {
  const {authUser} = useAuthContext();
  const {selectedUser} = useSelector(messageSelector);
  const dispatch = useDispatch();

  useEffect(() => {

    //cleanup function call (unmount)
    return () => {
      dispatch(resetSelectedUser());
    }
  }, []);
  return (
    <div className='md:min-w-[450px] flex flex-col'>
				{!selectedUser ? <NoChatSelected /> : (
                    <>
                        {/* Header */}
 				<div className='bg-slate-500 px-4 py-2 mb-2'>
					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{authUser.fullName}</span>
 				</div>

 				<Messages />
				<MessageInput />
                    </>
                )}
 		</div>
  )
}

export default MessageContainer