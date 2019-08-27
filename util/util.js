var mysql = require('mysql');


var mysqlconf = {
    host:'Tian-PC',
    port:'3306',
    user:'root',
    password:'skynapier',
    database:'family_tree'
}

var pool  = mysql.createPool(mysqlconf);

async function searchSql($sql,params) {
  return   new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            connection.query($sql, params,function (err, result) {

                connection.release();
                if (err) {
                    reject(err)
                }
                if(result.insertId) result.id = result.insertId;
                    
                
                 resolve(result);
            });
        });
    })
}

module.exports = {
    searchSql:searchSql
}