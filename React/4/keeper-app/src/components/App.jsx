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
// import React, { useState } from "react";
// import List from "./List";

// function App() {
//   const [inputText, setInputText] = useState("");
//   const [items, setItems] = useState([]);

//   function handleChange(event) {
//     const newValue = event.target.value;
//     setInputText(newValue);
//   }

//   function addItem() {
//     setItems((prevItems) => {
//       return [...prevItems, inputText];
//     });
//     setInputText("");
//   }

//   return (
//     <div className="container">
//       <div className="heading">
//         <h1>To-Do List</h1>
//       </div>
//       <div className="form">
//         <input onChange={handleChange} type="text" value={inputText} />
//         <button onClick={addItem}>
//           <span>Add</span>
//         </button>
//       </div>
//       <div>
//         <ul>
//           {items.map((item) => {
//             return <List text={item} />;
//           })}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default App;

// import React from "react";

// function List(props) {
//   function clickHandle(event) {
//     const lineState = event.target.style.textDecoration;
//     if (lineState === "line-through") {
//       event.target.style.textDecoration = "";
//     } else {
//       event.target.style.textDecoration = "line-through";
//     }
//   }
//   return props.items.map((item) => {
//     return <li onClick={clickHandle}>{item}</li>;
//   });
// }
// export default List;

import React, { useState } from "react";
import List from "./List";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    setItems((prevItems) => {
      return [...prevItems, inputText];
    });
    setInputText("");
  }
  function deleteItem(event) {
    const itemId = Number(event.target.id);

    setItems((prevState) => {
      return prevState.filter((item, index) => {
        return index !== itemId;
      });
    });
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} type="text" value={inputText} />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((item, index) => {
            return (
              <List key={index} id={index} text={item} onDone={deleteItem} />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
