import React from "react";
import Heading from "./components/Heading.jsx";
import Welcome from "./components/Welcome.jsx";
import Contacts from "./components/contacts.jsx";
import Footer from "./components/footer.jsx";

function App() {
  return (
    <div>
      <Welcome></Welcome>
      <Heading></Heading>
      <Contacts
        name="Ahmet"
        imgSrc="https://placehold.co/200"
        mail="ataman@gmail.co"
        tel="+905886994747"
      />
      <hr />
      <Footer></Footer>
    </div>
  );
}
export default App;
