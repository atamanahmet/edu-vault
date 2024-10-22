import React from "react";
import Avatar from "./Avatar.jsx";
import Details from "./Details.jsx";

function Card(props) {
  return (
    <div className="contact">
      <h2 className="nameTitle">{props.name}</h2>
      <Avatar imgSrc={props.imgSrc} />
      <p>{props.id}</p>
      <Details info={props.tel}></Details>
      <Details info={props.mail}></Details>
    </div>
  );
}
export default Card;
