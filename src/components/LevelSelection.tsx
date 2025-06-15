import { Button } from '@/components/ui/button';

interface LevelSelectionProps {
  onLevelSelect: (level: number) => void;
  onBack: () => void;
  language: 'english' | 'oromo';
}

const levelsContent = {
  english: [
    { level: 1, age: 3, title: "Alphabet & Numbers", emoji: "🔤", color: "from-red-400 to-pink-500", description: "Learn A-Z & 1-10" },
    { level: 2, age: 4, title: "Letter Words", emoji: "🅰️", color: "from-yellow-400 to-orange-500", description: "A for Apple, B for Ball" },
    { level: 3, age: 5, title: "Many Words", emoji: "📝", color: "from-green-400 to-blue-500", description: "Learn words: fruits, animals, colors" },
    { level: 4, age: 6, title: "Days & Months", emoji: "🗓️", color: "from-blue-400 to-purple-500", description: "Learn 7 days and 12 months" },
    { level: 5, age: 6, title: "Greeting for Kids", emoji: "👋", color: "from-purple-400 to-pink-500", description: "How friends greet each other" },
    { level: 6, age: 7, title: "Word Games", emoji: "🎯", color: "from-pink-400 to-red-500", description: "Guess the word from emoji" },
    { level: 7, age: 7, title: "Letter Games", emoji: "🎮", color: "from-green-400 to-yellow-500", description: "Fill missing letters" },
    { level: 8, age: 7, title: "Body Parts", emoji: "👶", color: "from-orange-400 to-red-500", description: "Learn parts of the body" },
    { level: 9, age: 8, title: "Country Flags", emoji: "🏁", color: "from-blue-400 to-green-500", description: "Learn 100+ country flags" },
    { level: 10, age: 8, title: "Learn Math", emoji: "👨‍🏫", color: "from-purple-400 to-blue-500", description: "Learn addition & subtraction" },
    { level: 11, age: 8, title: "Math Quiz", emoji: "🧮", color: "from-teal-400 to-cyan-500", description: "Test your math skills" },
    { level: 12, age: 3, title: "Coloring Book", emoji: "🎨", color: "from-pink-300 to-yellow-300", description: "Color fun pictures" },
    { level: 13, age: 4, title: "Story Time", emoji: "📖", color: "from-indigo-400 to-purple-500", description: "Watch and listen to stories" },
  ],
  oromo: [
    { level: 1, age: 3, title: "Qubee fi Lakkoofsota", emoji: "🔤", color: "from-red-400 to-pink-500", description: "A-Z fi 1-10 baradhu" },
    { level: 2, age: 4, title: "Jecha Qubee", emoji: "🅰️", color: "from-yellow-400 to-orange-500", description: "A Poomii, B Kubbaa" },
    { level: 3, age: 5, title: "Jechoota Hedduu", emoji: "📝", color: "from-green-400 to-blue-500", description: "Jechoota baradhu: fuduraa, bineensa, halluu" },
    { level: 4, age: 6, title: "Guyyoota & Ji'oota", emoji: "🗓️", color: "from-blue-400 to-purple-500", description: "Guyyoota 7 fi Ji'oota 12 baradhu" },
    { level: 5, age: 6, title: "Haasawa Daa'immanii", emoji: "👋", color: "from-purple-400 to-pink-500", description: "Akkaataa hiriyaan itti wal nagaa gaafatan" },
    { level: 6, age: 7, title: "Taphoota Jechaa", emoji: "🎯", color: "from-pink-400 to-red-500", description: "Emoji irraa jecha tilmaami" },
    { level: 7, age: 7, title: "Taphoota Qubee", emoji: "🎮", color: "from-green-400 to-yellow-500", description: "Qubee dhiisan guuti" },
    { level: 8, age: 7, title: "Qaamni Namaa", emoji: "👶", color: "from-orange-400 to-red-500", description: "Qaamni namaa baradhu" },
    { level: 9, age: 8, title: "Alaabaa Biyyootaa", emoji: "🏁", color: "from-blue-400 to-green-500", description: "Alaabaa biyyoota 100+ baradhu" },
    { level: 10, age: 8, title: "Herrega Baradhu", emoji: "👨‍🏫", color: "from-purple-400 to-blue-500", description: "Ida'uu fi hir'isuu baradhu" },
    { level: 11, age: 8, title: "Qormaata Herregaa", emoji: "🧮", color: "from-teal-400 to-cyan-500", description: "Dandeettii herregaa kee qori" },
    { level: 12, age: 3, title: "Kitaaba Haalluu", emoji: "🎨", color: "from-pink-300 to-yellow-300", description: "Fakkiiwwan babbareedoo halluu dibi" },
    { level: 13, age: 4, title: "Yeroo Seenaa", emoji: "📖", color: "from-indigo-400 to-purple-500", description: "Seenaawwan ilaaliifi dhaggeeffadhu" },
  ]
};

const uiContent = {
  english: {
    back: "Back",
    title: "Choose Your Level!",
    start: "Start!"
  },
  oromo: {
    back: "Duubatti",
    title: "Sadarkaa Kee Filadhu!",
    start: "Jalqabi!"
  }
};

const LevelSelection = ({ onLevelSelect, onBack, language }: LevelSelectionProps) => {
  const levels = levelsContent[language];
  const ui = uiContent[language];

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
            ← {ui.back}
          </Button>
          <h1 className="text-4xl font-bold text-white text-center flex-1 animate-pulse">
            {ui.title} 🎯
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
                <div className="text-xl font-semibold text-white mb-2">
                  {levelData.title}
                </div>
                <div className="text-sm text-white/80 mb-4">
                  {levelData.description}
                </div>
                <Button
                  className={`bg-gradient-to-r ${levelData.color} hover:opacity-90 text-white font-bold px-8 py-3 rounded-full w-full transform hover:scale-105 transition-all duration-200`}
                >
                  {ui.start} 🚀
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
