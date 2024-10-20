import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const name = "Aslı";
let randomNum = Math.floor(Math.random * 10);

console.log(randomNum);
root.render(
  <div>
    <h1>Hello {name}</h1>
    <p>Your lucky number is {randomNum}</p>
  </div>
);
