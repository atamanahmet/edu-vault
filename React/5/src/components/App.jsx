import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
// import Note from "./Note";
// import CreateArea from "./CreateArea";

function App() {
  const [items, setItems] = useState([]);
  const [note, setNote] = useState("");
  const [title, setTitle] = useState("");

  function handleChange(event) {
    const { value, name } = event.target;

    if (name === "title") {
      setTitle(value);
    } else if (name === "note") {
      setNote(value);
    }
    console.log(title);
    console.log(note);
  }
  function addItem() {
    setItems((prevState) => {
      return [...prevState, { note: note, title: title }];
    });
    JSON.stringify(items);
  }

  return (
    <div>
      <Header />
      {/* <CreateArea onDone={addItem} handleChange={handleChange} /> */}
      <div>
        <form>
          <input name="title" placeholder="Title" onChange={handleChange} />
          <textarea
            name="note"
            placeholder="Take a note..."
            rows="3"
            onChange={handleChange}
          />
          <button onClick={addItem}>Add</button>
        </form>
      </div>
      {/* 
      {items.map((item) => {
        <Note title={item.title} />;
      })} */}
      <Footer />
    </div>
  );
}

export default App;
