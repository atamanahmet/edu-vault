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

// import React, { useState } from "react";

// function App() {
//   const [fullName, setFullName] = useState({
//     firstName: "",
//     lastName: "",
//   });
//   function handleChange(event) {
//     const name = event.target.name;
//     const value = event.target.value;

//     // if (name == "firstName") {
//     //   setFullName((prevState) => {
//     //     return {
//     //       firstName: value,
//     //       lastName: prevState.lastName,
//     //     };
//     //   });
//     // } else if (name == "lastName") {
//     //   setFullName((prevState) => {
//     //     return {
//     //       firstName: prevState.firstName,
//     //       lastName: value,
//     //     };
//     //   });
//     // }

//     name === "firstName"
//       ? setFullName((prevState) => {
//           return {
//             firstName: value,
//             lastName: prevState.lastName,
//           };
//         })
//       : setFullName((prevState) => {
//           return {
//             firstName: prevState.firstName,
//             lastName: value,
//           };
//         });
//   }
//   return (
//     <div className="container">
//       <h1>
//         Hello {fullName.firstName} {fullName.lastName}
//       </h1>
//       <form>
//         <input
//           type="text"
//           name="firstName"
//           placeholder="First Name"
//           onChange={handleChange}
//           value={fullName.firstName}
//         />
//         <input
//           type="text"
//           name="lastName"
//           placeholder="Last Name"
//           onChange={handleChange}
//           value={fullName.LastName}
//         />
//         <button>Submit</button>
//       </form>
//     </div>
//   );
// }
// export default App;

// import React, { useState } from "react";

// function App() {
//   const [contact, setContact] = useState({
//     fName: "",
//     lName: "",
//     email: "",
//   });

//   function handleChange(event) {
//     // const name = event.target.name;
//     // const value = event.target.value;

//     const { name, value } = event.target;

//     setContact((prevState) => {
//       return {
//         ...prevState,
//         [name]: value,
//       };
//     });

//     // if (name === "fName") {
//     //   setContact((prevState) => {
//     //     return {
//     //       fName: value,
//     //       lName: prevState.lName,
//     //       email: prevState.email,
//     //     };
//     //   });
//     // }
//     // if (name === "lName") {
//     //   setContact((prevState) => {
//     //     return {
//     //       fName: prevState.fName,
//     //       lName: value,
//     //       email: prevState.email,
//     //     };
//     //   });
//     // }
//     // if (name === "email") {
//     //   setContact((prevState) => {
//     //     return {
//     //       fName: prevState.fName,
//     //       lName: prevState.lName,
//     //       email: value,
//     //     };
//     //   });
//     // }
//   }
//   return (
//     <div className="container">
//       <h1>
//         Hello {contact.fName} {contact.lName}
//       </h1>
//       <p>{contact.email}</p>
//       <form>
//         <input name="fName" placeholder="First Name" onChange={handleChange} />
//         <input name="lName" placeholder="Last Name" onChange={handleChange} />
//         <input name="email" placeholder="Email" onChange={handleChange} />
//         <button>Submit</button>
//       </form>
//     </div>
//   );
// }

// export default App;import React, { useState } from "react";
import React, { useState } from "react";
import List from "./List";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  function handleInput(event) {
    const { name, type } = event.target;

    if (name === "input") {
      const value = event.target.value;
      setInputText(value);
    } else if (type === "submit") {
      setItems((prevState) => {
        return [...prevState, inputText];
      });
      setInputText("");
    }
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
          type="text"
          name="input"
          placeholder="Enter an item"
          onChange={handleInput}
          value={inputText}
        />

        <button name="btn" onClick={handleInput}>
          Add
        </button>
      </div>
      <div>
        <ul>
          <List items={items} />
        </ul>
      </div>
    </div>
  );
}

export default App;
