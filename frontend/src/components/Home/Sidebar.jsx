import React, { useEffect, useState } from 'react'
import { BsListTask } from "react-icons/bs";
import { VscTasklist } from "react-icons/vsc";
import { TbLabelImportantFilled } from "react-icons/tb";
import { MdIncompleteCircle } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from "axios"
import { backend_url } from '../../store/store';

const sidebar = () => {
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const logout=()=>{
    dispatch(authActions.logout());
    localStorage.clear("id")
    localStorage.clear("token")
    navigate("/signup")
  }
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`
  }
  const [data,setData]=useState()
  useEffect(() => {
    const fetch=async()=>{
      const response=await axios.get(`${backend_url}/api/v2/all-task`,{headers})
      setData(response.data.message);
    }  
    fetch();  
  }, [])
  
  return (
    
      <div className="h-full w-full flex flex-col justify-between">
      {/* Top Content */}
      {
      data && <div>
          <h1 className='text-2xl font-bold'>{data.username}</h1>
          <p>{data.email}</p>
          <hr/>
      </div>
      }

      {/* Middle Content */}
      <div className='flex flex-col gap-8'>
        <Link to={"/"} className='border rounded-md flex  gap-2 items-center pl-9 py-2 font-bold hover:bg-gray-300 cursor-pointer'>
          <div className='text-xl'><BsListTask /></div>
          <div>All Tasks</div>
        </Link>
        <Link to={"/ImportantTask"} className='border rounded-md flex align-center justify-center gap-2 items-center p-2 font-bold hover:bg-gray-300 cursor-pointer'>
          <div className='text-xl'><TbLabelImportantFilled /></div>
          <div>
          Important Tasks
          </div>
        </Link>
        <Link to={"/CompletedTask"} className='border rounded-md flex align-center justify-center gap-2 items-center p-2 font-bold hover:bg-gray-300 cursor-pointer'>
          <div className='text-xl'><VscTasklist /></div>
          <div>
          Completed Tasks
          </div>
        </Link>
        <Link to={"/IncompletedTask"}  className='border rounded-md flex  gap-2 items-center pl-9 py-2 font-bold hover:bg-gray-300 cursor-pointer '>
          <div className='text-xl'> <MdIncompleteCircle /></div>
          <div>
          Imcompleted Tasks
          </div>
        </Link>
      </div>

      {/* Fotter Content */}
      <div className='w-full bg-gray-300 rounded-md flex align-center justify-center h-10 hover:bg-gray-900 '>
          <button className='w-full text-xl font-bold  cursor-pointer ' onClick={logout}>Log Out</button>
      </div>
    </div>
  )
}

export default sidebar