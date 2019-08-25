var express = require('express');
var graphqlHTTP = require('express-graphql');
const schema = require('./schema');
var app = express();

// host deploy
const hostname = '127.0.0.1';
const port = 4000;

var app = express();
var cors = require('cors');
app.use(cors());



app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));


app.listen(port, hostname, 
    ()=> {console.log(`Server running at http://${hostname}:${port}/graphql`);}
);