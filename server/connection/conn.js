//MYSQL
const mysql = require('mysql');
let conn;
if(process.env.JAWSDB_URL) {
    conn = mysql.createConnection(process.env.JAWSDB_URL);
} else {
conn = mysql.createConnection({
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'gouniversity'
});

conn.connect((err) => {
    if(err) throw err;
    console.log('Database Connected...');
});
}


    


module.exports = conn;

