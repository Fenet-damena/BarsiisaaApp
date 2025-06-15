
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, RefreshCw } from 'lucide-react';
import { speakText } from '@/utils/speechUtils';

interface BodyPartsModuleProps {
  onBack: () => void;
  language: 'english' | 'oromo';
}

const bodyPartsData = {
  english: [
    { word: 'Head', emoji: '👤', pronunciation: 'head' },
    { word: 'Eye', emoji: '👁️', pronunciation: 'eye' },
    { word: 'Nose', emoji: '👃', pronunciation: 'nose' },
    { word: 'Mouth', emoji: '👄', pronunciation: 'mouth' },
    { word: 'Ear', emoji: '👂', pronunciation: 'ear' },
    { word: 'Hand', emoji: '✋', pronunciation: 'hand' },
    { word: 'Foot', emoji: '🦶', pronunciation: 'foot' },
    { word: 'Arm', emoji: '💪', pronunciation: 'arm' },
    { word: 'Leg', emoji: '🦵', pronunciation: 'leg' },
    { word: 'Finger', emoji: '☝️', pronunciation: 'finger' },
    { word: 'Toe', emoji: '🦶', pronunciation: 'toe' },
    { word: 'Shoulder', emoji: '🤷', pronunciation: 'shoulder' },
    { word: 'Knee', emoji: '🦵', pronunciation: 'knee' },
    { word: 'Elbow', emoji: '💪', pronunciation: 'elbow' },
    { word: 'Neck', emoji: '🧱', pronunciation: 'neck' },
    { word: 'Back', emoji: '🔙', pronunciation: 'back' },
    { word: 'Chest', emoji: '🫁', pronunciation: 'chest' },
    { word: 'Stomach', emoji: '🤰', pronunciation: 'stomach' },
    { word: 'Hip', emoji: '🕺', pronunciation: 'hip' },
    { word: 'Wrist', emoji: '⌚', pronunciation: 'wrist' }
  ],
  oromo: [
    { word: 'Mataa', emoji: '👤', pronunciation: 'mah-tah' }, // Head
    { word: 'Ija', emoji: '👁️', pronunciation: 'ee-jah' }, // Eye
    { word: 'Afaan', emoji: '👄', pronunciation: 'ah-fahn' }, // Mouth
    { word: 'Gurra', emoji: '👂', pronunciation: 'goo-rah' }, // Ear
    { word: 'Harka', emoji: '✋', pronunciation: 'har-kah' }, // Hand
    { word: 'Miila', emoji: '🦶', pronunciation: 'mee-lah' }, // Foot
    { word: 'Luka', emoji: '🦵', pronunciation: 'loo-kah' }, // Leg
    { word: 'Quba', emoji: '☝️', pronunciation: 'koo-bah' }, // Finger
    { word: 'Garaa', emoji: '🤰', pronunciation: 'gah-rah' }, // Stomach
    { word: 'Arraba', emoji: '👅', pronunciation: 'ah-rrah-bah' } // Tongue
  ]
};

const uiContent = {
  english: {
    title: "Learn Body Parts! 👶",
    instruction: "Tap each body part to hear its name",
    back: "Back to Levels",
    great: "Great job!",
    next: "Next",
    finish: "Well Done! 🎉"
  },
  oromo: {
    title: "Qaamni Namaa Baradhu! 👶",
    instruction: "Qaamni kamiyyuu tuqi maqaa isaa dhaggeeffachuuf",
    back: "Gara Sadarkaa",
    great: "Gaarii dha!",
    next: "Itti Aanu",
    finish: "Gaarii! 🎉"
  }
};

const BodyPartsModule = ({ onBack, language }: BodyPartsModuleProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Quiz state
  const [mode, setMode] = useState<'learn' | 'quiz'>('learn');
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] =useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showQuizResult, setShowQuizResult] = useState(false);

  const bodyParts = bodyPartsData[language];
  const ui = uiContent[language];
  const currentBodyPart = bodyParts[currentIndex];

  const handleBodyPartClick = async () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    await speakText(currentBodyPart.pronunciation, language);
    setIsPlaying(false);
    
    setShowCelebration(true);
    setTimeout(() => setShowCelebration(false), 1500);
  };

  const handleNext = () => {
    if (currentIndex < bodyParts.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    if (mode === 'learn') {
      const playCurrentSound = async () => {
        setIsPlaying(true);
        // Cancel any ongoing speech before starting a new one
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.cancel();
        }
        await speakText(currentBodyPart.pronunciation, language);
        setIsPlaying(false);
      };

      const timer = setTimeout(() => {
        playCurrentSound();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [currentIndex, language, currentBodyPart.pronunciation, mode]);

  // --- Quiz Functions ---
  const shuffleArray = (array: any[]) => [...array].sort(() => Math.random() - 0.5);

  const startQuiz = () => {
    const questions = bodyParts.map(part => {
      const wrongAnswers = bodyParts
        .filter(p => p.word !== part.word)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(p => p.word);

      const options = shuffleArray([...wrongAnswers, part.word]);
      
      return {
        emoji: part.emoji,
        word: part.word,
        options: options,
      };
    });

    setQuizQuestions(shuffleArray(questions));
    setCurrentQuizIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowQuizResult(false);
    setMode('quiz');
  };

  const handleAnswerSelect = (answer: string) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    const correct = answer === quizQuestions[currentQuizIndex].word;
    
    if (correct) {
      setScore(score + 1);
      speakText('Correct!', 'english');
    } else {
      speakText('Incorrect', 'english');
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuizIndex < quizQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
    } else {
      setShowQuizResult(true);
    }
  };

  const restartQuiz = () => {
    startQuiz();
  };
  // --- End Quiz Functions ---

  if (mode === 'quiz') {
    if (showQuizResult) {
      return (
        <div className="min-h-screen p-6 flex flex-col items-center justify-center text-white relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 text-6xl animate-bounce delay-200 opacity-20">🎉</div>
            <div className="absolute bottom-1/4 right-1/4 text-5xl animate-pulse delay-400 opacity-20">🏆</div>
          </div>
          <div className="text-center bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl z-10">
            <h2 className="text-5xl font-bold mb-4">Quiz Complete!</h2>
            <p className="text-3xl mb-8">
              Your score: <span className="font-bold text-yellow-300">{score}</span> / {quizQuestions.length}
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={restartQuiz} className="bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-3 rounded-full">
                <RefreshCw className="mr-2 h-4 w-4" /> Try Again
              </Button>
              <Button onClick={onBack} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full">
                Back to Levels
              </Button>
            </div>
          </div>
        </div>
      );
    }

    const currentQuestion = quizQuestions[currentQuizIndex];

    return (
      <div className="min-h-screen p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-16 left-20 w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-pulse opacity-30"></div>
          <div className="absolute bottom-32 right-10 w-28 h-28 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full animate-pulse delay-300 opacity-30"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-white text-center flex-1">
              Body Parts Quiz! 🧠
            </h1>
          </div>
          <div className="mb-8">
            <div className="bg-white/20 rounded-full h-4 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-500"
                style={{ width: `${((currentQuizIndex + 1) / quizQuestions.length) * 100}%` }}
              ></div>
            </div>
            <p className="text-white text-center mt-2">
              Question {currentQuizIndex + 1} / {quizQuestions.length} | Score: {score}
            </p>
          </div>
          <div className="text-center mb-8 bg-white/10 rounded-2xl py-8">
            <p className="text-2xl text-white mb-6">Which one is this?</p>
            <div className="text-[150px] mb-4 filter drop-shadow-lg">
              {currentQuestion.emoji}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 max-w-lg mx-auto">
            {currentQuestion.options.map((option: string) => (
              <Button 
                key={option} 
                onClick={() => handleAnswerSelect(option)}
                disabled={!!selectedAnswer}
                className={`p-6 text-2xl font-bold rounded-lg transition-all duration-300 transform hover:scale-105 h-24
                  ${!selectedAnswer 
                    ? 'bg-white/30 hover:bg-white/40 text-white' 
                    : option === currentQuestion.word 
                      ? 'bg-green-500 text-white animate-bounce' 
                      : option === selectedAnswer 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/30 text-white opacity-50'
                  }`}
              >
                {option}
              </Button>
            ))}
          </div>
          <div className="text-center">
            {selectedAnswer && (
              <Button onClick={handleNextQuestion} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full animate-pulse">
                {currentQuizIndex < quizQuestions.length - 1 ? 'Next Question →' : 'See Results 🎉'}
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-20 w-32 h-32 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-r from-blue-300 to-green-300 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute bottom-32 left-10 w-28 h-28 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-pulse delay-300 opacity-30"></div>
        
        <div className="absolute top-1/4 right-1/4 text-6xl animate-bounce delay-200 opacity-20">👶</div>
        <div className="absolute bottom-1/4 left-1/4 text-5xl animate-pulse delay-400 opacity-20">🌟</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3"
          >
            ← {ui.back}
          </Button>
          <h1 className="text-3xl font-bold text-white text-center flex-1">
            {ui.title}
          </h1>
          <Button
            onClick={handleBodyPartClick}
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full p-3"
            disabled={isPlaying}
          >
            <Volume2 size={20} />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="bg-white/20 rounded-full h-4 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-full transition-all duration-500"
              style={{ width: `${((currentIndex + 1) / bodyParts.length) * 100}%` }}
            ></div>
          </div>
          <p className="text-white text-center mt-2">
            {currentIndex + 1} / {bodyParts.length}
          </p>
        </div>

        {/* Body Part Display */}
        <div className="text-center mb-8">
          <p className="text-xl text-white mb-6">{ui.instruction}</p>
          
          <div 
            className={`relative inline-block cursor-pointer transform transition-all duration-300 hover:scale-110 ${isPlaying ? 'animate-pulse' : ''}`}
            onClick={handleBodyPartClick}
          >
            <div className="text-[200px] mb-4 filter drop-shadow-lg">
              {currentBodyPart.emoji}
            </div>
            
            {showCelebration && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl animate-bounce">⭐</div>
              </div>
            )}
          </div>

          <h2 className="text-4xl font-bold text-white mb-4 bg-white/20 rounded-full py-4 px-8 inline-block">
            {currentBodyPart.word}
          </h2>

          {showCelebration && (
            <div className="text-2xl text-yellow-300 font-bold animate-bounce">
              {ui.great} 🎉
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full disabled:opacity-50"
          >
            ← Previous
          </Button>
          
          {currentIndex === bodyParts.length - 1 ? (
            <Button
              onClick={startQuiz}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full animate-pulse"
            >
              Take Quiz! 🧠
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full"
            >
              {ui.next} →
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyPartsModule;
