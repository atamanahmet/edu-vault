import express from "express";
import ejs from "ejs";
import pg from "pg";

const port = 3000;
const app = express();
let currentUser;
let users =[];
let error;

const db = new pg.Client({
    host: "localhost",
    user: "postgres",
    password: "123456",
    database: "world"
});


app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));

db.connect();

db.query("select name, id from users", (err,res) => {
    if(err) throw err.stack;
    
    res.rows.forEach((item)=>{
        users.push({
            id: item.id,
            name: item.name,
        });  
})
})

app.get("/", async (req,res) => {
    const result = await getDb();
    let data=[];
    // console.log(result.rows);
    if(currentUser){
        result.rows.forEach((item)=>{
            if (item.user_id==currentUser){
                data.push(item);
            }
        })
        // console.log(data);
        res.render("index.ejs", {data: data, error:error})
    }
    else{
        error = "No user selected"
        res.render("index.ejs", {users: users ,error: error})
    }
   
    
})
app.post("/userSelect",(req,res) => {
    currentUser = Number(req.body.id);
    // console.log(currentUser);
    res.redirect("/");
})

app.post("/update",(req,res) => {
    console.log(req.body);
})

app.listen(port, (req,res) => {
    console.log("Server Online on port : "+port);
})


async function getDb() {
 return await db.query("select todo.user_id, users.name, todo.todo_item, todoid from todo join users on users.id=todo.user_id ")
}