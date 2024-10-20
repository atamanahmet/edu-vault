import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

// const asd = [1, 2, 3];
const name = "Aslı";
const surname = "Ataman";
let randomNum = Math.floor(Math.random() * 10);

root.render(
  <div>
    <h1>
      Hello {name} {surname}
    </h1>
    {/* {asd.forEach((item) => {
      <p>item</p>;
    })} */}

    <p>Your lucky number is {randomNum}</p>
  </div>
);
