const express = require('express');
const app = express();
const expressGraphQL = require('express-graphql').graphqlHTTP
const schema = require('./schema/schema')

app.use('/gql', expressGraphQL({
    schema,
    graphiql:true
}))

app.listen(3002,()=>{console.log("Server started on port 3003")}) 