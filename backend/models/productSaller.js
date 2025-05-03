const mongoose=require("mongoose");
const {ObjectId}=require("mongoose").Schema;
const productSallerSchema=mongoose.Schema({
    saller:{type:ObjectId,ref:"User",required:true},
    product:{type:ObjectId,ref:"Product",required:true},
    price:{type:String,required:true},
    qty:{type:String,required:true},
    discount:{type:String,required:true},
    
},{timestamps:true})
module.exports=mongoose.model("productSaller",productSallerSchema);
