const express=require("express");
const Router=express.Router();
const {protect}=require("../middleware/auth")
const {submitData,getData,deleteCategory}=require("../controllers/categoryController")
Router.post("/submitData",protect,submitData)
Router.post("/getData",protect,getData);
Router.post("/deleteCategory/:_id",protect,deleteCategory)
module.exports=Router;
