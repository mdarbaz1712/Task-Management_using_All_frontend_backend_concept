const mongoose=require("mongoose")

const taskSchema=mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    desc:{
        type:String,
        require:true
    },
    important:{
        type:Boolean,
        default:false
    },
    complete:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports=mongoose.model("task",taskSchema)
