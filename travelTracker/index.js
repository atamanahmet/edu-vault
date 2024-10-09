import express from "express";
import pg from "pg";

const app = express();
const port = 3000;
let allCountries = [];
let data = [];
let error;
let newCountryCode;
let currentUser = {};

let users = [];
let color;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: "postgres",
  password: "123456",
  host: "localhost",
  database: "world",
  port: 5432,
});

db.connect();
db.query("select name,color from username", async (err, res) => {
  const result = await res.rows;
  if (err) throw err.stack;
  result.forEach((item) => {
    users.push({
      id: item.id,
      name: item.name,
      color: item.color,
    });
  });
});
db.query("Select * from countries", async (err, res) => {
  if (err) throw err.stack;
  else {
    allCountries = await res.rows;
  }
});

async function checkVisited(currentUser) {
  if (!currentUser) {
    try {
      const result = await db.query(
        `select visited, username.color from visited_user join username on visited_user.userid = username.id`
      );
      // console.log("!user: " + JSON.stringify(result.rows));
      result.rows.forEach((item) => {
        data.push(item.visited);
      });
    } catch (err) {
      console.log(err.message);
    }
  } else {
    try {
      const result = await db.query(
        `Select username.id, username.name, username.color, visited_user.visited from username join visited_user on visited_user.userid = username.id where LOWER(username.name)='${currentUser.username.toLowerCase()}'`
      );

      console.log("userFound: " + JSON.stringify(result.rows));

      result.rows.forEach((item) => {
        data.push(item.visited);
        currentUser.id = item.id;
      });
    } catch (err) {
      console.log(err.message);
    }
  }
}

db.query("Select country_code from visited", async (err, res) => {
  if (err) throw err.stack;
  await res.rows.forEach((country) => {
    data.push(country.country_code);
  });
});

app.get("/", async (req, res) => {
  await checkVisited();
  res.render("index.ejs", { data: data, error: error, users: users });
});

app.post("/userSelect", async (req, res) => {
  try {
    data = [];
  currentUser.username = req.body.currentUser;
  await checkVisited(currentUser.username);
  res.render("index.ejs", { data: data, error: error, users: users });
  } catch (error) {
    console.log(error);
  }
  
});

app.post("/add", async (req, res) => {
  error = null;
  const input = req.body;
  try {
    const result = await db.query(
      "select country_code from countries where lower(country_name) like '%'||$1||'%'",
      [input.toLowerCase()]
    );
    // console.log(result.rows);
    if (result.rows.length > 1) {
      newCountryCode = result.rows[1].country_code;
    } else {
      newCountryCode = result.rows[0].country_code;
    }

    // console.log(newCountryCode);
    try {
      await db.query(
        "insert into visited_user (userid),(country_code) values ($1)($2)",
        [currentUser.id, newCountryCode]
      );
      console.log("DB Write Succesful");
      res.redirect("/");
    } catch (err) {
      console.log(err.message);
      error = "Country allready exist. Enter a new country.";
      await checkVisited();
      res.render("index.ejs", {
        data: data,
        error: error,
        users: users,
        color: color,
      });
    }
  } catch (err) {
    console.log(err.message);
    error = "Country name cannot found. Try again.";
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost: ${port}`);
});
