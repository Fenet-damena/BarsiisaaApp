
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onStartLearning: () => void;
}

const WelcomeScreen = ({ onStartLearning }: WelcomeScreenProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
      <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-2xl w-full">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">
            🌟 BarsiisaApp 🌟
          </h1>
          <p className="text-2xl text-white/90 font-semibold mb-2">
            Learn Afaan Oromo & English
          </p>
          <p className="text-lg text-white/80">
            Fun learning for kids aged 3-7!
          </p>
        </div>

        <div className="flex flex-col items-center space-y-6">
          <div className="flex space-x-4 text-4xl">
            <span className="animate-bounce">🎈</span>
            <span className="animate-bounce delay-100">🎨</span>
            <span className="animate-bounce delay-200">🎪</span>
            <span className="animate-bounce delay-300">🎭</span>
          </div>

          <Button
            onClick={onStartLearning}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold text-2xl px-12 py-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            🚀 Start Learning!
          </Button>

          <div className="flex items-center space-x-2 text-white/70">
            <span>🎵</span>
            <span>Songs</span>
            <span>•</span>
            <span>🎮</span>
            <span>Games</span>
            <span>•</span>
            <span>📚</span>
            <span>Stories</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
