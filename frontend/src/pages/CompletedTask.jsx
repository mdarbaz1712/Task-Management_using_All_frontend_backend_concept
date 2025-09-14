import React ,{useState,useEffect}from 'react'
import Cards from '../components/Home/Cards'
import axios from "axios"
import { backend_url } from '../../store/store';

const CompletedTask = () => {
  const headers={
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`
      }
      const [data,setData]=useState()
  
      useEffect(() => {
        const fetch=async()=>{
          const response=await axios.get(`${backend_url}/api/v2/all-comp-task`,{headers})
          setData(response.data.tasks);
        }  
        fetch();  
      })
  return (
    <Cards isAddTaskBtn={false} tasks={data} home={"false"}/>
  )
}

export default CompletedTask