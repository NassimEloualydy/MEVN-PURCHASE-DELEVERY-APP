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
app.use("/API/user",userRoutes);
app.use("/API/category",categoryRoutes);
mongoose.connect(database).then(()=>{
console.log("Database Connected !!")
}).catch((err)=>{
    console.log(err)
})

app.listen(PORT,()=>{
    console.log(`App Running On A Port ${PORT}`)
})

