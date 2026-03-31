import React from 'react'
import Menue from '../components/Menue/Menue'
import { Outlet } from 'react-router'


const AppLayout = () => {

  return (
    <div className='flex reletive'>
      <Menue />
      <div className='basis-5/6 h-full overflow-auto absolute right-0 left-[20%]'>
        <Outlet/>
      </div>
    </div>
  )
}

export default AppLayout