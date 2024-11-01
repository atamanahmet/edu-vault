// // import React from "react";
// // import Header from "./Header.jsx";
// // import Footer from "./Footer.jsx";
// // import Note from "./Note.jsx";
// // import notes from "../notes.js";

// // function App() {
// //   return (
// //     <div className="App">
// //       <Header />
// //       <div className="cardContainer">
// //         {notes.map((note) => (
// //           <Note key={note.key} title={note.title} content={note.content} />
// //         ))}
// //       </div>
// //       <Footer />
// //     </div>
// //   );
// // }
// // export default App;

// import React, { useState } from "react";

// function App() {
//   const [heading, setHeading] = useState("");
//   const [isMouse, setIsMouse] = useState(false);
//   const [name, setName] = useState();

//   function submitFunc() {
//     setHeading(name);
//   }
//   function mouseOver() {
//     setIsMouse(true);
//   }
//   function mouseLeave() {
//     setIsMouse(false);
//   }
//   function handleChange(event) {
//     setName(event.target.value);
//     console.log(event.target);
//   }

//   return (
//     <div className="container">
//       <h1>Hello {heading}</h1>
//       <input
//         type="text"
//         placeholder="What's your name?"
//         onChange={handleChange}
//         value={name}
//       />
//       <button
//         onClick={submitFunc}
//         onMouseMove={mouseOver}
//         onMouseLeave={mouseLeave}
//         style={{ backgroundColor: isMouse ? "black" : "white" }}
//       >
//         Submit
//       </button>
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";

function App() {
  const [fName, setfName] = useState("");
  const [lName, setlName] = useState("");

  function handleChange(event) {
    event.target.name == "fName"
      ? setfName(event.target.value)
      : setlName(event.target.value);
  }

  return (
    <div className="container">
      <h1>
        Hello {fName} {lName}
      </h1>
      <form>
        <input
          name="fName"
          placeholder="First Name"
          onChange={handleChange}
          value={fName}
        />
        <input
          name="lName"
          placeholder="Last Name"
          onChange={handleChange}
          value={lName}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
