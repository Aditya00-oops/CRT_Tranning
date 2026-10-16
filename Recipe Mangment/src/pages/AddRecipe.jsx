import RecipeForm from "../components/RecipeForm";

export default function AddRecipe() {
  return (
    <div className="form-page">
      <div className="page-intro">
        <div className="eyebrow">
          <span className="eyebrow-dot" />
          NEW ENTRY
        </div>
        <h1>
          Share a <span>Delicious</span> Creation
        </h1>
        <p>
          Record your ingredients, prep times, and step-by-step instructions so
          you can recreate it anytime.
        </p>
      </div>
      <RecipeForm />
    </div>
  );
}