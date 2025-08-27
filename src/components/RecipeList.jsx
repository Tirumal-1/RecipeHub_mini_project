 import React from "react";
import RecipeCard from "./RecipeCard";
import "./RecipeList.css";

export default function RecipeList({ recipes, onSelect }) {
  if (!recipes || recipes.length === 0) return null;

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} onSelect={onSelect} />
      ))}
    </div>
  );
}
