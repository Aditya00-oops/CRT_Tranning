import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";

export default function RecipeCard({ recipe }) {
  const { toggleFavorite } = useRecipes();

  return (
    <article className="recipe-card">
      <div className="card-image-wrap">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="card-image"
        />
        <span className="category-pill">{recipe.category}</span>
        <button
          type="button"
          className={`favorite-button ${recipe.isFavorite ? "is-favorite" : ""}`}
          onClick={() => toggleFavorite(recipe.id)}
          aria-label="Toggle Favorite"
        >
          {recipe.isFavorite ? "♥" : "♡"}
        </button>
      </div>
      <div className="card-content">
        <div className="recipe-meta">
          <span>⏱ {recipe.prepTime}</span>
          <span>•</span>
          <span>🍽 {recipe.servings} Servings</span>
        </div>
        <h3>{recipe.title}</h3>
        <p>{recipe.description}</p>
        <div className="card-footer">
          <span className="recipe-meta">{recipe.difficulty || "Easy"}</span>
          <Link to={`/recipe/${recipe.id}`} className="text-link">
            View Recipe <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}