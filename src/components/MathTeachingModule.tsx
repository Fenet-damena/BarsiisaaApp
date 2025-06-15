
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { speakText } from '@/utils/speechUtils';

interface MathTeachingModuleProps {
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

const MathTeachingModule = ({ onBack, language }: MathTeachingModuleProps) => {
  const [currentProblem, setCurrentProblem] = useState<MathProblem | null>(null);
  const [animatingEmojis, setAnimatingEmojis] = useState<string[]>([]);

  const uiContent = {
    english: {
      back: "Back",
      title: "Learn Math",
      nextProblem: "Next Example",
      listen: "Listen",
      takeAway: "Take away",
      plus: "plus",
      minus: "minus",
      equals: "equals",
    },
    oromo: {
      back: "Duubatti",
      title: "Herrega Baradhu",
      nextProblem: "Fakkeenya Itti Aansu",
      listen: "Dhaggeeffadhu",
      takeAway: "Fuudhi",
      plus: "ida'uu",
      minus: "hir'isuu",
      equals: "walqixa",
    }
  };

  const ui = uiContent[language];

  const emojis = ['🍎', '🐱', '⭐', '🌸', '🐶', '🎈', '🍓', '🦋', '🌟', '🎯'];

  const generateProblem = (operation?: '+' | '-') => {
    const op = operation || (Math.random() > 0.5 ? '+' : '-');
    let num1, num2, answer;
    
    if (op === '+') {
      num1 = Math.floor(Math.random() * 5) + 1;
      num2 = Math.floor(Math.random() * 5) + 1;
      answer = num1 + num2;
    } else {
      num1 = Math.floor(Math.random() * 8) + 3;
      num2 = Math.floor(Math.random() * num1) + 1;
      answer = num1 - num2;
    }

    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    
    setCurrentProblem({ num1, num2, operation: op, answer, emoji });
    
    const totalEmojis = op === '+' ? num1 + num2 : num1;
    setAnimatingEmojis(Array(totalEmojis).fill(emoji));
  };

  useEffect(() => {
    generateProblem('+');
  }, []);

  const speakProblem = () => {
    if (!currentProblem) return;
    const { num1, operation, num2, answer } = currentProblem;
    const opText = operation === '+' ? ui.plus : ui.minus;
    const text = `${num1} ${opText} ${num2} ${ui.equals} ${answer}`;
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
            {ui.takeAway} {currentProblem.num2}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden bg-gradient-to-br from-blue-300 via-green-300 to-yellow-300">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Button onClick={onBack} className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3">
            ← {ui.back}
          </Button>
          <h1 className="text-3xl font-bold text-white text-center">
            👨‍🏫 {ui.title}
          </h1>
          <div className="w-24"></div>
        </div>

        {currentProblem && (
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8">
            <div className="text-center">
              <div className="text-6xl font-bold text-gray-800 mb-8">
                {currentProblem.num1} {currentProblem.operation} {currentProblem.num2} = {currentProblem.answer}
              </div>
              
              <Button onClick={speakProblem} className="bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white text-lg px-6 py-3 rounded-full mb-8">
                🔊 {ui.listen}
              </Button>

              <div className="mb-8 min-h-[250px] flex items-center justify-center">
                {renderAnimatedEmojis()}
              </div>
              
              <Button onClick={() => generateProblem()} className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white text-xl px-8 py-4 rounded-full">
                {ui.nextProblem} →
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathTeachingModule;
