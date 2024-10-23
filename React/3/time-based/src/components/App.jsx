import React from "react";
import emojipedia from "../emojipedia.js";
import Entry from "./Entry.jsx";

function createEntry(emojiTerm) {
  return (
    <Entry
      key={emojiTerm.id}
      name={emojiTerm.name}
      emoji={emojiTerm.emoji}
      meaning={emojiTerm.meaning}
    />
  );
}
// console.log(emojipedia);
// const newArray = emojipedia.map((item) => {
//   return item.meaning.substring(0, 100);
// });
// console.log(newArray);

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">{emojipedia.map(createEntry)}</dl>
    </div>
  );
}

export default App;
