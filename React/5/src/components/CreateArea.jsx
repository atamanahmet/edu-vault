import React from "react";

function CreateArea(props) {
  return (
    <div>
      <form>
        <input name="title" placeholder="Title" onChange={props.handleChange} />
        <textarea
          name="note"
          placeholder="Take a note..."
          rows="3"
          onChange={props.handleChange}
        />
        <button onClick={props.onDone}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
