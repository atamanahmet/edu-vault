import express from "express";
import pg from "pg";

const app = express();
const port = 3000;
const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "world",
  port: 5432
});


app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));



app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  getDB();
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  // console.log(req.body);
  const mail = req.body.mail
  const password = req.body.password;
  
});

app.post("/login", async (req, res) => {
  // console.log(req.body);
  const mail= req.body.mail
  const password= req.body.password;
  
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

async function getDB(user) {
  try {
  db.connect();
  // const result = await db.query("select * from userdb where user.id=$1", [userId])
  const result = await db.query("select * from userdb where name=$1",[user])
  console.log(result.rows);
  db.end();
  } catch (err) {
console.log(err.message);
  }
  
}
async function writeDB(mail, password) {
  try {
  db.connect();
 await db.query("insert into userdb (mail, user_password) values ($1,$2)",[mail, password])
  db.end();
  } catch (err) {
console.log(err.message);
  }
  
}