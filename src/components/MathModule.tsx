import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { speakText } from '@/utils/speechUtils';
import Fireworks from '@/components/Fireworks';

interface MathModuleProps {
  onBack: () => void;
  language: 'english' | 'oromo';
}

type MathProblem = {
  num1: number;
  num2: number;
  operation: '+' | '-';
  answer: number;
  emoji: string;
};

const MathModule = ({ onBack, language }: MathModuleProps) => {
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [totalProblems, setTotalProblems] = useState(0);
  const [animatingEmojis, setAnimatingEmojis] = useState<string[]>([]);
  const [showFireworks, setShowFireworks] = useState(false);

  const uiContent = {
    english: {
      back: "Back",
      title: "Math Fun!",
      addition: "Addition",
      subtraction: "Subtraction",
      checkAnswer: "Check Answer",
      nextProblem: "Next Problem",
      yourAnswer: "Your Answer:",
      correct: "Correct! Well done!",
      incorrect: "Try again!",
      score: "Score",
      listen: "Listen"
    },
    oromo: {
      back: "Duubatti",
      title: "Herrega Baay'ee!",
      addition: "Ida'uu",
      subtraction: "Hir'isuu",
      checkAnswer: "Deebii Mirkaneessi",
      nextProblem: "Rakkoo Itti Aansu",
      yourAnswer: "Deebiin Kee:",
      correct: "Sirrii! Gaarii dha!",
      incorrect: "Ammallee yaali!",
      score: "Qabxii",
      listen: "Dhaggeeffadhu"
    }
  };

  const ui = uiContent[language];

  const emojis = ['🍎', '🐱', '⭐', '🌸', '🐶', '🎈', '🍓', '🦋', '🌟', '🎯'];

  const generateProblem = (operation: '+' | '-') => {
    let num1, num2, answer;
    
    if (operation === '+') {
      num1 = Math.floor(Math.random() * 5) + 1; // 1-5
      num2 = Math.floor(Math.random() * 5) + 1; // 1-5
      answer = num1 + num2;
    } else {
      num1 = Math.floor(Math.random() * 8) + 3; // 3-10
      num2 = Math.floor(Math.random() * num1) + 1; // 1 to num1
      answer = num1 - num2;
    }

    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    setCurrentProblem({ num1, num2, operation, answer, emoji });
    setUserAnswer(null);
    setShowAnswer(false);
    setIsCorrect(null);
    
    // Create animated emojis array
    const totalEmojis = operation === '+' ? num1 + num2 : num1;
    setAnimatingEmojis(Array(totalEmojis).fill(emoji));
  };

  useEffect(() => {
    generateProblem('+');
  }, []);

  const handleAnswerSubmit = () => {
    if (userAnswer === null || !currentProblem) return;
    
    const correct = userAnswer === currentProblem.answer;
    setIsCorrect(correct);
    setShowAnswer(true);
    setTotalProblems(prev => prev + 1);
    
    if (correct) {
      setScore(prev => prev + 1);
      speakText(ui.correct, language);
      setShowFireworks(true);
    } else {
      speakText(ui.incorrect, language);
    }
  };

  const handleNextProblem = () => {
    const operation = Math.random() > 0.5 ? '+' : '-';
    generateProblem(operation);
  };

  const speakProblem = () => {
    if (!currentProblem) return;
    const text = `${currentProblem.num1} ${currentProblem.operation === '+' ? 'plus' : 'minus'} ${currentProblem.num2}`;
    speakText(text, language);
  };

  const renderAnimatedEmojis = () => {
    if (!currentProblem) return null;

    if (currentProblem.operation === '+') {
      return (
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {animatingEmojis.slice(0, currentProblem.num1).map((emoji, index) => (
              <div 
                key={`group1-${index}`} 
                className="text-4xl animate-bounce"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>
          <div className="text-6xl font-bold text-purple-600">+</div>
          <div className="flex flex-wrap justify-center gap-2">
            {animatingEmojis.slice(currentProblem.num1).map((emoji, index) => (
              <div 
                key={`group2-${index}`} 
                className="text-4xl animate-bounce"
                style={{ animationDelay: `${(index + currentProblem.num1) * 0.1}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center space-y-4">
          <div className="flex flex-wrap justify-center gap-2">
            {animatingEmojis.map((emoji, index) => (
              <div 
                key={`total-${index}`} 
                className={`text-4xl transition-all duration-1000 ${
                  index >= currentProblem.answer ? 'opacity-30 line-through' : 'animate-pulse'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {emoji}
              </div>
            ))}
          </div>
          <div className="text-6xl font-bold text-red-500">-</div>
          <div className="text-2xl text-gray-600">
            {language === 'english' ? 'Take away' : 'Fuudhi'} {currentProblem.num2}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen p-6 relative">
      {showFireworks && <Fireworks onComplete={() => setShowFireworks(false)} />}
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-r from-green-300 to-blue-300 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-yellow-300 to-pink-300 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute bottom-32 left-20 w-28 h-28 bg-gradient-to-r from-purple-300 to-red-300 rounded-full animate-pulse delay-300 opacity-30"></div>
        
        {/* Floating Math Symbols */}
        <div className="absolute top-1/4 right-1/4 text-6xl animate-bounce delay-200 opacity-20">➕</div>
        <div className="absolute bottom-1/4 left-1/4 text-5xl animate-pulse delay-400 opacity-20">➖</div>
        <div className="absolute top-1/2 right-1/3 text-4xl animate-bounce delay-600 opacity-20">🔢</div>

        {/* New floating items */}
        <div className="absolute text-5xl opacity-20" style={{ top: '15%', left: '80%', animation: 'float-up 20s linear infinite 3s' }}>🍎</div>
        <div className="absolute text-5xl opacity-20" style={{ top: '60%', left: '10%', animation: 'float-up 25s linear infinite 7s' }}>🎈</div>
        <div className="absolute text-5xl opacity-20" style={{ top: '5%', left: '30%', animation: 'float-up 18s linear infinite 1s' }}>⭐</div>
        <div className="absolute text-5xl opacity-20" style={{ top: '85%', left: '50%', animation: 'float-up 22s linear infinite 5s' }}>🚀</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3"
          >
            ← {ui.back}
          </Button>
          <h1 className="text-3xl font-bold text-white text-center">
            🧮 {ui.title}
          </h1>
          <div className="text-white text-lg">
            {ui.score}: {score}/{totalProblems}
          </div>
        </div>

        {currentProblem && (
          <>
            {/* Problem Display */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8">
              <div className="text-center">
                {/* Math Expression */}
                <div className="text-6xl font-bold text-gray-800 mb-8">
                  {currentProblem.num1} {currentProblem.operation} {currentProblem.num2} = ?
                </div>
                
                <Button
                  onClick={speakProblem}
                  className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white text-lg px-6 py-3 rounded-full mb-8"
                >
                  🔊 {ui.listen}
                </Button>

                {/* Animated Visual Representation */}
                <div className="mb-8">
                  {renderAnimatedEmojis()}
                </div>

                {/* Answer Input */}
                <div className="space-y-4">
                  <div className="text-2xl font-semibold text-gray-700">
                    {ui.yourAnswer}
                  </div>
                  <div className="flex justify-center space-x-2">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <Button
                        key={num}
                        onClick={() => setUserAnswer(num)}
                        className={`w-12 h-12 rounded-full text-xl font-bold ${
                          userAnswer === num
                            ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
                            : 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {num}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Check Answer Button */}
                {userAnswer !== null && !showAnswer && (
                  <Button
                    onClick={handleAnswerSubmit}
                    className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white text-xl px-8 py-4 rounded-full mt-6"
                  >
                    {ui.checkAnswer}
                  </Button>
                )}

                {/* Result Display */}
                {showAnswer && (
                  <div className="mt-6">
                    <div className={`text-3xl font-bold mb-4 ${
                      isCorrect ? 'text-green-600' : 'text-red-500'
                    }`}>
                      {isCorrect ? ui.correct : ui.incorrect}
                    </div>
                    <div className="text-2xl text-gray-700 mb-4">
                      {currentProblem.num1} {currentProblem.operation} {currentProblem.num2} = {currentProblem.answer}
                    </div>
                    <Button
                      onClick={handleNextProblem}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xl px-8 py-4 rounded-full"
                    >
                      {ui.nextProblem} →
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MathModule;
