import React from "react";
const getDate = new Date().getFullYear();
function Footer() {
  return (
    <div className="Footer">
      <p>Copyright {getDate}</p>
    </div>
  );
}

export default Footer;
