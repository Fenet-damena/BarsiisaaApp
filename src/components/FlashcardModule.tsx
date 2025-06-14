
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface FlashcardModuleProps {
  level: number;
  onBack: () => void;
}

const flashcardData = {
  1: [
    { english: "Apple", oromo: "Poomii", emoji: "🍎" },
    { english: "Cat", oromo: "Adurree", emoji: "🐱" },
    { english: "Dog", oromo: "Saree", emoji: "🐶" },
    { english: "Sun", oromo: "Aduun", emoji: "☀️" },
    { english: "Water", oromo: "Bishaan", emoji: "💧" },
  ],
  2: [
    { english: "Circle", oromo: "Geengoo", emoji: "⭕" },
    { english: "Red", oromo: "Diimaa", emoji: "🔴" },
    { english: "Blue", oromo: "Biyyee", emoji: "🔵" },
    { english: "Big", oromo: "Guddaa", emoji: "🐘" },
    { english: "Small", oromo: "Xinnaaa", emoji: "🐭" },
  ],
  3: [
    { english: "Hello", oromo: "Nagaatti", emoji: "👋" },
    { english: "Thank you", oromo: "Galatoomaa", emoji: "🙏" },
    { english: "Good morning", oromo: "Nagaa ganama", emoji: "🌅" },
    { english: "Good night", oromo: "Nagaa halkan", emoji: "🌙" },
    { english: "Please", oromo: "Maaloo", emoji: "🤝" },
  ],
  4: [
    { english: "Story", oromo: "Seenaa", emoji: "📚" },
    { english: "Book", oromo: "Kitaaba", emoji: "📖" },
    { english: "Friend", oromo: "Hiriyaa", emoji: "👫" },
    { english: "Happy", oromo: "Gammachuu", emoji: "😊" },
    { english: "Love", oromo: "Jaalala", emoji: "❤️" },
  ],
  5: [
    { english: "How are you?", oromo: "Akkam jirta?", emoji: "🤔" },
    { english: "I am fine", oromo: "Ani nagaan jira", emoji: "😊" },
    { english: "What is your name?", oromo: "Maqaan kee eenyu?", emoji: "🏷️" },
    { english: "My name is", oromo: "Maqaan koo", emoji: "👋" },
    { english: "Nice to meet you", oromo: "Si arguuf natti tola", emoji: "🤝" },
  ],
};

const FlashcardModule = ({ level, onBack }: FlashcardModuleProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showOromo, setShowOromo] = useState(false);
  const [score, setScore] = useState(0);

  const cards = flashcardData[level as keyof typeof flashcardData] || flashcardData[1];
  const currentCard = cards[currentCardIndex];

  const handleCardFlip = () => {
    setShowOromo(!showOromo);
  };

  const handleNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowOromo(false);
      setScore(score + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowOromo(false);
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
            ← Back to Levels
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              Level {level} Flashcards 📚
            </h1>
            <div className="text-white/80">
              Card {currentCardIndex + 1} of {cards.length} • Score: {score} ⭐
            </div>
          </div>
          <div className="w-32"></div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-lg w-full min-h-96 flex flex-col justify-center items-center cursor-pointer transform hover:scale-105 transition-all duration-300"
               onClick={handleCardFlip}>
            
            <div className="text-8xl mb-6">{currentCard.emoji}</div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800 mb-4">
                {showOromo ? currentCard.oromo : currentCard.english}
              </div>
              <div className="text-lg text-gray-600 mb-6">
                {showOromo ? 'Afaan Oromo' : 'English'}
              </div>
              <div className="text-gray-500 text-sm">
                Tap to flip! 🔄
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <Button
            onClick={handlePrevCard}
            disabled={currentCardIndex === 0}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            ← Previous
          </Button>
          
          <Button
            onClick={() => speakText(showOromo ? currentCard.oromo : currentCard.english)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            🔊 Listen
          </Button>
          
          <Button
            onClick={handleNextCard}
            disabled={currentCardIndex === cards.length - 1}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            Next →
          </Button>
        </div>

        <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-between items-center">
            <div className="text-white font-semibold">Progress:</div>
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
