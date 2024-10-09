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

await db.connect();
await db.query("select id,name,color from username", async (err, res) => {
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
  data = [];
  if (currentUser) {
    try {
      const userID = await db.query(
        "select * from username where username.name=($1)",
        [currentUser.username]
      );

      currentUser.id = userID.rows[0].id;
      console.log(currentUser);

      const result = await db.query(
        "select visited from visited_user where userid=($1)",
        [currentUser.id]
      );

      result.rows.forEach((item) => {
        data.push(item.visited);
      });
      console.log(data);
      // console.log(currentUser);
    } catch (err) {
      console.log(err.message);
    }
  } else {
    error = "Please select or create a user";
    res.redirect("/");
  }
}

db.query("Select country_code from visited", async (err, res) => {
  if (err) throw err.stack;
  await res.rows.forEach((country) => {
    data.push(country.country_code);
  });
});

app.get("/", async (req, res) => {

  if (currentUser) {
    users.forEach((item) => {
      if (item.name == currentUser.username) {
        console.log(item);
        currentUser.color = item.color;
      }
    });
    console.log(color);
  }
  else{
    color="teal";
  }
  await checkVisited(currentUser);
  res.render("index.ejs", { data: data, error: error, users: users, currentUser: currentUser});
});

app.post("/userSelect", async (req, res) => {
  try {
    data = [];
    currentUser.id = null;
    currentUser.username = req.body.currentUser;
   
    await checkVisited(currentUser);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

app.post("/add", async (req, res) => {
  error = null;
  currentUser.id = null;
  checkVisited(currentUser);
  const input = req.body.country;
  console.log(input);
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

    try {
      console.log(newCountryCode);
      await db.query(
        `insert into visited_user (userid, visited) values (${currentUser.id}, '${newCountryCode}')`
      );
      console.log("DB Write Succesful");

      res.redirect("/");
    } catch (err) {
      console.log(err);
      error = "Country allready exist. Enter a new country.";
      await checkVisited();
      res.redirect("/");
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

async function resetBuffer() {
  currentUser.id = null;
}
