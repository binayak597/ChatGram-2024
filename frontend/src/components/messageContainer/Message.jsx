import React from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { useSelector } from 'react-redux';
import { messageSelector } from '../../redux/reducers/messageSlice';
import { convertTime } from '../../utils/convertTime';

const Message = ({message}) => {

  const {authUser} = useAuthContext();
  const {selectedUser} = useSelector(messageSelector);

  const isSender = authUser._id === message.senderId;  
  const profilePic = isSender? authUser.profilePic: selectedUser.profilePic;
  const shakeClass = message.shouldShake ? "shake" : "";
  return (
    <div className={`chat ${isSender? 'chat-end': 'chat-start'}`}>
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={profilePic}
      />
    </div>
  </div>
  <div className={`chat-bubble ${isSender &&'bg-sky-500'} ${shakeClass} pb-2`}>{message.message}</div>
  <div className="chat-footer text-gray-300 opacity-50">{convertTime(message.createdAt)}</div>
</div>
  )
}

export default Message