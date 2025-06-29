import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, ChefHat } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export interface Recipe {
  title: string;
  description: string;
  cookingTime: string;
  servings: number;
  difficulty: string;
  cuisine: string;
  ingredients: {
    name: string;
    amount: string;
    unit: string;
  }[];
  instructions: {
    step: number;
    instruction: string;
    tip?: string;
  }[];
  tags: string[];
  nutritionalInfo?: {
    calories: number;
    protein: string;
    carbs: string;
    fat: string;
  };
}

interface RecipeDisplayProps {
  recipe: Recipe;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe }) => {
  const { t } = useLanguage();

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Recipe Header */}
      <Card className="shadow-lg border-2 border-coral/20">
        <CardHeader className="bg-gradient-to-r from-coral/10 to-peach/20 rounded-t-lg">
          <CardTitle className="text-3xl font-literata text-coral-dark mb-2">
            {recipe.title}
          </CardTitle>
          <p className="text-gray-700 text-lg leading-relaxed">{recipe.description}</p>
          
          {/* Recipe Meta Information */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-coral/20">
            <div className="flex items-center gap-2 text-coral-dark">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">{recipe.cookingTime} mins</span>
            </div>
            <div className="flex items-center gap-2 text-coral-dark">
              <Users className="h-5 w-5" />
              <span className="font-semibold">{recipe.servings} servings</span>
            </div>
            <div className="flex items-center gap-2 text-coral-dark">
              <ChefHat className="h-5 w-5" />
              <span className="font-semibold">{recipe.difficulty}</span>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Badge className="bg-teal/20 text-teal-dark hover:bg-teal/30">
              {recipe.cuisine}
            </Badge>
            {recipe.tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-coral/20 text-coral-dark hover:bg-coral/30"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
      </Card>

      {/* Ingredients and Instructions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ingredients */}
        <Card className="shadow-lg border-2 border-coral/20">
          <CardHeader className="bg-peach/30">
            <CardTitle className="text-2xl font-literata text-coral-dark">
              {t('recipe.ingredients')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-3 bg-peach/20 rounded-lg hover:bg-peach/30 transition-colors"
                >
                  <span className="font-medium text-gray-800">{ingredient.name}</span>
                  <span className="font-semibold text-coral-dark">
                    {ingredient.amount} {ingredient.unit}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="shadow-lg border-2 border-coral/20">
          <CardHeader className="bg-teal/20">
            <CardTitle className="text-2xl font-literata text-coral-dark">
              {t('recipe.instructions')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="space-y-2">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-coral text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {instruction.step}
                    </span>
                    <p className="text-gray-800 leading-relaxed pt-1">
                      {instruction.instruction}
                    </p>
                  </div>
                  {instruction.tip && (
                    <div className="ml-11 p-3 bg-teal/10 rounded-lg border-l-4 border-teal">
                      <p className="text-teal-dark text-sm font-medium">
                        💡 {t('recipe.tip')}: {instruction.tip}
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>

      {/* Nutritional Information */}
      {recipe.nutritionalInfo && (
        <Card className="shadow-lg border-2 border-coral/20">
          <CardHeader className="bg-gradient-to-r from-teal/20 to-coral/10">
            <CardTitle className="text-2xl font-literata text-coral-dark">
              {t('recipe.nutrition')}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-peach/20 rounded-lg">
                <div className="text-2xl font-bold text-coral-dark">
                  {recipe.nutritionalInfo.calories}
                </div>
                <div className="text-sm text-gray-600">{t('recipe.nutrition.calories')}</div>
              </div>
              <div className="text-center p-4 bg-teal/10 rounded-lg">
                <div className="text-2xl font-bold text-teal-dark">
                  {recipe.nutritionalInfo.protein}
                </div>
                <div className="text-sm text-gray-600">{t('recipe.nutrition.protein')}</div>
              </div>
              <div className="text-center p-4 bg-coral/10 rounded-lg">
                <div className="text-2xl font-bold text-coral-dark">
                  {recipe.nutritionalInfo.carbs}
                </div>
                <div className="text-sm text-gray-600">{t('recipe.nutrition.carbs')}</div>
              </div>
              <div className="text-center p-4 bg-peach/20 rounded-lg">
                <div className="text-2xl font-bold text-coral-dark">
                  {recipe.nutritionalInfo.fat}
                </div>
                <div className="text-sm text-gray-600">{t('recipe.nutrition.fat')}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RecipeDisplay;
