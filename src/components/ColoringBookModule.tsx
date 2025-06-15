
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Paintbrush } from 'lucide-react';

interface ColoringBookModuleProps {
  onBack: () => void;
  language: 'english' | 'oromo';
}

const uiContent = {
  english: {
    title: 'Coloring Book',
    back: 'Back',
    colors: 'Colors',
  },
  oromo: {
    title: 'Kitaaba Qalamaa',
    back: 'Duubatti',
    colors: 'Qalama',
  },
};

const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#A52A2A', '#FFFFFF', '#000000', '#808080'];

const ColoringBookModule = ({ onBack, language }: ColoringBookModuleProps) => {
  const ui = uiContent[language];
  const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF');
  const [svgColors, setSvgColors] = useState({
    sky: '#87CEEB',
    sun: '#FFD700',
    house: '#D2B48C',
    roof: '#A52A2A',
    door: '#8B4513',
    grass: '#228B22',
  });

  const handlePartClick = (part: keyof typeof svgColors) => {
    setSvgColors(prev => ({ ...prev, [part]: selectedColor }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
       <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
            <Button onClick={onBack} className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3">
            ← {ui.back}
            </Button>
            <h1 className="text-4xl font-bold text-white flex items-center gap-2">
                <Paintbrush className="h-10 w-10" />
                {ui.title}
            </h1>
            <div className="w-24"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg flex items-center justify-center">
                <svg viewBox="0 0 400 300" className="w-full h-auto">
                    {/* Sky */}
                    <rect x="0" y="0" width="400" height="300" fill={svgColors.sky} onClick={() => handlePartClick('sky')} className="cursor-pointer" />
                    {/* Sun */}
                    <circle cx="350" cy="50" r="30" fill={svgColors.sun} onClick={() => handlePartClick('sun')} className="cursor-pointer" />
                    {/* Grass */}
                    <rect x="0" y="250" width="400" height="50" fill={svgColors.grass} onClick={() => handlePartClick('grass')} className="cursor-pointer" />
                    {/* House Body */}
                    <rect x="100" y="150" width="200" height="100" fill={svgColors.house} onClick={() => handlePartClick('house')} className="cursor-pointer" />
                    {/* Roof */}
                    <polygon points="100,150 200,100 300,150" fill={svgColors.roof} onClick={() => handlePartClick('roof')} className="cursor-pointer" />
                    {/* Door */}
                    <rect x="180" y="200" width="40" height="50" fill={svgColors.door} onClick={() => handlePartClick('door')} className="cursor-pointer" />
                </svg>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4 text-center">{ui.colors}</h2>
                <div className="grid grid-cols-4 gap-2">
                    {colors.map(color => (
                        <div
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`w-12 h-12 rounded-full cursor-pointer border-4 ${selectedColor === color ? 'border-yellow-400 scale-110' : 'border-transparent'}`}
                            style={{ backgroundColor: color, transition: 'all 0.2s' }}
                        />
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ColoringBookModule;
