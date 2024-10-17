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
    db.connect();
    const result = await db.query("select * from userdb where mail=$1", [mail]);

    const dbPassword = result.rows[0].user_password;
    const dbMail = result.rows[0].mail;

    if (password == dbPassword) {
      console.log("logged in");
      res.render("secrets.ejs");
    } else {
      res.send("Wrong password. Try Again.");
    }
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

async function getDB(user) {
  let data;
  db.connect(async (err) => {
    try {
      if (err) console.log(err.message);
      const result = await db.query("select * from userdb where mail=$1", [
        user,
      ]);
      console.log("result : ");
      console.log(result.rows[0]);
      data = result.rows[0];
      console.log("data :");
      console.log(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      console.log("dbEnd");
    }
    db.end();
    console.log("data2 :");
    console.log(data);
    return data;
  });
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
