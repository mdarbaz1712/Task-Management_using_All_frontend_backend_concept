const mongoose=require("mongoose")

const taskSchema=mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true
    },
    important:{
        type:Boolean,
        default:false
    },
    complete:{
        type:Boolean,
        default:false
    },
    dueDate:{
        type:Date,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    alertSent: { type: Boolean, default: false },

},{timestamps:true});

module.exports=mongoose.model("task",taskSchema)
