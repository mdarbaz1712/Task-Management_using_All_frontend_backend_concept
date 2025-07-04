import React,{useState,useEffect} from 'react'
import axios from "axios"
import Cards from '../components/Home/Cards'


const IncompletedTask = () => {
  const headers={
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`
      }
      const [data,setData]=useState()
  
      useEffect(() => {
        const fetch=async()=>{
          const response=await axios.get("http://localhost:1000/api/v2/all-incomp-task",{headers})
          setData(response.data.tasks);
        }  
        fetch();  
      })
  return (
    <Cards tasks={data}/>
  )
}

export default IncompletedTask