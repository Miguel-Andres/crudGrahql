const {GraphQLSchema, GraphQLObjectType, GraphQLString}=require("graphql")
const {list,user,posts,post} = require("./queries")
const { register,login ,createPost,updatePost,deletePost} = require("./mutations")

const QueryType = new GraphQLObjectType({
    name : "QueryType" ,
    description: " the root query type // es la consulta base",
    fields :{
      list ,
      user,
      posts,
      post

    }
})

const MutationType = new  GraphQLObjectType({
    name: "MutationType",
    description : "The root Mutation Type" ,
    fields : {
      register ,
      login ,
      createPost,
      updatePost 
      ,deletePost
    }
})

const schema  = new  GraphQLSchema({
    query :QueryType ,
    mutation : MutationType
    
})

module.exports = schema