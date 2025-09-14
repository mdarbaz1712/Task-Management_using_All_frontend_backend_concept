const route=require("express").Router()
const Task=require("../models/task")
const User=require("../models/user")
const {authenticateToken}=require("./auth")

route.post("/create-task",authenticateToken,async(req,res)=>{
    try{
        const {title,desc,dueDate}=req.body;
        const {id}=req.headers;
        const newTask=new Task({title:title,desc:desc,dueDate:dueDate,user:req.user.id});
        const saveTask=await newTask.save();
        const TaskId=saveTask._id;
        await User.findByIdAndUpdate(id,{$push:{tasks:TaskId}})
        res.status(200).json({message:"Task Created Successfully"})
    }
    catch(err){
        console.log(err);
        res.status(400).json({message:"Internal Server Error"})
    }
})

route.get("/all-task",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers
        const userInfo=await User.findById(id).populate({path:"tasks",options:{sort:{createdAt:-1}}});
        res.status(200).json({message:userInfo});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal Server Error"})
    }
})

route.delete("/delete-task/:id",authenticateToken,async(req,res)=>{
    try {
        const taskId=req.params.id
        const userId=req.headers.id
        await Task.findByIdAndDelete(taskId);
        await User.findByIdAndUpdate(userId,{$pull:{tasks:taskId}})
        res.status(200).json({message:"Task Deleted Successfully"});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal Server Error"})
    }

})

route.put("/update-task/:taskId",authenticateToken,async(req,res)=>{
    try {
        const {taskId}=req.params
        const {title,desc}=req.body
        await Task.findByIdAndUpdate(taskId,{title:title,desc:desc})
        res.status(200).json({message:"Task Updated Successfully !!"})
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal Server Error"})
    }
})

route.put("/update-imp-task/:taskId",authenticateToken,async(req,res)=>{
    try {
        const {taskId}=req.params
        const task=await Task.findById(taskId)
        const impTask=task.important
        const task1=await Task.findByIdAndUpdate(taskId,{important:!impTask})
        res.status(200).json({message:task1});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal Server Error"})
    }
})

route.put("/update-comp-task/:taskId",authenticateToken,async(req,res)=>{
    try {
        const {taskId}=req.params
        const taskData=await Task.findById(taskId)
        const compTask=taskData.complete
        const task1=await Task.findByIdAndUpdate(taskId,{complete:!compTask})
        res.status(200).json({message:task1});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal Server Error"})
    }
})

route.get("/all-imp-task",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers
        const userInfo=await User.findById(id).populate({path:"tasks",options:{sort:{createdAt:-1}}});
        const taskInfo=userInfo.tasks
        const impTask=taskInfo.filter(function(task){
            return task.important===true;
        })        
        res.status(200).json({tasks:impTask});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal Server Error"})
    }
})

route.get("/all-comp-task",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers
        const userInfo=await User.findById(id).populate({path:"tasks",options:{sort:{createdAt:-1}}});
        const taskInfo=userInfo.tasks
        const compTask=taskInfo.filter(function(task){
            return task.complete===true;
        })        
        res.status(200).json({tasks:compTask});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal Server Error"})
    }
})

route.get("/all-incomp-task",authenticateToken,async(req,res)=>{
    try {
        const {id}=req.headers
        const userInfo=await User.findById(id).populate({path:"tasks",options:{sort:{createdAt:-1}}});
        const taskInfo=userInfo.tasks
        const inCompTask=taskInfo.filter(function(task){
            return task.complete===false;
        })        
        res.status(200).json({tasks:inCompTask});
    } catch (error) {
        console.log(error);
        res.status(400).json({message:"Internal Server Error"})
    }
})


module.exports=route