import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { speakText } from '@/utils/speechUtils';

interface ConversationModuleProps {
  onBack: () => void;
  language: 'english' | 'oromo';
}

const conversationData = {
  english: [
    {
      id: 1,
      title: "Saying Hello",
      conversations: [
        { speaker: "left", english: "Hello!", oromo: "Akkam!", avatar: "👧", name: "Ayantu", gender: "female" },
        { speaker: "right", english: "Hi!", oromo: "Nagaatti!", avatar: "👦", name: "Bona", gender: "male" },
      ]
    },
    {
      id: 2,
      title: "Morning Greeting",
      conversations: [
        { speaker: "left", english: "Good morning!", oromo: "Nagaa ganama!", avatar: "👧", name: "Ayantu", gender: "female" },
        { speaker: "right", english: "Good morning!", oromo: "Nagaa ganama!", avatar: "👦", name: "Bona", gender: "male" },
      ]
    },
    {
      id: 3,
      title: "How are you?",
      conversations: [
        { speaker: "left", english: "How are you?", oromo: "Akkam jirta?", avatar: "👧", name: "Ayantu", gender: "female" },
        { speaker: "right", english: "I’m fine, thank you!", oromo: "Ani nagaan jira, galatoomi!", avatar: "👦", name: "Bona", gender: "male" },
      ]
    },
    {
      id: 4,
      title: "Nice to meet you",
      conversations: [
        { speaker: "left", english: "Nice to meet you!", oromo: "Si arguuf natti tola", avatar: "👧", name: "Ayantu", gender: "female" },
        { speaker: "right", english: "Nice to meet you too!", oromo: "Anis si arguuf natti tola!", avatar: "👦", name: "Bona", gender: "male" },
      ]
    },
    {
      id: 5,
      title: "Greeting for Kids",
      conversations: [
        { speaker: "right", english: "How are you?", oromo: "Akkam jirta?", avatar: "👦", name: "Bona", gender: "male" },
        { speaker: "left", english: "I am fine! And you?", oromo: "Nagaa koo dha! Ati akkami?", avatar: "👧", name: "Ayantu", gender: "female" },
        { speaker: "right", english: "Fine, thanks to God.", oromo: "Nagaa, galata Gooftaa.", avatar: "👦", name: "Bona", gender: "male" },
        { speaker: "right", english: "My name is Bona. What is your name?", oromo: "Boonan jedhama. Maqaan kee hoo eenyuu?", avatar: "👦", name: "Bona", gender: "male" },
        { speaker: "left", english: "My name is Ayantu.", oromo: "Ayyaantuu jedhama.", avatar: "👧", name: "Ayantu", gender: "female" },
        { speaker: "right", english: "Nice to meet you.", oromo: "Si baruu kootti gammadeera.", avatar: "👦", name: "Bona", gender: "male" },
        { speaker: "left", english: "Nice to meet you too.", oromo: "Anis si baruuf kootti gammadeera.", avatar: "👧", name: "Ayantu", gender: "female" },
      ]
    }
  ],
  oromo: [
    {
      id: 1,
      title: "Nagaa Gaafachuu",
      conversations: [
        { speaker: "left", english: "Hello!", oromo: "Akkam!", avatar: "👧", name: "Ayyaantuu", gender: "female" },
        { speaker: "right", english: "Hi!", oromo: "Nagaatti!", avatar: "👦", name: "Boonaa", gender: "male" },
      ]
    },
    {
      id: 2,
      title: "Nagaa Ganamaa",
      conversations: [
        { speaker: "left", english: "Good morning!", oromo: "Nagaa ganama!", avatar: "👧", name: "Ayyaantuu", gender: "female" },
        { speaker: "right", english: "Good morning!", oromo: "Nagaa ganama!", avatar: "👦", name: "Boonaa", gender: "male" },
      ]
    },
    {
      id: 3,
      title: "Akkam Jirta?",
      conversations: [
        { speaker: "left", english: "How are you?", oromo: "Akkam jirta?", avatar: "👧", name: "Ayyaantuu", gender: "female" },
        { speaker: "right", english: "I’m fine, thank you!", oromo: "Ani nagaan jira, galatoomi!", avatar: "👦", name: "Boonaa", gender: "male" },
      ]
    },
    {
      id: 4,
      title: "Wal Baruun Gaariidha",
      conversations: [
        { speaker: "left", english: "Nice to meet you!", oromo: "Si arguuf natti tola", avatar: "👧", name: "Ayyaantuu", gender: "female" },
        { speaker: "right", english: "Nice to meet you too!", oromo: "Anis si arguuf natti tola!", avatar: "👦", name: "Boonaa", gender: "male" },
      ]
    },
    {
      id: 5,
      title: "Nagaa Gaafachuu Daa'immanii",
      conversations: [
        { speaker: "right", english: "How are you?", oromo: "Akkam jirta? (Ah-kahm jeer-tah?)", avatar: "👦", name: "Boonaa", gender: "male" },
        { speaker: "left", english: "I am fine! And you?", oromo: "Nagaa koo dha! Ati akkami? (Nah-gaah koh dah! Ah-tee ah-kah-mee?)", avatar: "👧", name: "Ayyaantuu", gender: "female" },
        { speaker: "right", english: "Fine, thanks to God.", oromo: "Nagaa, galata Gooftaa. (Nah-gaah, gah-lah-tah Gohf-tah.)", avatar: "👦", name: "Boonaa", gender: "male" },
        { speaker: "right", english: "My name is Boonaa. What is your name?", oromo: "Boonan jedhama. Maqaan kee hoo eenyuu? (Boh-nahn jeh-dhah-mah. Mah-qaan keh hoo een-yoo?)", avatar: "👦", name: "Boonaa", gender: "male" },
        { speaker: "left", english: "My name is Ayyaantuu.", oromo: "Ayyaantuu jedhama. (Ah-yahn-too jeh-dhah-mah.)", avatar: "👧", name: "Ayyaantuu", gender: "female" },
        { speaker: "right", english: "Nice to meet you.", oromo: "Si baruu kootti gammadeera. (See bah-roo koh-tee gahm-mah-deh-rah.)", avatar: "👦", name: "Boonaa", gender: "male" },
        { speaker: "left", english: "Nice to meet you too.", oromo: "Anis si baruuf kootti gammadeera. (Ah-nees see bah-roof koh-tee gahm-mah-deh-rah.)", avatar: "👧", name: "Ayyaantuu", gender: "female" },
      ]
    }
  ]
};

const ConversationModule = ({ onBack, language }: ConversationModuleProps) => {
  const [currentConversationIndex, setCurrentConversationIndex] = useState<number | null>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const conversationsForLanguage = conversationData[language];
    setCurrentConversationIndex(Math.floor(Math.random() * conversationsForLanguage.length));
    setCurrentLineIndex(0);
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel();
    }
    setIsPlaying(false);
  }, [language]);

  // Cleanup speech on component unmount
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const conversations = conversationData[language];
  
  const uiContent = {
    english: {
      back: "Back",
      title: "Learn Conversations!",
      previousLine: "Previous Line",
      listen: "Listen",
      playAll: "Play All",
      playing: "Playing...",
      nextLine: "Next Line",
      previousTopic: "Previous Topic",
      nextTopic: "Next Topic",
      conversation: "Conversation",
      line: "Line"
    },
    oromo: {
      back: "Duubatti",
      title: "Haasawa Baradhu!",
      previousLine: "Sarara Duraa",
      listen: "Dhaggeeffadhu",
      playAll: "Hunda Taphisi",
      playing: "Kan Taphachaa...",
      nextLine: "Sarara Itti Aansu",
      previousTopic: "Mata Duree Duraa",
      nextTopic: "Mata Duree Itti Aansu",
      conversation: "Haasawa",
      line: "Sarara"
    }
  };

  const ui = uiContent[language];

  if (currentConversationIndex === null) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const currentConversation = conversations[currentConversationIndex];
  const currentLine = currentConversation.conversations[currentLineIndex];

  const playConversation = async () => {
    setIsPlaying(true);
    for (let i = 0; i < currentConversation.conversations.length; i++) {
      setCurrentLineIndex(i);
      const line = currentConversation.conversations[i];
      const text = language === 'english' ? line.english : line.oromo;
      await speakText(text, language, line.gender as 'female' | 'male' | undefined);
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
    if (currentConversationIndex < conversations.length - 1) {
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
            ← {ui.back}
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">
              💬 {ui.title}
            </h1>
            <div className="text-white/80">
              {currentConversation.title}
            </div>
          </div>
          <div className="w-32"></div>
        </div>

        {/* Conversation Display */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl mb-8 min-h-96">
          <div className="flex items-center justify-between h-full">
            {/* Left Character */}
            <div className="flex-1 flex flex-col items-center">
              <div className="text-8xl mb-4 animate-bounce">
                {currentLine.speaker === 'left' ? currentLine.avatar : '👤'}
              </div>
              
              {/* Character image placeholder */}
              {currentLine.speaker === 'left' && (
                <div className="w-20 h-20 mb-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-3xl">{currentLine.avatar}</span>
                </div>
              )}
              
              <div className="text-2xl font-semibold text-gray-700 mb-2">{currentLine.speaker === 'left' ? currentLine.name : 'Person 1'}</div>
              {currentLine.speaker === 'left' && (
                <div className="bg-blue-100 rounded-2xl p-6 max-w-sm animate-fade-in shadow-lg">
                  <div className="text-xl font-semibold text-gray-800 text-center">
                    {language === 'english' ? currentLine.english : currentLine.oromo}
                  </div>
                </div>
              )}
            </div>

            {/* VS Divider */}
            <div className="mx-8 flex flex-col items-center">
              <div className="text-4xl font-bold text-purple-600 animate-pulse">VS</div>
              <div className="text-sm text-gray-500 mt-2">{ui.conversation}</div>
            </div>

            {/* Right Character */}
            <div className="flex-1 flex flex-col items-center">
              <div className="text-8xl mb-4 animate-bounce delay-200">
                {currentLine.speaker === 'right' ? currentLine.avatar : '👤'}
              </div>
              
              {/* Character image placeholder */}
              {currentLine.speaker === 'right' && (
                <div className="w-20 h-20 mb-2 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-3xl">{currentLine.avatar}</span>
                </div>
              )}
              
              <div className="text-2xl font-semibold text-gray-700 mb-2">{currentLine.speaker === 'right' ? currentLine.name : 'Person 2'}</div>
              {currentLine.speaker === 'right' && (
                <div className="bg-green-100 rounded-2xl p-6 max-w-sm animate-fade-in shadow-lg">
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
            ← {ui.previousLine}
          </Button>
          
          <Button
            onClick={() => speakText(language === 'english' ? currentLine.english : currentLine.oromo, language, currentLine.gender as 'female' | 'male' | undefined)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full"
          >
            🔊 {ui.listen}
          </Button>
          
          <Button
            onClick={playConversation}
            disabled={isPlaying}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            {isPlaying ? '⏸️ ' + ui.playing : '▶️ ' + ui.playAll}
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={currentLineIndex === currentConversation.conversations.length - 1}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            {ui.nextLine} →
          </Button>
        </div>

        {/* Conversation Navigation */}
        <div className="flex justify-center space-x-4 mb-6">
          <Button
            onClick={previousConversation}
            disabled={currentConversationIndex === 0}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            ← {ui.previousTopic}
          </Button>
          
          <Button
            onClick={nextConversation}
            disabled={currentConversationIndex === conversations.length - 1}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full disabled:opacity-50"
          >
            {ui.nextTopic} →
          </Button>
        </div>

        {/* Progress */}
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-white font-semibold">
              Topic {currentConversationIndex + 1} of {conversations.length}
            </div>
            <div className="text-white/80">
              {ui.line} {currentLineIndex + 1} of {currentConversation.conversations.length}
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
