
import { useState } from 'react';
import WelcomeScreen from '@/components/WelcomeScreen';
import LevelSelection from '@/components/LevelSelection';
import FlashcardModule from '@/components/FlashcardModule';
import AlphabetModule from '@/components/AlphabetModule';
import ConversationModule from '@/components/ConversationModule';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<'welcome' | 'levels' | 'flashcards' | 'alphabet' | 'conversations'>('welcome');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);

  const handleStartLearning = () => {
    setCurrentScreen('levels');
  };

  const handleLevelSelect = (level: number) => {
    setSelectedLevel(level);
    
    // Navigate to appropriate module based on level
    if (level === 1) {
      setCurrentScreen('alphabet');
    } else if (level === 4) {
      setCurrentScreen('conversations');
    } else {
      setCurrentScreen('flashcards');
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
        <WelcomeScreen onStartLearning={handleStartLearning} />
      )}
      {currentScreen === 'levels' && (
        <LevelSelection 
          onLevelSelect={handleLevelSelect}
          onBack={handleBackToWelcome}
        />
      )}
      {currentScreen === 'flashcards' && (
        <FlashcardModule 
          level={selectedLevel}
          onBack={handleBackToLevels}
        />
      )}
      {currentScreen === 'alphabet' && (
        <AlphabetModule onBack={handleBackToLevels} />
      )}
      {currentScreen === 'conversations' && (
        <ConversationModule onBack={handleBackToLevels} />
      )}
    </div>
  );
};

export default Index;
