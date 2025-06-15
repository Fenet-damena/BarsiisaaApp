
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onStartLearning: () => void;
  onLanguageSelect: (language: 'english' | 'oromo') => void;
  selectedLanguage: 'english' | 'oromo';
}

const WelcomeScreen = ({ onStartLearning, onLanguageSelect, selectedLanguage }: WelcomeScreenProps) => {
  const content = {
    english: {
      title: "BarsiisaApp",
      subtitle: "Learn Afaan Oromo & English",
      description: "Fun learning for kids!",
      chooseLanguage: "Choose Your Language!",
      startLearning: "Start Learning!",
      oromo: "Afaan Oromo",
      english: "English"
    },
    oromo: {
      title: "BarsiisaApp",
      subtitle: "Afaan Oromo fi Inglizii Barnoota",
      description: "Daa'imman barnoota gammachiisaa!",
      chooseLanguage: "Afaan Kee Filadhu!",
      startLearning: "Barnoota Jalqabi!",
      oromo: "Afaan Oromo",
      english: "Inglizii"
    }
  };

  const currentContent = content[selectedLanguage];

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
        
        {/* New floating items */}
        <div className="absolute text-5xl opacity-20" style={{ top: '15%', left: '80%', animation: 'float-up 20s linear infinite 3s' }}>🦉</div>
        <div className="absolute text-5xl opacity-20" style={{ top: '60%', left: '10%', animation: 'float-up 25s linear infinite 7s' }}>🎈</div>
        <div className="absolute text-5xl opacity-20" style={{ top: '5%', left: '30%', animation: 'float-up 18s linear infinite 1s' }}>📚</div>
        <div className="absolute text-5xl opacity-20" style={{ top: '85%', left: '50%', animation: 'float-up 22s linear infinite 5s' }}>✏️</div>
      </div>

      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-2xl w-full relative z-10">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg animate-pulse">
            🌟 {currentContent.title} 🌟
          </h1>
          <p className="text-2xl text-white/90 font-semibold mb-2">
            {currentContent.subtitle}
          </p>
          <p className="text-lg text-white/80">
            {currentContent.description}
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="flex space-x-4 text-4xl mb-6">
            <span className="animate-bounce">🎈</span>
            <span className="animate-bounce delay-100">🎨</span>
            <span className="animate-bounce delay-200">🎪</span>
            <span className="animate-bounce delay-300">🎭</span>
          </div>

          <h2 className="text-3xl font-bold text-white mb-6">{currentContent.chooseLanguage}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-6">
            <Button
              onClick={() => onLanguageSelect('oromo')}
              className={`font-bold text-2xl px-12 py-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 ${
                selectedLanguage === 'oromo' 
                  ? 'bg-gradient-to-r from-green-600 to-blue-700 text-white' 
                  : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white'
              }`}
            >
              <div className="flex flex-col items-center">
                <span>{currentContent.oromo}</span>
              </div>
            </Button>

            <Button
              onClick={() => onLanguageSelect('english')}
              className={`font-bold text-2xl px-12 py-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 ${
                selectedLanguage === 'english' 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-700 text-white' 
                  : 'bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white'
              }`}
            >
              <div className="flex flex-col items-center">
                <span>{currentContent.english}</span>
              </div>
            </Button>
          </div>

          <Button
            onClick={onStartLearning}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold text-2xl px-12 py-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            🚀 {currentContent.startLearning}
          </Button>

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
      </div>
    </div>
  );
};

export default WelcomeScreen;
