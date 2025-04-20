const Category=require("../models/Category");
exports.submitData=async (req,res)=>{
    const {_id,name,description}=req.body;
    console.log(_id)
    if(_id==''){
        var c=await Category.find({name}).select()
        if(c.length!=0)
            return res.status(400).json({err:"Please the name is already exist !!"})
        c=await Category.find({description}).select()
        if(c.length!=0)
            return res.status(400).json({err:"Please the description is already exist !!"})
        c=await Category.create({
            name,description
        })
        if(c)
            return res.json({message:"Category Added with success !!"});
        return res.status(400).json({err:c})
    }else{
        var c=await Category.find().select().and([{_id:{$ne:_id}},{name}])
        if(c.length!=0)
            return res.status(400).json({err:"Please the name is already exist !!"})
        c=await Category.find().select().and([{_id:{$ne:_id}},{description}])
        if(c.length!=0)
            return res.status(400).json({err:"Please the description is already exist !!"})
        c=await Category.findOneAndUpdate(
            {_id},
           { $set:{
            name,description
        }},{$new:true})
        if(c)
            return res.json({message:"Category Updated with success !!"});
        return res.status(400).json({err:c})
    }
}
exports.deleteCategory=async (req,res)=>{
    const _id=req.params._id;
    const category=await Category.findOneAndDelete({_id})
    if(category)
        return res.json({message:"Delete with success !!"})
    return res.status(400).json({err:category});

}
exports.getData=async (req,res)=>{
    const {name,description}=req.body;

    const searchQuery={}
    searchQuery.name={$regex:'.*'+name+'.*',$options:'i'}
    searchQuery.description={$regex:'.*'+description+'.*',$options:'i'}
    const data=await Category.find(searchQuery).select()
    if(data)
        return res.json({data})
    return res.status(400).json({err:data})
}

