
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, List, Grid } from 'lucide-react';
import { speakText } from '@/utils/speechUtils';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface FlagModuleProps {
  onBack: () => void;
  language: 'english' | 'oromo';
}

const flagsData = {
  english: [
    { name: "United States", flag: "🇺🇸", code: "US", oromo: "Ameerikaa", pronunciation: "Ah-mee-ree-kah" },
    { name: "United Kingdom", flag: "🇬🇧", code: "GB", oromo: "Buriteeniyaa", pronunciation: "Boo-ree-tay-nee-yah" },
    { name: "Canada", flag: "🇨🇦", code: "CA", oromo: "Kanaadaa", pronunciation: "Ka-naa-dah" },
    { name: "France", flag: "🇫🇷", code: "FR", oromo: "Firaansi", pronunciation: "Fee-raan-see" },
    { name: "Germany", flag: "🇩🇪", code: "DE", oromo: "Jarmanii", pronunciation: "Jar-maa-nee" },
    { name: "Italy", flag: "🇮🇹", code: "IT", oromo: "Xaaliyaan", pronunciation: "Ha-lee-yaan" },
    { name: "Spain", flag: "🇪🇸", code: "ES", oromo: "Ispeeniyaa", pronunciation: "Is-pay-nee-yah" },
    { name: "Japan", flag: "🇯🇵", code: "JP", oromo: "Jaappaan", pronunciation: "Jaa-paan" },
    { name: "China", flag: "🇨🇳", code: "CN", oromo: "Chaayinaa", pronunciation: "Chaa-yee-naa" },
    { name: "India", flag: "🇮🇳", code: "IN", oromo: "Indiyaa", pronunciation: "In-dee-yah" },
    { name: "Brazil", flag: "🇧🇷", code: "BR", oromo: "Biraaziil", pronunciation: "Bee-raa-zeel" },
    { name: "Mexico", flag: "🇲🇽", code: "MX", oromo: "Meksikoo", pronunciation: "Mek-see-koh" },
    { name: "Australia", flag: "🇦🇺", code: "AU", oromo: "Awustraaliyaa", pronunciation: "Ah-woos-traa-lee-yah" },
    { name: "Russia", flag: "🇷🇺", code: "RU", oromo: "Raashiyaa", pronunciation: "Raa-shee-yah" },
    { name: "South Korea", flag: "🇰🇷", code: "KR", oromo: "Kooriyaa Kibbaa", pronunciation: "Koh-ree-yaa Kib-baa" },
    { name: "Turkey", flag: "🇹🇷", code: "TR", oromo: "Turkii", pronunciation: "Tur-kee" },
    { name: "Egypt", flag: "🇪🇬", code: "EG", oromo: "Gibtsii", pronunciation: "Gib-tsee" },
    { name: "South Africa", flag: "🇿🇦", code: "ZA", oromo: "Afrikaa Kibbaa", pronunciation: "Ah-free-kaa Kib-baa" },
    { name: "Nigeria", flag: "🇳🇬", code: "NG", oromo: "Naayijeeriyaa", pronunciation: "Naa-yee-jay-ree-yah" },
    { name: "Ethiopia", flag: "🇪🇹", code: "ET", oromo: "Itoophiyaa", pronunciation: "Ee-toh-pee-yah" },
    { name: "Kenya", flag: "🇰🇪", code: "KE", oromo: "Keeniyaa", pronunciation: "Kay-nee-yah" },
    { name: "Ghana", flag: "🇬🇭", code: "GH", oromo: "Gaanaa", pronunciation: "Gaa-naa" },
    { name: "Morocco", flag: "🇲🇦", code: "MA", oromo: "Marooko", pronunciation: "Ma-roh-koh" },
    { name: "Algeria", flag: "🇩🇿", code: "DZ", oromo: "Aljeeriyaa", pronunciation: "Al-jay-ree-yah" },
    { name: "Tunisia", flag: "🇹🇳", code: "TN", oromo: "Tuunisiyaa", pronunciation: "Too-nee-see-yah" },
    { name: "Libya", flag: "🇱🇾", code: "LY", oromo: "Liibiyaa", pronunciation: "Lee-bee-yah" },
    { name: "Sudan", flag: "🇸🇩", code: "SD", oromo: "Suudaan", pronunciation: "Soo-daan" },
    { name: "Uganda", flag: "🇺🇬", code: "UG", oromo: "Yuugaandaa", pronunciation: "Yoo-gaan-dah" },
    { name: "Tanzania", flag: "🇹🇿", code: "TZ", oromo: "Taanzaniyaa", pronunciation: "Taan-zaa-nee-yah" },
    { name: "Rwanda", flag: "🇷🇼", code: "RW", oromo: "Ruwaandaa", pronunciation: "Roo-waan-dah" },
    { name: "Djibouti", flag: "🇩🇯", code: "DJ", oromo: "Jibuutii", pronunciation: "Jee-boo-tee" },
    { name: "Somalia", flag: "🇸🇴", code: "SO", oromo: "Somaaliyaa", pronunciation: "Soh-maa-lee-yah" },
    { name: "Eritrea", flag: "🇪🇷", code: "ER", oromo: "Eeritriyaa", pronunciation: "Eh-ree-tree-yah" },
    { name: "Zambia", flag: "🇿🇲", code: "ZM", oromo: "Zaambiyaa", pronunciation: "Zaam-bee-yah" },
    { name: "Zimbabwe", flag: "🇿🇼", code: "ZW", oromo: "Zimbaabwee", pronunciation: "Zim-baab-way" },
    { name: "Botswana", flag: "🇧🇼", code: "BW", oromo: "Botswaanaa", pronunciation: "Bots-waa-naa" },
    { name: "Namibia", flag: "🇳🇦", code: "NA", oromo: "Naamiibiyaa", pronunciation: "Naa-mee-bee-yah" },
    { name: "Angola", flag: "🇦🇴", code: "AO", oromo: "Angoolaa", pronunciation: "An-goh-laa" },
    { name: "Mozambique", flag: "🇲🇿", code: "MZ", oromo: "Moozaambiiqu", pronunciation: "Moh-zaam-bee-koo" },
    { name: "Madagascar", flag: "🇲🇬", code: "MG", oromo: "Madagaaskar", pronunciation: "Ma-da-gaas-kar" }
  ],
  oromo: [
    { name: "Ameerikaa", flag: "🇺🇸", code: "US", english: "United States", pronunciation: "Ah-mee-ree-kah" },
    { name: "Buriteeniyaa", flag: "🇬🇧", code: "GB", english: "United Kingdom", pronunciation: "Boo-ree-tay-nee-yah" },
    { name: "Kanaadaa", flag: "🇨🇦", code: "CA", english: "Canada", pronunciation: "Ka-naa-dah" },
    { name: "Firaansi", flag: "🇫🇷", code: "FR", english: "France", pronunciation: "Fee-raan-see" },
    { name: "Jarmanii", flag: "🇩🇪", code: "DE", english: "Germany", pronunciation: "Jar-maa-nee" },
    { name: "Xaaliyaan", flag: "🇮🇹", code: "IT", english: "Italy", pronunciation: "Ha-lee-yaan" },
    { name: "Ispeeniyaa", flag: "🇪🇸", code: "ES", english: "Spain", pronunciation: "Is-pay-nee-yah" },
    { name: "Jaappaan", flag: "🇯🇵", code: "JP", english: "Japan", pronunciation: "Jaa-paan" },
    { name: "Chaayinaa", flag: "🇨🇳", code: "CN", english: "China", pronunciation: "Chaa-yee-naa" },
    { name: "Indiyaa", flag: "🇮🇳", code: "IN", english: "India", pronunciation: "In-dee-yah" },
    { name: "Biraaziil", flag: "🇧🇷", code: "BR", english: "Brazil", pronunciation: "Bee-raa-zeel" },
    { name: "Meksikoo", flag: "🇲🇽", code: "MX", english: "Mexico", pronunciation: "Mek-see-koh" },
    { name: "Awustraaliyaa", flag: "🇦🇺", code: "AU", english: "Australia", pronunciation: "Ah-woos-traa-lee-yah" },
    { name: "Raashiyaa", flag: "🇷🇺", code: "RU", english: "Russia", pronunciation: "Raa-shee-yah" },
    { name: "Kooriyaa Kibbaa", flag: "🇰🇷", code: "KR", english: "South Korea", pronunciation: "Koh-ree-yaa Kib-baa" },
    { name: "Turkii", flag: "🇹🇷", code: "TR", english: "Turkey", pronunciation: "Tur-kee" },
    { name: "Gibtsii", flag: "🇪🇬", code: "EG", english: "Egypt", pronunciation: "Gib-tsee" },
    { name: "Afrikaa Kibbaa", flag: "🇿🇦", code: "ZA", english: "South Africa", pronunciation: "Ah-free-kaa Kib-baa" },
    { name: "Naayijeeriyaa", flag: "🇳🇬", code: "NG", english: "Nigeria", pronunciation: "Naa-yee-jay-ree-yah" },
    { name: "Itoophiyaa", flag: "🇪🇹", code: "ET", english: "Ethiopia", pronunciation: "Ee-toh-pee-yah" },
    { name: "Keeniyaa", flag: "🇰🇪", code: "KE", english: "Kenya", pronunciation: "Kay-nee-yah" },
    { name: "Gaanaa", flag: "🇬🇭", code: "GH", english: "Ghana", pronunciation: "Gaa-naa" },
    { name: "Marooko", flag: "🇲🇦", code: "MA", english: "Morocco", pronunciation: "Ma-roh-koh" },
    { name: "Aljeeriyaa", flag: "🇩🇿", code: "DZ", english: "Algeria", pronunciation: "Al-jay-ree-yah" },
    { name: "Tuunisiyaa", flag: "🇹🇳", code: "TN", english: "Tunisia", pronunciation: "Too-nee-see-yah" },
    { name: "Liibiyaa", flag: "🇱🇾", code: "LY", english: "Libya", pronunciation: "Lee-bee-yah" },
    { name: "Suudaan", flag: "🇸🇩", code: "SD", english: "Sudan", pronunciation: "Soo-daan" },
    { name: "Yuugaandaa", flag: "🇺🇬", code: "UG", english: "Uganda", pronunciation: "Yoo-gaan-dah" },
    { name: "Taanzaniyaa", flag: "🇹🇿", code: "TZ", english: "Tanzania", pronunciation: "Taan-zaa-nee-yah" },
    { name: "Ruwaandaa", flag: "🇷🇼", code: "RW", english: "Rwanda", pronunciation: "Roo-waan-dah" },
    { name: "Jibuutii", flag: "🇩🇯", code: "DJ", english: "Djibouti", pronunciation: "Jee-boo-tee" },
    { name: "Somaaliyaa", flag: "🇸🇴", code: "SO", english: "Somalia", pronunciation: "Soh-maa-lee-yah" },
    { name: "Eeritriyaa", flag: "🇪🇷", code: "ER", english: "Eritrea", pronunciation: "Eh-ree-tree-yah" },
    { name: "Zaambiyaa", flag: "🇿🇲", code: "ZM", english: "Zambia", pronunciation: "Zaam-bee-yah" },
    { name: "Zimbaabwee", flag: "🇿🇼", code: "ZW", english: "Zimbabwe", pronunciation: "Zim-baab-way" },
    { name: "Botswaanaa", flag: "🇧🇼", code: "BW", english: "Botswana", pronunciation: "Bots-waa-naa" },
    { name: "Naamiibiyaa", flag: "🇳🇦", code: "NA", english: "Namibia", pronunciation: "Naa-mee-bee-yah" },
    { name: "Angoolaa", flag: "🇦🇴", code: "AO", english: "Angola", pronunciation: "An-goh-laa" },
    { name: "Moozaambiiqu", flag: "🇲🇿", code: "MZ", english: "Mozambique", pronunciation: "Moh-zaam-bee-koo" },
    { name: "Madagaaskar", flag: "🇲🇬", code: "MG", english: "Madagascar", pronunciation: "Ma-da-gaas-kar" }
  ]
};

const uiContent = {
  english: {
    title: "Learn Country Flags! 🏁",
    subtitle: "Click on the flag to hear the country name!",
    back: "Back to Levels",
    clickToHear: "Click to hear",
    next: "Next",
    previous: "Previous",
    flagCounter: "Flag",
    tableView: "Table View",
    gridView: "Grid View",
    countryColumn: "Country",
    flagColumn: "Flag",
    oromoColumn: "Afaan Oromo",
    pronunciationColumn: "Pronunciation"
  },
  oromo: {
    title: "Alaabaa Biyyootaa Baradhu! 🏁",
    subtitle: "Maqaa biyyaa dhaggeeffachuuf alaabaa cuqaasi!",
    back: "Gara Sadarkaalee",
    clickToHear: "Dhaggeeffachuuf cuqaasi",
    next: "Itti aanee",
    previous: "Dura",
    flagCounter: "Alaabaa",
    tableView: "Mul'ata Gabatee",
    gridView: "Mul'ata Qaree",
    countryColumn: "Biyya",
    flagColumn: "Alaabaa",
    oromoColumn: "Afaan Oromo",
    pronunciationColumn: "Akka Dubbifamu"
  }
};

const FlagModule = ({ onBack, language }: FlagModuleProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const flags = flagsData[language];
  const ui = uiContent[language];
  const currentFlag = flags[currentIndex];

  useEffect(() => {
    console.log(`Flag Module loaded with ${flags.length} flags in ${language}`);
    setImageError(false);
  }, [flags.length, language, currentIndex]);

  const handleFlagClick = async (flagName: string) => {
    console.log(`Speaking: ${flagName}`);
    await speakText(flagName, language);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % flags.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + flags.length) % flags.length);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const getFlagImageUrl = (countryCode: string) => {
    return `https://flagcdn.com/w320/${countryCode.toLowerCase()}.png`;
  };

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'grid' ? 'table' : 'grid');
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-20 w-32 h-32 bg-gradient-to-r from-red-300 to-blue-300 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-r from-green-300 to-yellow-300 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute bottom-32 left-10 w-28 h-28 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full animate-pulse delay-300 opacity-30"></div>
        
        <div className="absolute top-1/4 right-1/4 text-8xl animate-bounce delay-200 opacity-20">🌎</div>
        <div className="absolute bottom-1/4 left-1/4 text-6xl animate-pulse delay-400 opacity-20">🗺️</div>
        <div className="absolute top-1/2 left-10 text-5xl animate-spin opacity-20">🌟</div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3"
          >
            ← {ui.back}
          </Button>
          <div className="text-center flex-1">
            <h1 className="text-4xl font-bold text-white mb-2 animate-pulse">
              {ui.title}
            </h1>
            <p className="text-xl text-white/80">{ui.subtitle}</p>
          </div>
          <Button
            onClick={toggleViewMode}
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3"
          >
            {viewMode === 'grid' ? <List size={20} /> : <Grid size={20} />}
            {viewMode === 'grid' ? ui.tableView : ui.gridView}
          </Button>
        </div>

        {viewMode === 'table' ? (
          // Table View
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
            <Table>
              <TableCaption className="text-white/80 text-lg mb-4">
                {language === 'english' ? 'All Countries with Oromo Names and Pronunciation' : 'Biyyoota Hunduu Maqaa Afaan Oromoo fi Akka Dubbifamuun'}
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-white font-bold">{ui.flagColumn}</TableHead>
                  <TableHead className="text-white font-bold">{language === 'english' ? 'English' : 'Afaan Oromo'}</TableHead>
                  <TableHead className="text-white font-bold">{language === 'english' ? ui.oromoColumn : 'English'}</TableHead>
                  <TableHead className="text-white font-bold">{ui.pronunciationColumn}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flags.map((flag, index) => (
                  <TableRow key={flag.code} className="hover:bg-white/10">
                    <TableCell>
                      <button
                        onClick={() => handleFlagClick(flag.name)}
                        className="hover:scale-110 transform transition-all duration-200"
                      >
                        <img 
                          src={getFlagImageUrl(flag.code)}
                          alt={`Flag of ${flag.name}`}
                          className="w-12 h-8 object-cover rounded shadow-md"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <span className="text-2xl hidden">{flag.flag}</span>
                      </button>
                    </TableCell>
                    <TableCell className="text-white font-medium">
                      <button
                        onClick={() => handleFlagClick(flag.name)}
                        className="hover:text-yellow-300 transition-colors"
                      >
                        {flag.name}
                      </button>
                    </TableCell>
                    <TableCell className="text-white">
                      <button
                        onClick={() => handleFlagClick(language === 'english' ? flag.oromo : flag.english)}
                        className="hover:text-yellow-300 transition-colors"
                      >
                        {language === 'english' ? flag.oromo : flag.english}
                      </button>
                    </TableCell>
                    <TableCell className="text-white/80 italic">
                      {flag.pronunciation}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          // Grid View (Original)
          <>
            <div className="text-center mb-6">
              <p className="text-white/80 text-lg">
                {ui.flagCounter} {currentIndex + 1} / {flags.length}
              </p>
            </div>

            <div className="flex items-center justify-center mb-8">
              <Button
                onClick={handlePrevious}
                className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full p-4 mr-8"
                disabled={flags.length <= 1}
              >
                <ChevronLeft size={24} />
              </Button>

              <div
                className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 cursor-pointer hover:bg-white/30 min-w-[400px] text-center"
                onClick={() => handleFlagClick(currentFlag.name)}
              >
                <div className="mb-6 hover:scale-110 transform transition-all duration-300 leading-none">
                  {!imageError ? (
                    <img 
                      src={getFlagImageUrl(currentFlag.code)}
                      alt={`Flag of ${currentFlag.name}`}
                      className="w-80 h-60 object-cover rounded-lg mx-auto shadow-lg"
                      onError={handleImageError}
                    />
                  ) : (
                    <div className="text-[200px] leading-none">
                      {currentFlag.flag}
                    </div>
                  )}
                </div>
                <div className="text-3xl font-bold text-white mb-2">
                  {currentFlag.name}
                </div>
                <div className="text-xl text-white/80 mb-2">
                  {language === 'english' ? currentFlag.oromo : currentFlag.english}
                </div>
                <div className="text-lg text-white/60 italic mb-4">
                  {currentFlag.pronunciation}
                </div>
                <div className="text-lg text-white/70">
                  {ui.clickToHear}
                </div>
              </div>

              <Button
                onClick={handleNext}
                className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full p-4 ml-8"
                disabled={flags.length <= 1}
              >
                <ChevronRight size={24} />
              </Button>
            </div>

            <div className="flex justify-center space-x-4">
              <Button
                onClick={handlePrevious}
                className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-8 py-3"
                disabled={flags.length <= 1}
              >
                ← {ui.previous}
              </Button>
              <Button
                onClick={handleNext}
                className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-8 py-3"
                disabled={flags.length <= 1}
              >
                {ui.next} →
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FlagModule;
