var express = require('express');
var mysql = require('mysql');
const hostname = '127.0.0.1';
const port = 3000;

var app = express();

var connection = mysql.createConnection({
    host:'Tian-PC',
    port:'3306',
    user:'root',
    password:'skynapier',
    database:'family_tree'
    });

connection.connect();

var sql = "select idx.name, concat(p.f_name, ' ',p.l_name) as 'father name', p.date_of_birth \
from person p, \
(select concat(p.f_name, ' ',p.l_name) as 'name', individual_father_id as 'father_id' \
from person p left join relationships r on p.person_id = r.individual_id \
where person_id = '1') idx \
where p.person_id = idx.father_id";
var str = "";


connection.query(sql, function(err,result){
    if(err){
        console.log('[SELECT ERROR]:',err.message);
    }
    str = result[0]["name"] + '\'s father name: ' + result[0]["father name"]


    console.log(JSON.stringify(result[0]));

} );

app.get('/query', function(req, res){
    res.send(str);

});

connection.end();

app.listen(port, hostname, 
    ()=> {console.log(`Server running at http://${hostname}:${port}/`);}
);