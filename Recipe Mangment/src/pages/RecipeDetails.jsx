import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";

export default function RecipeDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, toggleFavorite, deleteRecipe } = useRecipes();

  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div className="empty-state details-empty">
        <span>🔍</span>
        <h2>Recipe Not Found</h2>
        <p>The recipe you are looking for might have been removed.</p>
        <Link to="/" className="button button-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    deleteRecipe(recipe.id);
    navigate("/");
  };

  return (
    <div className="details-page">
      <Link to="/" className="back-link">
        ← Back to all recipes
      </Link>

      <div className="details-hero">
        <img src={recipe.image} alt={recipe.title} />
        <div className="details-hero-overlay" />
        <div className="details-title">
          <span className="category-pill">{recipe.category}</span>
          <h1>{recipe.title}</h1>
          <p>{recipe.description}</p>
        </div>
      </div>

      <div className="details-actions">
        <div className="quick-facts">
          <span>
            ⏱ <b>{recipe.prepTime || "20 mins"}</b>
            <small>Prep Time</small>
          </span>
          <span>
            🍽 <b>{recipe.servings || "2"} Servings</b>
            <small>Yield</small>
          </span>
          <span>
            ✨ <b>{recipe.difficulty || "Easy"}</b>
            <small>Difficulty</small>
          </span>
        </div>

        <div className="action-buttons">
          <button
            type="button"
            className="button button-light"
            onClick={() => toggleFavorite(recipe.id)}
          >
            {recipe.isFavorite ? "♥ Saved in Favorites" : "♡ Add to Favorites"}
          </button>
          <button
            type="button"
            className="button button-danger"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="details-content">
        <div>
          <h2>Ingredients</h2>
          <span className="muted">Everything you need for this dish</span>
          <ul className="ingredient-list">
            {recipe.ingredients.map((item, idx) => (
              <li key={idx}>
                <span className="ingredient-check">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2>Instructions</h2>
          <span className="muted">Step-by-step preparation guide</span>
          <ol className="instruction-list">
            {recipe.instructions.map((step, idx) => (
              <li key={idx}>
                <span className="step-number">{idx + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}