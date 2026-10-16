import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

export default function Favorites() {
  const { recipes } = useRecipes();
  const favoriteRecipes = recipes.filter((r) => r.isFavorite);

  return (
    <div className="favorites-page">
      <div className="page-intro">
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          SAVED COLLECTION
        </div>
        <h1>
          Your <span>Favorite</span> Dishes
        </h1>
        <p>Quick access to the meals and treats you love cooking the most.</p>
      </div>

      {favoriteRecipes.length > 0 ? (
        <div className="recipe-grid">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span>❤️</span>
          <h3>No favorites saved yet</h3>
          <p>
            Tap the heart icon on any recipe card to save your most-loved dishes
            here for quick access.
          </p>
          <Link to="/" className="button button-primary">
            Browse Recipes
          </Link>
        </div>
      )}
    </div>
  );
}