import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import Note from "./Note.jsx";
import notes from "../notes.js";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="cardContainer">
        {notes.map((note) => (
          <Note key={note.key} title={note.title} content={note.content} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
export default App;
