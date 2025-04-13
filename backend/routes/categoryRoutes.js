const express=require("express");
const Router=express.Router();
const {protect}=require("../middleware/auth")
const {submitData}=require("../controllers/categoryController")
Router.post("/submitData",protect,submitData)
module.exports=Router;
