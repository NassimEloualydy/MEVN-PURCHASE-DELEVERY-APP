const express=require("express");
const router=express.Router();
const {signIn,login}=require("../controllers/userCcontroller")
router.post("/singIn",signIn);
router.post("/login",login)
module.exports=router;
