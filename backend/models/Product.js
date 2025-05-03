const mongoose=require("mongoose");
const {ObjectId}=require("mongoose").Schema;

const productSchema=mongoose.Schema({
    photo:{data:Buffer,contentType:String},
    name:{type:String,required:true},
    default_code:{type:String,required:true},
    product_type:{type:String,required:true},
    invoice_policy:{type:String,required:true},
    sale_price:{type:String,required:true},
    cost:{type:String,required:true},
    category:{type:ObjectId,ref:"Category",required:true}
    
},{timestamps:true})
module.exports=mongoose.model("Product",productSchema);