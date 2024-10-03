import express from "express";
import axios from "axios";
import fs from "fs";

const port = 3000;
const app = express();
const getApi = true;
const apiKey = JSON.parse(fs.readFileSync("apiKey.json", "utf-8"));

var searchBuffer = JSON.parse(fs.readFileSync("api.json", "utf-8"));
var isProfile=false;

// Test





app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const url="https://api.themoviedb.org/3/discover/movie?" + apiKey
    const response = await axios.get(url);
    res.render("index.ejs", { content: response.data.results });
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/nextpage", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie?page=2&" + apiKey
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
    console.log(error.message);
  }
});

app.post("/add", async (req, res) => {
  var id = Object.keys(req.body)[0];
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/" + id+"?" + apiKey
    );
   
    userdat(response.data);
    res.redirect("/profile")
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/remove", (req,res) => {

  const info =  JSON.parse(fs.readFileSync("user.json", "utf-8"))
  info.forEach((item)=>{
    if(item.id==Object.keys(req.body)[0]){
      const index = info.indexOf(item);
      if(index > -1){
      info.splice(index, 1); 
      fs.writeFileSync("user.json", JSON.stringify(info), (err) => {
        if (err) throw err;
        console.log("Removed Succesfully");
      });
      
    }}
  })
  res.redirect("/profile");
})

app.get("/profile", (req, res) => {
  isProfile=true;
  const info = JSON.parse(fs.readFileSync("user.json", "utf-8"));
  res.render("profile.ejs", { content: info });
});

app.post("/moreInfo", async (req,res) => {

  const id = Object.keys(req.body)[0].slice(0, -2)
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/" + id+"?" + apiKey
    );

    res.render("more.ejs", {content: response.data})
  } catch (error) {
    console.log(error.message);
  }
})

app.listen(port, (req, res) => {
  console.log("Server Online. Listening port: " + port);
});


function userdat(data) {
  const userDataBuffer = JSON.parse(fs.readFileSync("user.json", "utf-8"));
  if (fs.readFileSync("user.json", "utf-8").startsWith("[")) {

    var userData = userDataBuffer;
    userData.push(data);
    fs.writeFileSync("user.json", JSON.stringify(userData), "utf-8")

  }
  else {

    var userData = [];
    userData.push(userDataBuffer);
    userData.push(data);
    fs.writeFileSync("user.json", JSON.stringify(userData), "utf-8")
  }
  
}
