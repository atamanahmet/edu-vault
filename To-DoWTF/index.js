import express from "express";
import ejs from "ejs";
import pg from "pg";

const port = 3000;
const app = express();
let currentUser;
let users = [];
let error;
let userToDo;
var editId;

const db = new pg.Client({
  host: "localhost",
  user: "postgres",
  password: "123456",
  database: "world",
});

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

db.connect();

db.query("select name, id from users", (err, res) => {
  if (err) throw err.stack;

  res.rows.forEach((item) => {
    users.push({
      id: item.id,
      name: item.name,
    });
  });
});

app.get("/", async (req, res) => {
  const result = await getDb();
  //   console.log(result.rows);
  let data = [];
  // console.log(result.rows);
  if (currentUser) {
    const userDbCall = await userDb();  
    userDbCall.rows.forEach((item) => {
      if (item.user_id == currentUser) {
        data.push(item);
      }
    });

    res.render("index.ejs", { data: data, error: error });
  } else {
    error = "No user selected";
    res.render("index.ejs", { users: users, error: error });
  }
});
app.post("/userSelect", async (req, res) => {
  currentUser = Number(req.body.id);
  userToDo = null;
  userToDo = await userDb();

  res.redirect("/");
});

app.post("/update", async (req, res) => {
  console.log(req.body);
  const id = Number(Object.keys(req.body)[0]);
  console.log(id);
  const todoitem = Object.values(req.body)[0];
  
   if(req.body.checkbox){
    console.log("checked");
    await db.query("delete from todo where todo.id=$1",[id])
    res.redirect("/");
  }
  else{
    await db.query("update todo set todoitem=$1, user_id=$2 where id=$3", [todoitem, currentUser, id])
    res.redirect("/");
  }
 
});

app.post("/new", async (req, res) => {
  const newEntry = req.body.newEntry;
  await db.query("insert into todo (user_id, todoitem) values ($1, $2)", [
    currentUser,
    newEntry,
  ]);
  res.redirect("/");
});



app.listen(port, (req, res) => {
  console.log("Server Online on port : " + port);
});

async function getDb() {
  return await db.query(
    "select todo.user_id, users.name, todo.todoitem, todo.id from todo join users on users.id=todo.user_id "
  );
}
async function userDb() {
  return await db.query(
    "select * from todo where todo.user_id=($1) order by todo.id asc",
    [currentUser]
  );
}
