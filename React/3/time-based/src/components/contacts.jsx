import React from "react";
import Avatar from "./Avatar.jsx";

function Contacts(props) {
  return (
    <div className="contact">
      <h2 className="nameTitle">{props.name}</h2>
      <Avatar imgSrc={props.imgSrc}></Avatar>
      <p>{props.tel}</p>
      <p>{props.mail}</p>
    </div>
  );
}
export default Contacts;
