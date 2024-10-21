import React from "react";

let welcomeMessage = "Good ";

let setStyle = {
  color: "black",
};
const getDate = new Date().getHours();

if (getDate < 12) {
  welcomeMessage = welcomeMessage + "morning vietnam";
  setStyle.color = "red";
} else if (getDate >= 12 && getDate < 16) {
  welcomeMessage = welcomeMessage + "afternoon vietnam";
  setStyle.color = "green";
} else if (getDate >= 16 && getDate < 21) {
  welcomeMessage = welcomeMessage + "evening vietnam";
  setStyle.color = "orange";
} else if (getDate >= 21 && getDate <= 24) {
  welcomeMessage = welcomeMessage + "night vietnam";
  setStyle.color = "navy";
}
function Welcome() {
  return (
    <h1 className="heading" style={setStyle}>
      {welcomeMessage}
    </h1>
  );
}

export default Welcome;
