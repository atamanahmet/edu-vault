import express from "express";
import ejs from "ejs";
import pg from "pg";

const port = 3000;
const app = express();
let dbResponse;
const db = new pg.Client({
    host: "localhost",
    user: "postgres",
    password: "123456",
    database: "world"
});


app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));

db.connect();



app.get("/", async (req,res) => {
    const result = await getDb();
    console.log(result.rows);
    // console.log(result.rows);
    res.render("index.ejs")
})
app.listen(port, (req,res) => {
    console.log("Server Online on port : "+port);
})


async function getDb() {
 return await db.query("select todo.user_id, users.name, todo.todo_item from todo join users on users.id=todo.user_id ")
}