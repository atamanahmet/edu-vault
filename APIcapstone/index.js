import express from "express";
import axios from "axios";
import fs from "fs";

const port = 3000;
const app = express();
const getApi = false;
const apiKey = "api_key=f01bd717d291699c6c6c94f8db61bad3";
var searchBuffer = JSON.parse(fs.readFileSync("api.json", "utf-8"));

// Test
// var obj1={name: "ahmet",
//   lastname: "ataman"
// }
// var obj2={name: "fox",
//   lastname: "foxitortor"
// }

// obj1.push(obj2)
// console.log(obj1);




app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie?&" + apiKey
    );
    res.render("index.ejs", { content: response.data.results });
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/search", async (req, res) => {
  try {
    if (getApi) {
      const param = req.body.searchQuery.replace(" ", "+");
      // console.log(param);
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie?query=" + param + "&"+apiKey
      );
      fs.writeFile("api.json", JSON.stringify(response.data.results), (err) => {
        if (err) throw err;
        console.log("Buffer Write succesful");
      });
      res.render("index.ejs", { content: response.data.results });
    } else {
      res.render("index.ejs", { content: searchBuffer });
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/add", async (req, res) => {
  console.log(Object.keys(req.body)[0]);
  var id = Object.keys(req.body)[0];
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/" + id+"?" + apiKey
    );
    // console.log(response.data);
    userdat(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/profile", (req, res) => {
  const info = JSON.parse(fs.readFileSync("user.json", "utf-8"));
  // console.log(info);
  res.render("profile.ejs", { content: info });
});

app.listen(port, (req, res) => {
  console.log("Server Online. Listening port: " + port);
});

function userdat(data) {
  const userDataBuffer = JSON.parse(fs.readFileSync("user.json", "utf-8"));
  if (fs.readFileSync("user.json", "utf-8").startsWith("[")) {
    // console.log("add info : "+ JSON.stringify(data));
    var userData = userDataBuffer;
    userData.push(data);
    console.log("array obj");
    fs.writeFileSync("user.json", JSON.stringify(userData), "utf-8")
    // console.log(userData);
  }
  else {
    // console.log("add info : "+data);
    var userData = [];
    userData.push(userDataBuffer);
    userData.push(data);
    fs.writeFileSync("user.json", JSON.stringify(userData), "utf-8")
    
    console.log("obj");
    // console.log(userData);
  }
  
}
