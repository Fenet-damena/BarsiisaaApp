import { useState, useEffect } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import LevelSelection from '@/components/LevelSelection';
import FlashcardModule from '@/components/FlashcardModule';
import AlphabetModule from '@/components/AlphabetModule';
import ConversationModule from '@/components/ConversationModule';
import WordGameModule from '@/components/WordGameModule';
import AnimalSlideModule from '@/components/AnimalSlideModule';
import CalendarModule from '@/components/CalendarModule';
import LetterGameModule from '@/components/LetterGameModule';
import BodyPartsModule from '@/components/BodyPartsModule';
import FlagModule from '@/components/FlagModule';
import MathModule from '@/components/MathModule';
import MathTeachingModule from '@/components/MathTeachingModule';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'levels' | 'alphabet' | 'flashcards' | 'words' | 'conversations' | 'lettergame' | 'animals' | 'calendar' | 'bodyparts' | 'flags' | 'math' | 'mathteaching'>('welcome');
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
        setCurrentScreen('words');
        break;
      case 7:
        setCurrentScreen('lettergame');
        break;
      case 8:
        setCurrentScreen('bodyparts');
        break;
      case 9:
        setCurrentScreen('flags');
        break;
      case 10:
        setCurrentScreen('mathteaching');
        break;
      case 11:
        setCurrentScreen('math');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 animated-gradient">
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
          level={selectedLevel}
        />
      )}
      {currentScreen === 'lettergame' && (
        <LetterGameModule 
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
      {currentScreen === 'bodyparts' && (
        <BodyPartsModule 
          onBack={handleBackToLevels}
          language={selectedLanguage}
        />
      )}
      {currentScreen === 'flags' && (
        <FlagModule 
          onBack={handleBackToLevels}
          language={selectedLanguage}
        />
      )}
      {currentScreen === 'math' && (
        <MathModule 
          onBack={handleBackToLevels}
          language={selectedLanguage}
        />
      )}
      {currentScreen === 'mathteaching' && (
        <MathTeachingModule 
          onBack={handleBackToLevels}
          language={selectedLanguage}
        />
      )}
    </div>
  );
};

export default Index;
