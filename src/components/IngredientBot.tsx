
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Recipe } from './RecipeDisplay';

interface IngredientBotProps {
  recipe: Recipe;
}

interface BotMessage {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const IngredientBot: React.FC<IngredientBotProps> = ({ recipe }) => {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<BotMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    // Mock AI response for ingredient substitution
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple pattern matching for common substitutions
    if (lowerMessage.includes('butter') && lowerMessage.includes('oil')) {
      return "Yes, you can substitute butter with coconut oil! Use 3/4 the amount of coconut oil as butter (if recipe calls for 1 cup butter, use 3/4 cup coconut oil). This will add a subtle coconut flavor and make the dish slightly less rich. The texture might be slightly different but still delicious!";
    }
    
    if (lowerMessage.includes('milk') && (lowerMessage.includes('almond') || lowerMessage.includes('coconut'))) {
      return "Absolutely! You can replace regular milk with almond or coconut milk in a 1:1 ratio. Coconut milk will add richness and subtle sweetness, while almond milk will be lighter. For baking, use unsweetened versions for best results.";
    }
    
    if (lowerMessage.includes('egg') && lowerMessage.includes('substitute')) {
      return "Great question! You can substitute eggs with: 1 egg = 1/4 cup applesauce, 1 mashed banana, or 1 tbsp ground flaxseed + 3 tbsp water (let sit for 5 minutes). For binding, applesauce works great. For leavening, try the flax egg!";
    }
    
    if (lowerMessage.includes('sugar') && lowerMessage.includes('honey')) {
      return "Yes! You can replace sugar with honey, but use 3/4 the amount (if recipe calls for 1 cup sugar, use 3/4 cup honey). Reduce other liquids by 1/4 cup and add 1/4 tsp baking soda. The dish will be moister and have a distinct honey flavor.";
    }
    
    // Generic response for other questions
    return `I understand you're asking about ingredient substitutions for "${recipe.title}". While I can provide general guidance, I'd recommend checking if the substitute has similar properties (fat content, acidity, sweetness) to the original ingredient. Start with small amounts and adjust to taste. Would you like specific advice about a particular ingredient?`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: BotMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const botResponse = await generateBotResponse(inputValue);
      
      const botMessage: BotMessage = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Bot response error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="shadow-lg border-2 border-teal/30">
      <CardHeader className="bg-teal/20">
        <CardTitle className="text-2xl font-literata text-coral-dark flex items-center gap-2">
          <Bot className="h-6 w-6 text-teal-dark" />
          {t('bot.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {/* Chat Messages */}
        <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-4">
              <p className="text-sm">{t('bot.example')}</p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-coral text-white'
                    : 'bg-teal/10 text-gray-800 border border-teal/20'
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-teal/10 p-3 rounded-lg border border-teal/20">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-teal rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-teal rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-teal rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={t('bot.placeholder')}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="bg-teal hover:bg-teal-dark text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IngredientBot;
