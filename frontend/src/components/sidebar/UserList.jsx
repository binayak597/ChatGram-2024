import React from 'react'
import User from './User'
import useGetUserConversation from '../../hooks/useGetUserConversation'
import { getRandomEmoji } from '../../utils/emoji';

const UserList = () => {

  const {loading, users} = useGetUserConversation();
  return (
    <div className='py-2 flex flex-col overflow-auto'>
        {users.map((user, idx) => (

          <User 
            key={user._id}
            user={user}
            emoji={getRandomEmoji()}
            lastIdx={idx === users.length - 1}
          />
        ))}
    </div>
  )
}

export default UserList