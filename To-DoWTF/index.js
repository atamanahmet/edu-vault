import express from "express";
import ejs from "ejs";
import pg from "pg";

const port = 3000;
const app = express();
let currentUser;
let users = [];
let error;
let userToDo;

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
    result.rows.forEach((item) => {
      if (item.user_id == currentUser) {
        data.push(item);
      }
    });
    // console.log(data);
    res.render("index.ejs", { data: data, error: error });
  } else {
    error = "No user selected";
    res.render("index.ejs", { users: users, error: error });
  }
});
app.post("/userSelect", async (req, res) => {
  currentUser = Number(req.body.id);
  userToDo=null;
  userToDo = await userDb();

  res.redirect("/");
});

app.post("/update", async (req, res) => {
    let userInputs=[];
console.log(req.body);
    const userDbCall= await userDb();
    const ids = Object.keys(req.body);
    const todoItems = req.body.input[0];
    console.log(todoItems);

   for (let i = 0; i < ids.length; i++) {
    userInputs.push({
        id: Number(ids[i]),
        todoitem: todoItems 
    })
   }
   userDbCall.rows.forEach(dbItem => {
    console.log(dbItem);
    userInputs.forEach(async update => {
        if(update.id==dbItem.id){
          console.log(update);
            if(dbItem.todoitem!=update.todoitem){
               await db.query("update todo set todoitem=($1) where user_id=($2)",[update.todoitem, currentUser])
            }
        }
    });
   });

   res.redirect("/");
});

app.post("/new", async (req,res) => {
    const newEntry = req.body.newEntry;
    await db.query("insert into todo (user_id, todoitem) values ($1, $2)", [currentUser, newEntry]);
    res.redirect("/");
})

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
    "select * from todo where todo.user_id=($1) order by id asc", [currentUser]
  );
}
