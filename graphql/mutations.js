const { GraphQLString, GraphQLList, GraphQLID, graphql } = require("graphql");
const { createJWTToken } = require("../util/auth");
const { User, Post } = require("../models");
const {PostType} = require("./type")


const register = {
  type: GraphQLString,
  description: "Register new user ",
  args: {
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    displayName: { type: GraphQLString },
  },
  async resolve(_, args) {
    const { username, password, email, displayName } = args;

    const newUser = await User.create({
      username,
      email,
      password,
      displayName,
    });

    const token = createJWTToken({
      _id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    });

    return token;
  },
};

const login = {
  type: GraphQLString,
  description: "token return user ",
  args: {
    password: { type: GraphQLString },
    email: { type: GraphQLString },
  },
  async resolve(_, args) {
    const user = await User.findOne({ email: args.email });
    if (!user || args.password != user.password)
      throw new Error("User not found Papa");

    const token = createJWTToken({
      _id: user.id,
      username: user.username,
      email: user.email,
    });

    return token;
  },
};

const createPost = {
  type:PostType,
  description: "New Post",
  args: {
    title: { type: GraphQLString },
    body: { type: GraphQLString },
  },
  resolve: async (_, args,{verifiedUser}) => {
    console.log(verifiedUser) 

   const newPost = await Post.create({
      title: args.title,
      body: args.body,
     authorId: verifiedUser._id,
    });
     
    return newPost;
  },
};

const updatePost ={
    type : PostType ,
    description:" Update a Post" ,
    args :{
        title : {type: GraphQLString}, 
        body : {type: GraphQLString},
        id : {type :GraphQLID}
    },
    resolve:async (_,args,{verifiedUser}) =>{

      // Verified token expire user 
      console.log(verifiedUser)

      if(!verifiedUser) throw new Error ("Unauthorized")
    
         const postUpdate = await  Post.findOneAndUpdate({_id:args.id ,authorId : verifiedUser._id},{title:args.title ,body:args.body}, { returnOriginal: false })

     return postUpdate  
    }
}


const deletePost = {
  type : GraphQLString,
  description : "DELETE A POST" ,
  args : {
      id:{type :GraphQLID}
  },
  resolve:async (_,{id},{verifiedUser})=>{

    if(!verifiedUser) throw new Error("Unauthorized")
    const postDelete = await Post.findOneAndDelete({_id :id , authorId :verifiedUser._id})

    if(!postDelete) throw new Error ("Post Not  found  ")
    return "borrado"
  }
  
}

module.exports = { register, login, createPost ,updatePost,deletePost };
