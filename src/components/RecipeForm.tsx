
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';

interface RecipeFormProps {
  onSubmit: (data: RecipeFormData) => void;
  isLoading: boolean;
}

export interface RecipeFormData {
  ingredients: string[];
  dietaryRestrictions: string[];
  cuisinePreference: string;
  cookingTime: string;
  servings: number;
  additionalNotes: string;
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, isLoading }) => {
  const [ingredients, setIngredients] = useState<string[]>(['']);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [cuisinePreference, setCuisinePreference] = useState('');
  const [cookingTime, setCookingTime] = useState('30');
  const [servings, setServings] = useState(4);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [newRestriction, setNewRestriction] = useState('');

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const updateIngredient = (index: number, value: string) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addDietaryRestriction = () => {
    if (newRestriction.trim() && !dietaryRestrictions.includes(newRestriction.trim())) {
      setDietaryRestrictions([...dietaryRestrictions, newRestriction.trim()]);
      setNewRestriction('');
    }
  };

  const removeDietaryRestriction = (restriction: string) => {
    setDietaryRestrictions(dietaryRestrictions.filter(r => r !== restriction));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredIngredients = ingredients.filter(ing => ing.trim() !== '');
    
    if (filteredIngredients.length === 0) {
      alert('Please add at least one ingredient');
      return;
    }

    onSubmit({
      ingredients: filteredIngredients,
      dietaryRestrictions,
      cuisinePreference,
      cookingTime,
      servings,
      additionalNotes
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-2 border-coral/20">
      <CardHeader className="bg-gradient-to-r from-coral/10 to-peach/20 rounded-t-lg">
        <CardTitle className="text-2xl font-literata text-coral-dark text-center">
          Create Your Perfect Recipe
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Ingredients Section */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-coral-dark">Available Ingredients</Label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={ingredient}
                  onChange={(e) => updateIngredient(index, e.target.value)}
                  placeholder="e.g., chicken breast, tomatoes, basil..."
                  className="flex-1 border-coral/30 focus:border-coral"
                />
                {ingredients.length > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => removeIngredient(index)}
                    className="border-coral/30 text-coral-dark hover:bg-coral/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addIngredient}
              className="w-full border-coral/30 text-coral-dark hover:bg-coral/10"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Ingredient
            </Button>
          </div>

          {/* Dietary Restrictions */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-coral-dark">Dietary Preferences</Label>
            <div className="flex gap-2">
              <Input
                value={newRestriction}
                onChange={(e) => setNewRestriction(e.target.value)}
                placeholder="e.g., vegetarian, gluten-free, dairy-free..."
                className="flex-1 border-coral/30 focus:border-coral"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addDietaryRestriction())}
              />
              <Button
                type="button"
                onClick={addDietaryRestriction}
                className="bg-teal hover:bg-teal-dark text-white"
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {dietaryRestrictions.map((restriction) => (
                <Badge
                  key={restriction}
                  variant="secondary"
                  className="bg-teal/20 text-teal-dark hover:bg-teal/30"
                >
                  {restriction}
                  <X
                    className="h-3 w-3 ml-1 cursor-pointer"
                    onClick={() => removeDietaryRestriction(restriction)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Cuisine and Time */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-coral-dark font-semibold">Cuisine Style</Label>
              <Input
                value={cuisinePreference}
                onChange={(e) => setCuisinePreference(e.target.value)}
                placeholder="e.g., Italian, Asian, Mexican..."
                className="border-coral/30 focus:border-coral"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-coral-dark font-semibold">Cooking Time (minutes)</Label>
              <Input
                type="number"
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
                min="5"
                max="240"
                className="border-coral/30 focus:border-coral"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-coral-dark font-semibold">Servings</Label>
              <Input
                type="number"
                value={servings}
                onChange={(e) => setServings(parseInt(e.target.value))}
                min="1"
                max="12"
                className="border-coral/30 focus:border-coral"
              />
            </div>
          </div>

          {/* Additional Notes */}
          <div className="space-y-2">
            <Label className="text-coral-dark font-semibold">Additional Notes</Label>
            <Textarea
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Any special requests, cooking methods, or preferences..."
              className="border-coral/30 focus:border-coral min-h-20"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-coral hover:bg-coral-dark text-white font-semibold py-3 text-lg transition-all duration-200 hover:shadow-lg"
          >
            {isLoading ? 'Creating Your Recipe...' : 'Generate Recipe'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RecipeForm;
