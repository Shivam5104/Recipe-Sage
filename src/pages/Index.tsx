
import React, { useState } from 'react';
import RecipeForm, { RecipeFormData } from '@/components/RecipeForm';
import RecipeDisplay, { Recipe } from '@/components/RecipeDisplay';
import { generateRecipe } from '@/services/recipeService';
import { useToast } from '@/hooks/use-toast';
import { ChefHat, Sparkles } from 'lucide-react';

const Index = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateRecipe = async (formData: RecipeFormData) => {
    setIsLoading(true);
    try {
      console.log('Generating recipe with data:', formData);
      const generatedRecipe = await generateRecipe(formData);
      setRecipe(generatedRecipe);
      
      toast({
        title: 'Recipe Generated! 🍳',
        description: 'Your personalized recipe is ready to cook!',
      });
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast({
        title: 'Oops! Something went wrong',
        description: 'We couldn\'t generate your recipe. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetRecipe = () => {
    setRecipe(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-peach-light via-peach to-peach-dark">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-6">
            <ChefHat className="h-12 w-12 text-coral-dark" />
            <h1 className="text-5xl md:text-6xl font-literata font-bold text-coral-dark">
              Recipe Creator
            </h1>
            <Sparkles className="h-8 w-8 text-teal animate-pulse" />
          </div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed mb-6">
            Transform your available ingredients into delicious, personalized recipes with the power of AI. Let's create something amazing together!
          </p>
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
                  Create Another Recipe
                </button>
              </div>
              <RecipeDisplay recipe={recipe} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pt-8 border-t border-coral/20">
          <p className="text-gray-600 font-literata">
            Crafted with ❤️ for home cooks who love to create
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
