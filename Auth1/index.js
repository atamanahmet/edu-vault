import express from "express";
import pg from "pg"

const app = express();
const port = 3000;
const db = new pg.Client({
  host: "localhost",
  name: "postgres",
  password: "123456",
  database: "world"
});


app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// getDB(1);

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  // console.log(req.body);
  const mail= req.body.mail
  const password= req.body.password;
  
});

app.post("/login", async (req, res) => {
  // console.log(req.body);
  const mail= req.body.mail
  const password= req.body.password;
  
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

async function getDB(userId) {
  try {
  db.connect();
  // const result = await db.query("select * from userdb where user.id=$1", [userId])
  const result = await db.query("select * from userdb")
  console.log(result.rows);
  db.end();
  } catch (err) {
console.log(err.message);
  }
  
}