
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface RecipeFormProps {
  onSubmit: (data: RecipeFormData) => void;
  isLoading: boolean;
}

export interface RecipeFormData {
  dishName: string;
  dietaryRestrictions: string[];
}

const RecipeForm: React.FC<RecipeFormProps> = ({ onSubmit, isLoading }) => {
  const [dishName, setDishName] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string[]>([]);
  const [newRestriction, setNewRestriction] = useState('');

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
    
    if (!dishName.trim()) {
      alert('Please enter a dish name');
      return;
    }

    onSubmit({
      dishName: dishName.trim(),
      dietaryRestrictions
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
          {/* Dish Name Section */}
          <div className="space-y-2">
            <Label className="text-lg font-semibold text-coral-dark">Dish Name</Label>
            <Input
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              placeholder="e.g., Chicken Tikka Masala, Pasta Carbonara, Chocolate Cake..."
              className="border-coral/30 focus:border-coral text-lg"
            />
          </div>

          {/* Dietary Restrictions */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-coral-dark">Dietary Preferences (Optional)</Label>
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
