// import React from "react";
// import Header from "./Header.jsx";
// import Footer from "./Footer.jsx";
// import Note from "./Note.jsx";
// import notes from "../notes.js";

// function App() {
//   return (
//     <div className="App">
//       <Header />
//       <div className="cardContainer">
//         {notes.map((note) => (
//           <Note key={note.key} title={note.title} content={note.content} />
//         ))}
//       </div>
//       <Footer />
//     </div>
//   );
// }
// export default App;

import React, { useState } from "react";

function App() {
  const [heading, setHeading] = useState("Hello");
  const [isMouse, setIsMouse] = useState(false);

  function submitFunc() {
    setHeading("Submitted");
  }
  function mouseOver() {
    setIsMouse(true);
  }
  function mouseLeave() {
    setIsMouse(false);
  }

  return (
    <div className="container">
      <h1>{heading}</h1>
      <input type="text" placeholder="What's your name?" />
      <button
        onClick={submitFunc}
        onMouseMove={mouseOver}
        onMouseLeave={mouseLeave}
        style={{ backgroundColor: isMouse ? "black" : "white" }}
      >
        Submit
      </button>
    </div>
  );
}

export default App;
