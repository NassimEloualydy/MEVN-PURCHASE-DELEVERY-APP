const User=require("../models/User")
const formidable=require("formidable");
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const fs=require("fs");
exports.signIn=async (req,res)=>{
    const form=new formidable.IncomingForm()
    form.keepExtensions=true;
    form.parse(req,async (error,fields,files)=>{
        const {first_name,last_name,email,pw,phone}=fields;
    var u=await User.find({first_name,last_name})
    if(u.length!=0)
        return res.status(400).json({error:"The first name and the last name is already exist !!"})
     u=await User.find({email})
     if(u.length!=0)
        return res.status(400).json({error:"The Email is already exist !!"})
          
     u=await User.find({phone})
     if(u.length!=0)
        return res.status(400).json({error:"The Phone is already exist !!"})
     
     const salt= await bcrypt.genSalt(10)
     const hashed_password=await bcrypt.hash(pw,salt);
     const user=await User.create({
        first_name,last_name,phone,email,pw:hashed_password,role:"Admin",
        photo:{
            data:fs.readFileSync(files.photo.path),
            contentType:files.photo.type
        }
     })
     if(user)
        return res.json({message:"Sign In With Success !!"})

    })
}
exports.login=async (req,res)=>{
    const {email,password}=req.body;
    const user=await User.findOne({email}).select("-photo")
    if(!user)
        return res.status(400).json({error:"Please the email or the password not found !!"});
    const resp=await bcrypt.compare(password,user.pw)
    if(!resp)
        return res.status(400).json({error:"Please the email or the password not found !!"});
    const token=jwt.sign({user:user._id},process.env.JWT_SECRETE,{expiresIn:'30d'})
    return res.json({message:"Login With Success !!",user:user,token})
}