import { RecipeFormData } from '@/components/RecipeForm';
import { Recipe } from '@/components/RecipeDisplay';

// Mock AI recipe generation service
// In a real app, this would call Gemini API or similar
export const generateRecipe = async (formData: RecipeFormData): Promise<Recipe> => {
  console.log('Recipe generation started with form data:', formData);
  
  // Get current language from localStorage (set by LanguageContext)
  const currentLanguage = localStorage.getItem('currentLanguage') || 'en';
  
  // Create language-aware prompt
  const languageInstructions = getLanguageInstructions(currentLanguage);
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Try specific recipes first
  const specificRecipe = await generateSpecificRecipe(formData, currentLanguage);
  if (specificRecipe) {
    return specificRecipe;
  }
  
  // Fallback generation
  const recipe = generateRecipeByDishName(formData.dishName, formData, currentLanguage);
  return recipe;
};

const getLanguageInstructions = (language: string): string => {
  const instructions = {
    en: 'Generate the recipe in English',
    ta: 'Generate the recipe in Tamil language (தமிழ்)',
    hi: 'Generate the recipe in Hindi language (हिंदी)', 
    de: 'Generate the recipe in German language (Deutsch)',
    fr: 'Generate the recipe in French language (Français)'
  };
  return instructions[language as keyof typeof instructions] || instructions.en;
};

const generateSpecificRecipe = async (formData: RecipeFormData, language: string): Promise<Recipe | null> => {
  const dishName = formData.dishName.toLowerCase();
  
  // Define recipes in multiple languages
  const recipes = getRecipesDatabase(language);
  
  if (recipes[dishName]) {
    return recipes[dishName];
  }
  
  return null;
};

const getRecipesDatabase = (language: string) => {
  const databases = {
    en: {
      'dosa': {
        title: 'Traditional South Indian Dosa',
        description: 'Crispy, golden crepe made from fermented rice and lentil batter, perfect for breakfast or dinner.',
        cookingTime: '30',
        servings: 4,
        difficulty: 'Medium',
        cuisine: 'South Indian',
        ingredients: [
          { name: 'Rice', amount: '3', unit: 'cups' },
          { name: 'Urad dal (black gram)', amount: '1', unit: 'cup' },
          { name: 'Fenugreek seeds', amount: '1', unit: 'tsp' },
          { name: 'Salt', amount: '1', unit: 'tsp' },
          { name: 'Oil', amount: '2', unit: 'tbsp' }
        ],
        instructions: [
          { step: 1, instruction: 'Soak rice and urad dal separately for 4-6 hours.' },
          { step: 2, instruction: 'Grind them into smooth batter and mix together.' },
          { step: 3, instruction: 'Add salt and let it ferment for 8-12 hours.' },
          { step: 4, instruction: 'Heat a non-stick pan and pour a ladle of batter.' },
          { step: 5, instruction: 'Spread it thin and cook until golden brown.' },
          { step: 6, instruction: 'Serve hot with chutney and sambar.' }
        ],
        tags: ['Vegetarian', 'Gluten-free', 'Fermented'],
        nutritionalInfo: {
          calories: 168,
          protein: '6g',
          carbs: '35g',
          fat: '2g'
        }
      },
      'vegetable biryani': {
        title: 'Aromatic Vegetable Biryani',
        description: 'Fragrant rice dish layered with spiced vegetables and aromatic herbs.',
        cookingTime: '45',
        servings: 6,
        difficulty: 'Medium',
        cuisine: 'Indian',
        ingredients: [
          { name: 'Basmati rice', amount: '2', unit: 'cups' },
          { name: 'Mixed vegetables', amount: '2', unit: 'cups' },
          { name: 'Onions', amount: '2', unit: 'large' },
          { name: 'Yogurt', amount: '1/2', unit: 'cup' },
          { name: 'Biryani masala', amount: '2', unit: 'tbsp' },
          { name: 'Saffron', amount: '1', unit: 'pinch' },
          { name: 'Ghee', amount: '3', unit: 'tbsp' }
        ],
        instructions: [
          { step: 1, instruction: 'Soak basmati rice for 30 minutes.' },
          { step: 2, instruction: 'Fry onions until golden and set aside.' },
          { step: 3, instruction: 'Cook vegetables with spices and yogurt.' },
          { step: 4, instruction: 'Boil rice until 70% cooked.' },
          { step: 5, instruction: 'Layer rice and vegetables alternately.' },
          { step: 6, instruction: 'Add saffron, ghee, and fried onions on top.' },
          { step: 7, instruction: 'Cook on dum (slow cooking) for 30 minutes.' }
        ],
        tags: ['Vegetarian', 'Aromatic', 'Festive'],
        nutritionalInfo: {
          calories: 285,
          protein: '8g',
          carbs: '52g',
          fat: '6g'
        }
      }
    },
    ta: {
      'dosa': {
        title: 'பாரம்பரிய தென்னிந்திய தோசை',
        description: 'புளித்த அரிசி மற்றும் உளுந்து மாவில் செய்யப்பட்ட மொறுமொறுப்பான, தங்க நிற க்ரேப்.',
        cookingTime: '30',
        servings: 4,
        difficulty: 'நடுத்தர',
        cuisine: 'தென்னிந்திய',
        ingredients: [
          { name: 'அரிசி', amount: '3', unit: 'கப்' },
          { name: 'உளுந்து', amount: '1', unit: 'கப்' },
          { name: 'வெந்தய விதைகள்', amount: '1', unit: 'டீஸ்பூன்' },
          { name: 'உப்பு', amount: '1', unit: 'டீஸ்பூன்' },
          { name: 'எண்ணெய்', amount: '2', unit: 'டேபிள்ஸ்பூன்' }
        ],
        instructions: [
          { step: 1, instruction: 'அரிசி மற்றும் உளுந்தை தனித்தனியாக 4-6 மணி நேரம் ஊற வைக்கவும்.' },
          { step: 2, instruction: 'அவற்றை மையாக அரைத்து ஒன்றாக கலக்கவும்.' },
          { step: 3, instruction: 'உப்பு சேர்த்து 8-12 மணி நேரம் புளிக்க விடவும்.' },
          { step: 4, instruction: 'ஒரு ஸ்டிக் செய்யாத பான் சூடாக்கி மாவை ஊற்றவும்.' },
          { step: 5, instruction: 'மெல்லியதாக பரப்பி தங்க நிறமாகும் வரை சமைக்கவும்.' },
          { step: 6, instruction: 'சட்னி மற்றும் சாம்பாருடன் சூடாக பரிமாறவும்.' }
        ],
        tags: ['சைவம்', 'பசையம் இல்லாத', 'புளித்த'],
        nutritionalInfo: {
          calories: 168,
          protein: '6கிராம்',
          carbs: '35கிராம்',
          fat: '2கிராம்'
        }
      }
    },
    hi: {
      'dosa': {
        title: 'पारंपरिक दक्षिण भारतीय डोसा',
        description: 'किण्वित चावल और दाल के बैटर से बना कुरकुरा, सुनहरा क्रेप।',
        cookingTime: '30',
        servings: 4,
        difficulty: 'मध्यम',
        cuisine: 'दक्षिण भारतीय',
        ingredients: [
          { name: 'चावल', amount: '3', unit: 'कप' },
          { name: 'उड़द दाल', amount: '1', unit: 'कप' },
          { name: 'मेथी के दाने', amount: '1', unit: 'चम्मच' },
          { name: 'नमक', amount: '1', unit: 'चम्मच' },
          { name: 'तेल', amount: '2', unit: 'बड़ा चम्मच' }
        ],
        instructions: [
          { step: 1, instruction: 'चावल और उड़द दाल को अलग-अलग 4-6 घंटे भिगोएं।' },
          { step: 2, instruction: 'इन्हें महीन पीसकर एक साथ मिलाएं।' },
          { step: 3, instruction: 'नमक डालकर 8-12 घंटे किण्वित होने दें।' },
          { step: 4, instruction: 'नॉन-स्टिक पैन गर्म करके बैटर डालें।' },
          { step: 5, instruction: 'पतला फैलाकर सुनहरा होने तक पकाएं।' },
          { step: 6, instruction: 'चटनी और सांभर के साथ गर्म परोसें।' }
        ],
        tags: ['शाकाहारी', 'ग्लूटन-फ्री', 'किण्वित'],
        nutritionalInfo: {
          calories: 168,
          protein: '6ग्राम',
          carbs: '35ग्राम',
          fat: '2ग्राम'
        }
      }
    },
    de: {
      'dosa': {
        title: 'Traditionelle Südindische Dosa',
        description: 'Knuspriger, goldener Crêpe aus fermentiertem Reis- und Linsenteig.',
        cookingTime: '30',
        servings: 4,
        difficulty: 'Mittel',
        cuisine: 'Südindisch',
        ingredients: [
          { name: 'Reis', amount: '3', unit: 'Tassen' },
          { name: 'Urad Dal', amount: '1', unit: 'Tasse' },
          { name: 'Bockshornkleesamen', amount: '1', unit: 'TL' },
          { name: 'Salz', amount: '1', unit: 'TL' },
          { name: 'Öl', amount: '2', unit: 'EL' }
        ],
        instructions: [
          { step: 1, instruction: 'Reis und Urad Dal getrennt 4-6 Stunden einweichen.' },
          { step: 2, instruction: 'Zu glattem Teig mahlen und zusammen mischen.' },
          { step: 3, instruction: 'Salz hinzufügen und 8-12 Stunden fermentieren lassen.' },
          { step: 4, instruction: 'Antihaftpfanne erhitzen und Teig hineingiessen.' },
          { step: 5, instruction: 'Dünn verteilen und goldbraun braten.' },
          { step: 6, instruction: 'Heiss mit Chutney und Sambar servieren.' }
        ],
        tags: ['Vegetarisch', 'Glutenfrei', 'Fermentiert'],
        nutritionalInfo: {
          calories: 168,
          protein: '6g',
          carbs: '35g',
          fat: '2g'
        }
      }
    },
    fr: {
      'dosa': {
        title: 'Dosa Traditionnelle du Sud de l\'Inde',
        description: 'Crêpe croustillante et dorée faite à partir de pâte de riz et lentilles fermentée.',
        cookingTime: '30',
        servings: 4,
        difficulty: 'Moyen',
        cuisine: 'Sud-Indienne',
        ingredients: [
          { name: 'Riz', amount: '3', unit: 'tasses' },
          { name: 'Lentilles noires', amount: '1', unit: 'tasse' },
          { name: 'Graines de fenugrec', amount: '1', unit: 'c. à thé' },
          { name: 'Sel', amount: '1', unit: 'c. à thé' },
          { name: 'Huile', amount: '2', unit: 'c. à soupe' }
        ],
        instructions: [
          { step: 1, instruction: 'Tremper le riz et les lentilles séparément pendant 4-6 heures.' },
          { step: 2, instruction: 'Les moudre en pâte lisse et mélanger ensemble.' },
          { step: 3, instruction: 'Ajouter le sel et laisser fermenter 8-12 heures.' },
          { step: 4, instruction: 'Chauffer une poêle antiadhésive et verser la pâte.' },
          { step: 5, instruction: 'Étaler finement et cuire jusqu\'à dorure.' },
          { step: 6, instruction: 'Servir chaud avec chutney et sambar.' }
        ],
        tags: ['Végétarien', 'Sans gluten', 'Fermenté'],
        nutritionalInfo: {
          calories: 168,
          protein: '6g',
          carbs: '35g',
          fat: '2g'
        }
      }
    }
  };
  
  return databases[language as keyof typeof databases] || databases.en;
};

const generateRecipeByDishName = (dishName: string, formData: RecipeFormData, language: string): Recipe => {
  // Check if user has vegetarian/vegan dietary restrictions
  const isVegetarian = formData.dietaryRestrictions.some(restriction => 
    ['vegetarian', 'vegan', 'plant-based'].includes(restriction.toLowerCase())
  );
  const isVegan = formData.dietaryRestrictions.some(restriction => 
    ['vegan', 'plant-based'].includes(restriction.toLowerCase())
  );

  // Get ingredients based on dietary restrictions and language
  const ingredients = getIngredientsForLanguage(formData.dietaryRestrictions.includes('vegetarian'), language);
  const instructions = getInstructionsForLanguage(dishName, language);
  const nutritionalInfo = getNutritionalInfoForLanguage(language);
  
  return {
    title: getTitleForLanguage(dishName, language),
    description: getDescriptionForLanguage(dishName, language),
    cookingTime: '25',
    servings: 4,
    difficulty: getDifficultyForLanguage(language),
    cuisine: getCuisineForLanguage(language),
    ingredients,
    instructions,
    tags: getTagsForLanguage(formData.dietaryRestrictions, language),
    nutritionalInfo
  };
};

const getTitleForLanguage = (dishName: string, language: string): string => {
  const titles = {
    en: `Delicious ${dishName.charAt(0).toUpperCase() + dishName.slice(1)}`,
    ta: `சுவையான ${dishName}`,
    hi: `स्वादिष्ट ${dishName}`,
    de: `Köstliche ${dishName}`,
    fr: `Délicieux ${dishName}`
  };
  return titles[language as keyof typeof titles] || titles.en;
};

const getDescriptionForLanguage = (dishName: string, language: string): string => {
  const descriptions = {
    en: `A flavorful and aromatic ${dishName} prepared with fresh ingredients and traditional spices.`,
    ta: `புதிய பொருட்கள் மற்றும் பாரம்பரிய மசாலாக்களுடன் தயாரிக்கப்பட்ட சுவையான ${dishName}.`,
    hi: `ताजी सामग्री और पारंपरिक मसालों के साथ तैयार किया गया स्वादिष्ट ${dishName}.`,
    de: `Ein geschmackvoller ${dishName}, zubereitet mit frischen Zutaten und traditionellen Gewürzen.`,
    fr: `Un ${dishName} savoureux préparé avec des ingrédients frais et des épices traditionnelles.`
  };
  return descriptions[language as keyof typeof descriptions] || descriptions.en;
};

const getIngredientsForLanguage = (isVegetarian: boolean, language: string) => {
  const ingredientSets = {
    en: isVegetarian ? [
      { name: 'Paneer', amount: '200', unit: 'g' },
      { name: 'Onions', amount: '2', unit: 'medium' },
      { name: 'Tomatoes', amount: '3', unit: 'large' },
      { name: 'Ginger-garlic paste', amount: '1', unit: 'tbsp' },
      { name: 'Turmeric powder', amount: '1', unit: 'tsp' }
    ] : [
      { name: 'Chicken', amount: '500', unit: 'g' },
      { name: 'Onions', amount: '2', unit: 'medium' },
      { name: 'Tomatoes', amount: '3', unit: 'large' }
    ],
    ta: isVegetarian ? [
      { name: 'பன்னீர்', amount: '200', unit: 'கிராம்' },
      { name: 'வெங்காயம்', amount: '2', unit: 'நடுத்தர' },
      { name: 'தக்காளி', amount: '3', unit: 'பெரிய' },
      { name: 'இஞ்சி-பூண்டு விழுது', amount: '1', unit: 'டேபிள்ஸ்பூன்' },
      { name: 'மஞ்சள் தூள்', amount: '1', unit: 'டீஸ்பூன்' }
    ] : [
      { name: 'கோழி', amount: '500', unit: 'கிராம்' },
      { name: 'வெங்காயம்', amount: '2', unit: 'நடுத்தர' },
      { name: 'தக்காளி', amount: '3', unit: 'பெரிய' }
    ],
    hi: isVegetarian ? [
      { name: 'पनीर', amount: '200', unit: 'ग्राम' },
      { name: 'प्याज', amount: '2', unit: 'मध्यम' },
      { name: 'टमाटर', amount: '3', unit: 'बड़े' },
      { name: 'अदरक-लहसुन का पेस्ट', amount: '1', unit: 'चम्मच' },
      { name: 'हल्दी पाउडर', amount: '1', unit: 'चम्मच' }
    ] : [
      { name: 'चिकन', amount: '500', unit: 'ग्राम' },
      { name: 'प्याज', amount: '2', unit: 'मध्यम' },
      { name: 'टमाटर', amount: '3', unit: 'बड़े' }
    ],
    de: isVegetarian ? [
      { name: 'Paneer', amount: '200', unit: 'g' },
      { name: 'Zwiebeln', amount: '2', unit: 'mittelgroße' },
      { name: 'Tomaten', amount: '3', unit: 'große' },
      { name: 'Ingwer-Knoblauch-Paste', amount: '1', unit: 'EL' },
      { name: 'Kurkumapulver', amount: '1', unit: 'TL' }
    ] : [
      { name: 'Hähnchen', amount: '500', unit: 'g' },
      { name: 'Zwiebeln', amount: '2', unit: 'mittelgroße' },
      { name: 'Tomaten', amount: '3', unit: 'große' }
    ],
    fr: isVegetarian ? [
      { name: 'Paneer', amount: '200', unit: 'g' },
      { name: 'Oignons', amount: '2', unit: 'moyens' },
      { name: 'Tomates', amount: '3', unit: 'grosses' },
      { name: 'Pâte gingembre-ail', amount: '1', unit: 'c. à soupe' },
      { name: 'Poudre de curcuma', amount: '1', unit: 'c. à thé' }
    ] : [
      { name: 'Poulet', amount: '500', unit: 'g' },
      { name: 'Oignons', amount: '2', unit: 'moyens' },
      { name: 'Tomates', amount: '3', unit: 'grosses' }
    ]
  };
  
  return ingredientSets[language as keyof typeof ingredientSets] || ingredientSets.en;
};

const getInstructionsForLanguage = (dishName: string, language: string) => {
  const instructions = {
    en: [
      { step: 1, instruction: 'Heat oil in a large pan over medium heat.' },
      { step: 2, instruction: 'Add onions and sauté until golden brown.' },
      { step: 3, instruction: 'Add ginger-garlic paste and cook for 1 minute.' },
      { step: 4, instruction: 'Add tomatoes and cook until they break down.' },
      { step: 5, instruction: 'Add spices and mix well.' },
      { step: 6, instruction: 'Add main ingredient and cook until done.' },
      { step: 7, instruction: 'Garnish and serve hot.' }
    ],
    ta: [
      { step: 1, instruction: 'நடுத்தர அனலில் ஒரு பெரிய பாத்திரத்தில் எண்ணெய் சூடாக்கவும்.' },
      { step: 2, instruction: 'வெங்காயம் சேர்த்து தங்க நிறமாகும் வரை வதக்கவும்.' },
      { step: 3, instruction: 'இஞ்சி-பூண்டு விழுது சேர்த்து 1 நிமிடம் சமைக்கவும்.' },
      { step: 4, instruction: 'தக்காளி சேர்த்து அவை கரையும் வரை சமைக்கவும்.' },
      { step: 5, instruction: 'மசாலாப் பொருட்கள் சேர்த்து நன்றாக கலக்கவும்.' },
      { step: 6, instruction: 'முக்கிய பொருளை சேர்த்து வெந்தும் வரை சமைக்கவும்.' },
      { step: 7, instruction: 'அலங்கரித்து சூடாக பரிமாறவும்.' }
    ],
    hi: [
      { step: 1, instruction: 'मध्यम आंच पर एक बड़े पैन में तेल गर्म करें।' },
      { step: 2, instruction: 'प्याज डालकर सुनहरा होने तक भूनें।' },
      { step: 3, instruction: 'अदरक-लहसुन का पेस्ट डालकर 1 मिनट पकाएं।' },
      { step: 4, instruction: 'टमाटर डालकर गलने तक पकाएं।' },
      { step: 5, instruction: 'मसाले डालकर अच्छी तरह मिलाएं।' },
      { step: 6, instruction: 'मुख्य सामग्री डालकर पकने तक पकाएं।' },
      { step: 7, instruction: 'सजाकर गर्म परोसें।' }
    ],
    de: [
      { step: 1, instruction: 'Öl in einer großen Pfanne bei mittlerer Hitze erwärmen.' },
      { step: 2, instruction: 'Zwiebeln hinzufügen und goldbraun anbraten.' },
      { step: 3, instruction: 'Ingwer-Knoblauch-Paste hinzufügen und 1 Minute kochen.' },
      { step: 4, instruction: 'Tomaten hinzufügen und kochen bis sie zerfallen.' },
      { step: 5, instruction: 'Gewürze hinzufügen und gut vermischen.' },
      { step: 6, instruction: 'Hauptzutat hinzufügen und gar kochen.' },
      { step: 7, instruction: 'Garnieren und heiß servieren.' }
    ],
    fr: [
      { step: 1, instruction: 'Chauffer l\'huile dans une grande poêle à feu moyen.' },
      { step: 2, instruction: 'Ajouter les oignons et faire revenir jusqu\'à dorure.' },
      { step: 3, instruction: 'Ajouter la pâte gingembre-ail et cuire 1 minute.' },
      { step: 4, instruction: 'Ajouter les tomates et cuire jusqu\'à ce qu\'elles se décomposent.' },
      { step: 5, instruction: 'Ajouter les épices et bien mélanger.' },
      { step: 6, instruction: 'Ajouter l\'ingrédient principal et cuire jusqu\'à cuisson.' },
      { step: 7, instruction: 'Garnir et servir chaud.' }
    ]
  };
  
  return instructions[language as keyof typeof instructions] || instructions.en;
};

const getDifficultyForLanguage = (language: string): string => {
  const difficulties = {
    en: 'Medium',
    ta: 'நடுத்தர',
    hi: 'मध्यम',
    de: 'Mittel',
    fr: 'Moyen'
  };
  return difficulties[language as keyof typeof difficulties] || difficulties.en;
};

const getCuisineForLanguage = (language: string): string => {
  const cuisines = {
    en: 'Indian',
    ta: 'இந்திய',
    hi: 'भारतीय',
    de: 'Indisch',
    fr: 'Indienne'
  };
  return cuisines[language as keyof typeof cuisines] || cuisines.en;
};

const getTagsForLanguage = (dietaryRestrictions: string[], language: string): string[] => {
  const tagSets = {
    en: dietaryRestrictions.includes('vegetarian') ? ['Vegetarian', 'Healthy', 'Traditional'] : ['Non-Vegetarian', 'Protein-rich', 'Traditional'],
    ta: dietaryRestrictions.includes('vegetarian') ? ['சைவம்', 'ஆரோக்கியமான', 'பாரம்பரிய'] : ['அசைவம்', 'புரதச்சத்து', 'பாரம்பரிய'],
    hi: dietaryRestrictions.includes('vegetarian') ? ['शाकाहारी', 'स्वस्थ', 'पारंपरिक'] : ['मांसाहारी', 'प्रोटीन युक्त', 'पारंपरिक'],
    de: dietaryRestrictions.includes('vegetarian') ? ['Vegetarisch', 'Gesund', 'Traditionell'] : ['Fleisch', 'Proteinreich', 'Traditionell'],
    fr: dietaryRestrictions.includes('vegetarian') ? ['Végétarien', 'Sain', 'Traditionnel'] : ['Non-végétarien', 'Riche en protéines', 'Traditionnel']
  };
  
  return tagSets[language as keyof typeof tagSets] || tagSets.en;
};

const getNutritionalInfoForLanguage = (language: string) => {
  const nutritionLabels = {
    en: { protein: '8g', carbs: '45g', fat: '12g' },
    ta: { protein: '8கிராம்', carbs: '45கிராம்', fat: '12கிராம்' },
    hi: { protein: '8ग्राम', carbs: '45ग्राम', fat: '12ग्राम' },
    de: { protein: '8g', carbs: '45g', fat: '12g' },
    fr: { protein: '8g', carbs: '45g', fat: '12g' }
  };
  
  return {
    calories: 280,
    ...nutritionLabels[language as keyof typeof nutritionLabels] || nutritionLabels.en
  };
};

// Export function to translate existing recipes
export const translateRecipe = (recipe: Recipe, targetLanguage: string): Recipe => {
  if (targetLanguage === 'en') return recipe;
  
  // This is a simplified translation - in a real app you'd use a translation service
  return {
    ...recipe,
    title: getTitleForLanguage(recipe.title.toLowerCase(), targetLanguage),
    description: getDescriptionForLanguage(recipe.title.toLowerCase(), targetLanguage),
    difficulty: getDifficultyForLanguage(targetLanguage),
    cuisine: getCuisineForLanguage(targetLanguage),
    tags: getTagsForLanguage(['vegetarian'], targetLanguage),
    nutritionalInfo: recipe.nutritionalInfo ? {
      ...recipe.nutritionalInfo,
      ...getNutritionalInfoForLanguage(targetLanguage)
    } : undefined
  };
};
