import express from "express";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
var posted={};
var postTitle;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/create", (req, res) => {
 postTitle = req.body.postTitle;
  res.locals.postTitle=postTitle;
  console.log(postTitle);
  posted[postTitle] = req.body.blogPost;
  res.locals.posted=posted;

  res.render("index.ejs", posted);
});

app.listen(port, (req, res) => {
  console.log("Listenin on port : " + port);
});
