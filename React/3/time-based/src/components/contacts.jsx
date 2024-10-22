import React from "react";

function Contacts(props) {
  return (
    <div className="contact">
      <h2>{props.name}</h2>
      <img src={props.imgSrc} alt="profile" />
      <p>{props.tel}</p>
      <p>{props.mail}</p>
    </div>
  );
}
export default Contacts;
