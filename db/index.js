const mongoose =require("mongoose")

const connectDb =async() =>{
     await mongoose.connect("mongodb://localhost/blogdb")
     console.log("Mongo Db Connected")
     }

     module.exports= {connectDb}