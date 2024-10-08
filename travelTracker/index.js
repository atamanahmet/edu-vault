import express from "express";
import pg from "pg";

const app = express();
const port = 3000;
let allCountries = [];
let data = [];
let error;
let newCountryCode;
let currentUser;
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
db.query("select name from username", async (err, res) => {
  const result = await res.rows;
  if (err) throw err.stack;
  result.forEach((item) => {
    // console.log(item);
    users.push(item.name);
  });
});
db.query("Select * from countries", async (err, res) => {
  if (err) throw err.stack;
  else {
    allCountries = await res.rows;
  }
});

db.query("Select * from countries", async (err, res) => {
  if (err) throw err.stack;
  else {
    allCountries = await res.rows;
  }
});
// db.query(
//   `Select username.name, visited_user.visited from username join visited_user on visited_user.userid = username.id where username.id = 1`,
//   async (err, res) => {
//     if (err) throw err.stack;
//     else {
//       const result = await res.rows;

//       // console.log(result);
//       result.forEach((item) => {
//         data.push(item.visited)

//       });
//     }
//   }
// );

async function checkVisited(user) {
  if (!user) {
    try {
      const result = await db.query(`select visited from visited_user`);
      result.rows.forEach((item) => {
        console.log(item.visited);
        data.push(item.visited);
        //  color = item.color;
        // console.log(color);
        // console.log(data);
      });
    } catch (err) {
      console.log(err.message);
    }
  } else {
    try {
      const result = await db.query(
        `Select username.name, visited_user.visited from username join visited_user on visited_user.userid = username.id where LOWER(username.name)='${user.toLowerCase()}'`
      );
      result.rows.forEach((item) => {
        console.log(item.visited);
        data.push(item.visited);
        color = item.color;
        console.log(color);
        // console.log(data);
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
  currentUser = req.body.currentUser;
  await checkVisited(currentUser);
  res.render("index.ejs", { data: data, error: error, users: users });
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
      await db.query("insert into visited (country_code) values ($1)", [
        newCountryCode,
      ]);
      console.log("DB Write Succesful");
      res.redirect("/");
    } catch (err) {
      console.log(err.message);
      error = "Country allready exist. Enter a new country.";
      await checkVisited();
      res.render("index.ejs", { data: data, error: error });
    }
    // test
    // console.log(result.rows.length);
    // result.rows.length>1 ?
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
  } catch (err) {
    console.log(err.message);
    error = "Country name cannot found. Try again.";
    res.redirect("/");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost: ${port}`);
});
