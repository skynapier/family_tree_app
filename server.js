var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');

var schema = buildSchema(`
  type Query {
    hello: String
    test: String
  }
`);

function testWriteOutside(){
    return 'write outside rather than inside arrow function';
}

var root = { hello: () => 'Hello world!', 
test:testWriteOutside()};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));