import React from "react";
import "./RecipeCard.css";

export default function RecipeCard({ recipe, onSelect }) {
  return (
    <div className="recipe-card">
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
      <h3 className="recipe-title">{recipe.strMeal}</h3>
      <button onClick={() => onSelect(recipe.idMeal)}>View Details</button>
    </div>
  );
}
