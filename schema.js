var util = require('./util/util');
var $sql = require('./dao/sqlMapping');


const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean
  } = require('graphql');


const person = new GraphQLObjectType({
  name:'personQuery',
  description: 'test for find a user',
  fields: {
    name: {
      type: GraphQLString,
      resolve: function(source) {
          return source[0];
      }
    },

    fathername: {
        type: GraphQLString,
        resolve:async function (source) {
          return source[1];
        }},
    mothername: {
      type: GraphQLString,
      resolve:async function (source) {
        return source[2];
      }},
  },

});


/**
 * for a given first name and last name find its id first 
 * then using relastion table find his/her family_member's id 
 * finally using family_member's id find corresponding name
 */
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name:'UserQuery',
    
    fields:()=>({
        person:{
            type:person,
            
            args: {
              fname: {type: GraphQLString},
              lname: {type: GraphQLString}
            },

            resolve:async function (source, {fname,lname}) {

              var ret = [];
              ret.push(`${fname} ${lname}`);

              var query_id = await util.searchSql($sql.findUserID,[fname,lname]);
              var person_id = query_id[0]['person_id']
              console.log("person id ", person_id);

              var query_father_id = await util.searchSql($sql.findUserFatherID,[person_id]);
              var person_father_id = query_father_id[0]['father_id']

              var query_mother_id = await util.searchSql($sql.findUserMotherID,[person_id]);
              var person_mother_id = query_mother_id[0]['mother_id']


              var query_father_name = await util.searchSql($sql.findIDName,[person_father_id]);
              var person_father_name = query_father_name[0]['name']
              ret.push(person_father_name)

              var query_mother_name = await util.searchSql($sql.findIDName,[person_mother_id]);
              var person_mother_name = query_mother_name[0]['name']
              ret.push(person_mother_name)

              return await ret;
            }
        }
    }),
})
});

module.exports = schema;
