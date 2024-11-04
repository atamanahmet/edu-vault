import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [items, setItems] = useState([]);

  function addItem(note) {
    setItems((prevState) => {
      return [...prevState, { title: note.title, note: note.note }];
    });
  }

  function deleteItem(id) {
    setItems(
      items.filter((item, index) => {
        return index !== id;
      })
    );
  }

  return (
    <div>
      <Header />
      <CreateArea addItem={addItem} />

      {items.map((item, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={item.title ? item.title : "No title"}
            note={item.note}
            deleteItem={deleteItem}
          ></Note>
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
