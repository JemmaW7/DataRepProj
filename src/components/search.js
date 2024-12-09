import React from "react";

const Search = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value); // Pass search term to the parent
  };

  return (
    <div style={{ margin: "20px" }}>
      <input
        type="text"
        placeholder="Search pets by name or breed..."
        onChange={handleInputChange}
        style={{
          padding: "10px",
          width: "100%",
          maxWidth: "400px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />
    </div>
  );
};

export default Search;
