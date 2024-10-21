import React from "react";

const getDate = new Date().getFullYear();

function Footer() {
  return (
    <footer className="Footer">
      <p>Copyright {getDate}</p>
    </footer>
  );
}

export default Footer;
