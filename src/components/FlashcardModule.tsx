
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface FlashcardModuleProps {
  level: number;
  onBack: () => void;
  language: 'english' | 'oromo';
}

const flashcardData = {
  english: {
    2: [
      { english: "Apple", oromo: "Poomii", emoji: "🍎", letter: "A" },
      { english: "Ball", oromo: "Kubbaa", emoji: "⚽", letter: "B" },
      { english: "Cat", oromo: "Adurree", emoji: "🐱", letter: "C" },
      { english: "Dog", oromo: "Saree", emoji: "🐶", letter: "D" },
      { english: "Elephant", oromo: "Carbaa", emoji: "🐘", letter: "E" },
      { english: "Fish", oromo: "Qurxummii", emoji: "🐟", letter: "F" },
      { english: "Goat", oromo: "Re'ee", emoji: "🐐", letter: "G" },
      { english: "House", oromo: "Mana", emoji: "🏠", letter: "H" },
    ]
  },
  oromo: {
    2: [
      { english: "Apple", oromo: "Poomii", emoji: "🍎", letter: "A" },
      { english: "Ball", oromo: "Kubbaa", emoji: "⚽", letter: "B" },
      { english: "Cat", oromo: "Adurree", emoji: "🐱", letter: "C" },
      { english: "Dog", oromo: "Saree", emoji: "🐶", letter: "D" },
      { english: "Elephant", oromo: "Carbaa", emoji: "🐘", letter: "E" },
      { english: "Fish", oromo: "Qurxummii", emoji: "🐟", letter: "F" },
      { english: "Goat", oromo: "Re'ee", emoji: "🐐", letter: "G" },
      { english: "House", oromo: "Mana", emoji: "🏠", letter: "H" },
    ]
  }
};

const FlashcardModule = ({ level, onBack, language }: FlashcardModuleProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [score, setScore] = useState(0);

  const cards = flashcardData[language][level as keyof typeof flashcardData[typeof language]] || flashcardData[language][2];
  const currentCard = cards[currentCardIndex];

  const uiContent = {
    english: {
      back: "Back to Levels",
      title: "Letter Words",
      description: "Learn words with letters!",
      tapToFlip: "Tap to flip!",
      listen: "Listen",
      previous: "Previous",
      next: "Next",
      progress: "Progress:",
      score: "Score"
    },
    oromo: {
      back: "Gara Sadarkootatti",
      title: "Jechota Qubee",
      description: "Jechota qubee waliin baradhu!",
      tapToFlip: "Garagaluuf dhiibi!",
      listen: "Dhaggeeffadhu",
      previous: "Duraa",
      next: "Itti aansu",
      progress: "Adeemsa:",
      score: "Qabannoo"
    }
  };

  const ui = uiContent[language];

  const handleCardFlip = () => {
    setShowWord(!showWord);
  };

  const handleNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowWord(false);
      setScore(score + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowWord(false);
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3"
          >
            ← {ui.back}
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              📚 {ui.title}
            </h1>
            <div className="text-white/80">
              {ui.description}
            </div>
            <div className="text-white/80">
              Card {currentCardIndex + 1} of {cards.length} • {ui.score}: {score} ⭐
            </div>
          </div>
          <div className="w-32"></div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-lg w-full min-h-96 flex flex-col justify-center items-center cursor-pointer transform hover:scale-105 transition-all duration-300"
               onClick={handleCardFlip}>
            
            {!showWord ? (
              <div className="text-center">
                <div className="text-9xl font-bold text-purple-600 mb-6 animate-pulse">
                  {currentCard.letter}
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-4">
                  Letter {currentCard.letter}
                </div>
                <div className="text-gray-500 text-lg">
                  {ui.tapToFlip} 🔄
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-8xl mb-6">{currentCard.emoji}</div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {currentCard.letter} for {language === 'english' ? currentCard.english : currentCard.oromo}
                </div>
                <div className="text-lg text-gray-600 mb-4">
                  {language === 'english' ? 'English' : 'Afaan Oromo'}
                </div>
                <div className="text-xl text-purple-600">
                  {language === 'english' ? currentCard.oromo : currentCard.english}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <Button
            onClick={handlePrevCard}
            disabled={currentCardIndex === 0}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            ← {ui.previous}
          </Button>
          
          <Button
            onClick={() => speakText(`${currentCard.letter} for ${language === 'english' ? currentCard.english : currentCard.oromo}`)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            🔊 {ui.listen}
          </Button>
          
          <Button
            onClick={handleNextCard}
            disabled={currentCardIndex === cards.length - 1}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            {ui.next} →
          </Button>
        </div>

        <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-between items-center">
            <div className="text-white font-semibold">{ui.progress}</div>
            <div className="flex space-x-1">
              {cards.map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full ${
                    index <= currentCardIndex ? 'bg-yellow-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardModule;
