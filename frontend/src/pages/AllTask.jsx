import React, { useState ,useEffect} from 'react';
import Cards from '../components/Home/Cards';
import { AiFillPlusCircle } from 'react-icons/ai';
import InputTask from '../components/Home/InputTask';
import axios from "axios"

const AllTask = () => {
  const [visInputTask, setVisInputTask] = useState(false); 
  const [updatedTask,setUpdatedTask]=useState({id:"",title:"",desc:""})
  const headers={
      id:localStorage.getItem("id"),
      authorization:`Bearer ${localStorage.getItem("token")}`
    }
    const [data,setData]=useState()

    useEffect(() => {
      const fetch=async()=>{
        const response=await axios.get("http://localhost:1000/api/v2/all-task",{headers})
        setData(response.data.message);
      }  
      fetch();  
    })
    
  return (
    <>
      <div className="flex justify-end py-2">
        <AiFillPlusCircle
          className="cursor-pointer transition-all duration-200 hover:scale-110 text-5xl font-bold"
          onClick={() => setVisInputTask(true)}
        />
      </div>
      {data&&<Cards isAddTaskBtn={true} visInputTask={visInputTask} setVisInputTask={setVisInputTask} tasks={data.tasks} setUpdatedTask={setUpdatedTask}/>}

      <InputTask
        visInputTask={visInputTask}
        setVisInputTask={setVisInputTask}
        updatedTask={updatedTask}
        setUpdatedTask={setUpdatedTask}
      />
    </>
  );
};

export default AllTask;
