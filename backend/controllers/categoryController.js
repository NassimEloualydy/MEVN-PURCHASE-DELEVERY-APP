const Categoy=require("../models/Category");
exports.submitData=async (req,res)=>{
    const {_id,name,description}=req.body;
    if(_id==''){
        var c=await Categoy.find({name}).select()
        if(c.length!=0)
            return res.status(400).json({err:"Please the name is already exist !!"})
        c=await Categoy.find({description}).select()
        if(c.length!=0)
            return res.status(400).json({err:"Please the description is already exist !!"})
        c=await Categoy.create({
            name,description
        })
        if(c)
            return res.json({msseage:"Category Added with success !!"});
        return res.status(400).json({err:c})
    }else{
        var c=await Categoy.find().select().and([{_id:{$ne:_id}},{name}])
        if(c.length!=0)
            return res.status(400).json({err:"Please the name is already exist !!"})
        c=await Categoy.find().select().and([{_id:{$ne:_id}},{description}])
        if(c.length!=0)
            return res.status(400).json({err:"Please the description is already exist !!"})
        c=await Categoy.fineOneAndUpdate(
            {_id},
           { $set:{
            name,description
        }},{$new:true})
        if(c)
            return res.json({msseage:"Category Updated with success !!"});
        return res.status(400).json({err:c})
    }
}
