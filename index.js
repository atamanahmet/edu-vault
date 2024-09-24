import express from "express";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
var posted = { ataman: "asdasd"};
var postTitle;
var currentPost;
var sendObj = {};

app.get("/", (req, res) => {
  res.locals.posted = posted;
  res.render("index.ejs", posted);
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});

app.post("/create", (req, res) => {
  postTitle = req.body.postTitle;
  res.locals.postTitle = postTitle;

  posted[postTitle] = req.body.blogPost;
  res.locals.posted = posted;

  res.render("index.ejs", posted);
});

app.post("/viewPosts", (req, res) => {

  sendObj = {};

  currentPost = Object.keys(req.body)[0];

  sendObj[currentPost] = posted[currentPost];

  res.locals.sendObj = sendObj;

  res.render("viewPosts.ejs", sendObj);
});

app.post("/edit", (req,res) => {
  sendObj={};
  currentPost = Object.keys(req.body)[0];
  sendObj[currentPost]= posted[currentPost];
  res.locals.sendObj= sendObj;
  
  
  res.render("edit.ejs", sendObj);
})
app.post("/delete", (req,res) => {
  
delete posted[Object.keys(req.body)[0]]
res.redirect("/")
})

app.listen(port, (req, res) => {
  console.log("Listenin on port : " + port);
});
