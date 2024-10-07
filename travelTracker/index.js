import express from "express";
import pg from "pg";

const app = express();
const port = 3000;
let visited = [];
let allCountries = [];
let data = [];
let error;
let done = false;

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

db.query("Select * from countries", async (err, res) => {
  if (err) throw err.stack;
  else {
    allCountries = await res.rows;
  }
});

async function checkVisited() {
  data = [];
  try {
    const result = await db.query("SELECT country_code FROM visited");
    result.rows.forEach((country) => {
      data.push(country.country_code);
    });

    // return data;
  } catch (err) {
    console.log(err.message);
  }
}

// db.query("Select country_code from visited", async (err, res) => {
//   if (err) throw err.stack;
//   await res.rows.forEach((country) => {
//     data.push(country.country_code);
//   });
// });

app.get("/", async (req, res) => {
  //Write your code here.
  done = false;
  await checkVisited();
  res.render("index.ejs", { data: data, error: error });
});

app.post("/add", async (req, res) => {
  const input = req.body.country;
  done = false;
  // checkVisited();
  let counter = 0;
  try {
    const result = await db.query(
      "select country_code from countries where lower(country_name) like '%'||$1||'%'",
      [input.toLowerCase()]
    );
    console.log(result.rows);
    const newCountryCode = result.rows[0].country_code;
    console.log(newCountryCode);
    try {
      await db.query("insert into visited (country_code) values ($1)", [newCountryCode])
      console.log("DB Write Succesful");
    } catch (err) {
      console.log(err.message);
      error="Country allready exist. Enter a new country.";
      await checkVisited();
      res.render("index.ejs", {data: data, error: error})
    }
    // allCountries.forEach((item) => {
    //   counter++;
    //   if (item.country_name.toLowerCase().startsWith(input.toLowerCase())) {
    //     const newCountryCode = item.country_code;

    //     if (data.includes(newCountryCode)) {
    //       error = "Country allready exist. Enter a new country.";
    //       console.log(error);
    //       done = true;
    //       res.render("index.ejs", { data: data, error: error });
    //     } else {
    //       db.query("insert into visited (country_code) values ($1)", [
    //         newCountryCode,
    //       ]);
    //       done = true;
    //       console.log("DB write success");
    //       error = null;
    //       res.redirect("/");
    //     }
    //   }
    // });

    if (done == false) {
      error = "Country name does not exist, try again.";
      console.log(error);
      res.render("index.ejs", { data: data, error: error });
    }
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost: ${port}`);
});
