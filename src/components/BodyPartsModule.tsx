
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
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
    { word: 'Heart', emoji: '❤️', pronunciation: 'heart' },
    { word: 'Arm', emoji: '💪', pronunciation: 'arm' },
    { word: 'Leg', emoji: '🦵', pronunciation: 'leg' }
  ],
  oromo: [
    { word: 'Mataa', emoji: '👤', pronunciation: 'mah-tah' },
    { word: 'Ija', emoji: '👁️', pronunciation: 'ee-jah' },
    { word: 'Funyaan', emoji: '👃', pronunciation: 'foo-nyahn' },
    { word: 'Afaan', emoji: '👄', pronunciation: 'ah-fahn' },
    { word: 'Gurra', emoji: '👂', pronunciation: 'goo-rah' },
    { word: 'Harka', emoji: '✋', pronunciation: 'har-kah' },
    { word: 'Miila', emoji: '🦶', pronunciation: 'mee-lah' },
    { word: 'Onnee', emoji: '❤️', pronunciation: 'oh-neh' },
    { word: 'Irree', emoji: '💪', pronunciation: 'eer-eh' },
    { word: 'Luka', emoji: '🦵', pronunciation: 'loo-kah' }
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
    // Auto-play the body part name when it appears
    const timer = setTimeout(() => {
      if (!isPlaying) {
        speakText(currentBodyPart.pronunciation, language);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [currentIndex, language, currentBodyPart.pronunciation, isPlaying]);

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
          <div className="w-24"></div>
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
              onClick={onBack}
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full"
            >
              {ui.finish}
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
