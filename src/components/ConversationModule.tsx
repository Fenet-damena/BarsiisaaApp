
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ConversationModuleProps {
  onBack: () => void;
}

const conversationData = [
  {
    id: 1,
    title: "Meeting a Friend",
    conversations: [
      { speaker: "left", english: "Hello! What's your name?", oromo: "Akkam! Maqaan kee eenyu?", avatar: "👦" },
      { speaker: "right", english: "Hi! My name is Sara.", oromo: "Nagaatti! Maqaan koo Sara.", avatar: "👧" },
      { speaker: "left", english: "Nice to meet you, Sara!", oromo: "Si arguuf natti tola, Sara!", avatar: "👦" },
      { speaker: "right", english: "Nice to meet you too!", oromo: "Anis si arguuf natti tola!", avatar: "👧" },
    ]
  },
  {
    id: 2,
    title: "At the Market",
    conversations: [
      { speaker: "left", english: "Good morning!", oromo: "Nagaa ganama!", avatar: "👨" },
      { speaker: "right", english: "Good morning! How are you?", oromo: "Nagaa ganama! Akkam jirta?", avatar: "👩" },
      { speaker: "left", english: "I am fine, thank you.", oromo: "Ani nagaan jira, galatoomaa.", avatar: "👨" },
      { speaker: "right", english: "What would you like to buy?", oromo: "Maal bituu barbaadda?", avatar: "👩" },
    ]
  }
];

const ConversationModule = ({ onBack }: ConversationModuleProps) => {
  const [currentConversationIndex, setCurrentConversationIndex] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [language, setLanguage] = useState<'english' | 'oromo'>('english');
  const [isPlaying, setIsPlaying] = useState(false);

  const currentConversation = conversationData[currentConversationIndex];
  const currentLine = currentConversation.conversations[currentLineIndex];

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const playConversation = async () => {
    setIsPlaying(true);
    for (let i = 0; i <= currentLineIndex; i++) {
      const line = currentConversation.conversations[i];
      const text = language === 'english' ? line.english : line.oromo;
      speakText(text);
      await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 seconds between lines
    }
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentLineIndex < currentConversation.conversations.length - 1) {
      setCurrentLineIndex(currentLineIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentLineIndex > 0) {
      setCurrentLineIndex(currentLineIndex - 1);
    }
  };

  const nextConversation = () => {
    if (currentConversationIndex < conversationData.length - 1) {
      setCurrentConversationIndex(currentConversationIndex + 1);
      setCurrentLineIndex(0);
    }
  };

  const previousConversation = () => {
    if (currentConversationIndex > 0) {
      setCurrentConversationIndex(currentConversationIndex - 1);
      setCurrentLineIndex(0);
    }
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-16 w-32 h-32 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-300 to-green-300 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute bottom-32 left-20 w-28 h-28 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-pulse delay-300 opacity-30"></div>
        
        {/* Floating Chat Bubbles */}
        <div className="absolute top-1/4 right-1/4 text-6xl animate-bounce delay-200 opacity-20">💬</div>
        <div className="absolute bottom-1/4 left-1/4 text-5xl animate-pulse delay-400 opacity-20">🗣️</div>
        <div className="absolute top-1/2 right-1/3 text-4xl animate-bounce delay-600 opacity-20">👥</div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3"
          >
            ← Back
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              💬 Learn Conversations!
            </h1>
            <div className="text-white/80">
              {currentConversation.title}
            </div>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Language Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-2 flex space-x-2">
            <Button
              onClick={() => setLanguage('english')}
              className={`rounded-full px-6 py-2 ${
                language === 'english' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-transparent text-white/80 hover:bg-white/20'
              }`}
            >
              🇺🇸 English
            </Button>
            <Button
              onClick={() => setLanguage('oromo')}
              className={`rounded-full px-6 py-2 ${
                language === 'oromo' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-transparent text-white/80 hover:bg-white/20'
              }`}
            >
              🇪🇹 Oromo
            </Button>
          </div>
        </div>

        {/* Conversation Display */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8 min-h-96">
          <div className="flex items-center justify-between h-full">
            {/* Left Character */}
            <div className="flex-1 flex flex-col items-center">
              <div className="text-8xl mb-4 animate-bounce">
                {currentLine.speaker === 'left' ? currentLine.avatar : '👤'}
              </div>
              <div className="text-2xl font-semibold text-gray-700 mb-2">Person 1</div>
              {currentLine.speaker === 'left' && (
                <div className="bg-blue-100 rounded-2xl p-6 max-w-sm animate-fade-in">
                  <div className="text-xl font-semibold text-gray-800 text-center">
                    {language === 'english' ? currentLine.english : currentLine.oromo}
                  </div>
                </div>
              )}
            </div>

            {/* VS Divider */}
            <div className="mx-8 flex flex-col items-center">
              <div className="text-4xl font-bold text-purple-600 animate-pulse">VS</div>
              <div className="text-sm text-gray-500 mt-2">Conversation</div>
            </div>

            {/* Right Character */}
            <div className="flex-1 flex flex-col items-center">
              <div className="text-8xl mb-4 animate-bounce delay-200">
                {currentLine.speaker === 'right' ? currentLine.avatar : '👤'}
              </div>
              <div className="text-2xl font-semibold text-gray-700 mb-2">Person 2</div>
              {currentLine.speaker === 'right' && (
                <div className="bg-green-100 rounded-2xl p-6 max-w-sm animate-fade-in">
                  <div className="text-xl font-semibold text-gray-800 text-center">
                    {language === 'english' ? currentLine.english : currentLine.oromo}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            onClick={handlePrevious}
            disabled={currentLineIndex === 0}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            ← Previous Line
          </Button>
          
          <Button
            onClick={() => speakText(language === 'english' ? currentLine.english : currentLine.oromo)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            🔊 Listen
          </Button>
          
          <Button
            onClick={playConversation}
            disabled={isPlaying}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            {isPlaying ? '⏸️ Playing...' : '▶️ Play All'}
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={currentLineIndex === currentConversation.conversations.length - 1}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            Next Line →
          </Button>
        </div>

        {/* Conversation Navigation */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            onClick={previousConversation}
            disabled={currentConversationIndex === 0}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            ← Previous Topic
          </Button>
          
          <Button
            onClick={nextConversation}
            disabled={currentConversationIndex === conversationData.length - 1}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            Next Topic →
          </Button>
        </div>

        {/* Progress */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-white font-semibold">
              Topic {currentConversationIndex + 1} of {conversationData.length}
            </div>
            <div className="text-white/80">
              Line {currentLineIndex + 1} of {currentConversation.conversations.length}
            </div>
          </div>
          <div className="flex space-x-1">
            {currentConversation.conversations.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-3 rounded-full ${
                  index <= currentLineIndex ? 'bg-gradient-to-r from-purple-400 to-pink-500' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationModule;
