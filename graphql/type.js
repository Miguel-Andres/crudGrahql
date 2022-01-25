const { GraphQLObjectType, GraphQLString, GraphQLID } = require("graphql");
const {User} = require("../models");


const UserType = new GraphQLObjectType({
    name : "UserType",
    description : "list de user Type" ,
    fields :{
    id : {type : GraphQLID } ,
    username : {type : GraphQLString} ,
    email : {type : GraphQLString} ,
    displayName: {type : GraphQLString} ,
    createdAt : {type : GraphQLString} ,
    updateAt : {type : GraphQLString}
    }
})


const PostType = new GraphQLObjectType ({
    name: "PostType",
    description : "The post TYPE" ,
    fields :{
        id     : {type: GraphQLID} ,
        title : {type: GraphQLString} ,
        body : {type: GraphQLString} ,
        createdAt : {type: GraphQLString} ,
        author : {type: UserType ,resolve(parent){
           return  User.findById(parent.authorId)
        }}
    }
})
module.exports = {UserType ,PostType}