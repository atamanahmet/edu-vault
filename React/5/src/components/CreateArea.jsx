import React, { useState } from "react";

function CreateArea(props) {
  // const [note, setNote] = useState("");
  // const [title, setTitle] = useState("");

  const [note, setNote] = useState({
    title: "",
    note: "",
  });

  function handleChange(event) {
    const { value, name } = event.target;

    setNote((prev) => {
      return { ...prev, [name]: value };
    });

    //   if (name === "title") {
    //     setTitle(value);
    //   } else if (name === "note") {
    //     setNote(value);
    //   }
  }

  function submitNote(event) {
    event.preventDefault();
    props.addItem(note);
    setNote({ note: "", title: "" });
  }

  return (
    <div>
      <form>
        <input
          name="title"
          placeholder="Title"
          onChange={handleChange}
          value={note.title}
        />
        <textarea
          name="note"
          placeholder="Take a note..."
          rows="3"
          onChange={handleChange}
          value={note.note}
        />
        <button onClick={submitNote}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
