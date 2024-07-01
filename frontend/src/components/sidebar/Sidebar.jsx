import React from 'react'
import SearchInput from './SearchInput'
import UserList from './UserList'
import LogoutBtn from './LogoutBtn'

const Sidebar = () => {
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
      <SearchInput />
      <div className='divider py-3'></div>
      <UserList />
      <LogoutBtn />
    </div>
  )
}

export default Sidebar