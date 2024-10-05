import express from "express";
// import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;
let quiz=[];
var randomCountry;

const db= new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "aA!301331",
    port: 5432
})

db.connect();

db.query("select * from capitals", async (err,res) => {
    try{
        if (err) {
            console.error("Error executing query", err.stack);
        }
        else {
          quiz = await res.rows;
        }
    }
    catch (err){
        console.log(err.message);
    }
   
})
db.end();

// async function randomGenerate(){
//     randomCountry = await quiz[Math.floor((Math.random()*quiz.length)+1)]
//     return randomCountry;
// }
// console.log(randomCountry);
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

let score = 0;

app.get('/', async (req, res) => {
    try{
        quiz = await quiz[Math.floor((Math.random()*quiz.length)+1)]
        
        randomCountry["count"]=score;
        res.render("index.ejs", {content: randomCountry})
    }
    catch (err){
        console.log(err.message);
    }
    
    
});
app.listen(port, (req,res) => {
    console.log("Server online on port : "+port);
})
