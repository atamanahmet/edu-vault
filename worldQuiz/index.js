import express from "express";
// import axios from "axios";
import pg from "pg";

const app = express();
const port = 3000;
let quiz = [];
var randomCountry;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "123456",
  port: 5432,
});

db.connect();

db.query("SELECT * FROM capitals", (err, res) => {
  if (err) throw console.error("Error query", err.stack);
  else {
    quiz = res.rows;
  }
  db.end();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

let score = 0;

app.get("/", (req, res) => {
  try {
    randomCapitalGET(res);
  } 
  
  catch (err) {
    console.log(err.message);
  }
});


app.post("/submit", (req, res) => {
  const guess = req.body.guess;

  if (randomCountry.capital.toLowerCase() == guess.toLowerCase()) {
    score++;
    res.redirect("/");
  } else {
    console.log("Game Over");
    res.render("gameOver.ejs", {content: score})
    score = 0;
  }
});
app.listen(port, (req, res) => {
  console.log("Server online on port : " + port);
});

function randomCapitalGET(res) {
  randomCountry = quiz[Math.floor(Math.random() * quiz.length + 1)];
  console.log(randomCountry.capital);
  randomCountry["count"] = score;
  res.render("index.ejs", { content: randomCountry });
}
