import React, { useState, useEffect } from "react";
import "./RecipeDetails.css";

export default function RecipeDetails({ mealId, onClose }) {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
        const data = await res.json();
        if (data.meals) setDetails(data.meals[0]);
      } catch (e) {
        console.error("Failed to fetch meal details", e);
      } finally {
        setLoading(false);
      }
    }
    fetchDetails();
  }, [mealId]);

  function getIngredients(detail) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = detail[`strIngredient${i}`];
      const measure = detail[`strMeasure${i}`];
      if (ingredient && ingredient.trim() !== "") {
        ingredients.push(`${measure} ${ingredient}`.trim());
      }
    }
    return ingredients;
  }

  if (loading) return <div className="modal-overlay"><div className="modal">Loading details...</div></div>;

  if (!details) return null;

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" aria-label="Close details" onClick={onClose}>×</button>
        <h2>{details.strMeal}</h2>
        <img src={details.strMealThumb} alt={details.strMeal} />
        <h3>Ingredients</h3>
        <ul>
          {getIngredients(details).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
        <h3>Instructions</h3>
        <p>{details.strInstructions}</p>
        {details.strYoutube && (
          <p>
            <a href={details.strYoutube} target="_blank" rel="noopener noreferrer">
              Watch on YouTube
            </a>
          </p>
        )}
      </div>
    </div>
  );
}
