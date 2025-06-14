import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { speakText, speakLetterOnly } from '@/utils/speechUtils';

interface AlphabetModuleProps {
  onBack: () => void;
  language: 'english' | 'oromo';
}

type LetterData = {
  letter: string;
  english: string;
  oromo: string;
  emoji: string;
  sound: string;
  oromoSound: string;
  pronunciation: string;
};

type NumberData = {
  number: string;
  english: string;
  oromo: string;
  emoji: string;
};

const alphabetData: LetterData[] = [
  { letter: 'A', english: 'Apple', oromo: 'Arba', emoji: '🐘', sound: 'aah', oromoSound: 'Ah', pronunciation: 'AHR-bah' },
  { letter: 'B', english: 'Ball', oromo: 'Bishaan', emoji: '💧', sound: 'bah', oromoSound: 'Ba', pronunciation: 'BEE-shaan' },
  { letter: 'C', english: 'Cat', oromo: 'Callee', emoji: '🐕', sound: 'cah', oromoSound: 'Cha', pronunciation: 'CHAL-lay' },
  { letter: 'D', english: 'Dog', oromo: 'Dandii', emoji: '🛤️', sound: 'dah', oromoSound: 'Da', pronunciation: 'DAN-dee' },
  { letter: 'E', english: 'Elephant', oromo: 'Eelee', emoji: '🥄', sound: 'eh', oromoSound: 'Eh', pronunciation: 'EH-leh' },
  { letter: 'F', english: 'Fish', oromo: 'Farda', emoji: '🐴', sound: 'fah', oromoSound: 'Fa', pronunciation: 'FAR-da' },
  { letter: 'G', english: 'Giraffe', oromo: 'Gurraacha', emoji: '⚫', sound: 'gah', oromoSound: 'Ga', pronunciation: 'GUR-raachaa' },
  { letter: 'H', english: 'House', oromo: 'Harree', emoji: '🫏', sound: 'hah', oromoSound: 'Ha', pronunciation: 'HAR-ray' },
  { letter: 'I', english: 'Ice cream', oromo: 'Ilkaan', emoji: '🦷', sound: 'eeh', oromoSound: 'Ee', pronunciation: 'EEL-kahn' },
  { letter: 'J', english: 'Juice', oromo: 'Jaldeessa', emoji: '🦊', sound: 'jah', oromoSound: 'Ja', pronunciation: 'JAL-deh-ssa' },
  { letter: 'K', english: 'Kite', oromo: 'Kitaaba', emoji: '📚', sound: 'kah', oromoSound: 'Ka', pronunciation: 'KEE-taa-bah' },
  { letter: 'L', english: 'Lion', oromo: 'Loon', emoji: '🐄', sound: 'lah', oromoSound: 'La', pronunciation: 'LOHN' },
  { letter: 'M', english: 'Moon', oromo: 'Muka', emoji: '🌳', sound: 'mah', oromoSound: 'Ma', pronunciation: 'MOO-kah' },
  { letter: 'N', english: 'Nest', oromo: 'Nama', emoji: '👤', sound: 'nah', oromoSound: 'Na', pronunciation: 'NAH-mah' },
  { letter: 'O', english: 'Orange', oromo: 'Odaa', emoji: '🌳', sound: 'oh', oromoSound: 'Oo', pronunciation: 'OH-daa' },
  { letter: 'P', english: 'Pencil', oromo: 'Paarkii', emoji: '🏞️', sound: 'pah', oromoSound: 'Pa', pronunciation: 'PAAR-kee' },
  { letter: 'Q', english: 'Queen', oromo: 'Qamalee', emoji: '🐵', sound: 'qah', oromoSound: 'Qa', pronunciation: 'QAH-mah-leh' },
  { letter: 'R', english: 'Rainbow', oromo: 'Rooba', emoji: '🌧️', sound: 'rah', oromoSound: 'Ra', pronunciation: 'ROH-bah' },
  { letter: 'S', english: 'Sun', oromo: 'Simbirroo', emoji: '🐦', sound: 'sah', oromoSound: 'Sa', pronunciation: 'SIM-birr-roo' },
  { letter: 'T', english: 'Tree', oromo: 'Tokko', emoji: '1️⃣', sound: 'tah', oromoSound: 'Ta', pronunciation: 'TOK-ko' },
  { letter: 'U', english: 'Umbrella', oromo: 'Ulee', emoji: '🪵', sound: 'ooh', oromoSound: 'Oo', pronunciation: 'OO-lay' },
  { letter: 'V', english: 'Violin', oromo: 'Viiyooliin', emoji: '🎻', sound: 'vah', oromoSound: 'Va', pronunciation: 'VEE-yoh-leen' },
  { letter: 'W', english: 'Water', oromo: 'Waraabessa', emoji: '🐺', sound: 'wah', oromoSound: 'Wa', pronunciation: 'WAH-raah-bes-saa' },
  { letter: 'X', english: 'Xylophone', oromo: 'Xurree', emoji: '🐜', sound: 'hah', oromoSound: 'Xa', pronunciation: 'HOO-ray' },
  { letter: 'Y', english: 'Yellow', oromo: 'Yeeyyii', emoji: '👵', sound: 'yah', oromoSound: 'Ya', pronunciation: 'YAY-yyee' },
  { letter: 'Z', english: 'Zebra', oromo: 'Zeeroo', emoji: '0️⃣', sound: 'zah', oromoSound: 'Za', pronunciation: 'ZEH-roh' },
];

const numberData: NumberData[] = [
  { number: '1', english: 'One', oromo: 'Tokko', emoji: '1️⃣' },
  { number: '2', english: 'Two', oromo: 'Lama', emoji: '2️⃣' },
  { number: '3', english: 'Three', oromo: 'Sadii', emoji: '3️⃣' },
  { number: '4', english: 'Four', oromo: 'Afur', emoji: '4️⃣' },
  { number: '5', english: 'Five', oromo: 'Shan', emoji: '5️⃣' },
  { number: '6', english: 'Six', oromo: 'Ja\'a', emoji: '6️⃣' },
  { number: '7', english: 'Seven', oromo: 'Torba', emoji: '7️⃣' },
  { number: '8', english: 'Eight', oromo: 'Saddeet', emoji: '8️⃣' },
  { number: '9', english: 'Nine', oromo: 'Sagal', emoji: '9️⃣' },
  { number: '10', english: 'Ten', oromo: 'Kudhan', emoji: '🔟' },
];

const AlphabetModule = ({ onBack, language }: AlphabetModuleProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showNumbers, setShowNumbers] = useState(false);

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
      next: "Next",
      pronunciation: "Pronunciation:"
    },
    oromo: {
      back: "Duubatti",
      title: "Qubee fi Lakkoofsota Baradhu!",
      letters: "Qubeelee",
      numbers: "Lakkoofsota",
      listen: "Dhaggeeffadhu",
      previous: "Dura",
      next: "Itti Aansu",
      pronunciation: "Dubbii:"
    }
  };

  const ui = uiContent[language];

  const getDisplayText = () => {
    if (showNumbers) {
      const item = currentItem as NumberData;
      return language === 'english' ? item.english : item.oromo;
    } else {
      // For level 1 (letters), only show the letter sound
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
      const sound = language === 'english' ? item.sound : item.oromoSound;
      speakLetterOnly(item.letter, sound, language);
    }
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
            <div className="text-9xl mb-6 animate-pulse">
              {getMainCharacter()}
            </div>
            <div className="text-8xl mb-6 animate-bounce">
              {currentItem.emoji}
            </div>
            
            {/* For letters, show only the sound */}
            {!showNumbers && (
              <div className="text-4xl font-bold text-gray-800 mb-4">
                {getDisplayText()}
              </div>
            )}
            
            {/* For numbers, show the word */}
            {showNumbers && (
              <div className="text-4xl font-bold text-gray-800 mb-4">
                {getDisplayText()}
              </div>
            )}
            
            <Button
              onClick={handleSpeak}
              className="bg-gradient-to-r from-orange-400 to-red-500 hover:from-orange-500 hover:to-red-600 text-white text-xl px-8 py-4 rounded-full"
            >
              🔊 {ui.listen}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            ← {ui.previous}
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentIndex === currentData.length - 1}
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
