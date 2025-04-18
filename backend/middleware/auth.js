const jwt=require("jsonwebtoken");
require("dotenv").config();
exports.protect=async (req,res,next)=>{
    if(!req.headers.authorization){
        return res.status(400).json({err:"Unauthorized User"})
    }
    const token=req.headers.authorization.split(" ")[1]
    const JWT_SECRETE=process.env.JWT_SECRETE
    const {user}=jwt.verify(token,JWT_SECRETE);
    req.user=user;
    next();

}