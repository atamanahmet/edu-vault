import express from "express";
import ejs from "ejs";
import pg from "pg";

const port = 3000;
const app = express();
let currentUser;
let users =[];


const db = new pg.Client({
    host: "localhost",
    user: "postgres",
    password: "123456",
    database: "world"
});


app.use(express.static("public"))
app.use(express.urlencoded({extended: true}));

db.connect();

await db.query("select name, id from users", (err,res) => {
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
    let userInfo=[];
    if(currentUser){
        result.rows.forEach((item)=>{
            if (item.name==currentUser){
                userInfo.push(item);
            }
        })
        console.log(userInfo);
        res.render("index.ejs", {data: userInfo})
    }
    else{
        const error = "No user selected"
        res.render("index.ejs", {users: users ,error: error})
    }
   
    
})
app.post("/userSelect")
app.listen(port, (req,res) => {
    console.log("Server Online on port : "+port);
})


async function getDb() {
 return await db.query("select todo.user_id, users.name, todo.todo_item from todo join users on users.id=todo.user_id ")
}