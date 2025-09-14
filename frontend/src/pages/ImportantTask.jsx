import React from 'react'
import axios from "axios"
import { useState,useEffect } from 'react'
import Cards from '../components/Home/Cards'

const ImportantTask = () => {

  const headers={
      id:localStorage.getItem("id"),
      authorization:`Bearer ${localStorage.getItem("token")}`
    }
    const [data,setData]=useState()

    useEffect(() => {
      const fetch=async()=>{
        const response=await axios.get(`${backend_url}/api/v2/all-imp-task`,{headers})
        console.log(response)
        console.log(response.data.tasks);
        setData(response.data.tasks);
      }  
      fetch();  
    })
    
  return (
    <Cards home={"false"} tasks={data}/>
  )
}

export default ImportantTask