
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface WelcomeScreenProps {
  onStartLearning: () => void;
}

const WelcomeScreen = ({ onStartLearning }: WelcomeScreenProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    // Store language preference
    localStorage.setItem('selectedLanguage', language);
    onStartLearning();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300 rounded-full animate-bounce opacity-70"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-300 rounded-full animate-pulse opacity-70"></div>
        <div className="absolute bottom-20 left-16 w-24 h-24 bg-blue-300 rounded-full animate-bounce delay-300 opacity-70"></div>
        <div className="absolute bottom-40 right-10 w-18 h-18 bg-green-300 rounded-full animate-pulse delay-500 opacity-70"></div>
        
        {/* Floating Letters */}
        <div className="absolute top-1/4 left-1/4 text-6xl animate-bounce delay-100 opacity-40">A</div>
        <div className="absolute top-1/3 right-1/4 text-5xl animate-pulse delay-200 opacity-40">B</div>
        <div className="absolute bottom-1/3 left-1/3 text-4xl animate-bounce delay-400 opacity-40">C</div>
        
        {/* Moving Stars */}
        <div className="absolute top-20 left-1/2 text-4xl animate-spin opacity-60">⭐</div>
        <div className="absolute bottom-32 right-1/3 text-3xl animate-spin delay-300 opacity-60">🌟</div>
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-2xl w-full relative z-10">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg animate-pulse">
            🌟 BarsiisaApp 🌟
          </h1>
          <p className="text-2xl text-white/90 font-semibold mb-2">
            Learn Afaan Oromo & English
          </p>
          <p className="text-lg text-white/80">
            Fun learning for kids aged 3-7!
          </p>
        </div>

        {!selectedLanguage ? (
          <div className="flex flex-col items-center space-y-6">
            <div className="flex space-x-4 text-4xl mb-6">
              <span className="animate-bounce">🎈</span>
              <span className="animate-bounce delay-100">🎨</span>
              <span className="animate-bounce delay-200">🎪</span>
              <span className="animate-bounce delay-300">🎭</span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-6">Choose Your Language!</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <Button
                onClick={() => handleLanguageSelect('oromo')}
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold text-2xl px-12 py-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-2">🇪🇹</span>
                  <span>Afaan Oromo</span>
                </div>
              </Button>

              <Button
                onClick={() => handleLanguageSelect('english')}
                className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold text-2xl px-12 py-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <div className="flex flex-col items-center">
                  <span className="text-4xl mb-2">🇺🇸</span>
                  <span>English</span>
                </div>
              </Button>
            </div>

            <div className="flex items-center space-x-2 text-white/70 mt-6">
              <span>📚</span>
              <span>Alphabet</span>
              <span>•</span>
              <span>💬</span>
              <span>Conversations</span>
              <span>•</span>
              <span>🎮</span>
              <span>Games</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <div className="text-2xl text-white/90 mb-4">
              Great choice! Ready to learn?
            </div>
            <Button
              onClick={onStartLearning}
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold text-2xl px-12 py-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              🚀 Start Learning!
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WelcomeScreen;
