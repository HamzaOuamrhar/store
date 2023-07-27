import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBox() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : `/search`);
  };
  return (
    <form onSubmit={submitHandler} className="searchbox">
      <input
        type="text"
        placeholder="search products..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit">
        <i class="fa-solid fa-magnifying-glass"></i>{" "}
        {/* <span style={{ fontSize: ".9rem", color: "rgb(233, 233, 233)" }}>
          Click to search...
        </span> */}
      </button>
    </form>
  );
}

export default SearchBox;
