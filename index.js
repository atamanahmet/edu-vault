import express from "express";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
var posted = {};
var postTitle;

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/create", (req, res) => {
  res.render("create.ejs");
});
app.post("/create", (req, res) => {
 res.locals.postTitle= req.body.postTitle;
  res.locals.posted=posted;
  res.render("index.ejs", posted);
  console.log(posted);
});

app.listen(port, (req, res) => {
  console.log("Listenin on port : " + port);
});
