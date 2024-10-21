import React from "react";
import ReactDOM from "react-dom";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
let welcome = "Good ";
const getDate = new Date().setHours();
// const getDate = 1;

if (getDate < 12) {
  welcome = welcome + "morning vietnam";
} else if (getDate >= 12 && getDate < 16) {
  welcome = welcome + "afternoon vietnam";
} else if (getDate >= 16 && getDate < 21) {
  welcome = welcome + "evening vietnam";
} else if (getDate >= 21 && getDate <= 24) {
  welcome = welcome + "night vietnam";
}

root.render(
  <div className="container">
    <h1>{welcome}</h1>
  </div>
);
