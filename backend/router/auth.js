const jwt=require("jsonwebtoken")

const authenticateToken=(req,res,next)=>{
    const {authorization}=req.headers
    const token=authorization&&authorization.split(" ")[1];
    if(!token){
        res.status(400).json({message:"Not have any Token !!"})
    }
    jwt.verify(token,"tcmTM",(err,user)=>{
        if(err){
            res.status(400).json({message:"Invalid Token"})
        }
        req.user=user
        next()
    })
}
module.exports={authenticateToken}