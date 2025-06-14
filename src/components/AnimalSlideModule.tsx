import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { speakText } from '@/utils/speechUtils';

interface AnimalSlideModuleProps {
  onBack: () => void;
  language: 'english' | 'oromo';
}

const animalData = {
  english: [
    { english: "Lion", oromo: "Leenca", emoji: "🦁", sound: "Roar!" },
    { english: "Elephant", oromo: "Carbaa", emoji: "🐘", sound: "Trumpet!" },
    { english: "Monkey", oromo: "Jeelbii", emoji: "🐵", sound: "Ooh ooh!" },
    { english: "Tiger", oromo: "Qeerransaa", emoji: "🐅", sound: "Growl!" },
    { english: "Giraffe", oromo: "Jiraafii", emoji: "🦒", sound: "Silent!" },
    { english: "Zebra", oromo: "Zebraa", emoji: "🦓", sound: "Neigh!" },
    { english: "Hippo", oromo: "Roobii", emoji: "🦛", sound: "Grunt!" },
    { english: "Crocodile", oromo: "Aganee", emoji: "🐊", sound: "Snap!" },
    { english: "Penguin", oromo: "Penguinii", emoji: "🐧", sound: "Squawk!" },
    { english: "Panda", oromo: "Paandaa", emoji: "🐼", sound: "Chirp!" },
  ],
  oromo: [
    { english: "Lion", oromo: "Leenca", emoji: "🦁", sound: "Aaduu!" },
    { english: "Elephant", oromo: "Carbaa", emoji: "🐘", sound: "Fuufuu!" },
    { english: "Monkey", oromo: "Jeelbii", emoji: "🐵", sound: "Uu uu!" },
    { english: "Tiger", oromo: "Qeerransaa", emoji: "🐅", sound: "Gurruu!" },
    { english: "Giraffe", oromo: "Jiraafii", emoji: "🦒", sound: "Caliistu!" },
    { english: "Zebra", oromo: "Zebraa", emoji: "🦓", sound: "Hiihii!" },
    { english: "Hippo", oromo: "Roobii", emoji: "🦛", sound: "Huufuu!" },
    { english: "Crocodile", oromo: "Aganee", emoji: "🐊", sound: "Qabuu!" },
    { english: "Penguin", oromo: "Penguinii", emoji: "🐧", sound: "Ciicii!" },
    { english: "Panda", oromo: "Paandaa", emoji: "🐼", sound: "Siixuu!" },
  ]
};

const AnimalSlideModule = ({ onBack, language }: AnimalSlideModuleProps) => {
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(false);

  const animals = animalData[language];
  const currentAnimal = animals[currentAnimalIndex];

  const uiContent = {
    english: {
      back: "Back",
      title: "Animal World!",
      listen: "Listen",
      previous: "Previous",
      next: "Next",
      autoPlay: "Auto Play",
      stopAuto: "Stop Auto",
      animalSound: "Animal Sound",
      progress: "Progress:"
    },
    oromo: {
      back: "Duubatti",
      title: "Addunyaa Bineensotaa!",
      listen: "Dhaggeeffadhu",
      previous: "Duraa",
      next: "Itti aansu",
      autoPlay: "Ofumaan Taphisi",
      stopAuto: "Ofumaan Dhiisi",
      animalSound: "Sagalee Bineensaa",
      progress: "Adeemsa:"
    }
  };

  const ui = uiContent[language];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setCurrentAnimalIndex((prev) => (prev + 1) % animals.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, animals.length]);

  const handleNext = () => {
    setCurrentAnimalIndex((prev) => (prev + 1) % animals.length);
  };

  const handlePrevious = () => {
    setCurrentAnimalIndex((prev) => (prev - 1 + animals.length) % animals.length);
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Animated Background with sliding animals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 -left-20 w-16 h-16 animate-bounce opacity-40">🦁</div>
        <div className="absolute top-32 -right-20 w-14 h-14 animate-pulse opacity-40">🐘</div>
        <div className="absolute bottom-20 -left-16 w-12 h-12 animate-bounce delay-300 opacity-40">🐵</div>
        
        {/* Sliding background animals */}
        <div className="absolute top-1/4 animate-pulse delay-100 opacity-30 text-6xl">
          <div className="animate-bounce">🦒</div>
        </div>
        <div className="absolute bottom-1/4 right-1/4 animate-pulse delay-200 opacity-30 text-5xl">
          <div className="animate-bounce delay-100">🦓</div>
        </div>
        <div className="absolute top-1/2 left-1/4 animate-pulse delay-300 opacity-30 text-4xl">
          <div className="animate-bounce delay-200">🐼</div>
        </div>

        {/* Moving shapes */}
        <div className="absolute top-20 left-1/3 w-24 h-24 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-32 right-1/3 w-28 h-28 bg-gradient-to-r from-green-300 to-blue-300 rounded-full animate-bounce delay-300 opacity-30"></div>
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
              🦁 {ui.title}
            </h1>
            <div className="text-white/80">
              Animal {currentAnimalIndex + 1} of {animals.length}
            </div>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Main Animal Display */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 shadow-2xl max-w-lg w-full min-h-96 flex flex-col justify-center items-center transform hover:scale-105 transition-all duration-300">
            <div className="text-9xl mb-6 animate-bounce">{currentAnimal.emoji}</div>
            
            {/* Animal image placeholder with enhanced styling */}
            <div className="w-48 h-48 mx-auto mb-6 bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl flex items-center justify-center shadow-xl border-4 border-white">
              <span className="text-8xl">{currentAnimal.emoji}</span>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-800 mb-4">
                {language === 'english' ? currentAnimal.english : currentAnimal.oromo}
              </div>
              <div className="text-lg text-gray-600 mb-4">
                {language === 'english' ? 'English' : 'Afaan Oromo'}
              </div>
              <div className="text-xl text-purple-600 font-bold mb-4">
                {currentAnimal.sound}
              </div>
              <div className="text-sm text-gray-500">
                {ui.animalSound}
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            onClick={handlePrevious}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full"
          >
            ← {ui.previous}
          </Button>
          
          <Button
            onClick={() => speakText(`${language === 'english' ? currentAnimal.english : currentAnimal.oromo}. ${currentAnimal.sound}`, language)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            🔊 {ui.listen}
          </Button>
          
          <Button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className={`px-6 py-3 rounded-full text-white ${
              isAutoPlay 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-purple-500 hover:bg-purple-600'
            }`}
          >
            {isAutoPlay ? '⏸️ ' + ui.stopAuto : '▶️ ' + ui.autoPlay}
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
            <div className="text-white/80">{Math.round(((currentAnimalIndex + 1) / animals.length) * 100)}%</div>
          </div>
          <div className="flex space-x-1">
            {animals.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-3 rounded-full transition-all duration-300 ${
                  index === currentAnimalIndex 
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 scale-110' 
                    : index < currentAnimalIndex 
                      ? 'bg-gradient-to-r from-green-400 to-blue-500' 
                      : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimalSlideModule;
