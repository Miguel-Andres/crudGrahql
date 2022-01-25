const {Schema,model} = require("mongoose")


let PostSchema = new Schema ({
    authorId :{
        type :String,
        required :true
    } ,
    title :{
        type : String ,
        required : true 
    },
    body : {
        type : String ,
        required : true 
    } 

})  

module.exports = model ("Post" ,PostSchema)