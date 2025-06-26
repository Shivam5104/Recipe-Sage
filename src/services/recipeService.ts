
import { RecipeFormData } from '@/components/RecipeForm';
import { Recipe } from '@/components/RecipeDisplay';

// Mock AI recipe generation service
// In a real app, this would call Gemini API or similar
export const generateRecipe = async (formData: RecipeFormData): Promise<Recipe> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const dishName = formData.dishName.toLowerCase();
  const cuisine = formData.cuisinePreference || 'Traditional';
  
  // Generate detailed recipe based on dish name
  const recipeData = generateRecipeByDishName(dishName, formData);
  
  return {
    title: recipeData.title,
    description: recipeData.description,
    cookingTime: formData.cookingTime,
    servings: formData.servings,
    difficulty: recipeData.difficulty,
    cuisine: cuisine,
    ingredients: recipeData.ingredients,
    instructions: recipeData.instructions,
    tags: [
      ...recipeData.tags,
      ...formData.dietaryRestrictions,
      cuisine
    ],
    nutritionalInfo: recipeData.nutritionalInfo
  };
};

const generateRecipeByDishName = (dishName: string, formData: RecipeFormData) => {
  // Comprehensive recipe database
  const recipeDatabase: Record<string, any> = {
    'chicken tikka masala': {
      title: 'Authentic Chicken Tikka Masala',
      description: 'Tender marinated chicken pieces in a rich, creamy tomato-based sauce with aromatic spices. A beloved Indian dish with a perfect balance of flavors.',
      difficulty: 'Intermediate',
      tags: ['Indian', 'Curry', 'Protein-rich', 'Comfort food'],
      ingredients: [
        { name: 'chicken breast', amount: '2', unit: 'lbs' },
        { name: 'plain yogurt', amount: '1', unit: 'cup' },
        { name: 'garam masala', amount: '2', unit: 'tsp' },
        { name: 'cumin powder', amount: '1', unit: 'tsp' },
        { name: 'paprika', amount: '1', unit: 'tsp' },
        { name: 'garlic', amount: '4', unit: 'cloves' },
        { name: 'ginger', amount: '1', unit: 'inch piece' },
        { name: 'onion', amount: '1', unit: 'large' },
        { name: 'tomato puree', amount: '1', unit: 'can (14 oz)' },
        { name: 'heavy cream', amount: '1/2', unit: 'cup' },
        { name: 'butter', amount: '3', unit: 'tbsp' },
        { name: 'salt', amount: '1', unit: 'tsp' },
        { name: 'cilantro', amount: '1/4', unit: 'cup' }
      ],
      instructions: [
        {
          step: 1,
          instruction: 'Cut chicken breast into bite-sized pieces. In a bowl, mix yogurt, half the garam masala, cumin, paprika, minced garlic, and ginger. Marinate chicken for at least 30 minutes.',
          tip: 'For best results, marinate for 2-4 hours or overnight in the refrigerator.'
        },
        {
          step: 2,
          instruction: 'Heat a large skillet over medium-high heat. Cook marinated chicken pieces until golden brown and cooked through, about 6-8 minutes. Remove and set aside.',
          tip: 'Don\'t overcrowd the pan - cook in batches if necessary.'
        },
        {
          step: 3,
          instruction: 'In the same pan, add butter and diced onion. Cook until onion is soft and translucent, about 5 minutes.',
        },
        {
          step: 4,
          instruction: 'Add remaining garlic and ginger, cook for 1 minute until fragrant. Add remaining garam masala and cook for another 30 seconds.',
        },
        {
          step: 5,
          instruction: 'Pour in tomato puree and bring to a simmer. Cook for 10 minutes, stirring occasionally, until sauce thickens.',
        },
        {
          step: 6,
          instruction: 'Return chicken to the pan, add heavy cream and salt. Simmer for 5 minutes until heated through. Garnish with fresh cilantro.',
          tip: 'Adjust seasoning with salt and add a pinch of sugar if the sauce is too acidic.'
        }
      ],
      nutritionalInfo: {
        calories: 420,
        protein: '35g',
        carbs: '12g',
        fat: '28g'
      }
    },
    'pasta carbonara': {
      title: 'Classic Pasta Carbonara',
      description: 'Silky, creamy pasta with crispy pancetta, eggs, and Parmesan cheese. An authentic Italian dish that\'s simple yet sophisticated.',
      difficulty: 'Easy',
      tags: ['Italian', 'Pasta', 'Quick meal', 'Comfort food'],
      ingredients: [
        { name: 'spaghetti', amount: '1', unit: 'lb' },
        { name: 'pancetta', amount: '6', unit: 'oz' },
        { name: 'large eggs', amount: '4', unit: 'whole' },
        { name: 'Parmesan cheese', amount: '1', unit: 'cup grated' },
        { name: 'black pepper', amount: '1', unit: 'tsp freshly ground' },
        { name: 'salt', amount: '1', unit: 'tsp' },
        { name: 'olive oil', amount: '2', unit: 'tbsp' }
      ],
      instructions: [
        {
          step: 1,
          instruction: 'Bring a large pot of salted water to boil. Cook spaghetti according to package directions until al dente. Reserve 1 cup pasta water before draining.',
          tip: 'Save the pasta water - its starch content will help create the creamy sauce.'
        },
        {
          step: 2,
          instruction: 'While pasta cooks, dice pancetta into small cubes. Cook in a large skillet over medium heat until crispy, about 4-5 minutes.',
        },
        {
          step: 3,
          instruction: 'In a bowl, whisk together eggs, grated Parmesan, and black pepper until well combined.',
        },
        {
          step: 4,
          instruction: 'Add drained hot pasta to the skillet with pancetta. Remove from heat and quickly toss to combine.',
        },
        {
          step: 5,
          instruction: 'Immediately add the egg mixture to the pasta, tossing continuously to create a creamy sauce. Add pasta water gradually if needed.',
          tip: 'Work quickly and keep tossing to prevent the eggs from scrambling. The heat from the pasta will cook the eggs gently.'
        },
        {
          step: 6,
          instruction: 'Serve immediately with extra Parmesan and freshly ground black pepper.',
        }
      ],
      nutritionalInfo: {
        calories: 580,
        protein: '28g',
        carbs: '68g',
        fat: '22g'
      }
    },
    'chocolate cake': {
      title: 'Rich Chocolate Layer Cake',
      description: 'Moist, decadent chocolate cake with layers of rich chocolate frosting. Perfect for celebrations or when you need a chocolate fix.',
      difficulty: 'Intermediate',
      tags: ['Dessert', 'Chocolate', 'Celebration', 'Baking'],
      ingredients: [
        { name: 'all-purpose flour', amount: '2', unit: 'cups' },
        { name: 'cocoa powder', amount: '3/4', unit: 'cup' },
        { name: 'sugar', amount: '2', unit: 'cups' },
        { name: 'baking soda', amount: '2', unit: 'tsp' },
        { name: 'baking powder', amount: '1', unit: 'tsp' },
        { name: 'eggs', amount: '2', unit: 'large' },
        { name: 'buttermilk', amount: '1', unit: 'cup' },
        { name: 'vegetable oil', amount: '1/2', unit: 'cup' },
        { name: 'vanilla extract', amount: '2', unit: 'tsp' },
        { name: 'hot coffee', amount: '1', unit: 'cup' },
        { name: 'butter', amount: '1/2', unit: 'cup softened' },
        { name: 'powdered sugar', amount: '4', unit: 'cups' },
        { name: 'dark chocolate', amount: '4', unit: 'oz melted' }
      ],
      instructions: [
        {
          step: 1,
          instruction: 'Preheat oven to 350°F (175°C). Grease two 9-inch round cake pans and dust with cocoa powder.',
          tip: 'Use cocoa powder instead of flour for dusting to prevent white spots on your chocolate cake.'
        },
        {
          step: 2,
          instruction: 'In a large bowl, whisk together flour, cocoa powder, sugar, baking soda, and baking powder.',
        },
        {
          step: 3,
          instruction: 'In another bowl, beat eggs, then add buttermilk, oil, and vanilla. Mix until well combined.',
        },
        {
          step: 4,
          instruction: 'Add wet ingredients to dry ingredients and mix until just combined. Gradually stir in hot coffee until smooth.',
          tip: 'The batter will be thin - this is normal and creates a moist cake.'
        },
        {
          step: 5,
          instruction: 'Divide batter between prepared pans. Bake for 30-35 minutes or until a toothpick inserted in center comes out clean.',
        },
        {
          step: 6,
          instruction: 'Cool in pans for 10 minutes, then turn out onto wire racks. For frosting, beat butter until fluffy, gradually add powdered sugar and melted chocolate.',
        },
        {
          step: 7,
          instruction: 'Once cakes are completely cool, frost between layers and all over the outside. Decorate as desired.',
          tip: 'Make sure cakes are completely cool before frosting to prevent melting.'
        }
      ],
      nutritionalInfo: {
        calories: 520,
        protein: '6g',
        carbs: '78g',
        fat: '22g'
      }
    }
  };

  // Check if we have a specific recipe for this dish
  if (recipeDatabase[dishName]) {
    return recipeDatabase[dishName];
  }

  // Generate a generic recipe based on dish name
  const words = dishName.split(' ');
  const mainIngredient = words[0] || 'chicken';
  
  return {
    title: `Homemade ${formData.dishName}`,
    description: `A delicious homemade version of ${formData.dishName} made with fresh ingredients and traditional cooking methods.`,
    difficulty: 'Easy',
    tags: ['Homemade', 'Fresh ingredients', 'Traditional'],
    ingredients: [
      { name: mainIngredient, amount: '1', unit: 'lb' },
      { name: 'onion', amount: '1', unit: 'medium' },
      { name: 'garlic', amount: '3', unit: 'cloves' },
      { name: 'olive oil', amount: '2', unit: 'tbsp' },
      { name: 'salt', amount: '1', unit: 'tsp' },
      { name: 'black pepper', amount: '1/2', unit: 'tsp' },
      ...formData.ingredients.map((ing, index) => ({
        name: ing,
        amount: index === 0 ? '1/2' : '1/4',
        unit: 'cup'
      }))
    ],
    instructions: [
      {
        step: 1,
        instruction: 'Prepare all ingredients by washing, chopping, and measuring as needed.',
        tip: 'Mise en place - having everything ready makes cooking much smoother!'
      },
      {
        step: 2,
        instruction: `Heat olive oil in a large pan over medium heat. Add diced onion and cook until softened, about 5 minutes.`
      },
      {
        step: 3,
        instruction: 'Add minced garlic and cook for another minute until fragrant.',
        tip: 'Be careful not to burn the garlic as it will become bitter.'
      },
      {
        step: 4,
        instruction: `Add ${mainIngredient} and cook according to the specific requirements of your dish.`
      },
      {
        step: 5,
        instruction: 'Season with salt and pepper, and add any additional ingredients as needed.',
      },
      {
        step: 6,
        instruction: `Cook until ${mainIngredient} is fully cooked and tender. Adjust seasonings to taste and serve hot.`
      }
    ],
    nutritionalInfo: {
      calories: 320,
      protein: '25g',
      carbs: '15g',
      fat: '18g'
    }
  };
};
