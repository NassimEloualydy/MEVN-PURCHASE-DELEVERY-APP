const express=require("express")
const cors=require('cors')
const app=express()
const mongoose=require("mongoose");
require('dotenv').config()
app.use(cors())
app.use(express.json())
const PORT=process.env.PORT || 4040
const database=process.env.database

const userRoutes=require("./routes/userRoutes");
const categoryRoutes=require("./routes/categoryRoutes");
const productRoutes=require("./routes/productRoutes");
app.use("/API/user",userRoutes);
app.use("/API/category",categoryRoutes);
app.use("/API/product",productRoutes);
mongoose.connect(database).then(()=>{
console.log("Database Connected !!")
}).catch((err)=>{
    console.log(err)
})

app.listen(PORT,()=>{
    console.log(`App Running On A Port ${PORT}`)
})

