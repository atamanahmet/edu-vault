import React from "react";
import ReactDOM from "react-dom";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
let welcome;
const getDate = new Date().getHours();

root.render(
  <div className="container">
    <h1>{getDate}</h1>
  </div>
);
