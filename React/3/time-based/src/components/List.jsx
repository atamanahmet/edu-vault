import React from "react";
// import * as Calc from "./Calculator.jsx";

function List(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <img src={props.imgSrc} alt="profile" />
      <p>{props.tel}</p>
      <p>{props.mail}</p>
    </div>
  );
}
export default List;
