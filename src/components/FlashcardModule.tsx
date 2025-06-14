
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { speakText } from '@/utils/speechUtils';

interface FlashcardModuleProps {
  level: number;
  onBack: () => void;
  language: 'english' | 'oromo';
}

const flashcardData = {
  english: {
    2: [
      { english: "Elephant", oromo: "Arba", emoji: "🐘", letter: "A" },
      { english: "Coffee", oromo: "Buna", emoji: "☕", letter: "B" },
      { english: "Ice", oromo: "Cabbi", emoji: "🧊", letter: "C" },
      { english: "Honey", oromo: "Damma", emoji: "🍯", letter: "D" },
      { english: "Tail", oromo: "Eegee", emoji: "🦎", letter: "E" },
      { english: "Horse", oromo: "Farda", emoji: "🐴", letter: "F" },
      { english: "Black", oromo: "Gurraacha", emoji: "⬛", letter: "G" },
      { english: "Lake", oromo: "Haroo", emoji: "🏞️", letter: "H" },
      { english: "Child", oromo: "Ilma", emoji: "👦", letter: "I" },
      { english: "Monkey", oromo: "Jaldeessa", emoji: "🐒", letter: "J" },
      { english: "Book", oromo: "Kitaaba", emoji: "📖", letter: "K" },
      { english: "Cow", oromo: "Loon", emoji: "🐄", letter: "L" },
      { english: "Tree", oromo: "Muka", emoji: "🌳", letter: "M" },
      { english: "Person", oromo: "Nama", emoji: "👤", letter: "N" },
      { english: "Sacred Tree", oromo: "Odaa", emoji: "🌳", letter: "O" },
      { english: "Papaya", oromo: "Pappayaa", emoji: "🥭", letter: "P" },
      { english: "Monkey", oromo: "Qamalee", emoji: "🐒", letter: "Q" },
      { english: "Frog", oromo: "Raachaa", emoji: "🐸", letter: "R" },
      { english: "Dog", oromo: "Saree", emoji: "🐶", letter: "S" },
      { english: "One", oromo: "Tokko", emoji: "1️⃣", letter: "T" },
      { english: "Stick", oromo: "Ulee", emoji: "🪵", letter: "U" },
      { english: "Violin", oromo: "Vayooliini", emoji: "🎻", letter: "V" },
      { english: "Hyena", oromo: "Waraabessa", emoji: "🐺", letter: "W" },
      { english: "Letter", oromo: "Xalayaa", emoji: "✉️", letter: "X" },
      { english: "Fox", oromo: "Yeeyyii", emoji: "🦊", letter: "Y" },
      { english: "Zero", oromo: "Zeeroo", emoji: "0️⃣", letter: "Z" },
    ]
  },
  oromo: {
    2: [
      { english: "Elephant", oromo: "Arba", emoji: "🐘", letter: "A" },
      { english: "Coffee", oromo: "Buna", emoji: "☕", letter: "B" },
      { english: "Ice", oromo: "Cabbi", emoji: "🧊", letter: "C" },
      { english: "Honey", oromo: "Damma", emoji: "🍯", letter: "D" },
      { english: "Tail", oromo: "Eegee", emoji: "🦎", letter: "E" },
      { english: "Horse", oromo: "Farda", emoji: "🐴", letter: "F" },
      { english: "Black", oromo: "Gurraacha", emoji: "⬛", letter: "G" },
      { english: "Lake", oromo: "Haroo", emoji: "🏞️", letter: "H" },
      { english: "Child", oromo: "Ilma", emoji: "👦", letter: "I" },
      { english: "Monkey", oromo: "Jaldeessa", emoji: "🐒", letter: "J" },
      { english: "Book", oromo: "Kitaaba", emoji: "📖", letter: "K" },
      { english: "Cow", oromo: "Loon", emoji: "🐄", letter: "L" },
      { english: "Tree", oromo: "Muka", emoji: "🌳", letter: "M" },
      { english: "Person", oromo: "Nama", emoji: "👤", letter: "N" },
      { english: "Sacred Tree", oromo: "Odaa", emoji: "🌳", letter: "O" },
      { english: "Papaya", oromo: "Pappayaa", emoji: "🥭", letter: "P" },
      { english: "Monkey", oromo: "Qamalee", emoji: "🐒", letter: "Q" },
      { english: "Frog", oromo: "Raachaa", emoji: "🐸", letter: "R" },
      { english: "Dog", oromo: "Saree", emoji: "🐶", letter: "S" },
      { english: "One", oromo: "Tokko", emoji: "1️⃣", letter: "T" },
      { english: "Stick", oromo: "Ulee", emoji: "🪵", letter: "U" },
      { english: "Violin", oromo: "Vayooliini", emoji: "🎻", letter: "V" },
      { english: "Hyena", oromo: "Waraabessa", emoji: "🐺", letter: "W" },
      { english: "Letter", oromo: "Xalayaa", emoji: "✉️", letter: "X" },
      { english: "Fox", oromo: "Yeeyyii", emoji: "🦊", letter: "Y" },
      { english: "Zero", oromo: "Zeeroo", emoji: "0️⃣", letter: "Z" },
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
                
                {/* Visual representation */}
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                  <span className="text-4xl">📚</span>
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
                
                {/* Enhanced visual card with image placeholder */}
                <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center shadow-lg">
                  <span className="text-6xl">{currentCard.emoji}</span>
                </div>
                
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
            onClick={() => speakText(`${currentCard.letter} for ${language === 'english' ? currentCard.english : currentCard.oromo}`, language)}
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
