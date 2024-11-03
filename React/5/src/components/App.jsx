import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

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
  }

  function addItem(event) {
    event.preventDefault();
    setItems((prevState) => {
      return [...prevState, { title: title, note: note }];
    });
    setTitle("");
    setNote("");
  }
  function deleteItem(event) {
    const id = Number(event.target.id);
    setItems(
      items.filter((item, index) => {
        return index !== id;
      })
    );
    console.log(items);
  }

  return (
    <div>
      <Header />
      <CreateArea
        handleChange={handleChange}
        addItem={addItem}
        note={note}
        title={title}
      />
      {items.map((item, index) => {
        return (
          <Note
            deleteItem={deleteItem}
            title={item.title}
            note={item.note}
            key={index}
            id={index}
          ></Note>
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
