const {GraphQLString, GraphQLList, GraphQLID} = require("graphql")
const { UserType ,PostType } = require("./type")
const {User ,Post} = require("../models")


const list ={
    type:new  GraphQLList(UserType) ,    
    resolve :()=> {
        return  User.find()       
    }
}

const user = {
    type  :UserType ,
    description : "Search user by id",
    args :{
        id : {type :GraphQLID}
      
    },
    resolve:(_,args)=>{

    
        return User.findById(args.id)
    }
    

}

const posts ={
    type : new GraphQLList(PostType) ,
    description : "All Post" ,
    resolve : () =>{
    return Post.find()
    }
}

const post ={
    type : PostType,  
    description: "Search One post", 
    args :{
        id: {type:GraphQLID}
    },
    resolve : (_,args) =>  Post.findById(args.id) 

        

   
    
}
module.exports = { list ,user ,posts ,post }

