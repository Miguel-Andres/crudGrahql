const jwt = require("jsonwebtoken")

const createJWTToken = (user)  =>{

  return   jwt.sign({user},"TheMostSecure",{
        expiresIn : "1d"
    })
}

module.exports = {createJWTToken }