import React, { useState,useEffect } from 'react';
import { RxCross1 } from 'react-icons/rx';
import axios from "axios"

const InputTask = ({ visInputTask, setVisInputTask ,updatedTask,setUpdatedTask}) => {
  const [data,setData]=useState({title:"",desc:""});
  useEffect(()=>{
    if(updatedTask)
    setData({title:updatedTask.title || "",desc:updatedTask.desc || ""})
  },[updatedTask])
  const headers={
      id:localStorage.getItem("id"),
      authorization:`Bearer ${localStorage.getItem("token")}`
  }

  const change=(e)=>{
    const {name,value}=e.target
    setData({...data,[name]:value})
  }

  const submit=async()=>{
    if(data.title === ""||data.title === ""){
      alert("All Fields are required !!! ");
    }
    else{
      const response=await axios.post("http://localhost:1000/api/v2/create-task",data,{headers});
      console.log(response)
      setData({title:"",desc:""});
      setUpdatedTask({id:"",title:"",desc:""})
      setVisInputTask(false);
    }
  }
  
  const closeAll=()=>{
    setData({title:"",desc:""});
    setUpdatedTask({id:"",title:"",desc:""})
    setVisInputTask(false);
  }

  const updateTask1=async(id,title,desc)=>{
    try{
      setData({title:title,desc:desc})
      if(title === ""|| desc === ""||id === ""){
        alert("All Fields are required !!!")
      }
      else{
        const res=await axios.put(`http://localhost:1000/api/v2/update-task/${id}`,data,{headers});        
        setData({title:"",desc:""});
        setUpdatedTask({id:"",title:"",desc:""})
        setVisInputTask(false);
      }
    }
    catch(error){
      console.log(error);
    }
  }

  if(!visInputTask)
    return null

  return (
    <>
      {/* Background Overlay */}
      <div
        className={`fixed h-screen w-screen bg-gray-300 opacity-30 top-0 left-0 z-10`}
      ></div>

      {/* Modal Container */}
      <div
        className={`fixed h-screen w-screen flex justify-center items-center top-0 left-0 z-20`}
      >
        <div className="bg-black h-4/6 w-2/6 text-white p-5 flex flex-col justify-between">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl w-26">
              ADD Task:
              <hr />
            </div>
            <RxCross1
              className="hover:text-gray-100 cursor-pointer"
              onClick={closeAll}
            />
          </div>

          {/* Title Input */}
          <div className="h-15 w-full border rounded-lg flex items-start mt-4">
            <textarea
              name="title"
              // type="text"
              placeholder="Title.."
              className="text-xl h-full w-full p-3"
              onChange={change}
              value={data.title}
            ></textarea>
          </div>

          {/* Description Input */}
          <div className="h-50 w-full border rounded-lg flex items-start mt-4">
            <textarea
              name="desc"
              placeholder="Desc.."
              className="text-xl h-full w-full p-3"
              value={data.desc}
              onChange={change}
            ></textarea>
          </div>

          {/* Submit Button */}
          {updatedTask.id?<div className="mt-4">
            <button className="bg-blue-900 text-2xl rounded-xl w-full cursor-pointer hover:bg-blue-300 h-10 transition-all duration-300" onClick={()=>updateTask1(updatedTask.id,updatedTask.title,updatedTask.desc)}>
              Update
            </button>
          </div>:
          <div className="mt-4">
            <button className="bg-blue-900 text-2xl rounded-xl w-full cursor-pointer hover:bg-blue-300 h-10 transition-all duration-300" onClick={submit}>
              Submit
            </button>
          </div>}
        </div>
      </div>
    </>
  );
};

export default InputTask;
