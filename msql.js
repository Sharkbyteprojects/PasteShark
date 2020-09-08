const express = require("express");
const app = express();
const httpSer=require("http").createServer(app);
const bp=require("body-parser");
const path=require("path");
const dbs=require("./sqdb");
app.use(bp.json());
app.use(bp.urlencoded());
const crypto=require("crypto");
const ld=[__dirname, "shPasteShark", "dist", "shPasteShark"];
app.use(express.static(path.resolve(...ld)));
app.get("/", (req,res)=>{
    res.sendFile(path.resolve(...ld, "index.html"));
});
function ids(){
    return crypto.createHmac("md5", Math.random().toString()+Math.random().toString()).update(crypto.randomBytes(60)).digest("hex");
}
app.get("/api/raw", (req,res)=>{
    res.set({"Content-Type": "text/plain; charset=UTF-8"});
    if(req.query.id&&req.query.id!=""){
        dbs.query("SELECT * FROM dbshark WHERE id=?", req.query.id).then((oke)=>{
            let es="";
                for(let e of oke){
                    es+=`${e.content}\n`;
                }
                res.send(es);
        },(err)=>{
            res.sendStatus(404);
        });        
    }else{
        if(req.query.tk&&req.query.tk!=""){
            dbs.query("SELECT * FROM dbshark WHERE tok=?", req.query.tk).then((oke)=>{
                let es="";
                for(let e of oke){
                    es+=`${e.content}\n`;
                }
                res.send(es);
            },(err)=>{
                res.sendStatus(404);
            });   
        }else{
            res.sendStatus(404);
        }
    }
});
app.get("/api", (req,res)=>{
    if(req.query.id&&req.query.id!=""){
        dbs.query("SELECT * FROM dbshark WHERE id=?", req.query.id).then((oke)=>{
            res.json({"err": false, your: oke});
        },(err)=>{
            res.json({"err": true, your: err});
        });        
    }else{
        if(req.query.tk&&req.query.tk!=""){
            dbs.query("SELECT * FROM dbshark WHERE tok=?", req.query.tk).then((oke)=>{
                res.json({"err": false, your: oke});
            },(err)=>{
                res.json({"err": true, your: err});
            });   
        }else{
            res.status(500);
            res.json({"err": true, your: "NO PAR SPEC"});
        }
    }
});

app.post("/api",(req,res)=>{
    if(req.body.content){
        if(req.body.content!=""){
            const token=ids();
            function sen(e){
                return (x)=>{};
            }
            const el=req.body.content.split("\n");
            for(let e of el){
                dbs.add(token, e).then(sen(false),sen(true));
            }
            res.json({"err": false, your: `${token}`})
        }else{
            res.status(500);
            res.json({"err": true, your: "ELEMENT ERR"});
        }
    }else{
        res.status(500);
        res.json({"err": true, your: "ELEMENT ERR"});
    }
});

httpSer.listen(8080,()=>{
    console.log("Listen at http://localhost:8080");
});
