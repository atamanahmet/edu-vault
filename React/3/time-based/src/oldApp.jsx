import React from "react";
import Heading from "./components/Heading.jsx";
import Welcome from "./components/Welcome.jsx";
import Card from "./components/Card.jsx";
import Footer from "./components/footer.jsx";
import contactInfo from "./components/contactInfo.js";

function createContact(contact) {
  return (
    <Card
      key={contact.id}
      // id={contact.id}
      name={contact.name}
      mail={contact.mail}
      imgSrc={contact.imgSrc}
      tel={contact.tel}
    />
  );
}

function App() {
  return (
    <div id="main">
      <Welcome></Welcome>
      <Heading></Heading>
      {contactInfo.map(createContact)}

      <hr />
      <Footer></Footer>
    </div>
  );
}
export default App;
