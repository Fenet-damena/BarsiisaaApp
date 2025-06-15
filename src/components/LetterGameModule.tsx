
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { speakText } from '@/utils/speechUtils';
import Fireworks from '@/components/Fireworks';

interface LetterGameModuleProps {
  onBack: () => void;
  language: 'english' | 'oromo';
}

const gameData = {
  english: [
    { emoji: "🍎", word: "Apple", letter: "A" },
    { emoji: "🏀", word: "Ball", letter: "B" },
    { emoji: "🐱", word: "Cat", letter: "C" },
    { emoji: "🐶", word: "Dog", letter: "D" },
    { emoji: "🐘", word: "Elephant", letter: "E" },
    { emoji: "🐟", word: "Fish", letter: "F" },
    { emoji: "🦒", word: "Giraffe", letter: "G" },
    { emoji: "🏠", word: "House", letter: "H" },
    { emoji: "🍦", word: "Ice cream", letter: "I" },
    { emoji: "🧃", word: "Juice", letter: "J" },
    { emoji: "🪁", word: "Kite", letter: "K" },
    { emoji: "🦁", word: "Lion", letter: "L" },
    { emoji: "🌙", word: "Moon", letter: "M" },
    { emoji: "🪺", word: "Nest", letter: "N" },
    { emoji: "🍊", word: "Orange", letter: "O" },
    { emoji: "✏️", word: "Pencil", letter: "P" },
    { emoji: "👑", word: "Queen", letter: "Q" },
    { emoji: "🌈", word: "Rainbow", letter: "R" },
    { emoji: "☀️", word: "Sun", letter: "S" },
    { emoji: "🌳", word: "Tree", letter: "T" },
    { emoji: "☂️", word: "Umbrella", letter: "U" },
    { emoji: "🎻", word: "Violin", letter: "V" },
    { emoji: "💧", word: "Water", letter: "W" },
    { emoji: "🎄", word: "Xmas tree", letter: "X" },
    { emoji: "💛", word: "Yellow", letter: "Y" },
    { emoji: "🦓", word: "Zebra", letter: "Z" },
  ],
  oromo: [
    { emoji: "🐘", word: "Arba", letter: "A" },
    { emoji: "💧", word: "Bishaan", letter: "B" },
    { emoji: "🍽️", word: "Callee", letter: "C" },
    { emoji: "🛤️", word: "Dandii", letter: "D" },
    { emoji: "🏔️", word: "Eelee", letter: "E" },
    { emoji: "🐴", word: "Farda", letter: "F" },
    { emoji: "⚫", word: "Gurraacha", letter: "G" },
    { emoji: "🫏", word: "Harree", letter: "H" },
    { emoji: "🦷", word: "Ilkaan", letter: "I" },
    { emoji: "🐒", word: "Jaldeessa", letter: "J" },
    { emoji: "📖", word: "Kitaaba", letter: "K" },
    { emoji: "🌊", word: "Loon", letter: "L" },
    { emoji: "🌳", word: "Muka", letter: "M" },
    { emoji: "👤", word: "Nama", letter: "N" },
    { emoji: "🌳", word: "Odaa", letter: "O" },
    { emoji: "🏞️", word: "Paarkii", letter: "P" },
    { emoji: "🍯", word: "Qamalee", letter: "Q" },
    { emoji: "🌧️", word: "Rooba", letter: "R" },
    { emoji: "🐦", word: "Simbirroo", letter: "S" },
    { emoji: "1️⃣", word: "Tokko", letter: "T" },
    { emoji: "🏏", word: "Ulee", letter: "U" },
    { emoji: "🎻", word: "Viiyooliin", letter: "V" },
    { emoji: "🐺", word: "Waraabessa", letter: "W" },
    { emoji: "🎄", word: "Xurree", letter: "X" },
    { emoji: "🐺", word: "Yeeyyii", letter: "Y" },
    { emoji: "0️⃣", word: "Zeeroo", letter: "Z" },
  ]
};

const LetterGameModule = ({ onBack, language }: LetterGameModuleProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [gameComplete, setGameComplete] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);

  const currentData = gameData[language];
  const currentItem = currentData[currentIndex];

  const uiContent = {
    english: {
      back: "Back",
      title: "Letter Game!",
      question: "What is the first letter?",
      score: "Score:",
      correct: "Correct! Well done!",
      incorrect: "Try again! You can do it!",
      complete: "Amazing! You finished all letters!",
      restart: "Play Again",
      next: "Next"
    },
    oromo: {
      back: "Duubatti",
      title: "Taphoota Qubee!",
      question: "Qubeen jalqabaa maal?",
      score: "Qabxii:",
      correct: "Sirrrii! Gaarii hojjette!",
      incorrect: "Irra deebi'i! Ni dandeessa!",
      complete: "Ajaa'iba! Qubeelee hunda xumurte!",
      restart: "Deebi'ii Taphii",
      next: "Itti Aansu"
    }
  };

  const ui = uiContent[language];

  // Generate random letter options
  const generateOptions = () => {
    const correctLetter = currentItem.letter;
    const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const wrongLetters = allLetters.filter(letter => letter !== correctLetter);
    const randomWrong = wrongLetters.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [correctLetter, ...randomWrong].sort(() => Math.random() - 0.5);
    return options;
  };

  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    setOptions(generateOptions());
    setSelectedAnswer(null);
    setShowResult(false);
  }, [currentIndex, language]);

  useEffect(() => {
    if (gameComplete) {
      setShowFireworks(true);
      speakText(ui.complete, language);
    }
  }, [gameComplete]);

  const handleAnswer = async (selectedLetter: string) => {
    if (showResult) return;
    setSelectedAnswer(selectedLetter);
    setShowResult(true);

    const isCorrect = selectedLetter === currentItem.letter;
    
    if (isCorrect) {
      setScore(score + 1);
      await speakText(ui.correct, language);
      setShowFireworks(true);
      
      setTimeout(() => {
        if (currentIndex < currentData.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          setGameComplete(true);
        }
      }, 2000);
    } else {
      await speakText(ui.incorrect, language);
      setTimeout(() => {
        setSelectedAnswer(null);
        setShowResult(false);
      }, 2000);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setGameComplete(false);
    setShowResult(false);
    setSelectedAnswer(null);
    setShowFireworks(false);
  };

  if (gameComplete) {
    return (
      <div className="min-h-screen p-6 relative overflow-hidden">
        {showFireworks && <Fireworks onComplete={() => setShowFireworks(false)} />}
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-pulse opacity-30"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full animate-bounce opacity-30"></div>
          <div className="absolute bottom-32 left-20 w-28 h-28 bg-gradient-to-r from-blue-300 to-green-300 rounded-full animate-pulse delay-300 opacity-30"></div>
          
          {/* Celebration Elements */}
          <div className="absolute top-1/4 right-1/4 text-6xl animate-bounce delay-200 opacity-40">🎉</div>
          <div className="absolute bottom-1/4 left-1/4 text-5xl animate-pulse delay-400 opacity-40">🌟</div>
          <div className="absolute top-1/2 right-1/3 text-4xl animate-bounce delay-600 opacity-40">🏆</div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl">
            <div className="text-8xl mb-6">🏆</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {ui.complete}
            </h1>
            <div className="text-2xl text-gray-600 mb-8">
              {ui.score} {score}/{currentData.length}
            </div>
            <div className="space-y-4">
              <Button
                onClick={handleRestart}
                className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xl px-8 py-4 rounded-full"
              >
                🔄 {ui.restart}
              </Button>
              <Button
                onClick={onBack}
                className="bg-gray-500 hover:bg-gray-600 text-white text-xl px-8 py-4 rounded-full ml-4"
              >
                ← {ui.back}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {showFireworks && <Fireworks onComplete={() => setShowFireworks(false)} />}
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-300 to-green-300 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute bottom-32 left-20 w-28 h-28 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-pulse delay-300 opacity-30"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 right-1/4 text-6xl animate-bounce delay-200 opacity-20">🎮</div>
        <div className="absolute bottom-1/4 left-1/4 text-5xl animate-pulse delay-400 opacity-20">🔤</div>
        <div className="absolute top-1/2 right-1/3 text-4xl animate-bounce delay-600 opacity-20">⭐</div>
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
              🎮 {ui.title}
            </h1>
            <div className="text-white/80">
              {ui.score} {score} | {currentIndex + 1}/{currentData.length}
            </div>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Main Game Area */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8">
          <div className="text-center">
            <div className="text-8xl mb-6 animate-bounce">
              {currentItem.emoji}
            </div>
            
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {currentItem.word}
            </div>
            
            <div className="text-xl text-gray-600 mb-8">
              {ui.question}
            </div>

            {/* Letter Options */}
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {options.map((letter) => (
                <Button
                  key={letter}
                  onClick={() => handleAnswer(letter)}
                  disabled={showResult}
                  className={`text-3xl font-bold py-8 rounded-2xl transition-all duration-300 ${
                    showResult && selectedAnswer === letter
                      ? letter === currentItem.letter
                        ? 'bg-green-500 text-white animate-pulse'
                        : 'bg-red-500 text-white'
                      : showResult && letter === currentItem.letter
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white'
                  }`}
                >
                  {letter}
                </Button>
              ))}
            </div>

            {/* Result Message */}
            {showResult && selectedAnswer && (
              <div className={`mt-6 text-xl font-bold ${
                selectedAnswer === currentItem.letter ? 'text-green-600' : 'text-red-600'
              }`}>
                {selectedAnswer === currentItem.letter ? ui.correct : ui.incorrect}
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-white font-semibold">Progress:</div>
            <div className="text-white/80">{Math.round(((currentIndex + 1) / currentData.length) * 100)}%</div>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / currentData.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterGameModule;
