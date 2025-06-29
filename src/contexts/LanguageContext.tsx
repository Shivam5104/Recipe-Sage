
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ta' | 'hi' | 'de' | 'fr';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'recipe.creator': 'Recipe Creator',
    'recipe.tagline': 'Transform your available ingredients into delicious, personalized recipes with the power of AI. Let\'s create something amazing together!',
    'recipe.generated': 'Recipe Generated! 🍳',
    'recipe.ready': 'Your personalized recipe is ready to cook!',
    'recipe.error': 'Oops! Something went wrong',
    'recipe.error.desc': 'We couldn\'t generate your recipe. Please try again.',
    'recipe.create.another': 'Create Another Recipe',
    'recipe.footer': 'Crafted with ❤️ for home cooks who love to create',
    'recipe.ingredients': 'Ingredients',
    'recipe.instructions': 'Instructions',
    'recipe.nutrition': 'Nutritional Information (per serving)',
    'recipe.nutrition.calories': 'Calories',
    'recipe.nutrition.protein': 'Protein',
    'recipe.nutrition.carbs': 'Carbs',
    'recipe.nutrition.fat': 'Fat',
    'recipe.tip': 'Tip',
    'bot.title': 'Ingredient Substitution Bot',
    'bot.placeholder': 'Ask about ingredient substitutions...',
    'bot.send': 'Send',
    'bot.example': 'Can I substitute butter with coconut oil in this recipe?'
  },
  ta: {
    'recipe.creator': 'சமையல் உருவாக்கி',
    'recipe.tagline': 'உங்கள் கிடைக்கும் பொருட்களை AI வலிமையுடன் சுவையான, தனிப்பட்ட சமையல் குறிப்புகளாக மாற்றுங்கள். ஒன்றாக அற்புதமான ஒன்றை உருவாக்குவோம்!',
    'recipe.generated': 'சமையல் குறிப்பு தயார்! 🍳',
    'recipe.ready': 'உங்கள் தனிப்பட்ட சமையல் குறிப்பு சமைக்க தயார்!',
    'recipe.error': 'அட! ஏதோ தவறு நடந்தது',
    'recipe.error.desc': 'உங்கள் சமையல் குறிப்பை உருவாக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',
    'recipe.create.another': 'மற்றொரு சமையல் குறிப்பை உருவாக்கவும்',
    'recipe.footer': 'சமைக்க விரும்பும் வீட்டு சமையல்காரர்களுக்காக ❤️ உடன் வடிவமைக்கப்பட்டது',
    'recipe.ingredients': 'பொருட்கள்',
    'recipe.instructions': 'வழிமுறைகள்',
    'recipe.nutrition': 'ஊட்டச்சத்து தகவல் (ஒரு பரிமாறுதலுக்கு)',
    'recipe.nutrition.calories': 'கலோரிகள்',
    'recipe.nutrition.protein': 'புரதம்',
    'recipe.nutrition.carbs': 'கார்போஹைட்ரேட்',
    'recipe.nutrition.fat': 'கொழுப்பு',
    'recipe.tip': 'குறிப்பு',
    'bot.title': 'பொருள் மாற்று போட்',
    'bot.placeholder': 'பொருள் மாற்றுகள் பற்றி கேளுங்கள்...',
    'bot.send': 'அனுப்பு',
    'bot.example': 'இந்த சமையலில் வெண்ணெய்க்கு பதில் தேங்காய் எண்ணெய் பயன்படுத்தலாமா?'
  },
  hi: {
    'recipe.creator': 'रेसिपी क्रिएटर',
    'recipe.tagline': 'AI की शक्ति से अपनी उपलब्ध सामग्रियों को स्वादिष्ट, व्यक्तिगत व्यंजनों में बदलें। आइए मिलकर कुछ अद्भुत बनाते हैं!',
    'recipe.generated': 'रेसिपी तैयार! 🍳',
    'recipe.ready': 'आपकी व्यक्तिगत रेसिपी पकाने के लिए तैयार है!',
    'recipe.error': 'अरे! कुछ गलत हुआ',
    'recipe.error.desc': 'हम आपकी रेसिपी नहीं बना सके। कृपया पुनः प्रयास करें।',
    'recipe.create.another': 'एक और रेसिपी बनाएं',
    'recipe.footer': 'घर के खाना बनाने वालों के लिए ❤️ से तैयार',
    'recipe.ingredients': 'सामग्री',
    'recipe.instructions': 'निर्देश',
    'recipe.nutrition': 'पोषण संबंधी जानकारी (प्रति सर्विंग)',
    'recipe.nutrition.calories': 'कैलोरी',
    'recipe.nutrition.protein': 'प्रोटीन',
    'recipe.nutrition.carbs': 'कार्ब्स',
    'recipe.nutrition.fat': 'फैट',
    'recipe.tip': 'टिप',
    'bot.title': 'सामग्री विकल्प बॉट',
    'bot.placeholder': 'सामग्री के विकल्प के बारे में पूछें...',
    'bot.send': 'भेजें',
    'bot.example': 'क्या मैं इस रेसिपी में मक्खन की जगह नारियल तेल का उपयोग कर सकता हूं?'
  },
  de: {
    'recipe.creator': 'Rezept Creator',
    'recipe.tagline': 'Verwandeln Sie Ihre verfügbaren Zutaten mit der Kraft der KI in köstliche, personalisierte Rezepte. Lassen Sie uns gemeinsam etwas Großartiges schaffen!',
    'recipe.generated': 'Rezept erstellt! 🍳',
    'recipe.ready': 'Ihr personalisiertes Rezept ist bereit zum Kochen!',
    'recipe.error': 'Ups! Etwas ist schief gelaufen',
    'recipe.error.desc': 'Wir konnten Ihr Rezept nicht erstellen. Bitte versuchen Sie es erneut.',
    'recipe.create.another': 'Ein weiteres Rezept erstellen',
    'recipe.footer': 'Mit ❤️ für Hobbyköche gemacht',
    'recipe.ingredients': 'Zutaten',
    'recipe.instructions': 'Anweisungen',
    'recipe.nutrition': 'Nährwertangaben (pro Portion)',
    'recipe.nutrition.calories': 'Kalorien',
    'recipe.nutrition.protein': 'Protein',
    'recipe.nutrition.carbs': 'Kohlenhydrate',
    'recipe.nutrition.fat': 'Fett',
    'recipe.tip': 'Tipp',
    'bot.title': 'Zutaten-Ersatz Bot',
    'bot.placeholder': 'Fragen Sie nach Zutaten-Alternativen...',
    'bot.send': 'Senden',
    'bot.example': 'Kann ich Butter durch Kokosöl in diesem Rezept ersetzen?'
  },
  fr: {
    'recipe.creator': 'Créateur de Recettes',
    'recipe.tagline': 'Transformez vos ingrédients disponibles en délicieuses recettes personnalisées avec le pouvoir de l\'IA. Créons quelque chose d\'incroyable ensemble!',
    'recipe.generated': 'Recette générée! 🍳',
    'recipe.ready': 'Votre recette personnalisée est prête à cuisiner!',
    'recipe.error': 'Oups! Quelque chose s\'est mal passé',
    'recipe.error.desc': 'Nous n\'avons pas pu générer votre recette. Veuillez réessayer.',
    'recipe.create.another': 'Créer une autre recette',
    'recipe.footer': 'Conçu avec ❤️ pour les cuisiniers passionnés',
    'recipe.ingredients': 'Ingrédients',
    'recipe.instructions': 'Instructions',
    'recipe.nutrition': 'Informations nutritionnelles (par portion)',
    'recipe.nutrition.calories': 'Calories',
    'recipe.nutrition.protein': 'Protéines',
    'recipe.nutrition.carbs': 'Glucides',
    'recipe.nutrition.fat': 'Lipides',
    'recipe.tip': 'Conseil',
    'bot.title': 'Bot de Substitution d\'Ingrédients',
    'bot.placeholder': 'Demandez des alternatives d\'ingrédients...',
    'bot.send': 'Envoyer',
    'bot.example': 'Puis-je remplacer le beurre par l\'huile de coco dans cette recette?'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
