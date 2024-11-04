import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [items, setItems] = useState([]);

  function addItem(note, title) {
    setItems((prevState) => {
      return [...prevState, { title: title, note: note }];
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
