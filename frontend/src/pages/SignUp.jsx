import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useSelector } from 'react-redux'

const SignUp = () => {
    const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
    const navigate=useNavigate();
    if(isLoggedIn){
        navigate("/")
    }
    const [data,setData]=useState({username:"",email:"",password:""})
    const change=(e)=>{
        const {name,value}=e.target
        setData({...data,[name]:value})
    }
    const submit=async ()=>{
        try {
            if(data.username===""||data.email===""||data.password===""){
                alert("Fill All The Fields !!!")
            }
            else{
                const response=axios.post("http://localhost:1000/api/v1/sign-in",data)
                setData({username:"",email:"",password:""})
                alert((await response).data.message)
                navigate("/login")
            }
        } catch(error) {
            alert(error.response.data.message)
        }
    }
  return (
    <div className='fixed h-full w-full top-0 left-0 flex justify-center items-center'>
        <div className='flex flex-col h-3/6 w-2/6 bg-black rounded-lg justify-between text-white p-10'>
            <div className='text-xl font-bold'>Sign Up</div>
            <div>
                <input type="text" name='username' placeholder='Username' className='border border-white rounded-lg w-full h-10 p-4' value={data.username} onChange={change}/>
            </div>
            <div>
                <input type="email" name='email' placeholder='Email' className='border border-white rounded-lg w-full h-10 p-4' onChange={change} value={data.email}/>
            </div>
            <div>
                <input type="password" name='password' placeholder='Password' className='border border-white rounded-lg w-full h-10 p-4' onChange={change} value={data.password}/>
            </div>
            <div className='flex justify-between items-center'>
                <button className='p-3 bg-blue-900 rounded-lg cursor-pointer hover:bg-blue-300' onClick={submit}>Submit</button>
                <Link to="/login" className='hover:scale-105'>Already having and account? Login here</Link>
            </div>
        </div>
    </div>
  )
}

export default SignUp