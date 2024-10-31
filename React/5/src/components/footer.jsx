import React from "react";

function Footer() {
  const getDate = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright {getDate} </p>
    </footer>
  );
}

export default Footer;
