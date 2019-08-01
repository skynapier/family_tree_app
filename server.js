

var express = require('express');
var graphqlHTTP = require('express-graphql');
var { buildSchema } = require('graphql');
var RandomDie = require('./RandomDie.js');


// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  type Query {
    hello: String
    test: String

    getDie(numSides: Int): RandomDie
  }

`);


function testWriteOutside(){
    return 'write outside rather than inside arrow function';
}

// The root provides a resolver function for each API endpoint
var root = { hello: () => 'Hello world!', 
  test:testWriteOutside(),
  
  getDie: function ({numSides}) {
    const test =  new RandomDie(numSides || 6)
    return test;
  }

};

var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));