import React from 'react'
import User from './User'
import useGetUserConversation from '../../hooks/useGetUserConversation'
import { getRandomEmoji } from '../../utils/emoji';
import UserListSkeleton from '../../skeletons/UserListSkeleton';

const UserList = () => {

  const {loading, users} = useGetUserConversation();
  return (
    <div className='py-2 flex flex-col overflow-auto'>


        {loading && ([...Array(5)].map((_, idx) => (
          <UserListSkeleton key={idx} />
        )))}
        
        {!loading && users.length > 0 && users.map((user, idx) => (

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