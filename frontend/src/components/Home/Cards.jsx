import React from 'react'
import { IoHeart } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { AiFillPlusCircle } from "react-icons/ai";
import InputTask from './InputTask';
import axios from "axios"

const Cards = ({home,isAddTaskBtn,visInputTask,setVisInputTask,tasks,setUpdatedTask}) => {
    const headers={
      id:localStorage.getItem("id"),
      authorization:`Bearer ${localStorage.getItem("token")}`
    }
    const updateCompTask=async(id)=>{
        try{
            await axios.put(`http://localhost:1000/api/v2/update-comp-task/${id}`,{},{headers})
        }
        catch(error){
            console.log(error)
        }
    }
    const updateImpTask=async(id)=>{
        try{
            await axios.put(`http://localhost:1000/api/v2/update-imp-task/${id}`,{},{headers});  
        }
        catch(error){
            console.log(error);
        }
    }
    const deleteTask=async(id)=>{
        try{
            await axios.delete(`http://localhost:1000/api/v2/delete-task/${id}`,{headers})
        }
        catch(error){
            console.log(error);
        }
    }
    const updateTask=async(id,title,desc)=>{

        setVisInputTask(true)
        setUpdatedTask({id:id,title:title,desc:desc});
    }
  return (
    <div className='grid grid-cols-3 gap-3 h-full w-full'>
        {
            tasks && tasks.map((task,index)=><div key={index} className='w-full border flex border-black flex-col p-4 justify-between gap-10 rounded-lg'>
                <h3 className='font-bold text-xl '>{task.title}</h3>
                <p>{task.desc}</p>
                <p className="text-sm text-black-400 font-bold text-2xl">Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No deadline"}</p>
                <div className='w-full flex justify-between'>
                    <button className={`${task.complete=== true?"bg-green-500":"bg-red-500"} w-35 p-2 rounded-md font-semibold cursor-pointer transition-all duration-200 text-xl`} onClick={()=>updateCompTask(task._id)}>
                        {task.complete=== true?"Complete":"In Complete"} </button>
                    <button className='text-3xl cursor-pointer' onClick={()=>updateImpTask(task._id)}><IoHeart className={`${task.important?"text-red-500":"text-white"}`}/></button>
                    {home !== "false" &&<button className='text-3xl cursor-pointer'onClick={()=>updateTask(task._id,task.title,task.desc)}><TbEdit /></button>}
                    <button className='text-3xl cursor-pointer'onClick={()=>deleteTask(task._id)}><MdDelete /></button>
                </div>
                </div>                
            )
        }    

        {
            isAddTaskBtn&&<div className='flex border border-black p-4 justify-center items-center gap-10 rounded-lg cursor-pointer transition-all duration-200' onClick={()=>{setVisInputTask(true)
                return <InputTask visInputTask={visInputTask} setVisInputTask={setVisInputTask} />}}> 
                <div className='flex-col text-5xl font-bold'>
                    <button className='mx-20'>
                    <AiFillPlusCircle/>
                    </button>
                    <div >
                        Add Task
                    </div>
                </div>
            </div>
        }
    </div>
  )
}

export default Cards