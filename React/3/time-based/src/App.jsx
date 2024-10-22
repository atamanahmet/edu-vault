import React from "react";
import Heading from "./components/Heading.jsx";
import Welcome from "./components/Welcome.jsx";
import Contacts from "./components/contacts.jsx";
import Footer from "./components/footer.jsx";
import contactInfo from "./components/contactInfo.js";

console.log(contactInfo[0]);
function App() {
  return (
    <div id="main">
      <Welcome></Welcome>
      <Heading></Heading>
      <Contacts
        name={contactInfo[0].name}
        imgSrc={contactInfo[0].imgSrc}
        mail={contactInfo[0].mail}
        tel={contactInfo[0].tel}
      />
      <Contacts
        name={contactInfo[1].name}
        imgSrc={contactInfo[1].imgSrc}
        mail={contactInfo[1].mail}
        tel={contactInfo[1].tel}
      />
      <Contacts
        name={contactInfo[2].name}
        imgSrc={contactInfo[2].imgSrc}
        mail={contactInfo[2].mail}
        tel={contactInfo[2].tel}
      />

      <hr />
      <Footer></Footer>
    </div>
  );
}
export default App;
