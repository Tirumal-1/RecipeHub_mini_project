import React from "react";
import "./SearchBar.css";

export default function SearchBar({ ingredient, setIngredient, onSearch, onRandom, loading }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter ingredient (e.g. chicken)"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSearch()}
        disabled={loading}
      />
      <button onClick={onSearch} disabled={loading || ingredient.trim() === ""}>
        Search Recipes
      </button>
      <button onClick={onRandom} disabled={loading} className="random-btn">
        Random Recipe
      </button>
    </div>
  );
}
