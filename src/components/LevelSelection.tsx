
import { Button } from '@/components/ui/button';

interface LevelSelectionProps {
  onLevelSelect: (level: number) => void;
  onBack: () => void;
}

const levels = [
  { level: 1, age: 3, title: "Alphabet & ABCs", emoji: "🔤", color: "from-red-400 to-pink-500", description: "Learn letters A-Z" },
  { level: 2, age: 4, title: "Words & Sounds", emoji: "🔊", color: "from-yellow-400 to-orange-500", description: "Simple words & pronunciation" },
  { level: 3, age: 5, title: "Greetings", emoji: "👋", color: "from-green-400 to-blue-500", description: "Hello, goodbye, thank you" },
  { level: 4, age: 6, title: "Conversations", emoji: "💬", color: "from-blue-400 to-purple-500", description: "Talk between friends" },
  { level: 5, age: 7, title: "Stories & Games", emoji: "📖", color: "from-purple-400 to-pink-500", description: "Fun stories & activities" },
];

const LevelSelection = ({ onLevelSelect, onBack }: LevelSelectionProps) => {
  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-20 w-32 h-32 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute bottom-32 left-10 w-28 h-28 bg-gradient-to-r from-blue-300 to-green-300 rounded-full animate-pulse delay-300 opacity-30"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 right-1/4 text-8xl animate-bounce delay-200 opacity-20">🎈</div>
        <div className="absolute bottom-1/4 left-1/4 text-6xl animate-pulse delay-400 opacity-20">🌈</div>
        <div className="absolute top-1/2 left-10 text-5xl animate-spin opacity-20">⚡</div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3"
          >
            ← Back
          </Button>
          <h1 className="text-4xl font-bold text-white text-center flex-1 animate-pulse">
            Choose Your Level! 🎯
          </h1>
          <div className="w-24"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((levelData) => (
            <div
              key={levelData.level}
              className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer hover:bg-white/30"
              onClick={() => onLevelSelect(levelData.level)}
            >
              <div className="text-center">
                <div className="text-6xl mb-4 animate-bounce">{levelData.emoji}</div>
                <div className="text-2xl font-bold text-white mb-2">
                  Level {levelData.level}
                </div>
                <div className="text-lg text-white/90 mb-2">
                  Age {levelData.age}
                </div>
                <div className="text-xl font-semibold text-white mb-2">
                  {levelData.title}
                </div>
                <div className="text-sm text-white/80 mb-4">
                  {levelData.description}
                </div>
                <Button
                  className={`bg-gradient-to-r ${levelData.color} hover:opacity-90 text-white font-bold px-8 py-3 rounded-full w-full transform hover:scale-105 transition-all duration-200`}
                >
                  Start! 🚀
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LevelSelection;
