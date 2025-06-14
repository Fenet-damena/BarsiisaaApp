
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface AlphabetModuleProps {
  onBack: () => void;
}

const alphabetData = [
  { letter: "A", english: "Apple", oromo: "Poomii", emoji: "🍎", sound: "/a/" },
  { letter: "B", english: "Ball", oromo: "Kubbaa", emoji: "⚽", sound: "/b/" },
  { letter: "C", english: "Cat", oromo: "Adurree", emoji: "🐱", sound: "/k/" },
  { letter: "D", english: "Dog", oromo: "Saree", emoji: "🐶", sound: "/d/" },
  { letter: "E", english: "Elephant", oromo: "Carbaa", emoji: "🐘", sound: "/e/" },
  { letter: "F", english: "Fish", oromo: "Qurxummii", emoji: "🐟", sound: "/f/" },
  { letter: "G", english: "Goat", oromo: "Re'ee", emoji: "🐐", sound: "/g/" },
  { letter: "H", english: "House", oromo: "Mana", emoji: "🏠", sound: "/h/" },
];

const AlphabetModule = ({ onBack }: AlphabetModuleProps) => {
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [language, setLanguage] = useState<'english' | 'oromo'>('english');

  const currentLetter = alphabetData[currentLetterIndex];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (currentLetterIndex < alphabetData.length - 1) {
      setCurrentLetterIndex(currentLetterIndex + 1);
      setShowWord(false);
    }
  };

  const handlePrevious = () => {
    if (currentLetterIndex > 0) {
      setCurrentLetterIndex(currentLetterIndex - 1);
      setShowWord(false);
    }
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-20 h-20 bg-yellow-300 rounded-full animate-bounce opacity-40"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-300 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-32 left-20 w-24 h-24 bg-blue-300 rounded-full animate-bounce delay-300 opacity-40"></div>
        
        {/* Floating Letters */}
        <div className="absolute top-1/4 right-1/4 text-8xl animate-pulse delay-200 opacity-20">📚</div>
        <div className="absolute bottom-1/4 left-1/4 text-6xl animate-bounce delay-400 opacity-20">✏️</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3"
          >
            ← Back
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              🔤 Learn the Alphabet!
            </h1>
            <div className="text-white/80">
              Letter {currentLetterIndex + 1} of {alphabetData.length}
            </div>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 flex space-x-2">
            <Button
              onClick={() => setLanguage('english')}
              className={`rounded-full px-6 py-2 ${
                language === 'english' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-transparent text-white/80 hover:bg-white/20'
              }`}
            >
              🇺🇸 English
            </Button>
            <Button
              onClick={() => setLanguage('oromo')}
              className={`rounded-full px-6 py-2 ${
                language === 'oromo' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-transparent text-white/80 hover:bg-white/20'
              }`}
            >
              🇪🇹 Oromo
            </Button>
          </div>
        </div>

        {/* Main Letter Display */}
        <div className="flex justify-center mb-8">
          <div 
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl max-w-lg w-full min-h-96 flex flex-col justify-center items-center cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => setShowWord(!showWord)}
          >
            <div className="text-9xl font-bold text-purple-600 mb-6 animate-pulse">
              {currentLetter.letter}
            </div>
            
            {showWord ? (
              <div className="text-center">
                <div className="text-6xl mb-4">{currentLetter.emoji}</div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {language === 'english' ? currentLetter.english : currentLetter.oromo}
                </div>
                <div className="text-lg text-gray-600 mb-4">
                  {language === 'english' ? 'English' : 'Afaan Oromo'}
                </div>
                <div className="text-2xl text-purple-600 font-mono">
                  {currentLetter.sound}
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-4">
                  Letter {currentLetter.letter}
                </div>
                <div className="text-gray-500 text-lg">
                  Tap to see word! 👆
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            onClick={handlePrevious}
            disabled={currentLetterIndex === 0}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            ← Previous
          </Button>
          
          <Button
            onClick={() => speakText(`${currentLetter.letter}. ${language === 'english' ? currentLetter.english : currentLetter.oromo}`)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            🔊 Listen
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={currentLetterIndex === alphabetData.length - 1}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            Next →
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-white font-semibold">Progress:</div>
            <div className="text-white/80">{Math.round(((currentLetterIndex + 1) / alphabetData.length) * 100)}%</div>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentLetterIndex + 1) / alphabetData.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlphabetModule;
