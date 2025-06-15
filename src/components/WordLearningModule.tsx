
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { speakText } from '@/utils/speechUtils';
import { ArrowLeft, ArrowRight, Volume2 } from 'lucide-react';

interface WordLearningModuleProps {
  onBack: () => void;
  language: 'english' | 'oromo';
}

const wordData = {
  english: [
    { word: "Apple", emoji: "🍎", category: "Fruit" },
    { word: "Banana", emoji: "🍌", category: "Fruit" },
    { word: "Orange", emoji: "🍊", category: "Fruit" },
    { word: "Grape", emoji: "🍇", category: "Fruit" },
    { word: "Mango", emoji: "🥭", category: "Fruit" },
    { word: "Dog", emoji: "🐶", category: "Animal" },
    { word: "Cat", emoji: "🐱", category: "Animal" },
    { word: "Lion", emoji: "🦁", category: "Animal" },
    { word: "Elephant", emoji: "🐘", category: "Animal" },
    { word: "Horse", emoji: "🐴", category: "Animal" },
    { word: "Red", emoji: "🔴", category: "Color" },
    { word: "Blue", emoji: "🔵", category: "Color" },
    { word: "Green", emoji: "🟢", category: "Color" },
    { word: "Yellow", emoji: "🟡", category: "Color" },
    { word: "Black", emoji: "⚫", category: "Color" },
  ],
  oromo: [
    { word: "Poomii", emoji: "🍎", category: "Fuduraa" },
    { word: "Muuzii", emoji: "🍌", category: "Fuduraa" },
    { word: "Burtukaana", emoji: "🍊", category: "Fuduraa" },
    { word: "Wayinii", emoji: "🍇", category: "Fuduraa" },
    { word: "Maangoo", emoji: "🥭", category: "Fuduraa" },
    { word: "Saree", emoji: "🐶", category: "Bineensa" },
    { word: "Adurree", emoji: "🐱", category: "Bineensa" },
    { word: "Leenca", emoji: "🦁", category: "Bineensa" },
    { word: "Arba", emoji: "🐘", category: "Bineensa" },
    { word: "Farda", emoji: "🐴", category: "Bineensa" },
    { word: "Diimaa", emoji: "🔴", category: "Halluu" },
    { word: "Cuquliisa", emoji: "🔵", category: "Halluu" },
    { word: "Magariisa", emoji: "🟢", category: "Halluu" },
    { word: "Keelloo", emoji: "🟡", category: "Halluu" },
    { word: "Gurraacha", emoji: "⚫", category: "Halluu" },
  ]
};

const uiContent = {
  english: {
    back: "Back",
    title: "Learn Words",
    listen: "Listen",
    prev: "Prev",
    next: "Next",
  },
  oromo: {
    back: "Duubatti",
    title: "Jechoota Baradhu",
    listen: "Dhaggeeffadhu",
    prev: "Duraa",
    next: "Itti Aanu",
  }
};

const WordLearningModule = ({ onBack, language }: WordLearningModuleProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const words = wordData[language];
  const ui = uiContent[language];
  const currentWord = words[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + words.length) % words.length);
  };

  const handleSpeak = () => {
    speakText(currentWord.word, language);
  };

  return (
    <div className="min-h-screen p-6 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-16 left-20 w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-pulse opacity-30"></div>
            <div className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full animate-bounce opacity-30"></div>
            <div className="absolute bottom-32 left-10 w-28 h-28 bg-gradient-to-r from-blue-300 to-green-300 rounded-full animate-pulse delay-300 opacity-30"></div>
        </div>
        
        <div className="absolute top-6 left-6 z-10">
            <Button
                onClick={onBack}
                className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3 flex items-center"
            >
                <ArrowLeft className="mr-2 h-5 w-5" /> {ui.back}
            </Button>
        </div>

        <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 text-center animate-pulse">{ui.title}</h1>

            <div className="w-full max-w-sm bg-white/30 backdrop-blur-md rounded-3xl p-8 shadow-2xl flex flex-col items-center transform transition-all duration-500 hover:scale-105">
                <div className="text-8xl md:text-9xl mb-6 transition-transform duration-300 group-hover:scale-110">
                    {currentWord.emoji}
                </div>
                <p className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">{currentWord.word}</p>
                <Button onClick={handleSpeak} className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-full text-lg flex items-center transform hover:scale-110 transition-transform duration-200">
                    <Volume2 className="mr-2 h-6 w-6" /> {ui.listen}
                </Button>
            </div>

            <div className="flex justify-between w-full max-w-md mt-8">
                <Button onClick={handlePrev} className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full text-lg flex items-center transform hover:scale-105 transition-transform duration-200">
                    <ArrowLeft className="mr-2 h-6 w-6" /> {ui.prev}
                </Button>
                <Button onClick={handleNext} className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full text-lg flex items-center transform hover:scale-105 transition-transform duration-200">
                    {ui.next} <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
            </div>
        </div>
    </div>
  );
};

export default WordLearningModule;
