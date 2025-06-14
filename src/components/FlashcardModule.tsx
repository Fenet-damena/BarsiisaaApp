
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { speakText } from '@/utils/speechUtils';

interface FlashcardModuleProps {
  level: number;
  onBack: () => void;
  language: 'english' | 'oromo';
}

const flashcardData = {
  english: {
    2: [
      { english: "Apple", oromo: "Arba", emoji: "🍎", letter: "A", oromoLetterSound: "Ah", imageUrl: "https://images.unsplash.com/photo-1557052583-59f3102555fb" },
      { english: "Ball", oromo: "Buna", emoji: "⚽", letter: "B", oromoLetterSound: "Buh", imageUrl: "https://images.unsplash.com/photo-1511920183353-34e85a7420e2" },
      { english: "Cat", oromo: "Cabbi", emoji: "🐱", letter: "C", oromoLetterSound: "Cha", imageUrl: "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b" },
      { english: "Dog", oromo: "Damma", emoji: "🐶", letter: "D", oromoLetterSound: "Dah", imageUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62" },
      { english: "Elephant", oromo: "Eegee", emoji: "🐘", letter: "E", oromoLetterSound: "Eh", imageUrl: "https://images.unsplash.com/photo-1517395949122-103e694975a8" },
      { english: "Fish", oromo: "Farda", emoji: "🐟", letter: "F", oromoLetterSound: "Fah", imageUrl: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2" },
      { english: "Giraffe", oromo: "Gurraacha", emoji: "🦒", letter: "G", oromoLetterSound: "Gah", imageUrl: "https://images.unsplash.com/photo-1516629221142-990a420b9e4a" },
      { english: "House", oromo: "Hoola", emoji: "🏠", letter: "H", oromoLetterSound: "Hah", imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23" },
      { english: "Ice Cream", oromo: "Ilma", emoji: "🍦", letter: "I", oromoLetterSound: "Ee", imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9" },
      { english: "Juice", oromo: "Jaldeessa", emoji: "🧃", letter: "J", oromoLetterSound: "Jah", imageUrl: "https://images.unsplash.com/photo-1501286353178-1ec881214838" },
      { english: "Kite", oromo: "Kitaaba", emoji: "🪁", letter: "K", oromoLetterSound: "Kah", imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c" },
      { english: "Lion", oromo: "Loon", emoji: "🦁", letter: "L", oromoLetterSound: "Lah", imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a" },
      { english: "Moon", oromo: "Muka", emoji: "🌙", letter: "M", oromoLetterSound: "Mah", imageUrl: "https://images.unsplash.com/photo-1458966480352-a5424a413abe" },
      { english: "Nest", oromo: "Nama", emoji: "🪹", letter: "N", oromoLetterSound: "Nah", imageUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a" },
      { english: "Orange", oromo: "Odaa", emoji: "🍊", letter: "O", oromoLetterSound: "Oh", imageUrl: "https://images.unsplash.com/photo-1433215581134-97c3966a42a0" },
      { english: "Pencil", oromo: "Pappayaa", emoji: "✏️", letter: "P", oromoLetterSound: "Pah", imageUrl: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe" },
      { english: "Queen", oromo: "Qamalee", emoji: "👑", letter: "Q", oromoLetterSound: "Qah", imageUrl: "https://images.unsplash.com/photo-1501286353178-1ec881214838" },
      { english: "Rainbow", oromo: "Raachaa", emoji: "🌈", letter: "R", oromoLetterSound: "Rah", imageUrl: "https://images.unsplash.com/photo-1587588319693-55097461c659" },
      { english: "Sun", oromo: "Saree", emoji: "☀️", letter: "S", oromoLetterSound: "Sah", imageUrl: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2" },
      { english: "Tree", oromo: "Tokko", emoji: "🌳", letter: "T", oromoLetterSound: "Tah", imageUrl: null },
      { english: "Umbrella", oromo: "Ulee", emoji: "☂️", letter: "U", oromoLetterSound: "Oo", imageUrl: "https://images.unsplash.com/photo-1550369433-2144d93a5bde" },
      { english: "Violin", oromo: "Vayooliini", emoji: "🎻", letter: "V", oromoLetterSound: "Vah", imageUrl: "https://images.unsplash.com/photo-1612225330847-64b8d7c58d24" },
      { english: "Water", oromo: "Waraabessa", emoji: "💧", letter: "W", oromoLetterSound: "Wah", imageUrl: "https://images.unsplash.com/photo-1599335607092-b4307c9fb371" },
      { english: "Xylophone", oromo: "Xalayaa", emoji: "🎶", letter: "X", oromoLetterSound: "Kha", imageUrl: "https://images.unsplash.com/photo-1594950393437-a7b20e73e919" },
      { english: "Yellow", oromo: "Yeeyyii", emoji: "🟡", letter: "Y", oromoLetterSound: "Yah", imageUrl: "https://images.unsplash.com/photo-1516934024016-1591d163c78a" },
      { english: "Zebra", oromo: "Zeeroo", emoji: "🦓", letter: "Z", oromoLetterSound: "Zah", imageUrl: null },
    ]
  },
  oromo: {
    2: [
      { english: "Apple", oromo: "Arba", emoji: "🍎", letter: "A", oromoLetterSound: "Ah", imageUrl: "https://images.unsplash.com/photo-1557052583-59f3102555fb" },
      { english: "Ball", oromo: "Buna", emoji: "⚽", letter: "B", oromoLetterSound: "Buh", imageUrl: "https://images.unsplash.com/photo-1511920183353-34e85a7420e2" },
      { english: "Cat", oromo: "Cabbi", emoji: "🐱", letter: "C", oromoLetterSound: "Cha", imageUrl: "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b" },
      { english: "Dog", oromo: "Damma", emoji: "🐶", letter: "D", oromoLetterSound: "Dah", imageUrl: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62" },
      { english: "Elephant", oromo: "Eegee", emoji: "🐘", letter: "E", oromoLetterSound: "Eh", imageUrl: "https://images.unsplash.com/photo-1517395949122-103e694975a8" },
      { english: "Fish", oromo: "Farda", emoji: "🐟", letter: "F", oromoLetterSound: "Fah", imageUrl: "https://images.unsplash.com/photo-1452378174528-3090a4bba7b2" },
      { english: "Giraffe", oromo: "Gurraacha", emoji: "🦒", letter: "G", oromoLetterSound: "Gah", imageUrl: "https://images.unsplash.com/photo-1516629221142-990a420b9e4a" },
      { english: "House", oromo: "Hoola", emoji: "🏠", letter: "H", oromoLetterSound: "Hah", imageUrl: "https://images.unsplash.com/photo-1517022812141-23620dba5c23" },
      { english: "Ice Cream", oromo: "Ilma", emoji: "🍦", letter: "I", oromoLetterSound: "Ee", imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9" },
      { english: "Juice", oromo: "Jaldeessa", emoji: "🧃", letter: "J", oromoLetterSound: "Jah", imageUrl: "https://images.unsplash.com/photo-1501286353178-1ec881214838" },
      { english: "Kite", oromo: "Kitaaba", emoji: "🪁", letter: "K", oromoLetterSound: "Kah", imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c" },
      { english: "Lion", oromo: "Loon", emoji: "🦁", letter: "L", oromoLetterSound: "Lah", imageUrl: "https://images.unsplash.com/photo-1493962853295-0fd70327578a" },
      { english: "Moon", oromo: "Muka", emoji: "🌙", letter: "M", oromoLetterSound: "Mah", imageUrl: "https://images.unsplash.com/photo-1458966480352-a5424a413abe" },
      { english: "Nest", oromo: "Nama", emoji: "🪹", letter: "N", oromoLetterSound: "Nah", imageUrl: "https://images.unsplash.com/photo-1552058544-f2b08422138a" },
      { english: "Orange", oromo: "Odaa", emoji: "🍊", letter: "O", oromoLetterSound: "Oh", imageUrl: "https://images.unsplash.com/photo-1433215581134-97c3966a42a0" },
      { english: "Pencil", oromo: "Pappayaa", emoji: "✏️", letter: "P", oromoLetterSound: "Pah", imageUrl: "https://images.unsplash.com/photo-1517282009859-f000ec3b26fe" },
      { english: "Queen", oromo: "Qamalee", emoji: "👑", letter: "Q", oromoLetterSound: "Qah", imageUrl: "https://images.unsplash.com/photo-1501286353178-1ec881214838" },
      { english: "Rainbow", oromo: "Raachaa", emoji: "🌈", letter: "R", oromoLetterSound: "Rah", imageUrl: "https://images.unsplash.com/photo-1587588319693-55097461c659" },
      { english: "Sun", oromo: "Saree", emoji: "☀️", letter: "S", oromoLetterSound: "Sah", imageUrl: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2" },
      { english: "Tree", oromo: "Tokko", emoji: "🌳", letter: "T", oromoLetterSound: "Tah", imageUrl: null },
      { english: "Umbrella", oromo: "Ulee", emoji: "☂️", letter: "U", oromoLetterSound: "Oo", imageUrl: "https://images.unsplash.com/photo-1550369433-2144d93a5bde" },
      { english: "Violin", oromo: "Vayooliini", emoji: "🎻", letter: "V", oromoLetterSound: "Vah", imageUrl: "https://images.unsplash.com/photo-1612225330847-64b8d7c58d24" },
      { english: "Water", oromo: "Waraabessa", emoji: "💧", letter: "W", oromoLetterSound: "Wah", imageUrl: "https://images.unsplash.com/photo-1599335607092-b4307c9fb371" },
      { english: "Xylophone", oromo: "Xalayaa", emoji: "🎶", letter: "X", oromoLetterSound: "Kha", imageUrl: "https://images.unsplash.com/photo-1594950393437-a7b20e73e919" },
      { english: "Yellow", oromo: "Yeeyyii", emoji: "🟡", letter: "Y", oromoLetterSound: "Yah", imageUrl: "https://images.unsplash.com/photo-1516934024016-1591d163c78a" },
      { english: "Zebra", oromo: "Zeeroo", emoji: "🦓", letter: "Z", oromoLetterSound: "Zah", imageUrl: null },
    ]
  }
};

const FlashcardModule = ({ level, onBack, language }: FlashcardModuleProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [score, setScore] = useState(0);

  const cards = flashcardData[language][level as keyof typeof flashcardData[typeof language]] || flashcardData[language][2];
  const currentCard = cards[currentCardIndex];

  const uiContent = {
    english: {
      back: "Back to Levels",
      title: "Letter Words",
      description: "Learn words with letters!",
      tapToFlip: "Tap to flip!",
      listen: "Listen",
      previous: "Previous",
      next: "Next",
      progress: "Progress:",
      score: "Score"
    },
    oromo: {
      back: "Gara Sadarkootatti",
      title: "Jechota Qubee",
      description: "Jechota qubee waliin baradhu!",
      tapToFlip: "Garagaluuf dhiibi!",
      listen: "Dhaggeeffadhu",
      previous: "Duraa",
      next: "Itti aansu",
      progress: "Adeemsa:",
      score: "Qabannoo"
    }
  };

  const ui = uiContent[language];

  const handleCardFlip = () => {
    setShowWord(!showWord);
  };

  const handleNextCard = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setShowWord(false);
      setScore(score + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setShowWord(false);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3"
          >
            ← {ui.back}
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              📚 {ui.title}
            </h1>
            <div className="text-white/80">
              {ui.description}
            </div>
            <div className="text-white/80">
              Card {currentCardIndex + 1} of {cards.length} • {ui.score}: {score} ⭐
            </div>
          </div>
          <div className="w-32"></div>
        </div>

        <div className="flex justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-lg w-full min-h-96 flex flex-col justify-center items-center cursor-pointer transform hover:scale-105 transition-all duration-300"
               onClick={handleCardFlip}>
            
            {!showWord ? (
              <div className="text-center">
                <div className="text-9xl font-bold text-purple-600 mb-6 animate-pulse">
                  {currentCard.letter}
                </div>
                
                <div className="text-8xl my-4">
                  {currentCard.emoji}
                </div>
                
                <div className="text-3xl font-bold text-gray-800 mb-4">
                  Letter {currentCard.letter}
                </div>
                <div className="text-gray-500 text-lg">
                  {ui.tapToFlip} 🔄
                </div>
              </div>
            ) : (
              <div className="text-center">
                <div className="w-48 h-48 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-9xl">{currentCard.emoji}</span>
                </div>
                
                <div className="text-3xl font-bold text-gray-800 mb-2">
                  {language === 'english' ? currentCard.english : currentCard.oromo}
                </div>
                <div className="text-xl text-purple-600">
                  {language === 'english' ? currentCard.oromo : currentCard.english}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-8">
          <Button
            onClick={handlePrevCard}
            disabled={currentCardIndex === 0}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            ← {ui.previous}
          </Button>
          
          <Button
            onClick={() => speakText(language === 'oromo' ? `${currentCard.oromoLetterSound}, ${currentCard.oromo}` : `${currentCard.letter} for ${currentCard.english}`, language)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            🔊 {ui.listen}
          </Button>
          
          <Button
            onClick={handleNextCard}
            disabled={currentCardIndex === cards.length - 1}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            {ui.next} →
          </Button>
        </div>

        <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-between items-center">
            <div className="text-white font-semibold">{ui.progress}</div>
            <div className="flex space-x-1">
              {cards.map((_, index) => (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full ${
                    index <= currentCardIndex ? 'bg-yellow-400' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashcardModule;
