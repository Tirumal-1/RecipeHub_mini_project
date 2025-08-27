 import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

import "./App.css";

function App() {
  const [ingredient, setIngredient] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedRecipeId, setSelectedRecipeId] = useState(null);

  const API_BASE = "https://www.themealdb.com/api/json/v1/1";

  async function fetchRecipesByIngredient(ing) {
    setLoading(true);
    setError("");
    setRecipes([]);
    try {
      const res = await fetch(`${API_BASE}/filter.php?i=${ing}`);
      const data = await res.json();
      if (!data.meals) {
        setError("No recipes found.");
        setRecipes([]);
      } else {
        setRecipes(data.meals);
      }
    } catch (e) {
      setError("Failed to fetch recipes.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchRandomRecipe() {
    setLoading(true);
    setError("");
    setRecipes([]);
    setSelectedRecipeId(null);
    try {
      const res = await fetch(`${API_BASE}/random.php`);
      const data = await res.json();
      if (!data.meals) {
        setError("No recipe found.");
      } else {
        setRecipes(data.meals);
      }
    } catch (e) {
      setError("Failed to fetch recipe.");
    } finally {
      setLoading(false);
    }
  }

  // Fullscreen root container centers the app
  return (
    <div className="app-root">
      <div className="app-container">
        <h1 className="app-title">Welcome to Recipe Ideas</h1>
        <p className="app-subtitle">cook together</p>
        <SearchBar
          ingredient={ingredient}
          setIngredient={setIngredient}
          onSearch={() => fetchRecipesByIngredient(ingredient)}
          onRandom={fetchRandomRecipe}
          loading={loading}
        />
        {loading && <p className="loading">Fetching recipes...</p>}
        {error && !loading && <p className="error">{error}</p>}
        <RecipeList
          recipes={recipes}
          onSelect={(id) => setSelectedRecipeId(id)}
        />
        {selectedRecipeId && (
          <RecipeDetails
            mealId={selectedRecipeId}
            onClose={() => setSelectedRecipeId(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
