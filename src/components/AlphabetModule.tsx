
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface AlphabetModuleProps {
  onBack: () => void;
  language: 'english' | 'oromo';
}

const alphabetData = {
  english: [
    { letter: "A", english: "Apple", oromo: "Poomii", emoji: "🍎", sound: "/a/" },
    { letter: "B", english: "Ball", oromo: "Kubbaa", emoji: "⚽", sound: "/b/" },
    { letter: "C", english: "Cat", oromo: "Adurree", emoji: "🐱", sound: "/k/" },
    { letter: "D", english: "Dog", oromo: "Saree", emoji: "🐶", sound: "/d/" },
    { letter: "E", english: "Elephant", oromo: "Carbaa", emoji: "🐘", sound: "/e/" },
    { letter: "F", english: "Fish", oromo: "Qurxummii", emoji: "🐟", sound: "/f/" },
    { letter: "G", english: "Goat", oromo: "Re'ee", emoji: "🐐", sound: "/g/" },
    { letter: "H", english: "House", oromo: "Mana", emoji: "🏠", sound: "/h/" },
  ],
  oromo: [
    { letter: "A", english: "Apple", oromo: "Poomii", emoji: "🍎", sound: "/a/" },
    { letter: "B", english: "Ball", oromo: "Kubbaa", emoji: "⚽", sound: "/b/" },
    { letter: "C", english: "Cat", oromo: "Adurree", emoji: "🐱", sound: "/k/" },
    { letter: "D", english: "Dog", oromo: "Saree", emoji: "🐶", sound: "/d/" },
    { letter: "E", english: "Elephant", oromo: "Carbaa", emoji: "🐘", sound: "/e/" },
    { letter: "F", english: "Fish", oromo: "Qurxummii", emoji: "🐟", sound: "/f/" },
    { letter: "G", english: "Goat", oromo: "Re'ee", emoji: "🐐", sound: "/g/" },
    { letter: "H", english: "House", oromo: "Mana", emoji: "🏠", sound: "/h/" },
  ]
};

const numbers = {
  english: [
    { number: "1", english: "One", oromo: "Tokko", emoji: "1️⃣" },
    { number: "2", english: "Two", oromo: "Lama", emoji: "2️⃣" },
    { number: "3", english: "Three", oromo: "Sadii", emoji: "3️⃣" },
    { number: "4", english: "Four", oromo: "Afur", emoji: "4️⃣" },
    { number: "5", english: "Five", oromo: "Shan", emoji: "5️⃣" },
    { number: "6", english: "Six", oromo: "Ja'a", emoji: "6️⃣" },
    { number: "7", english: "Seven", oromo: "Torba", emoji: "7️⃣" },
    { number: "8", english: "Eight", oromo: "Saddeet", emoji: "8️⃣" },
    { number: "9", english: "Nine", oromo: "Sagal", emoji: "9️⃣" },
    { number: "10", english: "Ten", oromo: "Kudhan", emoji: "🔟" },
  ],
  oromo: [
    { number: "1", english: "One", oromo: "Tokko", emoji: "1️⃣" },
    { number: "2", english: "Two", oromo: "Lama", emoji: "2️⃣" },
    { number: "3", english: "Three", oromo: "Sadii", emoji: "3️⃣" },
    { number: "4", english: "Four", oromo: "Afur", emoji: "4️⃣" },
    { number: "5", english: "Five", oromo: "Shan", emoji: "5️⃣" },
    { number: "6", english: "Six", oromo: "Ja'a", emoji: "6️⃣" },
    { number: "7", english: "Seven", oromo: "Torba", emoji: "7️⃣" },
    { number: "8", english: "Eight", oromo: "Saddeet", emoji: "8️⃣" },
    { number: "9", english: "Nine", oromo: "Sagal", emoji: "9️⃣" },
    { number: "10", english: "Ten", oromo: "Kudhan", emoji: "🔟" },
  ]
};

const AlphabetModule = ({ onBack, language }: AlphabetModuleProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [isNumbers, setIsNumbers] = useState(false);

  const currentData = isNumbers ? numbers[language] : alphabetData[language];
  const currentItem = currentData[currentIndex];

  const uiContent = {
    english: {
      back: "Back",
      title: isNumbers ? "Learn Numbers!" : "Learn the Alphabet!",
      alphabet: "Alphabet",
      numbers: "Numbers",
      tapToSee: "Tap to see word!",
      listen: "Listen",
      previous: "Previous",
      next: "Next",
      progress: "Progress:"
    },
    oromo: {
      back: "Duubatti",
      title: isNumbers ? "Lakkoofsota Baradhu!" : "Qubee Baradhu!",
      alphabet: "Qubee",
      numbers: "Lakkoofsa",
      tapToSee: "Jecha ilaaluuf dhiibi!",
      listen: "Dhaggeeffadhu",
      previous: "Duraa",
      next: "Itti aansu",
      progress: "Adeemsa:"
    }
  };

  const ui = uiContent[language];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (currentIndex < currentData.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowWord(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
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
            ← {ui.back}
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              🔤 {ui.title}
            </h1>
            <div className="text-white/80">
              {isNumbers ? 'Number' : 'Letter'} {currentIndex + 1} of {currentData.length}
            </div>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Toggle Between Alphabet and Numbers */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 flex space-x-2">
            <Button
              onClick={() => {setIsNumbers(false); setCurrentIndex(0); setShowWord(false);}}
              className={`rounded-full px-6 py-2 ${
                !isNumbers 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-transparent text-white/80 hover:bg-white/20'
              }`}
            >
              🔤 {ui.alphabet}
            </Button>
            <Button
              onClick={() => {setIsNumbers(true); setCurrentIndex(0); setShowWord(false);}}
              className={`rounded-full px-6 py-2 ${
                isNumbers 
                  ? 'bg-green-500 text-white' 
                  : 'bg-transparent text-white/80 hover:bg-white/20'
              }`}
            >
              🔢 {ui.numbers}
            </Button>
          </div>
        </div>

        {/* Main Display */}
        <div className="flex justify-center mb-8">
          <div 
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl max-w-lg w-full min-h-96 flex flex-col justify-center items-center cursor-pointer transform hover:scale-105 transition-all duration-300"
            onClick={() => setShowWord(!showWord)}
          >
            <div className="text-9xl font-bold text-purple-600 mb-6 animate-pulse">
              {isNumbers ? currentItem.number : currentItem.letter}
            </div>
            
            {showWord ? (
              <div className="text-center">
                <div className="text-6xl mb-4">{currentItem.emoji}</div>
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {language === 'english' ? currentItem.english : currentItem.oromo}
                </div>
                <div className="text-lg text-gray-600 mb-4">
                  {language === 'english' ? 'English' : 'Afaan Oromo'}
                </div>
                {!isNumbers && (
                  <div className="text-2xl text-purple-600 font-mono">
                    {currentItem.sound}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800 mb-4">
                  {isNumbers ? 'Number' : 'Letter'} {isNumbers ? currentItem.number : currentItem.letter}
                </div>
                <div className="text-gray-500 text-lg">
                  {ui.tapToSee} 👆
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            ← {ui.previous}
          </Button>
          
          <Button
            onClick={() => speakText(`${isNumbers ? currentItem.number : currentItem.letter}. ${language === 'english' ? currentItem.english : currentItem.oromo}`)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            🔊 {ui.listen}
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={currentIndex === currentData.length - 1}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            {ui.next} →
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-white font-semibold">{ui.progress}</div>
            <div className="text-white/80">{Math.round(((currentIndex + 1) / currentData.length) * 100)}%</div>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / currentData.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlphabetModule;
