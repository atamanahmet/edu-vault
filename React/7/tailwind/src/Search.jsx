// import React from "react";
import logo from "./img/f_logo.svg";
import SearchButton from "./SearchButton";

function Search() {
  return (
    <div className="flex">
      <img src={logo} alt="f-logo" className="h-14 p-2" />
      <div className="inline-block">
        <SearchButton />
        <input
          dir="ltr"
          type="text"
          name="search"
          id="search-box"
          className="bg-secondary absolute text-[#a8abaf] outline-none  rounded-full m-2 ml-1 h-10 pl-8 pb-1 pt-0.5"
          placeholder={"Search Facebook"}
        />
      </div>
    </div>
  );
}
export default Search;
