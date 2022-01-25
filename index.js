const express = require("express");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const { connectDb } = require("./db");
const schema = require("./graphql/schema");
const {authenticate } = require("./middlewares/auth");
const PORT = 3000;

connectDb()
//se pasa el header con un plugin 
app.use(authenticate)

app.get("/", (req, res) => {
  res.send("HOME TO MY GRAPHQL API ");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(PORT || 8080);
console.log(`Happy Hacking ${PORT}`);
