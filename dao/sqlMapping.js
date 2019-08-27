var sql = {
    findUserID:'select person_id from person where f_name = ? and l_name = ?;',
    findUserFatherID: 'select individual_1_id as "father_id" from relationships where relation_code = 1 and individual_2_id = ?;',
    findUserMotherID: 'select individual_1_id as "mother_id" from relationships where relation_code = 2 and individual_2_id = ?;',
    findIDName:'select  concat(f_name, " ",l_name) as "name" from person where person_id = ?;'
  };  


  module.exports = sql;