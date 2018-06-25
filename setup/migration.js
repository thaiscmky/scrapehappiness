const path = require('path');
const connection = require(path.join(__dirname,'../','/config/connection'));
const fs = require('fs');
const csvparse = require("csv-parse");
//this isn't working correctly on heroku, so import it manually
if(process.env.JAWSDB_URL) process.exit(0);
else
connection.then(function(conn) {
    console.log('Installing schema');
    let filepath = path.join(__dirname,'/db/schema.sql');
    let table = 'burgers';
    conn.query(fs.readFileSync(filepath, 'utf-8'), function (err, result, fields){
        if(err){
            throw err;
        }
        console.log('Table created');
        let csv = path.join(__dirname,'/db/seeds.csv');
        fs.readFile(csv, { encoding: 'utf-8'}, function(err, csvdata) {
            if (err) {
                console.log('Something went wrong while reading your file: '+filepath);
                throw err;
            }
            csvparse(csvdata, { columns: true, delimiter: ',' }, function(err, data) {
                if (err)
                    throw err;
                let counter = 0;
                data.forEach(function(rowObj){
                    let fields = Object.keys(rowObj);
                    let values = Object.values(rowObj).map(function(value){ return Number(value) ? value : `"${value}"`; });
                    let sql = `INSERT INTO ${conn.info.database}.${table}(${fields.join(', ')}) VALUES(${values.join(',')});`;
                    conn.query(sql, function (error) {
                        if (error) throw error;
                        counter++;
                        if(counter === data.length)
                            process.exit(0);
                    });
                });

            }).on('finish', function(){
                console.log(`Sample data install complete.`);
            });
        });

    });
}).catch(err => err.message);

