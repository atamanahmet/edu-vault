import React from "react";
import ReactDOM from "react-dom/client";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
let welcome = "Good ";
let setStyle = {
  color: "black",
};
const getDate = new Date().getHours();

if (getDate < 12) {
  welcome = welcome + "morning vietnam";
  setStyle.color = "red";
} else if (getDate >= 12 && getDate < 16) {
  welcome = welcome + "afternoon vietnam";
  setStyle.color = "green";
} else if (getDate >= 16 && getDate < 21) {
  welcome = welcome + "evening vietnam";
  setStyle.color = "orange";
} else if (getDate >= 21 && getDate <= 24) {
  welcome = welcome + "night vietnam";
  setStyle.color = "navy";
}

root.render(
  <div className="container">
    <h1 className="heading" style={setStyle}>
      {welcome}
    </h1>
  </div>
);
