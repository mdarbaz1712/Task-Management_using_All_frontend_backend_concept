const express=require("express")
const app=express()
require("dotenv").config()
require("./conn/conn")
const cors=require("cors")
const userApi=require("./router/user")
const taskApi=require("./router/task")
app.use(cors())
app.use(express.json())

app.use("/api/v1",userApi)
app.use("/api/v2",taskApi)

app.use("/",(req,res)=>{
    res.status(200).json({message:"Hello from Backend"})
})
const PORT=1000

app.listen(PORT,()=>{
    console.log("Server is started !!")
})