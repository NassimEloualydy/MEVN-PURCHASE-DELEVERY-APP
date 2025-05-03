const express=require("express")
const router=express.Router();
const {protect}=require("../middleware/auth")
const {submitProduct,getData,deleteProduct,getPhoto}=require("../controllers/productController")
router.post("/submitProduct",protect,submitProduct)
router.post("/getData",protect,getData);
router.get("/getPhoto/:id",getPhoto)
router.post("/deleteProduct/:_id",protect,deleteProduct);
module.exports=router;
