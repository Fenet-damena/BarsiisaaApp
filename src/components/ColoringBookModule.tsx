
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Paintbrush, ArrowLeft, ArrowRight, RefreshCcw } from 'lucide-react';

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

// SVG components for each page
const HouseScene = ({ colors, onPartClick }: { colors: Record<string, string>, onPartClick: (part: string) => void }) => (
    <svg viewBox="0 0 400 300" className="w-full h-auto">
        <rect x="0" y="0" width="400" height="300" fill={colors.sky} onClick={() => onPartClick('sky')} className="cursor-pointer" />
        <circle cx="350" cy="50" r="30" fill={colors.sun} onClick={() => onPartClick('sun')} className="cursor-pointer" />
        <rect x="0" y="250" width="400" height="50" fill={colors.grass} onClick={() => onPartClick('grass')} className="cursor-pointer" />
        <rect x="100" y="150" width="200" height="100" fill={colors.house} onClick={() => onPartClick('house')} className="cursor-pointer" />
        <polygon points="100,150 200,100 300,150" fill={colors.roof} onClick={() => onPartClick('roof')} className="cursor-pointer" />
        <rect x="180" y="200" width="40" height="50" fill={colors.door} onClick={() => onPartClick('door')} className="cursor-pointer" />
    </svg>
);

const FlowerScene = ({ colors, onPartClick }: { colors: Record<string, string>, onPartClick: (part: string) => void }) => (
    <svg viewBox="0 0 400 300" className="w-full h-auto">
        <rect x="0" y="0" width="400" height="300" fill={colors.sky} onClick={() => onPartClick('sky')} className="cursor-pointer" />
        <rect x="0" y="250" width="400" height="50" fill={colors.ground} onClick={() => onPartClick('ground')} className="cursor-pointer" />
        <path d="M 200 250 L 200 150" stroke={colors.stem} strokeWidth="10" onClick={() => onPartClick('stem')} className="cursor-pointer" style={{fill: 'none'}} />
        <circle cx="200" cy="120" r="30" fill={colors.center} onClick={() => onPartClick('center')} className="cursor-pointer" />
        <g onClick={() => onPartClick('petal')} className="cursor-pointer">
            <circle cx="200" cy="70" r="20" fill={colors.petal} />
            <circle cx="250" cy="120" r="20" fill={colors.petal} />
            <circle cx="150" cy="120" r="20" fill={colors.petal} />
            <circle cx="235" cy="85" r="20" fill={colors.petal} />
            <circle cx="165" cy="85" r="20" fill={colors.petal} />
             <circle cx="235" cy="155" r="20" fill={colors.petal} />
            <circle cx="165" cy="155" r="20" fill={colors.petal} />
             <circle cx="200" cy="170" r="20" fill={colors.petal} />
        </g>
    </svg>
);

const CarScene = ({ colors, onPartClick }: { colors: Record<string, string>, onPartClick: (part: string) => void }) => (
    <svg viewBox="0 0 400 300" className="w-full h-auto">
         <rect x="0" y="0" width="400" height="300" fill={colors.sky} onClick={() => onPartClick('sky')} className="cursor-pointer" />
         <rect x="0" y="250" width="400" height="50" fill={colors.road} onClick={() => onPartClick('road')} className="cursor-pointer" />
         <rect x="80" y="180" width="240" height="70" rx="10" fill={colors.body} onClick={() => onPartClick('body')} className="cursor-pointer" />
         <path d="M 120 180 L 150 130 L 250 130 L 280 180 Z" fill={colors.top} onClick={() => onPartClick('top')} className="cursor-pointer" />
         <g onClick={() => onPartClick('wheel')} className="cursor-pointer">
            <circle cx="140" cy="250" r="25" fill={colors.wheel} />
            <circle cx="260" cy="250" r="25" fill={colors.wheel} />
         </g>
    </svg>
);

const RocketScene = ({ colors, onPartClick }: { colors: Record<string, string>, onPartClick: (part: string) => void }) => (
    <svg viewBox="0 0 400 300" className="w-full h-auto">
        <rect x="0" y="0" width="400" height="300" fill={colors.space} onClick={() => onPartClick('space')} className="cursor-pointer" />
        <polygon points="200,50 170,180 230,180" fill={colors.body} onClick={() => onPartClick('body')} className="cursor-pointer" />
        <g onClick={() => onPartClick('fin')} className="cursor-pointer">
            <polygon points="170,180 140,230 170,200" fill={colors.fin} />
            <polygon points="230,180 260,230 230,200" fill={colors.fin} />
        </g>
        <circle cx="200" cy="110" r="20" fill={colors.window} onClick={() => onPartClick('window')} className="cursor-pointer" />
        <polygon points="180,180 220,180 200,250" fill={colors.flame} onClick={() => onPartClick('flame')} className="cursor-pointer" />
    </svg>
);

const BoatScene = ({ colors, onPartClick }: { colors: Record<string, string>, onPartClick: (part: string) => void }) => (
    <svg viewBox="0 0 400 300" className="w-full h-auto">
        <rect x="0" y="0" width="400" height="300" fill={colors.sky} onClick={() => onPartClick('sky')} className="cursor-pointer" />
        <circle cx="50" cy="50" r="30" fill={colors.sun} onClick={() => onPartClick('sun')} className="cursor-pointer" />
        <path d="M 0 200 Q 200 250 400 200 T 800 200 L 800 300 L 0 300 Z" fill={colors.water} onClick={() => onPartClick('water')} className="cursor-pointer" />
        <path d="M 100 210 Q 200 240 300 210 L 270 160 L 130 160 Z" fill={colors.hull} onClick={() => onPartClick('hull')} className="cursor-pointer" />
        <polygon points="200,160 200,60 260,130" fill={colors.sail} onClick={() => onPartClick('sail')} className="cursor-pointer" />
    </svg>
);

const coloringPages = [
    { id: 'house', name: { english: 'House', oromo: 'Mana' }, component: HouseScene, initialColors: { sky: '#87CEEB', sun: '#FFD700', house: '#D2B48C', roof: '#A52A2A', door: '#8B4513', grass: '#228B22' } },
    { id: 'flower', name: { english: 'Flower', oromo: 'Abaaboo' }, component: FlowerScene, initialColors: { sky: '#87CEEB', ground: '#228B22', stem: '#006400', center: '#FFD700', petal: '#FF69B4' } },
    { id: 'car', name: { english: 'Car', oromo: 'Konkolaataa' }, component: CarScene, initialColors: { sky: '#87CEEB', road: '#696969', body: '#FF0000', top: '#ADD8E6', wheel: '#000000' } },
    { id: 'rocket', name: { english: 'Rocket', oromo: 'Rookeetii' }, component: RocketScene, initialColors: { space: '#000020', body: '#C0C0C0', fin: '#FF4500', window: '#AFEEEE', flame: '#FFD700' } },
    { id: 'boat', name: { english: 'Boat', oromo: 'Doonii' }, component: BoatScene, initialColors: { sky: '#87CEEB', sun: '#FFD700', water: '#1E90FF', hull: '#D2B48C', sail: '#FFFFFF' } }
];

const ColoringBookModule = ({ onBack, language }: ColoringBookModuleProps) => {
  const ui = uiContent[language];
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('#FFFFFF');
  const [pagesColors, setPagesColors] = useState(() => 
    coloringPages.reduce((acc, page) => {
        acc[page.id] = page.initialColors;
        return acc;
    }, {} as Record<string, Record<string, string>>)
  );

  const currentPage = coloringPages[currentPageIndex];
  const CurrentPageSvg = currentPage.component;
  const currentColors = pagesColors[currentPage.id];

  const handlePartClick = (part: string) => {
    setPagesColors(prev => ({
        ...prev,
        [currentPage.id]: {
            ...prev[currentPage.id],
            [part]: selectedColor
        }
    }));
  };

  const handleNext = () => {
    setCurrentPageIndex(prev => (prev + 1) % coloringPages.length);
  };

  const handlePrev = () => {
    setCurrentPageIndex(prev => (prev - 1 + coloringPages.length) % coloringPages.length);
  };
  
  const handleReset = () => {
    setPagesColors(prev => ({
        ...prev,
        [currentPage.id]: currentPage.initialColors
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
       <div className="w-full max-w-4xl">
        <div className="flex items-center justify-between mb-6">
            <Button onClick={onBack} className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3">
            ← {ui.back}
            </Button>
            <h1 className="text-4xl font-bold text-white flex items-center gap-2 text-center">
                <Paintbrush className="h-10 w-10" />
                {ui.title}: {currentPage.name[language]}
            </h1>
            <div className="w-24"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg flex flex-col items-center justify-center gap-4">
                <div className="w-full">
                  <CurrentPageSvg colors={currentColors} onPartClick={handlePartClick} />
                </div>
                <div className="flex items-center justify-center gap-4">
                    <Button onClick={handlePrev} className="bg-white/30 hover:bg-white/40 text-white"><ArrowLeft className="mr-2 h-4 w-4" /> Prev</Button>
                    <Button onClick={handleReset} className="bg-white/30 hover:bg-white/40 text-white"><RefreshCcw className="mr-2 h-4 w-4" /> Reset</Button>
                    <Button onClick={handleNext} className="bg-white/30 hover:bg-white/40 text-white">Next <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </div>
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
