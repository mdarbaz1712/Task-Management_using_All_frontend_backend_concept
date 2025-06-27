import React from 'react'
import Home from './pages/Home'
import {Routes,Route, useNavigate} from "react-router-dom"
import AllTask from './pages/AllTask'
import ImportantTask from './pages/ImportantTask'
import CompletedTask from './pages/CompletedTask'
import IncompletedTask from './pages/IncompletedTask'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { authActions } from './store/auth'
const App = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const isLoggedIn=useSelector((state)=>state.auth.isLoggedIn)
  useEffect(
    ()=>{
      if(localStorage.getItem("id")&&localStorage.getItem("token")){
        dispatch(authActions.login())
      }
      else if(!isLoggedIn){    
        navigate("/signup")
      }
    },[]
  )
  
  return (
    <div className='bg-gray-600 h-screen w-screen relative'>
        <Routes>
          <Route exact path='/' element={<Home/>}>
          <Route index path='/' element={<AllTask/>}></Route>
          <Route exact path='/ImportantTask' element={<ImportantTask/>}></Route>
          <Route exact path='/CompletedTask' element={<CompletedTask/>}></Route>
          <Route exact path='/IncompletedTask' element={<IncompletedTask/>}></Route>
          </Route>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
    </div>
  )
}

 export default App