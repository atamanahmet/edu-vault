import express from "express";
import axios from "axios";
const port = 3000;
const app = express();

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.listen(port, (req,res) => {
    console.log("Server Online. Listening port: "+ port);
})
