import express from "express";
import pg from "pg";

const port = 3000;
const app = express();


app.get("/", (res,res) => {
    res.render("index.ejs")
})
app.listen(port, (req,res) => {
    console.log("Server Online on port : "+port);
})