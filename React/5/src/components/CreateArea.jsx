import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  // const [note, setNote] = useState("");
  // const [title, setTitle] = useState("");
  const [check, setCheck] = useState(false);
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
      <form className="create-note">
        {check && (
          <input
            name="title"
            placeholder="Title"
            onChange={handleChange}
            value={note.title}
          />
        )}
        <textarea
          name="note"
          placeholder="Take a note..."
          rows={check ? "3" : "1"}
          onChange={handleChange}
          onClick={() => {
            setCheck(true);
          }}
          value={note.note}
        />
        <Zoom in={check}>
          <Fab
            size="small"
            color="secondary"
            aria-label="add"
            onClick={submitNote}
          >
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
