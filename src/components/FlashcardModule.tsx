
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
      { english: "A for Apple", oromo: "Poomii", emoji: "🍎", letter: "A", oromoLetterSound: "Ah" },
      { english: "B for Ball", oromo: "Kubbaa", emoji: "⚽", letter: "B", oromoLetterSound: "Buh" },
      { english: "C for Cat", oromo: "Adurree", emoji: "🐱", letter: "C", oromoLetterSound: "Cha" },
      { english: "D for Dog", oromo: "Saree", emoji: "🐶", letter: "D", oromoLetterSound: "Dah" },
      { english: "E for Elephant", oromo: "Arba", emoji: "🐘", letter: "E", oromoLetterSound: "Eh" },
      { english: "F for Fish", oromo: "Qurxummii", emoji: "🐟", letter: "F", oromoLetterSound: "Fah" },
      { english: "G for Giraffe", oromo: "Sattawwaa", emoji: "🦒", letter: "G", oromoLetterSound: "Gah" },
      { english: "H for Hoola", oromo: "Hoola", emoji: "🐑", letter: "H", oromoLetterSound: "Hah" },
      { english: "I for Ice Cream", oromo: "Jalaala", emoji: "🍦", letter: "I", oromoLetterSound: "Ee" },
      { english: "J for Juice", oromo: "Cuunfaa", emoji: "🧃", letter: "J", oromoLetterSound: "Jah" },
      { english: "K for Kite", oromo: "Barruu", emoji: "🪁", letter: "K", oromoLetterSound: "Kah" },
      { english: "L for Lion", oromo: "Leenca", emoji: "🦁", letter: "L", oromoLetterSound: "Lah" },
      { english: "M for Moon", oromo: "Jia", emoji: "🌙", letter: "M", oromoLetterSound: "Mah" },
      { english: "N for Nest", oromo: "Godee", emoji: "🪹", letter: "N", oromoLetterSound: "Nah" },
      { english: "O for Orange", oromo: "Burtukaana", emoji: "🍊", letter: "O", oromoLetterSound: "Oh" },
      { english: "P for Pencil", oromo: "Irsaasa", emoji: "✏️", letter: "P", oromoLetterSound: "Pah" },
      { english: "Q for Queen", oromo: "Gingin", emoji: "👑", letter: "Q", oromoLetterSound: "Qah" },
      { english: "R for Rainbow", oromo: "Sabbata", emoji: "🌈", letter: "R", oromoLetterSound: "Rah" },
      { english: "S for Sun", oromo: "Aduu", emoji: "☀️", letter: "S", oromoLetterSound: "Sah" },
      { english: "T for Tree", oromo: "Muka", emoji: "🌳", letter: "T", oromoLetterSound: "Tah" },
      { english: "U for Umbrella", oromo: "Dalga", emoji: "☂️", letter: "U", oromoLetterSound: "Oo" },
      { english: "V for Violin", oromo: "Vayoliinii", emoji: "🎻", letter: "V", oromoLetterSound: "Vah" },
      { english: "W for Water", oromo: "Bishaan", emoji: "💧", letter: "W", oromoLetterSound: "Wah" },
      { english: "X for Xylophone", oromo: "Xayilofoonii", emoji: "🎶", letter: "X", oromoLetterSound: "Kha" },
      { english: "Y for Yellow", oromo: "Keelloo", emoji: "🟡", letter: "Y", oromoLetterSound: "Yah" },
      { english: "Z for Zebra", oromo: "Haree", emoji: "🦓", letter: "Z", oromoLetterSound: "Zah" },
    ]
  },
  oromo: {
    2: [
      { english: "Elephant", oromo: "Arba", emoji: "🐘", letter: "A", oromoLetterSound: "Ah" },
      { english: "Butterfly", oromo: "Billacha", emoji: "🦋", letter: "B", oromoLetterSound: "Buh" },
      { english: "Ice", oromo: "Cabbi", emoji: "🧊", letter: "C", oromoLetterSound: "Cha" },
      { english: "Honey", oromo: "Damma", emoji: "🍯", letter: "D", oromoLetterSound: "Dah" },
      { english: "Pan", oromo: "Eelee", emoji: "🍳", letter: "E", oromoLetterSound: "Eh" },
      { english: "Horse", oromo: "Farda", emoji: "🐴", letter: "F", oromoLetterSound: "Fah" },
      { english: "Black", oromo: "Gurraacha", emoji: "⚫", letter: "G", oromoLetterSound: "Gah" },
      { english: "Sheep", oromo: "Hoola", emoji: "🐑", letter: "H", oromoLetterSound: "Hah" },
      { english: "Tooth", oromo: "Ilkaan", emoji: "🦷", letter: "I", oromoLetterSound: "Ee" },
      { english: "Monkey", oromo: "Jaldeessa", emoji: "🐒", letter: "J", oromoLetterSound: "Jah" },
      { english: "Book", oromo: "Kitaaba", emoji: "📚", letter: "K", oromoLetterSound: "Kah" },
      { english: "Cattle", oromo: "Loon", emoji: "🐄", letter: "L", oromoLetterSound: "Lah" },
      { english: "Tree", oromo: "Muka", emoji: "🌳", letter: "M", oromoLetterSound: "Mah" },
      { english: "Person", oromo: "Nama", emoji: "🧑", letter: "N", oromoLetterSound: "Nah" },
      { english: "Odaa Tree", oromo: "Odaa", emoji: "🌳", letter: "O", oromoLetterSound: "Oh" },
      { english: "Papaya", oromo: "Pappayaa", emoji: "🥭", letter: "P", oromoLetterSound: "Pah" },
      { english: "Turtle", oromo: "Qamalee", emoji: "🐢", letter: "Q", oromoLetterSound: "Qah" },
      { english: "Frog", oromo: "Raachaa", emoji: "🐸", letter: "R", oromoLetterSound: "Rah" },
      { english: "Dog", oromo: "Saree", emoji: "🐶", letter: "S", oromoLetterSound: "Sah" },
      { english: "One", oromo: "Tokko", emoji: "1️⃣", letter: "T", oromoLetterSound: "Tah" },
      { english: "Stick", oromo: "Ulee", emoji: "🦯", letter: "U", oromoLetterSound: "Oo" },
      { english: "Violin", oromo: "Vayooliini", emoji: "🎻", letter: "V", oromoLetterSound: "Vah" },
      { english: "Paper", oromo: "Waraqaa", emoji: "📄", letter: "W", oromoLetterSound: "Wah" },
      { english: "Letter", oromo: "Xalayaa", emoji: "✉️", letter: "X", oromoLetterSound: "Kha" },
      { english: "Wolf", oromo: "Yeeyyii", emoji: "🐺", letter: "Y", oromoLetterSound: "Yah" },
      { english: "Zero", oromo: "Zeeroo", emoji: "0️⃣", letter: "Z", oromoLetterSound: "Zah" },
    ]
  }
};

const FlashcardModule = ({ level, onBack, language }: FlashcardModuleProps) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [completionMessage, setCompletionMessage] = useState('');

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
      score: "Score",
      finish: "Finish",
      congratulations: "Congratulations!",
      completionMessages: [
        "You are awesome!",
        "Wow! You're so smart!",
        "You're learning so fast!",
        "Fantastic work!"
      ]
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
      score: "Qabannoo",
      finish: "Xumuri",
      congratulations: "Baga Gammaddan!",
      completionMessages: [
        "Baay'ee hojii Gaarii!",
        "Baay'ee hojii bareedaa!"
      ]
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

  const handleFinish = () => {
    const messages = ui.completionMessages;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    setCompletionMessage(randomMessage);
    setScore(score + 1);
    setIsCompleted(true);
    speakText(randomMessage, language);
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen p-6 flex flex-col items-center justify-center text-white text-center">
        <div className="text-8xl mb-4 animate-bounce">🎉</div>
        <h2 className="text-4xl font-bold mb-4">{ui.congratulations}</h2>
        <p className="text-2xl mb-8">{completionMessage}</p>
        <p className="text-xl mb-8">{ui.score}: {score} ⭐</p>
        <Button onClick={onBack} className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3">
          ← {ui.back}
        </Button>
      </div>
    );
  }

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
                
                <div className="text-8xl my-4 animate-bounce">
                  {currentCard.emoji}
                </div>
                
                <div className="text-3xl font-bold text-gray-800 mb-4">
                  {language === 'english' ? currentCard.english : `Qubee ${currentCard.letter}`}
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
            onClick={() => speakText(language === 'oromo' ? `${currentCard.oromoLetterSound}, ${currentCard.oromo}` : `${currentCard.letter} for ${currentCard.english.split(' for ')[1]}`, language)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            🔊 {ui.listen}
          </Button>
          
          {currentCardIndex === cards.length - 1 ? (
            <Button
              onClick={handleFinish}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-full"
            >
              {ui.finish} 🎉
            </Button>
          ) : (
            <Button
              onClick={handleNextCard}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full"
            >
              {ui.next} →
            </Button>
          )}
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
