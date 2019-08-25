var util = require('./util/util');

const sql = {
  test1 : "select idx.name, concat(p.f_name, ' ',p.l_name) as 'fname', p.date_of_birth \
  from person p, \
  (select concat(p.f_name, ' ',p.l_name) as 'name', individual_father_id as 'father_id' \
  from person p left join relationships r on p.person_id = r.individual_id \
  where person_id = '1') idx \
  where p.person_id = idx.father_id",
  
};  

const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
  } = require('graphql');


const person = new GraphQLObjectType({
  name:'personQuery',
  description: 'test for find a user',
  fields: {
    name: {
      type: GraphQLString,
      resolve:async function (source) {
        return source[0].name;
    }},
    fathername: {
      type: GraphQLString,
      resolve:async function (source) {
        return source[0]['fname'];
      }},
    dob: {
      type: GraphQLInt,
      resolve:async function (source) {

        var date = new Date(source[0]['date_of_birth']);

        return date.getFullYear().toString();
      }
    },
  },


});



const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
      name:'UserQuery',
      description:'用户信息查询',
      fields:()=>({
          person:{
              type:person,
              description:'test',

              resolve:async function () {
                var test = await util.searchSql(sql.test1);
                
                console.log("++++++", test)
                return await test;
              }
          }
      }),
  })
});

module.exports = schema;
