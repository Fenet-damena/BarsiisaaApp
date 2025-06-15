
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { speakText } from '@/utils/speechUtils';

interface AlphabetModuleProps {
  onBack: () => void;
  language: 'english' | 'oromo';
}

type LetterData = {
  letter: string;
  english: string;
  oromo: string;
  sound: string;
  oromoSound: string;
  phoneticSound: string;
};

type NumberData = {
  number: string;
  english: string;
  oromo: string;
  emoji: string;
  countableObject: string;
  countableEmojis: string;
};

const alphabetData: LetterData[] = [
  { letter: 'A', english: 'Apple', oromo: 'Arba', sound: 'ay', oromoSound: 'ah', phoneticSound: 'a' },
  { letter: 'B', english: 'Ball', oromo: 'Bishaan', sound: 'bee', oromoSound: 'bah', phoneticSound: 'buh' },
  { letter: 'C', english: 'Cat', oromo: 'Callee', sound: 'see', oromoSound: 'chah', phoneticSound: 'kuh' },
  { letter: 'D', english: 'Dog', oromo: 'Dandii', sound: 'dee', oromoSound: 'dah', phoneticSound: 'duh' },
  { letter: 'E', english: 'Elephant', oromo: 'Eelee', sound: 'ee', oromoSound: 'A', phoneticSound: 'eh' },
  { letter: 'F', english: 'Fish', oromo: 'Farda', sound: 'ef', oromoSound: 'Fah', phoneticSound: 'fuh' },
  { letter: 'G', english: 'Giraffe', oromo: 'Gurraacha', sound: 'jee', oromoSound: 'gah', phoneticSound: 'guh' },
  { letter: 'H', english: 'House', oromo: 'Harree', sound: 'aitch', oromoSound: 'hah', phoneticSound: 'huh' },
  { letter: 'I', english: 'Ice cream', oromo: 'Ilkaan', sound: 'eye', oromoSound: 'e', phoneticSound: 'ih' },
  { letter: 'J', english: 'Juice', oromo: 'Jaldeessa', sound: 'jay', oromoSound: 'Jah', phoneticSound: 'juh' },
  { letter: 'K', english: 'Kite', oromo: 'Kitaaba', sound: 'kay', oromoSound: 'Kah', phoneticSound: 'kuh' },
  { letter: 'L', english: 'Lion', oromo: 'Loon', sound: 'el', oromoSound: 'Lah', phoneticSound: 'luh' },
  { letter: 'M', english: 'Moon', oromo: 'Muka', sound: 'em', oromoSound: 'mah', phoneticSound: 'muh' },
  { letter: 'N', english: 'Nest', oromo: 'Nama', sound: 'en', oromoSound: 'nah', phoneticSound: 'nuh' },
  { letter: 'O', english: 'Orange', oromo: 'Odaa', sound: 'oh', oromoSound: 'o', phoneticSound: 'ah' },
  { letter: 'P', english: 'Pencil', oromo: 'Paarkii', sound: 'pee', oromoSound: 'pah', phoneticSound: 'puh' },
  { letter: 'Q', english: 'Queen', oromo: 'Qamalee', sound: 'cue', oromoSound: 'Qah', phoneticSound: 'kwuh' },
  { letter: 'R', english: 'Rainbow', oromo: 'Rooba', sound: 'ar', oromoSound: 'rah', phoneticSound: 'ruh' },
  { letter: 'S', english: 'Sun', oromo: 'Simbirroo', sound: 'ess', oromoSound: 'sah', phoneticSound: 'sss' },
  { letter: 'T', english: 'Tree', oromo: 'Tokko', sound: 'tee', oromoSound: 'tah', phoneticSound: 'tuh' },
  { letter: 'U', english: 'Umbrella', oromo: 'Ulee', sound: 'you', oromoSound: 'oo', phoneticSound: 'uh' },
  { letter: 'V', english: 'Violin', oromo: 'Viiyooliin', sound: 'vee', oromoSound: 'Vah', phoneticSound: 'vuh' },
  { letter: 'W', english: 'Water', oromo: 'Waraabessa', sound: 'double-you', oromoSound: 'wah', phoneticSound: 'wuh' },
  { letter: 'X', english: 'Xylophone', oromo: 'Xurree', sound: 'eks', oromoSound: 'Tah', phoneticSound: 'ks' },
  { letter: 'Y', english: 'Yellow', oromo: 'Yeeyyii', sound: 'why', oromoSound: 'yah', phoneticSound: 'yuh' },
  { letter: 'Z', english: 'Zebra', oromo: 'Zeeroo', sound: 'zee', oromoSound: 'zah', phoneticSound: 'zuh' },
];

const numberData: NumberData[] = [
  { number: '1', english: 'One', oromo: 'Tokko', emoji: '1️⃣', countableObject: 'Cat', countableEmojis: '🐱' },
  { number: '2', english: 'Two', oromo: 'Lama', emoji: '2️⃣', countableObject: 'Dogs', countableEmojis: '🐶🐶' },
  { number: '3', english: 'Three', oromo: 'Sadii', emoji: '3️⃣', countableObject: 'Birds', countableEmojis: '🐦🐦🐦' },
  { number: '4', english: 'Four', oromo: 'Afur', emoji: '4️⃣', countableObject: 'Fish', countableEmojis: '🐟🐟🐟🐟' },
  { number: '5', english: 'Five', oromo: 'Shan', emoji: '5️⃣', countableObject: 'Stars', countableEmojis: '⭐⭐⭐⭐⭐' },
  { number: '6', english: 'Six', oromo: 'Ja\'a', emoji: '6️⃣', countableObject: 'Flowers', countableEmojis: '🌸🌸🌸🌸🌸🌸' },
  { number: '7', english: 'Seven', oromo: 'Torba', emoji: '7️⃣', countableObject: 'Apples', countableEmojis: '🍎🍎🍎🍎🍎🍎🍎' },
  { number: '8', english: 'Eight', oromo: 'Saddeet', emoji: '8️⃣', countableObject: 'Balls', countableEmojis: '⚽⚽⚽⚽⚽⚽⚽⚽' },
  { number: '9', english: 'Nine', oromo: 'Sagal', emoji: '9️⃣', countableObject: 'Hearts', countableEmojis: '❤️❤️❤️❤️❤️❤️❤️❤️❤️' },
  { number: '10', english: 'Ten', oromo: 'Kudhan', emoji: '🔟', countableObject: 'Fingers', countableEmojis: '👆👆👆👆👆👆👆👆👆👆' },
];

const AlphabetModule = ({ onBack, language }: AlphabetModuleProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNumbers, setShowNumbers] = useState(false);
  const [isReadingAll, setIsReadingAll] = useState(false);
  const stopReadingRef = useRef(false);

  useEffect(() => {
    // Cleanup function to cancel speech synthesis when the component unmounts
    return () => {
      speechSynthesis.cancel();
      stopReadingRef.current = true;
    };
  }, []);

  const currentData = showNumbers ? numberData : alphabetData;
  const currentItem = currentData[currentIndex];

  const uiContent = {
    english: {
      back: "Back",
      title: "Learn Alphabet & Numbers!",
      letters: "Letters",
      numbers: "Numbers",
      listen: "Listen",
      previous: "Previous",
      next: "Next"
    },
    oromo: {
      back: "Duubatti",
      title: "Qubee fi Lakkoofsota Baradhu!",
      letters: "Qubeelee",
      numbers: "Lakkoofsota",
      listen: "Dhaggeeffadhu",
      previous: "Dura",
      next: "Itti Aansu"
    }
  };

  const ui = uiContent[language];

  const getDisplayText = () => {
    if (showNumbers) {
      const item = currentItem as NumberData;
      return language === 'english' ? item.english : item.oromo;
    } else {
      const item = currentItem as LetterData;
      return language === 'english' ? item.sound : item.oromoSound;
    }
  };

  const getMainCharacter = () => {
    if (showNumbers) {
      return (currentItem as NumberData).number;
    } else {
      return (currentItem as LetterData).letter;
    }
  };

  const handleSpeak = () => {
    if (showNumbers) {
      const item = currentItem as NumberData;
      const text = language === 'english' ? item.english : item.oromo;
      speakText(text, language);
    } else {
      const item = currentItem as LetterData;
      if (language === 'english') {
        speakText(item.sound, language);
      } else {
        speakText(item.oromoSound, language);
      }
    }
  };

  const handleReadAll = async () => {
    if (isReadingAll) {
      stopReadingRef.current = true;
      speechSynthesis.cancel();
      setIsReadingAll(false);
      return;
    }

    setIsReadingAll(true);
    stopReadingRef.current = false;

    // We are in letter mode, so we use alphabetData
    for (let i = 0; i < alphabetData.length; i++) {
      if (stopReadingRef.current) {
        break;
      }
      setCurrentIndex(i);
      const item = alphabetData[i];
      // Speak the English phonetic sound
      await speakText(item.phoneticSound, 'english');
    }

    setIsReadingAll(false);
  };

  const handleNext = () => {
    if (currentIndex < currentData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleMode = () => {
    if (isReadingAll) return; // Prevent toggling while reading all letters.
    setShowNumbers(!showNumbers);
    setCurrentIndex(0);
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-r from-red-300 to-pink-300 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-300 to-green-300 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute bottom-32 left-20 w-28 h-28 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-pulse delay-300 opacity-30"></div>
        
        {/* Floating Letters */}
        <div className="absolute top-1/4 right-1/4 text-6xl animate-bounce delay-200 opacity-20">📚</div>
        <div className="absolute bottom-1/4 left-1/4 text-5xl animate-pulse delay-400 opacity-20">✏️</div>
        <div className="absolute top-1/2 right-1/3 text-4xl animate-bounce delay-600 opacity-20">🎨</div>
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
            📖 {ui.title}
          </h1>
          <div className="w-32"></div>
        </div>

        {/* Mode Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
            <Button
              onClick={toggleMode}
              disabled={isReadingAll}
              className={`px-6 py-3 rounded-full mr-2 ${
                !showNumbers 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                  : 'bg-white/30 text-white'
              }`}
            >
              🔤 {ui.letters}
            </Button>
            <Button
              onClick={toggleMode}
              disabled={isReadingAll}
              className={`px-6 py-3 rounded-full ${
                showNumbers 
                  ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white' 
                  : 'bg-white/30 text-white'
              }`}
            >
              🔢 {ui.numbers}
            </Button>
          </div>
        </div>

        {/* Main Display */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8">
          <div className="text-center">
            {/* Large Letter/Number Display */}
            <div className="text-[12rem] font-bold text-gray-800 mb-6 leading-none">
              {getMainCharacter()}
            </div>
            
            {/* For numbers only, show emoji and countable objects */}
            {showNumbers && (
              <div className="mb-6">
                <div className="text-8xl mb-4 animate-bounce">
                  {(currentItem as NumberData).emoji}
                </div>
                <div className="text-6xl mb-4 leading-relaxed">
                  {(currentItem as NumberData).countableEmojis}
                </div>
                <div className="text-2xl text-gray-600 mb-4">
                  {(currentItem as NumberData).countableObject}
                </div>
              </div>
            )}
            
            {/* Sound/Word Display */}
            <div className="text-4xl font-bold text-gray-800 mb-6">
              {getDisplayText()}
            </div>
            
            <div className="flex justify-center items-center gap-4">
              <Button
                onClick={handleSpeak}
                disabled={isReadingAll}
                className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white text-xl px-8 py-4 rounded-full"
              >
                🔊 {ui.listen}
              </Button>

              {language === 'english' && !showNumbers && (
                <Button
                  onClick={handleReadAll}
                  className="bg-gradient-to-r from-blue-400 to-teal-500 hover:from-blue-500 hover:to-teal-600 text-white text-xl px-8 py-4 rounded-full"
                >
                  {isReadingAll ? '⏹️ Stop Reading' : '▶️ Read All Letters'}
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0 || isReadingAll}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            ← {ui.previous}
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentIndex === currentData.length - 1 || isReadingAll}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            {ui.next} →
          </Button>
        </div>

        {/* Progress */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="text-center text-white mb-2">
            {getMainCharacter()} - {currentIndex + 1} of {currentData.length}
          </div>
          <div className="flex space-x-1">
            {currentData.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-3 rounded-full ${
                  index <= currentIndex ? 'bg-gradient-to-r from-yellow-400 to-orange-500' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlphabetModule;
