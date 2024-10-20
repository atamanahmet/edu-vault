import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
const name = "Aslı";

root.render(
  <div className="testDiv">
    <p>Created by {name}</p>
    <p>Copyright {new Date().getFullYear()}</p>
  </div>
);
