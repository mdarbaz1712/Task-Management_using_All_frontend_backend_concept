import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { authActions } from '../store/auth'
import { useDispatch ,useSelector} from 'react-redux'

const Login = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
    if(isLoggedIn){
        navigate("/")
    }
    const [data,setData]=useState({username:"",password:""})
    
    const change=(e)=>{
        const {name,value}=e.target
        setData({...data,[name]:value})
    }
    const submit=async ()=>{
        try {
            if(data.username===""||data.password===""){
                alert("Fill All The Fields !!!")
            }
            else{
                const response=await axios.post("http://localhost:1000/api/v1/log-in",data)
                setData({username:"",password:""})
                localStorage.setItem("id",response.data.id)
                localStorage.setItem("token",response.data.token)
                dispatch(authActions.login());
                navigate("/")
            }
        } catch(error) {
            alert(error.response.data.message)
        }
    }
  return (
    <div className='fixed h-full w-full top-0 left-0 flex justify-center items-center'>
        <div className='flex flex-col h-3/6 w-2/6 bg-black rounded-lg justify-between text-white p-10'>
            <div className='text-xl font-bold'>Login</div>
            <div>
                <input type="text" name='username' placeholder='Username' className='border border-white rounded-lg w-full h-10 p-4' onChange={change} value={data.username}/>
            </div>
            <div>
                <input type="text" name='password' placeholder='Password' className='border border-white rounded-lg w-full h-10 p-4' onChange={change} value={data.password} />
            </div>
            <div className='flex justify-between items-center'>
                <button className='p-3 bg-blue-900 rounded-lg cursor-pointer hover:bg-blue-300' onClick={submit}>Submit</button>
                <Link to="/signup" className='hover:scale-105'>Don't having an account? SignUp here</Link>
            </div>
        </div>
    </div>
  )
}

export default Login