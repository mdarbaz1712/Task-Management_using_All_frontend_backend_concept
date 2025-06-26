const mongoose=require("mongoose")
const conn=async()=>{
    try {
        const response=await mongoose.connect(`${process.env.MONGODB_URI}`)
        if(response){
            console.log("Mongo DB Connected !!!")
        }
    } catch (error) {
        console.log(error)
    }
}
conn()