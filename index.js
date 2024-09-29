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
