
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

const LanguageSelector: React.FC = () => {
  const { currentLanguage, setLanguage } = useLanguage();

  const languages: { value: Language; label: string; flag: string }[] = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'ta', label: 'தமிழ்', flag: '🇮🇳' },
    { value: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' }
  ];

  return (
    <div className="flex items-center gap-2">
      <Languages className="h-5 w-5 text-coral-dark" />
      <Select value={currentLanguage} onValueChange={(value: Language) => setLanguage(value)}>
        <SelectTrigger className="w-40 bg-white/80 border-coral/30">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value}>
              <div className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
