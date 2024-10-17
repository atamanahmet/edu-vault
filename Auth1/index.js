import express from "express";
import pg from "pg";

const app = express();
const port = 3000;
let error;
const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "world",
  port: 5432,
});
db.connect();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

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
  const mail = req.body.mail;
  const password = req.body.password;
  await writeDB(mail, password, res);
  if (error) {
    res.render("register.ejs", { error: error });
  } else {
    res.redirect("/login");
  }
});

app.post("/login", async (req, res) => {
  const mail = req.body.mail;
  const password = req.body.password;
  try {
    const user = await getDB(mail);
    console.log(user);
    const dbPassword = user.user_password;

    if (password == dbPassword) {
      console.log("logged in");

      res.render("secrets.ejs");
    } else {
      res.send("Wrong password. Try Again.");
    }
  } catch (error) {
    res.send("User not found...");
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

async function getDB(mail) {
  const result = await db.query("select * from userdb where mail=$1", [mail]);
  return result.rows[0];
}

async function writeDB(mail, password, res, req) {
  db.connect(async (err) => {
    if (err) console.log(err.message);
    const result = await db.query("select mail from userdb where mail=$1", [
      mail,
    ]);
    console.log(result.rows.length);
    if (result.rows.length > 0) {
      res.send("User exist. Try another email or log in.");
      db.end();
    } else {
      try {
        await db.query(
          "insert into userdb (mail, user_password) values ($1,$2)",
          [mail, password]
        );
      } catch (err) {
        console.log(err.message);
      } finally {
        db.end();
      }
    }
  });
}
