
import { useState, useEffect } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import LevelSelection from '@/components/LevelSelection';
import FlashcardModule from '@/components/FlashcardModule';
import AlphabetModule from '@/components/AlphabetModule';
import ConversationModule from '@/components/ConversationModule';
import WordGameModule from '@/components/WordGameModule';
import AnimalSlideModule from '@/components/AnimalSlideModule';
import CalendarModule from '@/components/CalendarModule';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'levels' | 'alphabet' | 'flashcards' | 'words' | 'conversations' | 'games' | 'animals' | 'calendar'>('welcome');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [selectedLanguage, setSelectedLanguage] = useState<'english' | 'oromo'>('english');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') as 'english' | 'oromo';
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  const handleStartLearning = () => {
    setCurrentScreen('levels');
  };

  const handleLanguageSelect = (language: 'english' | 'oromo') => {
    setSelectedLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level);
    
    // Navigate to appropriate module based on level
    switch (level) {
      case 1:
        setCurrentScreen('alphabet');
        break;
      case 2:
        setCurrentScreen('flashcards');
        break;
      case 3:
        setCurrentScreen('words');
        break;
      case 4:
        setCurrentScreen('calendar');
        break;
      case 5:
        setCurrentScreen('conversations');
        break;
      case 6:
        setCurrentScreen('games');
        break;
      case 7:
        setCurrentScreen('animals');
        break;
      default:
        setCurrentScreen('alphabet');
    }
  };

  const handleBackToLevels = () => {
    setCurrentScreen('levels');
  };

  const handleBackToWelcome = () => {
    setCurrentScreen('welcome');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400">
      {currentScreen === 'welcome' && (
        <WelcomeScreen 
          onStartLearning={handleStartLearning}
          onLanguageSelect={handleLanguageSelect}
          selectedLanguage={selectedLanguage}
        />
      )}
      {currentScreen === 'levels' && (
        <LevelSelection 
          onLevelSelect={handleLevelSelect}
          onBack={handleBackToWelcome}
          language={selectedLanguage}
        />
      )}
      {currentScreen === 'alphabet' && (
        <AlphabetModule 
          onBack={handleBackToLevels}
          language={selectedLanguage}
        />
      )}
      {currentScreen === 'flashcards' && (
        <FlashcardModule 
          level={selectedLevel}
          onBack={handleBackToLevels}
          language={selectedLanguage}
        />
      )}
      {currentScreen === 'words' && (
        <WordGameModule 
          onBack={handleBackToLevels}
          language={selectedLanguage}
        />
      )}
      {currentScreen === 'calendar' && (
        <CalendarModule 
          onBack={handleBackToLevels}
          language={selectedLanguage}
        />
      )}
      {currentScreen === 'conversations' && (
        <ConversationModule 
          onBack={handleBackToLevels}
          language={selectedLanguage}
        />
      )}
      {currentScreen === 'games' && (
        <WordGameModule 
          onBack={handleBackToLevels}
          language={selectedLanguage}
        />
      )}
      {currentScreen === 'animals' && (
        <AnimalSlideModule 
          onBack={handleBackToLevels}
          language={selectedLanguage}
        />
      )}
    </div>
  );
};

export default Index;

