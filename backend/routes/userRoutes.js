const express=require("express");
const router=express.Router();
const {signIn,login,getData,deleteUser,updateUser}=require("../controllers/userCcontroller")
const {protect}=require("../middleware/auth")
router.post("/singIn",signIn);
router.post("/login",login)
router.post("/getData",protect,getData);
router.post("/deleteUser/:id",protect,deleteUser);
router.post("/updateUser",protect,updateUser)
module.exports=router;
