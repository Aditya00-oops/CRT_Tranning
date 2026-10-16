import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

const CATEGORIES = ["All", "Breakfast", "Lunch", "Dinner", "Dessert", "Snack"];

export default function Home() {
  const { recipes } = useRecipes();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === "All" || recipe.category === selectedCategory;
    const matchesSearch =
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const favoritesCount = recipes.filter((r) => r.isFavorite).length;

  return (
    <div>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            PERSONAL KITCHEN JOURNAL
          </div>
          <h1>
            Keep every <span>favourite</span> recipe in one warm place.
          </h1>
          <p>
            Organise your homemade classics, quick weekday meals, and cherished
            family dishes with step-by-step notes.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link to="/add" className="button button-primary">
              + Add New Recipe
            </Link>
            <Link to="/favorites" className="button button-light">
              View Favorites
            </Link>
          </div>
          <div className="hero-stats">
            <div>
              <strong>{recipes.length}</strong>
              <span>Total Recipes</span>
            </div>
            <div className="stat-divider" />
            <div>
              <strong>{favoritesCount}</strong>
              <span>Saved Favorites</span>
            </div>
          </div>
        </div>

        <div className="hero-art">
          <span className="hero-spark spark-one">✦</span>
          <span className="hero-spark spark-two">★</span>
          <div className="hero-image-main">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=80"
              alt="Delicious healthy bowl"
            />
          </div>
          <div className="floating-note">
            <div className="note-icon">🔥</div>
            <div>
              <strong>Chef&apos;s Pick</strong>
              <small>Fresh &amp; homemade daily</small>
            </div>
          </div>
        </div>
      </section>

      <section className="recipes-section">
        <div className="section-heading">
          <h2>
            Explore <span>Recipes</span>
          </h2>
          <span className="recipe-count">
            Showing {filteredRecipes.length} of {recipes.length} dishes
          </span>
        </div>

        <div className="recipe-controls">
          <div className="search-box">
            <span>⌕</span>
            <input
              type="text"
              placeholder="Search recipes by name or ingredient..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button type="button" onClick={() => setSearch("")}>
                ×
              </button>
            )}
          </div>

          <div className="category-filters">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`filter-chip ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredRecipes.length > 0 ? (
          <div className="recipe-grid">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span>🍽️</span>
            <h3>No matching recipes found</h3>
            <p>
              Try clearing your search filter or add a brand new dish to your
              recipe book.
            </p>
            <Link to="/add" className="button button-primary">
              + Create Recipe
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}