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
  const [fullName, setFullName] = useState({
    firstName: "",
    lastName: "",
  });
  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    // if (name == "firstName") {
    //   setFullName((prevState) => {
    //     return {
    //       firstName: value,
    //       lastName: prevState.lastName,
    //     };
    //   });
    // } else if (name == "lastName") {
    //   setFullName((prevState) => {
    //     return {
    //       firstName: prevState.firstName,
    //       lastName: value,
    //     };
    //   });
    // }

    name === "firstName"
      ? setFullName((prevState) => {
          return {
            firstName: value,
            lastName: prevState.lastName,
          };
        })
      : setFullName((prevState) => {
          return {
            firstName: prevState.firstName,
            lastName: value,
          };
        });
  }
  return (
    <div className="container">
      <h1>
        Hello {fullName.firstName} {fullName.lastName}
      </h1>
      <form>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          value={fullName.firstName}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={fullName.LastName}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
export default App;
