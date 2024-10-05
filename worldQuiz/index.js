import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
    const data=0;
res.render("index.ejs", {content: data})
    
});
app.listen(port, (req,res) => {
    console.log("Server online on port : "+port);
})
