import express from "express";
import axios from "axios";
import fs from "fs";
import  util  from "util";

const port = 3000;
const app = express();
const getApi=false;
const apiKey="api_key=f01bd717d291699c6c6c94f8db61bad3";
var searchBuffer = JSON.parse(fs.readFileSync("api.json", "utf-8"));

// loadBuffer();
// async function loadBuffer() {
//   try {
//     const tempdata = await fs.readFile("api.json", "utf-8", (err)=>{
//       if (err) throw err
      
//     })
//     console.log(tempdata);
//   } catch (error) {
//     console.log(error.message);
//   }
  
// } 
// console.log(tempdata);
// [
//   {
//     adult: false,
//     backdrop_path: null,
//     genre_ids: [],
//     id: 555879,
//     original_language: "en",
//     original_title: "Matrix",
//     overview:
//       "The film is composed of receding planes in a landscape: a back garden and the houses beyond. The wooden lattice fence, visible in the image, marks the border between enclosed and open, private and public space, and forms both a fulcrum for the work and a formal grid by which the shots are framed and organised.",
//     popularity: 4.708,
//     poster_path: "/AfFD10ZqEx2vkxM2yvRZkybsGB7.jpg",
//     release_date: "1998-12-31",
//     title: "Matrix",
//     video: false,
//     vote_average: 6.922,
//     vote_count: 32,
//   },
//   {
//     adult: false,
//     backdrop_path: null,
//     genre_ids: [],
//     id: 557879,
//     original_language: "en",
//     original_title: "Matrix 2",
//     overview:
//       "The film is composed of receding planes in a landscape: a back garden and the houses beyond. The wooden lattice fence, visible in the image, marks the border between enclosed and open, private and public space, and forms both a fulcrum for the work and a formal grid by which the shots are framed and organised.",
//     popularity: 4.708,
//     poster_path: "/AfFD10ZqEx2vkxM2yvRZkybsGB7.jpg",
//     release_date: "1998-12-31",
//     title: "Matrix",
//     video: false,
//     vote_average: 6.922,
//     vote_count: 32,
//   },
//   {
//     adult: false,
//     backdrop_path: null,
//     genre_ids: [],
//     id: 588879,
//     original_language: "en",
//     original_title: "Matrix 3",
//     overview:
//       "The film is composed of receding planes in a landscape: a back garden and the houses beyond. The wooden lattice fence, visible in the image, marks the border between enclosed and open, private and public space, and forms both a fulcrum for the work and a formal grid by which the shots are framed and organised.",
//     popularity: 4.708,
//     poster_path: "/AfFD10ZqEx2vkxM2yvRZkybsGB7.jpg",
//     release_date: "1998-12-31",
//     title: "Matrix",
//     video: false,
//     vote_average: 6.922,
//     vote_count: 32,
//   },
//   {
//     adult: false,
//     backdrop_path: null,
//     genre_ids: [],
//     id: 512879,
//     original_language: "en",
//     original_title: "Matrix 4",
//     overview:
//       "The film is composed of receding planes in a landscape: a back garden and the houses beyond. The wooden lattice fence, visible in the image, marks the border between enclosed and open, private and public space, and forms both a fulcrum for the work and a formal grid by which the shots are framed and organised.",
//     popularity: 4.708,
//     poster_path: "/AfFD10ZqEx2vkxM2yvRZkybsGB7.jpg",
//     release_date: "1998-12-31",
//     title: "Matrix",
//     video: false,
//     vote_average: 6.922,
//     vote_count: 32,
//   },
//   {
//     adult: false,
//     backdrop_path: null,
//     genre_ids: [],
//     id: 594579,
//     original_language: "en",
//     original_title: "Matrix 5",
//     overview:
//       "The film is composed of receding planes in a landscape: a back garden and the houses beyond. The wooden lattice fence, visible in the image, marks the border between enclosed and open, private and public space, and forms both a fulcrum for the work and a formal grid by which the shots are framed and organised.",
//     popularity: 4.708,
//     poster_path: "/AfFD10ZqEx2vkxM2yvRZkybsGB7.jpg",
//     release_date: "1998-12-31",
//     title: "Matrix",
//     video: false,
//     vote_average: 6.922,
//     vote_count: 32,
//   },
//   {
//     adult: false,
//     backdrop_path: null,
//     genre_ids: [],
//     id: 500979,
//     original_language: "en",
//     original_title: "Matrix 6",
//     overview:
//       "The film is composed of receding planes in a landscape: a back garden and the houses beyond. The wooden lattice fence, visible in the image, marks the border between enclosed and open, private and public space, and forms both a fulcrum for the work and a formal grid by which the shots are framed and organised.",
//     popularity: 4.708,
//     poster_path: "/AfFD10ZqEx2vkxM2yvRZkybsGB7.jpg",
//     release_date: "1998-12-31",
//     title: "Matrix",
//     video: false,
//     vote_average: 6.922,
//     vote_count: 32,
//   },
// ];
// console.log(tempdata);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
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
        fs.writeFileSync("user.json", JSON.stringify(item))
      }
    });
  })
  res.render("index.ejs")
})

app.get("/profile", (req, res) => {
  const info = JSON.parse(fs.readFileSync("user.json", "utf-8"))
  res.render("profile.ejs", {content: info})
})
app.listen(port, (req, res) => {
  console.log("Server Online. Listening port: " + port);
});
