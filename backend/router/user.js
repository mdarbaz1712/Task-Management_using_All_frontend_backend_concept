const router=require("express").Router()
const User=require("../models/user")
const bcrypt=require("bcryptjs") 
const jwt=require("jsonwebtoken")

router.post("/sign-in",async(req,res)=>{
    try{
        const {username}=req.body;
        const {email}=req.body;
        const {password}=req.body;
        const existingUser=await User.findOne({username});
        const existingEmail=await User.findOne({email});
        if(existingUser){
            res.status(400).json({message:"Username already exists!!!"});
        }
        else if(username.length<=3){
            res.status(400).json({message:"Username must have at least 3 characters !!!"});
        }
        if(existingEmail){
            res.status(400).json({message:"Email already exists!!!"});
        }
        const hashPass=await bcrypt.hash(password,10)
        const newUser=new User({username:username,email:email,password:hashPass})

        await newUser.save()
        res.status(200).json({message:"User SignIn Successfully"})
    }
    catch(error){
        console.log(error);
        res.status(400).json({message:"Invalid Credentials !!"})
    }
})

router.post("/log-in",async(req,res)=>{
    try{
        const {username}=req.body;
        const {password}=req.body;
        const existingUser=await User.findOne({username});
        if(!existingUser){
            res.status(400).json({message:"Username doesn't exists!!!"});
        }
        const isPass=await bcrypt.compare(password,existingUser.password);
            if(!isPass){
                res.status(400).json({message:"Invalid Credentials !!!"});
            }
        const token=jwt.sign({id:existingUser._id,username:username},"tcmTM",{expiresIn:"2d"});
        res.status(200).json({id:existingUser._id,token:token})
    }
    catch(error){
        res.status(400).json({message:"Invalid Credentials !!"})
    }
})
module.exports=router
