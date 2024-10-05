import express from "express";
// import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;
let quiz=[];
var randomCountry;


const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "aA!301331",
    port: 5432
})

db.connect();

db.query("SELECT * FROM capitals", (err, res) => {
    if (err) throw console.error("Error query", err.stack);
    else {
        quiz = res.rows;
    }
})


app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

let score = 0;

app.get('/', (req, res) => {
    try{
        randomCountry = quiz[Math.floor((Math.random()*quiz.length)+1)]
        
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
