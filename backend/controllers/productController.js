const Product=require("../models/Product");
const formidable=require("formidable")
const fs=require("fs");
const puppeteer=require("puppeteer")
exports.submitProduct=async (req,res)=>{
    const form=new formidable.IncomingForm();

    form.parse(req,async (err,fields,files)=>{
        const {_id,name,default_code,product_type,invoice_policy,sale_price,cost,category}=fields;
        if(_id==""){
            var p=await Product.find({name}).select("-photo")
            if(p.length!=0)
                return res.status(400).json({error:"Please the Name is already exist !!"})
            p=await Product.find({default_code}).select("-photo")
            if(p.length!=0)
                return res.status(400).json({error:"Please the Code is already exist !!"})
            const product=await Product.create({
                name,
    default_code,
    product_type,
    invoice_policy,
    sale_price,
    cost,
    category,
    photo:{
        data:fs.readFileSync(files.photo.path),
        contentType:files.photo.type
    }
            })       
            
            if(product)
                return res.json({message:"Product Created With Success !!"})
            return res.status(400).josn({err:product})            
        }else{
            var p=await Product.find().select("-photo").and([{name},{_id:{$ne:_id}}])
            if(p.length!=0)
                return res.status(400).json({error:"Please the Name is already exist !!"})
            p=await Product.find().select("-photo").and([{default_code},{_id:{$ne:_id}}])
            if(p.length!=0)
                return res.status(400).json({error:"Please the Code is already exist !!"})
    //         const product=await Product.create({
    //             name,
    // default_code,
    // product_type,
    // invoice_policy,
    // sale_price,
    // cost,
    // category,
    // photo:{
    //     data:fs.readFileSync(files.photo.path),
    //     contentType:files.photo.type
    // }
    //         })       
            if(files.photo){
                const product=await Product.findOneAndUpdate(
                    {_id},
                    {$set:{
                name,
    default_code,
    product_type,
    invoice_policy,
    sale_price,
    cost,
    category,
    photo:{
        data:fs.readFileSync(files.photo.path),
        contentType:files.photo.type
    }

                    }},
                    {$new:true}
                )
                if(product)
                    return res.json({message:"Product Updated With Success !!"})
                return res.status(400).json({err:product})

            }else{
                const product=await Product.findOneAndUpdate(
                    {_id},
                    {$set:{
                name,
    default_code,
    product_type,
    invoice_policy,
    sale_price,
    cost,
    category,

                    }},
                    {$new:true}
                )

                if(product)
                    return res.json({message:"Product Updated With Success !!"})
                return res.status(400).josn({err:product})
            }
        }

    })
}

exports.getData=async (req,res)=>{
    
    const {name,default_code,product_type,invoice_policy,sale_price,cost,category}=req.body;
    const searchQuery={}
    

    searchQuery.name={$regex:'.*'+name+'.*',$options:'i'}
    searchQuery.default_code={$regex:'.*'+default_code+'.*',$options:'i'}
    searchQuery.product_type={$regex:'.*'+product_type+'.*',$options:'i'}
    searchQuery.invoice_policy={$regex:'.*'+invoice_policy+'.*',$options:'i'}
    searchQuery.sale_price={$regex:'.*'+sale_price+'.*',$options:'i'}
    searchQuery.cost={$regex:'.*'+cost+'.*',$options:'i'}
    const data=await Product.find(searchQuery).select("-photo").populate([
        {
            path:"category",
            model:"Category",
            select:["_id","name"],
            match:{
                name:{$regex:'.*'+category+'.*',$options:'i'}
            }
        }
    ])
    const categories=[]
    for(var i=0;i<data.length;i++){
        if(!categories.includes(data[i].category.name))
            categories.push(data[i].category.name)
    }
    
    return res.json({categories,data})
}
exports.getPhoto=async (req,res)=>{
    const _id=req.params.id;
    const product=await Product.find({_id}).select()
    if(product){
        res.set("contentType",product[0].photo.contentType);
        return res.send(product[0].photo.data)
    }
        
}
exports.deleteProduct=async (req,res)=>{
    const _id=req.params._id;
    const product=await Product.findOneAndDelete({_id})
    if(product)
        return res.json({message:"Product Deleted With Success !!"});
}
exports.getDataByCategory=async (req,res)=>{
    const results = await Product.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        },
        {
          $lookup: {
            from: "categories", // assuming your Category collection is named "categories"
            localField: "_id",
            foreignField: "_id",
            as: "categoryInfo"
          }
        },
        {
          $unwind: "$categoryInfo"
        },
        {
          $project: {
            categoryName: "$categoryInfo.name", // assuming Category has a 'name' field
            count: 1,
            _id: 0
          }
        }
      ]);
      console.log(results);
      return res.json({data:results});

}