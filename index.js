import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
let apiKey="01a010c0-8480-4330-aeb8-37417e3141fc";
const sId = 42;
let token;
const username= "foxitrot";
const password = "foxitrot";
const basicAuthBuffer = "Basic "+btoa(username+":"+password);

console.log(basicAuthBuffer);

const credentials = {
  auth: {
    username: "foxitrot",
    password: "foxitrot",
  },
};



app.get("/", async (req, res) => {
  
  res.render("index.ejs");
});

app.get("/noAuth", async (req, res) => {
  const response = await axios.get("https://secrets-api.appbrewery.com/random");
  try {
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (err) {
    console.log(err);
  }
});
app.get("/basicAuth", async (req, res) => {
  const response = await axios.get("https://secrets-api.appbrewery.com/all", {
    headers: {
    Authorization: basicAuthBuffer}
  });
  res.render("index.ejs", { content: JSON.stringify(response.data) });
  // console.log("200 OK");
});
app.get("/apiKey", async (req, res) => {
  const response = await axios.get(
    `https://secrets-api.appbrewery.com/filter?score=5&apiKey=${apiKey}`
  );
  try {
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  } catch (err) {
    console.log(err);
  }
});
app.get("/bearerToken", async (req, res) => {
  const response = await axios.get(
    `https://secrets-api.appbrewery.com/secrets/${sId}`,
    {
      headers: {
        Authorization: "Bearer f68385d6-74ef-4e6b-9fef-fe24d52c5c99"
      },
    }
  );

  try{
    res.render("index.ejs", {content: JSON.stringify(response.data)})
  }
  catch(err){
    console.log(err);
  }
});


app.listen(port, (res, req) => {
  console.log("Online at port : " + port);
});

import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

// HINTs: Use the axios documentation as well as the video lesson to help you.
// https://axios-http.com/docs/post_example
// Use the Secrets API documentation to figure out what each route expects and how to work with it.
// https://secrets-api.appbrewery.com/

//TODO 1: Add your own bearer token from the previous lesson.
const yourBearerToken = "f68385d6-74ef-4e6b-9fef-fe24d52c5c99";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "Waiting for data..." });
});

app.post("/get-secret", async (req, res) => {
  const searchId = req.body.id;
  try {
    const result = await axios.get(API_URL + "/secrets/" + searchId, config);
    res.render("index.ejs", { content: JSON.stringify(result.data) });
  } catch (error) {
    res.render("index.ejs", { content: JSON.stringify(error.response.data) });
  }
});

app.post("/post-secret", async (req, res) => {
  const data = { secret: req.body.secret, score: req.body.score}
  try{
const response = await axios.post("https://secrets-api.appbrewery.com/secrets", data, config)
// console.log(response);
  }
  
  catch(err){
console.log(err);
  }
  // TODO 2: Use axios to POST the data from req.body to the secrets api servers.
});

app.post("/put-secret", async (req, res) => {
  // console.log(req.body);
  // const url="https://secrets-api.appbrewery.com/secrets"+req.body.id;
  // console.log(url);
  const data = {
    secret: req.body.secret,
    score: req.body.score
  }
  try {
    const response = await axios.put("https://secrets-api.appbrewery.com/secrets/"+req.body.id, data, config)
    // console.log(response);
  } catch (error) {
    console.log(error.message);
  }
  // TODO 3: Use axios to PUT the data from req.body to the secrets api servers.
});

app.post("/patch-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 4: Use axios to PATCH the data from req.body to the secrets api servers.
});

app.post("/delete-secret", async (req, res) => {
  const searchId = req.body.id;
  // TODO 5: Use axios to DELETE the item with searchId from the secrets api servers.
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
