import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
const name = "Aslı";

root.render(
  <div className="main">
    <div>
      <h1>Fave food</h1>
      <ul>
        <li>
          <img
            src="https://www.allrecipes.com/thmb/Px7y2LlDPmeKlH6PgJ2H-15baEk=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/233446-lo-mein-noodles-dmfs-4x3-1356-1493-64be4dff0a84483b8e7716d6020fb1d5.jpg"
            alt=""
            className="listImg"
          />
        </li>
        <li>
          <img
            src="https://d2lswn7b0fl4u2.cloudfront.net/photos/pg-smash-burgers-1688073852.jpg"
            alt=""
            className="listImg"
          />
        </li>

        <li>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHw3_LL93VcyN91EuZZidayTK1jHQ4L4mJrQ&s"
            alt=""
            className="listImg"
          />
        </li>
      </ul>
    </div>
    <div className="copy">
      <p>Created by {name}</p>
      <p>Copyright {new Date().getFullYear()}</p>
    </div>
  </div>
);
