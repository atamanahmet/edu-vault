import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //   try {
  const response = await axios.get("https://secrets-api.appbrewery.com/random");
  const data = {
    secret: response.data.secret,
    username: response.data.username,
  };
  res.locals.data=data;
  res.render("index.ejs", data);
  //   } catch (error) {
  //     console.log(error);
  //   }

  res.render("index.ejs");
});
app.listen(port, (req, res) => {
  console.log("Online port: " + port);
});
