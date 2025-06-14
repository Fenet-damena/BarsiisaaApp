
import { Button } from '@/components/ui/button';

interface LevelSelectionProps {
  onLevelSelect: (level: number) => void;
  onBack: () => void;
}

const levels = [
  { level: 1, age: 3, title: "ABCs & 123s", emoji: "🔤", color: "from-red-400 to-pink-500" },
  { level: 2, age: 4, title: "Shapes & Colors", emoji: "🟡", color: "from-yellow-400 to-orange-500" },
  { level: 3, age: 5, title: "Greetings", emoji: "👋", color: "from-green-400 to-blue-500" },
  { level: 4, age: 6, title: "Stories", emoji: "📖", color: "from-blue-400 to-purple-500" },
  { level: 5, age: 7, title: "Conversations", emoji: "💬", color: "from-purple-400 to-pink-500" },
];

const LevelSelection = ({ onLevelSelect, onBack }: LevelSelectionProps) => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3"
          >
            ← Back
          </Button>
          <h1 className="text-4xl font-bold text-white text-center flex-1">
            Choose Your Level! 🎯
          </h1>
          <div className="w-24"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((levelData) => (
            <div
              key={levelData.level}
              className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => onLevelSelect(levelData.level)}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{levelData.emoji}</div>
                <div className="text-2xl font-bold text-white mb-2">
                  Level {levelData.level}
                </div>
                <div className="text-lg text-white/90 mb-2">
                  Age {levelData.age}
                </div>
                <div className="text-xl font-semibold text-white mb-4">
                  {levelData.title}
                </div>
                <Button
                  className={`bg-gradient-to-r ${levelData.color} hover:opacity-90 text-white font-bold px-8 py-3 rounded-full w-full`}
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
