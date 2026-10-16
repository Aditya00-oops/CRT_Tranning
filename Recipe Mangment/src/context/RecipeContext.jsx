import { createContext, useContext, useState, useEffect } from "react";

const RecipeContext = createContext();

const INITIAL_RECIPES = [
  {
    id: "1",
    title: "Paneer Butter Masala",
    category: "Dinner",
    prepTime: "30 mins",
    servings: "4",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80",
    description: "Rich, creamy tomato-cashew gravy simmered with soft paneer cubes and aromatic spices.",
    ingredients: [
      "250g Paneer, cubed",
      "3 medium tomatoes, pureed",
      "12 cashews, soaked and blended",
      "2 tbsp butter & 1 tbsp cream",
      "1 tsp garam masala & kasuri methi"
    ],
    instructions: [
      "Heat butter in a pan and sauté ginger-garlic paste until golden.",
      "Add tomato puree and cook until butter separates from the sides.",
      "Stir in cashew paste, red chilli powder, and salt.",
      "Add water, bring to a simmer, and fold in paneer cubes and crushed kasuri methi."
    ],
    isFavorite: true
  },
  {
    id: "2",
    title: "Classic Masala Oats Bowl",
    category: "Breakfast",
    prepTime: "15 mins",
    servings: "2",
    difficulty: "Easy",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800&auto=format&fit=crop&q=80",
    description: "Warm, wholesome oats cooked with crunchy vegetables and mild Indian spices.",
    ingredients: [
      "1 cup rolled oats",
      "1/2 cup chopped carrots, peas, and beans",
      "1/2 tsp turmeric & cumin seeds",
      "2 cups water",
      "Fresh coriander leaves"
    ],
    instructions: [
      "Temper cumin seeds in a little ghee and sauté chopped vegetables for 3 minutes.",
      "Add turmeric, salt, and water, then bring to a rolling boil.",
      "Stir in rolled oats and cook on medium flame for 4–5 minutes.",
      "Garnish with fresh coriander and serve hot."
    ],
    isFavorite: false
  },
  {
    id: "3",
    title: "Molten Chocolate Lava Cake",
    category: "Dessert",
    prepTime: "25 mins",
    servings: "2",
    difficulty: "Medium",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80",
    description: "Decadent single-serve chocolate cakes with a warm, gooey liquid chocolate centre.",
    ingredients: [
      "100g dark chocolate",
      "50g unsalted butter",
      "1/3 cup powdered sugar",
      "1/4 cup all-purpose flour",
      "1/2 tsp vanilla extract"
    ],
    instructions: [
      "Melt dark chocolate and butter together until smooth.",
      "Whisk in powdered sugar and vanilla extract.",
      "Gently fold in flour until just combined and pour into greased ramekins.",
      "Bake at 200°C for 10–12 minutes and serve warm."
    ],
    isFavorite: true
  }
];

export function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState(() => {
    const saved = localStorage.getItem("recipes_data");
    return saved ? JSON.parse(saved) : INITIAL_RECIPES;
  });

  useEffect(() => {
    localStorage.setItem("recipes_data", JSON.stringify(recipes));
  }, [recipes]);

  const addRecipe = (newRecipe) => {
    const recipeWithId = {
      ...newRecipe,
      id: Date.now().toString(),
      isFavorite: false
    };
    setRecipes((prev) => [recipeWithId, ...prev]);
  };

  const toggleFavorite = (id) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFavorite: !r.isFavorite } : r))
    );
  };

  const deleteRecipe = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <RecipeContext.Provider
      value={{ recipes, addRecipe, toggleFavorite, deleteRecipe }}
    >
      {children}
    </RecipeContext.Provider>
  );
}

export function useRecipes() {
  return useContext(RecipeContext);
}