import React, { useState } from "react";

function CreateArea(props) {
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
  function add(event) {
    event.preventDefault();
    props.addItem(note, title);
    setNote("");
    setTitle("");
  }

  return (
    <div>
      <form>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={title}
        />
        <textarea
          name="note"
          placeholder="Take a note..."
          rows="3"
          onChange={handleChange}
          value={note}
        />
        <button onClick={add}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
