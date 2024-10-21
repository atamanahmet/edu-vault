import React from "react";
import ReactDOM from "react-dom/client";
import List from "./List.jsx";
import Heading from "./Heading.jsx";
import Welcome from "./Welcome.jsx";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <div className="container">
    <Welcome />
    <Heading />
    <List />
  </div>
);
