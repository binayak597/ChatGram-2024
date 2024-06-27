import React from 'react'
import OnlineUser from './OnlineUser'

const OnlineUserList = () => {
  return (
    <div className='py-2 flex flex-col overflow-auto'>
        <OnlineUser />
        <OnlineUser />
        <OnlineUser />
        <OnlineUser />
        <OnlineUser />
    </div>
  )
}

export default OnlineUserList