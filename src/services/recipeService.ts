
import { RecipeFormData } from '@/components/RecipeForm';
import { Recipe } from '@/components/RecipeDisplay';

// Mock AI recipe generation service
// In a real app, this would call Gemini API or similar
export const generateRecipe = async (formData: RecipeFormData): Promise<Recipe> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock recipe generation based on ingredients
  const primaryIngredient = formData.ingredients[0] || 'chicken';
  const cuisine = formData.cuisinePreference || 'Mediterranean';
  
  const mockRecipes: Record<string, Partial<Recipe>> = {
    chicken: {
      title: `${cuisine} Herb-Crusted Chicken`,
      description: 'A flavorful and aromatic chicken dish with a perfect blend of herbs and spices, tender and juicy on the inside with a golden crispy exterior.',
      difficulty: 'Easy',
      tags: ['Protein-rich', 'Family-friendly', 'One-pan meal']
    },
    tomatoes: {
      title: `${cuisine} Fresh Tomato Pasta`,
      description: 'A vibrant pasta dish celebrating the natural sweetness of fresh tomatoes, enhanced with aromatic herbs and a touch of garlic.',
      difficulty: 'Beginner',
      tags: ['Vegetarian', 'Quick meal', 'Fresh ingredients']
    },
    salmon: {
      title: `${cuisine} Glazed Salmon`,
      description: 'Perfectly cooked salmon with a delicious glaze that caramelizes beautifully, creating a restaurant-quality dish at home.',
      difficulty: 'Intermediate',
      tags: ['Omega-3 rich', 'Heart-healthy', 'Elegant']
    }
  };

  const baseRecipe = mockRecipes[primaryIngredient.toLowerCase()] || mockRecipes.chicken;

  // Generate mock ingredients based on form data
  const ingredients = formData.ingredients.map((ing, index) => ({
    name: ing,
    amount: index === 0 ? '1 lb' : index === 1 ? '2 cups' : '1/4 cup',
    unit: ''
  }));

  // Add common cooking ingredients
  ingredients.push(
    { name: 'olive oil', amount: '2', unit: 'tbsp' },
    { name: 'salt', amount: '1', unit: 'tsp' },
    { name: 'black pepper', amount: '1/2', unit: 'tsp' },
    { name: 'garlic', amount: '3', unit: 'cloves' }
  );

  const instructions = [
    {
      step: 1,
      instruction: 'Preheat your oven to 375°F (190°C). Prepare your ingredients by washing and chopping as needed.',
      tip: 'Having all ingredients ready before cooking makes the process much smoother!'
    },
    {
      step: 2,
      instruction: `Season the ${primaryIngredient} with salt, pepper, and your favorite herbs. Let it rest for 10 minutes to absorb the flavors.`
    },
    {
      step: 3,
      instruction: 'Heat olive oil in a large oven-safe skillet over medium-high heat. Add garlic and cook until fragrant, about 1 minute.',
      tip: 'Don\'t let the garlic burn - it will become bitter.'
    },
    {
      step: 4,
      instruction: `Add the seasoned ${primaryIngredient} to the skillet and cook until golden brown on one side, about 4-5 minutes.`
    },
    {
      step: 5,
      instruction: 'Flip and add remaining ingredients. Transfer the skillet to the preheated oven.',
      tip: 'Use oven mitts when handling the hot skillet!'
    },
    {
      step: 6,
      instruction: `Cook for ${Math.max(15, parseInt(formData.cookingTime) - 10)} minutes or until fully cooked through. Let rest for 5 minutes before serving.`
    }
  ];

  return {
    title: baseRecipe.title || `Delicious ${cuisine} ${primaryIngredient}`,
    description: baseRecipe.description || `A wonderful ${cuisine} dish featuring ${primaryIngredient} and fresh ingredients.`,
    cookingTime: formData.cookingTime,
    servings: formData.servings,
    difficulty: baseRecipe.difficulty || 'Easy',
    cuisine: cuisine,
    ingredients,
    instructions,
    tags: [
      ...(baseRecipe.tags || []),
      ...formData.dietaryRestrictions,
      cuisine
    ],
    nutritionalInfo: {
      calories: 320,
      protein: '28g',
      carbs: '12g',
      fat: '18g'
    }
  };
};
