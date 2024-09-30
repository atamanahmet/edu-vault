import express from "express";
import axios from "axios";
import fs from "fs";


const port = 3000;
const app = express();
const getApi=false;
const apiKey="api_key=f01bd717d291699c6c6c94f8db61bad3";
var searchBuffer = JSON.parse(fs.readFileSync("api.json", "utf-8"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
try {
  const response = await axios.get("https://api.themoviedb.org/3/discover/movie?&"+apiKey)
res.render("index.ejs", {content: response.data.results})
} catch (error) {
  console.log(error.message);
}
  
});

app.post("/search", async (req, res) => {
  try {
    if(getApi){
    const param= req.body.searchQuery.replace(" ", "+");
    // console.log(param);
    const response = await axios.get("https://api.themoviedb.org/3/search/movie?query="+param+"&"+apiKey)
    fs.writeFile("api.json", JSON.stringify(response.data.results), (err)=>{
      if (err) throw err;
      console.log("Buffer Write succesful");
  })
    res.render("index.ejs", {content: response.data.results})
   
  }

   
else{
  res.render("index.ejs", { content: searchBuffer });
}
    
  } catch (error) {
    console.log(error);
  }
});

app.post("/add", (req, res) => {

  console.log(Object.keys(req.body)[0]); 
var id = Object.keys(req.body)[0];
  fs.readFile("api.json", "utf-8", (err, data)=>{
    if (err) throw err;
    searchBuffer=JSON.parse(data);
    searchBuffer.forEach(item => {
      if(item.id==id){
        const content = fs.writeFileSync("user.json", JSON.stringify(item))
        res.render("profile.ejs", {content: content})
      }
    });
  })
 
})

app.get("/profile", (req, res) => {
  const info = JSON.parse(fs.readFileSync("user.json", "utf-8"));
  res.render("profile.ejs", {content: info})
})
app.listen(port, (req, res) => {
  console.log("Server Online. Listening port: " + port);
});
