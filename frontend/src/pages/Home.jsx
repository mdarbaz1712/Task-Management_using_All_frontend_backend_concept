import React, { useState } from 'react'
import Sidebar from '../components/Home/Sidebar'
import { Outlet } from 'react-router-dom'
import InputTask from '../components/Home/InputTask'
const Home = () => {
  const[visInputTask,setvisInputTask]=useState(true)
  return (
      <>
        {(          
          <div className='gap-5 h-screen p-3 flex w-screen'>        
          <div className='h-full w-1/6 border border-white rounded-lg p-3'>
            <Sidebar/>
          </div>
          <div className='h-full w-5/6 border border-white rounded-lg p-3'>
            <Outlet/>
          </div>
        </div>
      )}
      {
        visInputTask&&<InputTask/>
       
      }
    </>
  )
}

export default Home