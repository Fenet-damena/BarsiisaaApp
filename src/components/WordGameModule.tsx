import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { speakText } from '@/utils/speechUtils';

interface WordGameModuleProps {
  onBack: () => void;
  language: 'english' | 'oromo';
}

const wordsData = {
  english: {
    fruits: [
      { english: "Apple", oromo: "Poomii", emoji: "🍎" },
      { english: "Banana", oromo: "Muuzii", emoji: "🍌" },
      { english: "Orange", oromo: "Burtukaana", emoji: "🍊" },
      { english: "Grape", oromo: "Wayinii", emoji: "🍇" },
      { english: "Mango", oromo: "Maangoo", emoji: "🥭" },
      { english: "Pineapple", oromo: "Anaanaasii", emoji: "🍍" },
      { english: "Strawberry", oromo: "Gora", emoji: "🍓" },
      { english: "Watermelon", oromo: "Habbeessaa", emoji: "🍉" },
      { english: "Cherry", oromo: "Cherii", emoji: "🍒" },
      { english: "Peach", oromo: "Piichii", emoji: "🍑" },
      { english: "Lemon", oromo: "Loomii", emoji: "🍋" },
      { english: "Papaya", oromo: "Paapaayaa", emoji: "🍈" },
    ],
    colors: [
      { english: "Red", oromo: "Diimaa", emoji: "🔴" },
      { english: "Blue", oromo: "Cuquliisa", emoji: "🔵" },
      { english: "Green", oromo: "Magariisa", emoji: "🟢" },
      { english: "Yellow", oromo: "Keelloo", emoji: "🟡" },
      { english: "Black", oromo: "Gurraacha", emoji: "⚫" },
      { english: "White", oromo: "Adii", emoji: "⚪" },
    ],
    animals: [
      { english: "Dog", oromo: "Saree", emoji: "🐶" },
      { english: "Cat", oromo: "Adurree", emoji: "🐱" },
      { english: "Horse", oromo: "Farda", emoji: "🐴" },
      { english: "Donkey", oromo: "Harree", emoji: "🫏" },
      { english: "Sheep", oromo: "Hoolaa", emoji: "🐑" },
      { english: "Goat", oromo: "Re'ee", emoji: "🐐" },
      { english: "Cow", oromo: "Sa'a", emoji: "🐄" },
      { english: "Camel", oromo: "Gaala", emoji: "🐪" },
      { english: "Lion", oromo: "Leenca", emoji: "🦁" },
      { english: "Tiger", oromo: "Qeerransa", emoji: "🐅" },
      { english: "Monkey", oromo: "Jaldeessa", emoji: "🐒" },
      { english: "Elephant", oromo: "Arba", emoji: "🐘" },
      { english: "Deer", oromo: "Bosonuu", emoji: "🦌" },
      { english: "Wolf", oromo: "Yeeyyii", emoji: "🐺" },
      { english: "Snake", oromo: "Bofa", emoji: "🐍" },
    ]
  },
  oromo: {
    fruits: [
      { english: "Apple", oromo: "Poomii", emoji: "🍎" },
      { english: "Banana", oromo: "Muuzii", emoji: "🍌" },
      { english: "Orange", oromo: "Burtukaana", emoji: "🍊" },
      { english: "Grape", oromo: "Wayinii", emoji: "🍇" },
      { english: "Mango", oromo: "Maangoo", emoji: "🥭" },
      { english: "Pineapple", oromo: "Anaanaasii", emoji: "🍍" },
      { english: "Strawberry", oromo: "Gora", emoji: "🍓" },
      { english: "Watermelon", oromo: "Habbeessaa", emoji: "🍉" },
      { english: "Cherry", oromo: "Cherii", emoji: "🍒" },
      { english: "Peach", oromo: "Piichii", emoji: "🍑" },
      { english: "Lemon", oromo: "Loomii", emoji: "🍋" },
      { english: "Papaya", oromo: "Paapaayaa", emoji: "🍈" },
    ],
    colors: [
      { english: "Red", oromo: "Diimaa", emoji: "🔴" },
      { english: "Blue", oromo: "Cuquliisa", emoji: "🔵" },
      { english: "Green", oromo: "Magariisa", emoji: "🟢" },
      { english: "Yellow", oromo: "Keelloo", emoji: "🟡" },
      { english: "Black", oromo: "Gurraacha", emoji: "⚫" },
      { english: "White", oromo: "Adii", emoji: "⚪" },
    ],
    animals: [
      { english: "Dog", oromo: "Saree", emoji: "🐶" },
      { english: "Cat", oromo: "Adurree", emoji: "🐱" },
      { english: "Horse", oromo: "Farda", emoji: "🐴" },
      { english: "Donkey", oromo: "Harree", emoji: "🫏" },
      { english: "Sheep", oromo: "Hoolaa", emoji: "🐑" },
      { english: "Goat", oromo: "Re'ee", emoji: "🐐" },
      { english: "Cow", oromo: "Sa'a", emoji: "🐄" },
      { english: "Camel", oromo: "Gaala", emoji: "🐪" },
      { english: "Lion", oromo: "Leenca", emoji: "🦁" },
      { english: "Tiger", oromo: "Qeerransa", emoji: "🐅" },
      { english: "Monkey", oromo: "Jaldeessa", emoji: "🐒" },
      { english: "Elephant", oromo: "Arba", emoji: "🐘" },
      { english: "Deer", oromo: "Bosonuu", emoji: "🦌" },
      { english: "Wolf", oromo: "Yeeyyii", emoji: "🐺" },
      { english: "Snake", oromo: "Bofa", emoji: "🐍" },
    ]
  }
};

const WordGameModule = ({ onBack, language }: WordGameModuleProps) => {
  const [currentCategory, setCurrentCategory] = useState<'fruits' | 'colors' | 'animals'>('fruits');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [randomWords, setRandomWords] = useState<any[]>([]);

  const uiContent = {
    english: {
      back: "Back",
      title: "Learn Many Words!",
      fruits: "Fruits",
      colors: "Colors", 
      animals: "Animals",
      tapToFlip: "Tap to flip!",
      listen: "Listen",
      previous: "Previous",
      next: "Next",
      shuffle: "Shuffle Words",
      progress: "Progress:"
    },
    oromo: {
      back: "Duubatti",
      title: "Jechota Hedduu Baradhu!",
      fruits: "Fuduraalee",
      colors: "Halluuwwan",
      animals: "Bineensota",
      tapToFlip: "Garagaluuf dhiibi!",
      listen: "Dhaggeeffadhu",
      previous: "Duraa",
      next: "Itti aansu",
      shuffle: "Jechota Makaa",
      progress: "Adeemsa:"
    }
  };

  const ui = uiContent[language];

  useEffect(() => {
    shuffleWords();
  }, [currentCategory, language]);

  const shuffleWords = () => {
    const categoryWords = wordsData[language][currentCategory];
    const shuffled = [...categoryWords].sort(() => Math.random() - 0.5);
    setRandomWords(shuffled);
    setCurrentWordIndex(0);
  };

  const currentWord = randomWords[currentWordIndex];

  const handleNext = () => {
    if (currentWordIndex < randomWords.length - 1) {
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      shuffleWords(); // Auto shuffle when reaching the end
    }
  };

  const handlePrevious = () => {
    if (currentWordIndex > 0) {
      setCurrentWordIndex(currentWordIndex - 1);
    }
  };

  if (!currentWord) return null;

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute bottom-32 left-20 w-28 h-28 bg-gradient-to-r from-blue-300 to-green-300 rounded-full animate-pulse delay-300 opacity-30"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 right-1/4 text-6xl animate-bounce delay-200 opacity-20">📚</div>
        <div className="absolute bottom-1/4 left-1/4 text-5xl animate-pulse delay-400 opacity-20">🌈</div>
        <div className="absolute top-1/2 right-1/3 text-4xl animate-bounce delay-600 opacity-20">⚡</div>
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
              📝 {ui.title}
            </h1>
            <div className="text-white/80">
              Word {currentWordIndex + 1} of {randomWords.length}
            </div>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Category Selection */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 flex space-x-2">
            <Button
              onClick={() => setCurrentCategory('fruits')}
              className={`rounded-full px-6 py-2 ${
                currentCategory === 'fruits' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-transparent text-white/80 hover:bg-white/20'
              }`}
            >
              🍎 {ui.fruits}
            </Button>
            <Button
              onClick={() => setCurrentCategory('colors')}
              className={`rounded-full px-6 py-2 ${
                currentCategory === 'colors' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-transparent text-white/80 hover:bg-white/20'
              }`}
            >
              🎨 {ui.colors}
            </Button>
            <Button
              onClick={() => setCurrentCategory('animals')}
              className={`rounded-full px-6 py-2 ${
                currentCategory === 'animals' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-transparent text-white/80 hover:bg-white/20'
              }`}
            >
              🐾 {ui.animals}
            </Button>
          </div>
        </div>

        {/* Main Word Display */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl max-w-lg w-full min-h-96 flex flex-col justify-center items-center transform hover:scale-105 transition-all duration-300">
            <div className="text-8xl mb-6">{currentWord.emoji}</div>
            
            {/* Enhanced visual representation with image placeholder */}
            <div className="w-40 h-40 mx-auto mb-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl flex items-center justify-center shadow-lg border-4 border-white">
              <span className="text-7xl">{currentWord.emoji}</span>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 mb-4">
                {language === 'english' ? currentWord.english : currentWord.oromo}
              </div>
              <div className="text-lg text-gray-600 mb-4">
                {language === 'english' ? 'English' : 'Afaan Oromo'}
              </div>
              <div className="text-xl text-gray-500">
                {language === 'english' ? currentWord.oromo : currentWord.english}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            onClick={handlePrevious}
            disabled={currentWordIndex === 0}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            ← {ui.previous}
          </Button>
          
          <Button
            onClick={() => speakText(language === 'english' ? currentWord.english : currentWord.oromo, language)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            🔊 {ui.listen}
          </Button>
          
          <Button
            onClick={shuffleWords}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full"
          >
            🔀 {ui.shuffle}
          </Button>
          
          <Button
            onClick={handleNext}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full"
          >
            {ui.next} →
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-white font-semibold">{ui.progress}</div>
            <div className="text-white/80">{Math.round(((currentWordIndex + 1) / randomWords.length) * 100)}%</div>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentWordIndex + 1) / randomWords.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordGameModule;
