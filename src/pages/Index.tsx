
import React, { useState, useEffect } from 'react';
import RecipeForm, { RecipeFormData } from '@/components/RecipeForm';
import RecipeDisplay, { Recipe } from '@/components/RecipeDisplay';
import LanguageSelector from '@/components/LanguageSelector';
import IngredientBot from '@/components/IngredientBot';
import { generateRecipe, translateRecipe } from '@/services/recipeService';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { ChefHat, Sparkles } from 'lucide-react';

const Index = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [originalRecipe, setOriginalRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t, currentLanguage } = useLanguage();

  // Handle language changes for existing recipes
  useEffect(() => {
    const handleLanguageChange = () => {
      if (originalRecipe) {
        const translatedRecipe = translateRecipe(originalRecipe, currentLanguage);
        setRecipe(translatedRecipe);
      }
    };

    window.addEventListener('languageChanged', handleLanguageChange);
    return () => window.removeEventListener('languageChanged', handleLanguageChange);
  }, [originalRecipe, currentLanguage]);

  const handleGenerateRecipe = async (formData: RecipeFormData) => {
    setIsLoading(true);
    try {
      console.log('Generating recipe with data:', formData);
      const generatedRecipe = await generateRecipe(formData);
      setRecipe(generatedRecipe);
      setOriginalRecipe(generatedRecipe); // Store original for translation
      
      toast({
        title: t('recipe.generated'),
        description: t('recipe.ready'),
      });
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast({
        title: t('recipe.error'),
        description: t('recipe.error.desc'),
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetRecipe = () => {
    setRecipe(null);
    setOriginalRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-light via-peach to-peach-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <ChefHat className="h-12 w-12 text-coral-dark" />
            <h1 className="text-5xl md:text-6xl font-literata font-bold text-coral-dark">
              {t('recipe.creator')}
            </h1>
            <Sparkles className="h-8 w-8 text-teal animate-pulse" />
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-6">
            {t('recipe.tagline')}
          </p>
          
          {/* Language Selector */}
          <div className="flex justify-center mb-8">
            <LanguageSelector />
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {!recipe ? (
            <RecipeForm onSubmit={handleGenerateRecipe} isLoading={isLoading} />
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <button
                  onClick={resetRecipe}
                  className="bg-teal hover:bg-teal-dark text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg"
                >
                  {t('recipe.create.another')}
                </button>
              </div>
              <RecipeDisplay recipe={recipe} />
              <IngredientBot recipe={recipe} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-coral/20">
          <p className="text-gray-600 font-literata">
            {t('recipe.footer')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
