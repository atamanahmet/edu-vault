// import React from "react";
import logo from "./img/f_logo.svg";
import search from "./img/search.svg";

function Search() {
  return (
    <div className="flex flex-row flex-nowrap items-center">
      <img src={logo} alt="fafelogo" className="h-14 p-2" />

      <label htmlFor="search">
        <img src={search} alt="" className="h-4 absolute z-1 top-5 left-20" />
      </label>
      <input
        type="text"
        name="search"
        className=" bg-secondary rounded-full m-2 h-10 pl-10 pb-1"
        placeholder="Search Facebook"
      />
    </div>
  );
}
export default Search;
