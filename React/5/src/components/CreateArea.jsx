import React from "react";

function CreateArea(props) {
  return (
    <div>
      <form>
        <input
          name="title"
          placeholder="Title"
          onChange={props.handleChange}
          value={props.title}
        />
        <textarea
          name="note"
          placeholder="Take a note..."
          rows="3"
          onChange={props.handleChange}
          value={props.note}
        />
        <button onClick={props.addItem}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
