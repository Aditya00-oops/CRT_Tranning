import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../context/RecipeContext";

export default function RecipeForm() {
  const { addRecipe } = useRecipes();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    category: "Breakfast",
    prepTime: "",
    servings: "",
    difficulty: "Easy",
    image: "",
    description: "",
    ingredients: "",
    instructions: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.ingredients.trim() || !formData.instructions.trim()) {
      setError("Please fill in the recipe title, ingredients, and instructions.");
      return;
    }

    addRecipe({
      ...formData,
      image:
        formData.image.trim() ||
        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=800&auto=format&fit=crop&q=80",
      ingredients: formData.ingredients.split("\n").map((i) => i.trim()).filter(Boolean),
      instructions: formData.instructions.split("\n").map((i) => i.trim()).filter(Boolean)
    });

    navigate("/");
  };

  return (
    <form className="form-panel" onSubmit={handleSubmit}>
      <div className="form-panel-heading">
        <div className="panel-icon">📖</div>
        <div>
          <h2>Recipe Details</h2>
          <p>Fill out the details below to add a new dish to your collection.</p>
        </div>
      </div>

      {error && <div className="form-error">{error}</div>}

      <div className="form-grid">
        <label className="field full-width">
          Recipe Title *
          <input
            type="text"
            name="title"
            placeholder="e.g., Homestyle Masala Dosa"
            value={formData.title}
            onChange={handleChange}
          />
        </label>

        <label className="field">
          Category
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
            <option value="Snack">Snack</option>
          </select>
        </label>

        <label className="field">
          Prep Time
          <input
            type="text"
            name="prepTime"
            placeholder="e.g., 25 mins"
            value={formData.prepTime}
            onChange={handleChange}
          />
        </label>

        <label className="field">
          Servings
          <input
            type="number"
            name="servings"
            placeholder="e.g., 4"
            value={formData.servings}
            onChange={handleChange}
          />
        </label>

        <label className="field">
          Image URL
          <input
            type="url"
            name="image"
            placeholder="https://images.unsplash.com/..."
            value={formData.image}
            onChange={handleChange}
          />
        </label>

        <label className="field full-width">
          Short Description
          <textarea
            name="description"
            rows="2"
            placeholder="A brief note on why this recipe is special..."
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label className="field full-width">
          Ingredients *
          <textarea
            name="ingredients"
            rows="4"
            placeholder="Enter one ingredient per line"
            value={formData.ingredients}
            onChange={handleChange}
          />
          <span className="field-hint">Tip: Write each ingredient on a new line.</span>
        </label>

        <label className="field full-width">
          Cooking Instructions *
          <textarea
            name="instructions"
            rows="5"
            placeholder="Enter one step per line"
            value={formData.instructions}
            onChange={handleChange}
          />
          <span className="field-hint">Tip: Write each step on a new line.</span>
        </label>
      </div>

      <div className="form-actions">
        <button type="button" className="button button-light" onClick={() => navigate("/")}>
          Cancel
        </button>
        <button type="submit" className="button button-primary">
          Save Recipe
        </button>
      </div>
    </form>
  );
}