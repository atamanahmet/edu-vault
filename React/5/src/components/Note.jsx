import React from "react";

function Note(props) {
  if (props.title) {
    return (
      <div className="note" id={props.id}>
        <h1>{props.title}</h1>
        <p>{props.note}</p>
        <button onClick={props.deleteItem} id={props.id}>
          DELETE
        </button>
      </div>
    );
  } else {
    console.log("noprops");
  }
}

export default Note;
