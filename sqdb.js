const fs=require("fs");
const dbFile = require("path").resolve(__dirname, "sqlite.db");
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(dbFile);
db.serialize(() => {
    if (!exists) {
      db.run(
        "CREATE TABLE dbshark (id INTEGER PRIMARY KEY AUTOINCREMENT, tok TEXT, content LONGTEXT)"
      );
      console.log("New table created!");
  
      // insert default dreams
      db.serialize(() => {
      });
    } else {
      console.log('Database ready to go!');
      db.each("SELECT * from Dreams", (err, row) => {
        if (row) {
          console.log(`record: ${row.dream}`);
        }
      });
    }
  });

function add(tok, elem){
    return new Promise((ok, nall)=>{
        const query="INSERT INTO dbshark (tok, content) VALUES (?, ?)";
        db.run(query, ...[tok, elem], (err,result)=>{
            if(err){
                nall(err);
            }else{
                ok(result);
            }
        });
    });
}
function query(querys, ...exc){
    return new Promise((ok, nall)=>{
        db.all(querys, ...exc, (err,result)=>{
            if(err){
                nall(err);
            }else{
                ok(JSON.parse(JSON.stringify(result)));
            }
        });
    });
}
module.exports={
    add,
    query
};