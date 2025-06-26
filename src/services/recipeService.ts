
import { RecipeFormData } from '@/components/RecipeForm';
import { Recipe } from '@/components/RecipeDisplay';

// Mock AI recipe generation service
// In a real app, this would call Gemini API or similar
export const generateRecipe = async (formData: RecipeFormData): Promise<Recipe> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const dishName = formData.dishName.toLowerCase();
  
  // Generate detailed recipe based on dish name
  const recipeData = generateRecipeByDishName(dishName, formData);
  
  return {
    title: recipeData.title,
    description: recipeData.description,
    cookingTime: recipeData.cookingTime,
    servings: recipeData.servings,
    difficulty: recipeData.difficulty,
    cuisine: recipeData.cuisine,
    ingredients: recipeData.ingredients,
    instructions: recipeData.instructions,
    tags: [
      ...recipeData.tags,
      ...formData.dietaryRestrictions
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
      cookingTime: '45',
      servings: 4,
      difficulty: 'Intermediate',
      cuisine: 'Indian',
      tags: ['Indian', 'Curry', 'Protein-rich', 'Comfort food'],
      ingredients: [
        { name: 'Chicken breast (boneless, skinless)', amount: '2', unit: 'lbs' },
        { name: 'Plain Greek yogurt', amount: '1', unit: 'cup' },
        { name: 'Garam masala powder', amount: '2', unit: 'tsp' },
        { name: 'Ground cumin', amount: '1', unit: 'tsp' },
        { name: 'Paprika powder', amount: '1', unit: 'tsp' },
        { name: 'Fresh garlic cloves', amount: '4', unit: 'pieces' },
        { name: 'Fresh ginger root', amount: '1', unit: 'inch piece' },
        { name: 'Large yellow onion', amount: '1', unit: 'whole' },
        { name: 'Tomato puree (canned)', amount: '1', unit: 'can (14 oz)' },
        { name: 'Heavy cooking cream', amount: '1/2', unit: 'cup' },
        { name: 'Unsalted butter', amount: '3', unit: 'tbsp' },
        { name: 'Sea salt', amount: '1', unit: 'tsp' },
        { name: 'Fresh cilantro leaves', amount: '1/4', unit: 'cup' },
        { name: 'Basmati rice (for serving)', amount: '2', unit: 'cups uncooked' }
      ],
      instructions: [
        {
          step: 1,
          instruction: 'Cut the chicken breast into uniform bite-sized pieces (about 1-inch cubes). In a large mixing bowl, combine the plain Greek yogurt, half of the garam masala (1 tsp), ground cumin, paprika powder, and finely minced garlic cloves and ginger. Mix well to create a smooth marinade. Add the chicken pieces and coat thoroughly. Cover and marinate for at least 30 minutes at room temperature.',
          tip: 'For maximum flavor, marinate the chicken for 2-4 hours or overnight in the refrigerator. The acids in yogurt will tenderize the meat.'
        },
        {
          step: 2,
          instruction: 'Heat a large heavy-bottomed skillet or cast iron pan over medium-high heat. Remove chicken from marinade and cook the pieces in batches, ensuring not to overcrowd the pan. Cook for 6-8 minutes, turning occasionally until all sides are golden brown and chicken is cooked through (internal temperature 165°F). Remove chicken and set aside on a plate.',
          tip: 'Don\'t overcrowd the pan as this will steam the chicken instead of browning it. Cook in 2-3 batches if necessary for best results.'
        },
        {
          step: 3,
          instruction: 'In the same pan, add unsalted butter and let it melt completely. Add the diced yellow onion and cook over medium heat for 5-7 minutes, stirring frequently until the onion becomes soft, translucent, and lightly caramelized around the edges.',
        },
        {
          step: 4,
          instruction: 'Add the remaining minced garlic and ginger to the pan with onions. Cook for 1-2 minutes until very fragrant, stirring constantly to prevent burning. Add the remaining garam masala (1 tsp) and cook for another 30 seconds until the spices become aromatic.',
        },
        {
          step: 5,
          instruction: 'Pour in the entire can of tomato puree and bring the mixture to a gentle simmer. Reduce heat to medium-low and cook for 10-12 minutes, stirring occasionally, until the sauce reduces and thickens considerably. The sauce should coat the back of a spoon.',
        },
        {
          step: 6,
          instruction: 'Return the cooked chicken pieces to the pan along with any accumulated juices. Add the heavy cooking cream and sea salt. Gently stir to combine all ingredients. Simmer on low heat for 5-7 minutes until the chicken is heated through and the flavors meld together. Taste and adjust seasoning as needed.',
          tip: 'If the sauce is too thick, add a splash of water or chicken broth. If too thin, simmer uncovered for a few more minutes to reduce.'
        },
        {
          step: 7,
          instruction: 'Remove from heat and let stand for 2-3 minutes. Garnish generously with freshly chopped cilantro leaves. Serve immediately over steamed basmati rice or with warm naan bread.',
          tip: 'For authentic presentation, serve in individual bowls with a dollop of plain yogurt on the side and additional cilantro for garnish.'
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
      title: 'Classic Roman Pasta Carbonara',
      description: 'Silky, creamy pasta with crispy pancetta, eggs, and Parmesan cheese. An authentic Italian dish that\'s simple yet sophisticated, originating from Rome.',
      cookingTime: '25',
      servings: 4,
      difficulty: 'Easy',
      cuisine: 'Italian',
      tags: ['Italian', 'Pasta', 'Quick meal', 'Comfort food'],
      ingredients: [
        { name: 'Spaghetti pasta', amount: '1', unit: 'lb' },
        { name: 'Pancetta (diced)', amount: '6', unit: 'oz' },
        { name: 'Large fresh eggs', amount: '4', unit: 'whole' },
        { name: 'Parmigiano-Reggiano cheese (freshly grated)', amount: '1', unit: 'cup' },
        { name: 'Black pepper (freshly ground)', amount: '1', unit: 'tsp' },
        { name: 'Sea salt', amount: '1', unit: 'tsp' },
        { name: 'Extra virgin olive oil', amount: '2', unit: 'tbsp' }
      ],
      instructions: [
        {
          step: 1,
          instruction: 'Bring a large pot of water to a rolling boil. Add a generous amount of sea salt (the water should taste like seawater). Add the spaghetti pasta and cook according to package directions until al dente (usually 8-10 minutes). Before draining, reserve 1 cup of the starchy pasta cooking water in a measuring cup.',
          tip: 'The starchy pasta water is crucial for creating the creamy sauce - its starch content will help bind the eggs and cheese.'
        },
        {
          step: 2,
          instruction: 'While the pasta cooks, dice the pancetta into small uniform cubes (about 1/4 inch). Heat a large skillet over medium heat and add the diced pancetta. Cook for 4-5 minutes, stirring occasionally, until the pancetta is golden brown and crispy. The fat should render out and create a flavorful base.',
        },
        {
          step: 3,
          instruction: 'In a large mixing bowl, crack the fresh eggs and add the freshly grated Parmigiano-Reggiano cheese and freshly ground black pepper. Whisk vigorously until the mixture is well combined and slightly pale in color. The mixture should be smooth without any lumps.',
        },
        {
          step: 4,
          instruction: 'Drain the cooked pasta thoroughly and immediately add it to the skillet with the crispy pancetta. Remove the skillet from heat completely and toss the pasta with the pancetta and rendered fat for about 1 minute.',
        },
        {
          step: 5,
          instruction: 'Working quickly, pour the egg and cheese mixture over the hot pasta. Using tongs or a large spoon, toss the pasta continuously and vigorously for 2-3 minutes. The residual heat from the pasta will gently cook the eggs, creating a creamy sauce. Add reserved pasta water gradually, 2-3 tablespoons at a time, until you achieve a silky, creamy consistency.',
          tip: 'This is the most critical step - keep tossing to prevent the eggs from scrambling. The pasta should be hot enough to cook the eggs but not so hot that they curdle.'
        },
        {
          step: 6,
          instruction: 'Taste and adjust seasoning with additional salt and black pepper as needed. The dish should be creamy, not dry or clumpy. Serve immediately in warmed bowls, topped with extra grated Parmigiano-Reggiano and a generous grinding of fresh black pepper.',
          tip: 'Carbonara waits for no one - serve immediately while hot for the best texture and flavor.'
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
      title: 'Rich Double Chocolate Layer Cake',
      description: 'Moist, decadent chocolate cake with layers of rich chocolate frosting. Perfect for celebrations or when you need an indulgent chocolate fix.',
      cookingTime: '90',
      servings: 12,
      difficulty: 'Intermediate',
      cuisine: 'American',
      tags: ['Dessert', 'Chocolate', 'Celebration', 'Baking'],
      ingredients: [
        { name: 'All-purpose flour', amount: '2', unit: 'cups' },
        { name: 'Unsweetened cocoa powder', amount: '3/4', unit: 'cup' },
        { name: 'Granulated sugar', amount: '2', unit: 'cups' },
        { name: 'Baking soda', amount: '2', unit: 'tsp' },
        { name: 'Baking powder', amount: '1', unit: 'tsp' },
        { name: 'Large eggs (room temperature)', amount: '2', unit: 'whole' },
        { name: 'Buttermilk (room temperature)', amount: '1', unit: 'cup' },
        { name: 'Vegetable oil', amount: '1/2', unit: 'cup' },
        { name: 'Pure vanilla extract', amount: '2', unit: 'tsp' },
        { name: 'Hot strong coffee', amount: '1', unit: 'cup' },
        { name: 'Unsalted butter (for frosting)', amount: '1/2', unit: 'cup softened' },
        { name: 'Powdered sugar (sifted)', amount: '4', unit: 'cups' },
        { name: 'Dark chocolate (melted and cooled)', amount: '4', unit: 'oz' },
        { name: 'Heavy cream', amount: '3', unit: 'tbsp' }
      ],
      instructions: [
        {
          step: 1,
          instruction: 'Preheat your oven to 350°F (175°C). Grease two 9-inch round cake pans thoroughly with butter, then dust with unsweetened cocoa powder, tapping out any excess. Line the bottoms with parchment paper circles for easy removal.',
          tip: 'Use cocoa powder instead of flour for dusting to prevent white spots on your chocolate cake. Room temperature ingredients mix more easily.'
        },
        {
          step: 2,
          instruction: 'In a large mixing bowl, sift together the all-purpose flour, unsweetened cocoa powder, granulated sugar, baking soda, and baking powder. Whisk the dry ingredients together until evenly combined and no lumps remain.',
        },
        {
          step: 3,
          instruction: 'In a separate medium bowl, beat the eggs lightly with a fork. Add the room temperature buttermilk, vegetable oil, and pure vanilla extract. Whisk until the mixture is smooth and well combined.',
        },
        {
          step: 4,
          instruction: 'Create a well in the center of the dry ingredients and pour in the wet ingredient mixture. Using a large wooden spoon or electric mixer on low speed, mix until just combined. Do not overmix. Gradually stir in the hot coffee until the batter is smooth and well incorporated.',
          tip: 'The hot coffee enhances the chocolate flavor and creates moisture. The batter will be thin - this is completely normal and results in a very moist cake.'
        },
        {
          step: 5,
          instruction: 'Divide the batter evenly between the prepared cake pans, using a kitchen scale for accuracy if available. Gently tap the pans on the counter to release air bubbles. Bake for 30-35 minutes, or until a toothpick inserted in the center comes out with just a few moist crumbs attached.',
        },
        {
          step: 6,
          instruction: 'Remove cakes from oven and cool in the pans for exactly 10 minutes. Run a knife around the edges to loosen, then turn out onto wire cooling racks. Remove parchment paper and cool completely before frosting (at least 1 hour).',
        },
        {
          step: 7,
          instruction: 'For the chocolate frosting: In a large bowl, beat the softened butter with an electric mixer until light and fluffy (3-4 minutes). Gradually add the sifted powdered sugar, alternating with the melted and cooled chocolate and heavy cream. Beat until smooth and spreadable.',
        },
        {
          step: 8,
          instruction: 'Once cakes are completely cool, place one layer on a serving plate. Spread a generous amount of frosting on top, then place the second layer on top. Frost the top and sides of the entire cake. Decorate as desired with chocolate shavings or fresh berries.',
          tip: 'Make sure cakes are completely cool before frosting to prevent the frosting from melting. Chill the frosted cake for 30 minutes before serving for clean slices.'
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

  // Generate a generic detailed recipe based on dish name
  const words = dishName.split(' ');
  const mainIngredient = words.find(word => 
    ['chicken', 'beef', 'pork', 'fish', 'pasta', 'rice', 'potato', 'vegetable'].includes(word.toLowerCase())
  ) || 'chicken';
  
  return {
    title: `Homemade ${formData.dishName}`,
    description: `A delicious homemade version of ${formData.dishName} made with fresh, quality ingredients and traditional cooking methods. This recipe delivers authentic flavors with detailed step-by-step instructions.`,
    cookingTime: '45',
    servings: 4,
    difficulty: 'Easy',
    cuisine: 'Traditional',
    tags: ['Homemade', 'Fresh ingredients', 'Traditional'],
    ingredients: [
      { name: `Fresh ${mainIngredient} (main ingredient)`, amount: '1.5', unit: 'lbs' },
      { name: 'Yellow onion (medium)', amount: '1', unit: 'whole' },
      { name: 'Fresh garlic cloves', amount: '3', unit: 'pieces' },
      { name: 'Extra virgin olive oil', amount: '3', unit: 'tbsp' },
      { name: 'Sea salt', amount: '1', unit: 'tsp' },
      { name: 'Black pepper (freshly ground)', amount: '1/2', unit: 'tsp' },
      { name: 'Fresh herbs (parsley or cilantro)', amount: '1/4', unit: 'cup chopped' },
      { name: 'Vegetable or chicken broth', amount: '1', unit: 'cup' }
    ],
    instructions: [
      {
        step: 1,
        instruction: `Begin by preparing all your ingredients. Wash and pat dry the ${mainIngredient}. If using meat, cut into uniform pieces (about 1-inch cubes for stewing or bite-sized pieces). Dice the yellow onion into small, even pieces. Mince the fresh garlic cloves finely. Chop the fresh herbs and set aside.`,
        tip: 'Mise en place (having everything ready) makes the cooking process much smoother and ensures even cooking!'
      },
      {
        step: 2,
        instruction: 'Heat the extra virgin olive oil in a large, heavy-bottomed pan or Dutch oven over medium-high heat. Allow the oil to shimmer but not smoke. This indicates the proper temperature for searing.',
      },
      {
        step: 3,
        instruction: `Add the prepared ${mainIngredient} to the hot oil in a single layer. Do not overcrowd the pan. Cook without moving for 3-4 minutes to develop a golden-brown crust. Turn pieces and brown on all sides, about 8-10 minutes total. This browning step adds crucial flavor.`,
        tip: 'Resist the urge to move the food too early - proper browning requires patience and high heat.'
      },
      {
        step: 4,
        instruction: 'Add the diced onion to the pan with the browned ingredients. Cook for 5-6 minutes, stirring occasionally, until the onion becomes soft, translucent, and lightly caramelized. The onion will pick up the browned bits from the bottom of the pan.',
      },
      {
        step: 5,
        instruction: 'Add the minced garlic to the pan and cook for 1-2 minutes until very fragrant, stirring constantly to prevent burning. Season with sea salt and freshly ground black pepper, adjusting to taste.',
        tip: 'Garlic can burn quickly and become bitter, so add it after the onions have softened and watch it carefully.'
      },
      {
        step: 6,
        instruction: `Pour in the broth gradually, scraping up any browned bits from the bottom of the pan with a wooden spoon. These bits add incredible flavor. Bring to a gentle simmer, then reduce heat to low. Cover and cook for 20-25 minutes until the ${mainIngredient} is tender and cooked through.`,
      },
      {
        step: 7,
        instruction: 'Remove from heat and let rest for 5 minutes. Taste and adjust seasoning with additional salt and pepper as needed. Garnish generously with the fresh chopped herbs just before serving. Serve hot with your choice of sides.',
        tip: 'Let the dish rest briefly before serving - this allows the flavors to meld and the temperature to even out.'
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
