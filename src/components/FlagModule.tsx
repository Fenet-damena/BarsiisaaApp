import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { speakText } from '@/utils/speechUtils';

interface FlagModuleProps {
  onBack: () => void;
  language: 'english' | 'oromo';
}

const flagsData = {
  english: [
    { name: "United States", flag: "🇺🇸", code: "US" },
    { name: "United Kingdom", flag: "🇬🇧", code: "GB" },
    { name: "Canada", flag: "🇨🇦", code: "CA" },
    { name: "France", flag: "🇫🇷", code: "FR" },
    { name: "Germany", flag: "🇩🇪", code: "DE" },
    { name: "Italy", flag: "🇮🇹", code: "IT" },
    { name: "Spain", flag: "🇪🇸", code: "ES" },
    { name: "Japan", flag: "🇯🇵", code: "JP" },
    { name: "China", flag: "🇨🇳", code: "CN" },
    { name: "India", flag: "🇮🇳", code: "IN" },
    { name: "Brazil", flag: "🇧🇷", code: "BR" },
    { name: "Mexico", flag: "🇲🇽", code: "MX" },
    { name: "Australia", flag: "🇦🇺", code: "AU" },
    { name: "Russia", flag: "🇷🇺", code: "RU" },
    { name: "South Korea", flag: "🇰🇷", code: "KR" },
    { name: "Turkey", flag: "🇹🇷", code: "TR" },
    { name: "Egypt", flag: "🇪🇬", code: "EG" },
    { name: "South Africa", flag: "🇿🇦", code: "ZA" },
    { name: "Nigeria", flag: "🇳🇬", code: "NG" },
    { name: "Ethiopia", flag: "🇪🇹", code: "ET" },
    { name: "Kenya", flag: "🇰🇪", code: "KE" },
    { name: "Ghana", flag: "🇬🇭", code: "GH" },
    { name: "Morocco", flag: "🇲🇦", code: "MA" },
    { name: "Algeria", flag: "🇩🇿", code: "DZ" },
    { name: "Tunisia", flag: "🇹🇳", code: "TN" },
    { name: "Libya", flag: "🇱🇾", code: "LY" },
    { name: "Sudan", flag: "🇸🇩", code: "SD" },
    { name: "Uganda", flag: "🇺🇬", code: "UG" },
    { name: "Tanzania", flag: "🇹🇿", code: "TZ" },
    { name: "Rwanda", flag: "🇷🇼", code: "RW" },
    { name: "Zambia", flag: "🇿🇲", code: "ZM" },
    { name: "Zimbabwe", flag: "🇿🇼", code: "ZW" },
    { name: "Botswana", flag: "🇧🇼", code: "BW" },
    { name: "Namibia", flag: "🇳🇦", code: "NA" },
    { name: "Angola", flag: "🇦🇴", code: "AO" },
    { name: "Mozambique", flag: "🇲🇿", code: "MZ" },
    { name: "Madagascar", flag: "🇲🇬", code: "MG" },
    { name: "Mauritius", flag: "🇲🇺", code: "MU" },
    { name: "Seychelles", flag: "🇸🇨", code: "SC" },
    { name: "Comoros", flag: "🇰🇲", code: "KM" },
    { name: "Djibouti", flag: "🇩🇯", code: "DJ" },
    { name: "Somalia", flag: "🇸🇴", code: "SO" },
    { name: "Eritrea", flag: "🇪🇷", code: "ER" },
    { name: "Chad", flag: "🇹🇩", code: "TD" },
    { name: "Niger", flag: "🇳🇪", code: "NE" },
    { name: "Mali", flag: "🇲🇱", code: "ML" },
    { name: "Burkina Faso", flag: "🇧🇫", code: "BF" },
    { name: "Senegal", flag: "🇸🇳", code: "SN" },
    { name: "Guinea", flag: "🇬🇳", code: "GN" },
    { name: "Sierra Leone", flag: "🇸🇱", code: "SL" },
    { name: "Liberia", flag: "🇱🇷", code: "LR" },
    { name: "Ivory Coast", flag: "🇨🇮", code: "CI" },
    { name: "Togo", flag: "🇹🇬", code: "TG" },
    { name: "Benin", flag: "🇧🇯", code: "BJ" },
    { name: "Cameroon", flag: "🇨🇲", code: "CM" },
    { name: "Central African Republic", flag: "🇨🇫", code: "CF" },
    { name: "Democratic Republic of Congo", flag: "🇨🇩", code: "CD" },
    { name: "Republic of Congo", flag: "🇨🇬", code: "CG" },
    { name: "Gabon", flag: "🇬🇦", code: "GA" },
    { name: "Equatorial Guinea", flag: "🇬🇶", code: "GQ" },
    { name: "Sao Tome and Principe", flag: "🇸🇹", code: "ST" },
    { name: "Cape Verde", flag: "🇨🇻", code: "CV" },
    { name: "Gambia", flag: "🇬🇲", code: "GM" },
    { name: "Guinea-Bissau", flag: "🇬🇼", code: "GW" },
    { name: "Malawi", flag: "🇲🇼", code: "MW" },
    { name: "Lesotho", flag: "🇱🇸", code: "LS" },
    { name: "Eswatini", flag: "🇸🇿", code: "SZ" },
    { name: "Argentina", flag: "🇦🇷", code: "AR" },
    { name: "Chile", flag: "🇨🇱", code: "CL" },
    { name: "Peru", flag: "🇵🇪", code: "PE" },
    { name: "Colombia", flag: "🇨🇴", code: "CO" },
    { name: "Venezuela", flag: "🇻🇪", code: "VE" },
    { name: "Ecuador", flag: "🇪🇨", code: "EC" },
    { name: "Bolivia", flag: "🇧🇴", code: "BO" },
    { name: "Paraguay", flag: "🇵🇾", code: "PY" },
    { name: "Uruguay", flag: "🇺🇾", code: "UY" },
    { name: "Guyana", flag: "🇬🇾", code: "GY" },
    { name: "Suriname", flag: "🇸🇷", code: "SR" },
    { name: "French Guiana", flag: "🇬🇫", code: "GF" },
    { name: "Norway", flag: "🇳🇴", code: "NO" },
    { name: "Sweden", flag: "🇸🇪", code: "SE" },
    { name: "Denmark", flag: "🇩🇰", code: "DK" },
    { name: "Finland", flag: "🇫🇮", code: "FI" },
    { name: "Iceland", flag: "🇮🇸", code: "IS" },
    { name: "Netherlands", flag: "🇳🇱", code: "NL" },
    { name: "Belgium", flag: "🇧🇪", code: "BE" },
    { name: "Luxembourg", flag: "🇱🇺", code: "LU" },
    { name: "Switzerland", flag: "🇨🇭", code: "CH" },
    { name: "Austria", flag: "🇦🇹", code: "AT" },
    { name: "Portugal", flag: "🇵🇹", code: "PT" },
    { name: "Ireland", flag: "🇮🇪", code: "IE" },
    { name: "Poland", flag: "🇵🇱", code: "PL" },
    { name: "Czech Republic", flag: "🇨🇿", code: "CZ" },
    { name: "Slovakia", flag: "🇸🇰", code: "SK" },
    { name: "Hungary", flag: "🇭🇺", code: "HU" },
    { name: "Romania", flag: "🇷🇴", code: "RO" },
    { name: "Bulgaria", flag: "🇧🇬", code: "BG" },
    { name: "Greece", flag: "🇬🇷", code: "GR" },
    { name: "Serbia", flag: "🇷🇸", code: "RS" },
    { name: "Croatia", flag: "🇭🇷", code: "HR" },
    { name: "Slovenia", flag: "🇸🇮", code: "SI" },
    { name: "Bosnia and Herzegovina", flag: "🇧🇦", code: "BA" },
    { name: "Montenegro", flag: "🇲🇪", code: "ME" },
    { name: "North Macedonia", flag: "🇲🇰", code: "MK" },
    { name: "Albania", flag: "🇦🇱", code: "AL" },
    { name: "Thailand", flag: "🇹🇭", code: "TH" },
    { name: "Vietnam", flag: "🇻🇳", code: "VN" },
    { name: "Philippines", flag: "🇵🇭", code: "PH" },
    { name: "Indonesia", flag: "🇮🇩", code: "ID" },
    { name: "Malaysia", flag: "🇲🇾", code: "MY" },
    { name: "Singapore", flag: "🇸🇬", code: "SG" },
    { name: "Myanmar", flag: "🇲🇲", code: "MM" },
    { name: "Cambodia", flag: "🇰🇭", code: "KH" },
    { name: "Laos", flag: "🇱🇦", code: "LA" },
    { name: "Brunei", flag: "🇧🇳", code: "BN" },
    { name: "Nepal", flag: "🇳🇵", code: "NP" },
    { name: "Bangladesh", flag: "🇧🇩", code: "BD" },
    { name: "Sri Lanka", flag: "🇱🇰", code: "LK" },
    { name: "Pakistan", flag: "🇵🇰", code: "PK" },
    { name: "Afghanistan", flag: "🇦🇫", code: "AF" },
    { name: "Iran", flag: "🇮🇷", code: "IR" },
    { name: "Iraq", flag: "🇮🇶", code: "IQ" },
    { name: "Saudi Arabia", flag: "🇸🇦", code: "SA" },
    { name: "Kuwait", flag: "🇰🇼", code: "KW" },
    { name: "Qatar", flag: "🇶🇦", code: "QA" },
    { name: "United Arab Emirates", flag: "🇦🇪", code: "AE" },
    { name: "Oman", flag: "🇴🇲", code: "OM" },
    { name: "Yemen", flag: "🇾🇪", code: "YE" },
    { name: "Jordan", flag: "🇯🇴", code: "JO" },
    { name: "Lebanon", flag: "🇱🇧", code: "LB" },
    { name: "Syria", flag: "🇸🇾", code: "SY" },
    { name: "Israel", flag: "🇮🇱", code: "IL" },
    { name: "Palestine", flag: "🇵🇸", code: "PS" },
    { name: "Cyprus", flag: "🇨🇾", code: "CY" }
  ],
  oromo: [
    { name: "Ameerikaa", flag: "🇺🇸", code: "US" },
    { name: "Buriteeniyaa", flag: "🇬🇧", code: "GB" },
    { name: "Kaannadaa", flag: "🇨🇦", code: "CA" },
    { name: "Faransaay", flag: "🇫🇷", code: "FR" },
    { name: "Jarmaniyaa", flag: "🇩🇪", code: "DE" },
    { name: "Xaaliyaan", flag: "🇮🇹", code: "IT" },
    { name: "Ispeeniyaa", flag: "🇪🇸", code: "ES" },
    { name: "Jaappaan", flag: "🇯🇵", code: "JP" },
    { name: "Chaayinaa", flag: "🇨🇳", code: "CN" },
    { name: "Hindiyaa", flag: "🇮🇳", code: "IN" },
    { name: "Biraazil", flag: "🇧🇷", code: "BR" },
    { name: "Meksikoo", flag: "🇲🇽", code: "MX" },
    { name: "Awusxiraaliiyaa", flag: "🇦🇺", code: "AU" },
    { name: "Ruushiyaa", flag: "🇷🇺", code: "RU" },
    { name: "Kooriyaa Kibbaa", flag: "🇰🇷", code: "KR" },
    { name: "Turkii", flag: "🇹🇷", code: "TR" },
    { name: "Misir", flag: "🇪🇬", code: "EG" },
    { name: "Afrikaa Kibbaa", flag: "🇿🇦", code: "ZA" },
    { name: "Naayijeeriyaa", flag: "🇳🇬", code: "NG" },
    { name: "Itoophiyaa", flag: "🇪🇹", code: "ET" },
    { name: "Keeniyaa", flag: "🇰🇪", code: "KE" },
    { name: "Gaanaa", flag: "🇬🇭", code: "GH" },
    { name: "Marooko", flag: "🇲🇦", code: "MA" },
    { name: "Aljeeriyaa", flag: "🇩🇿", code: "DZ" },
    { name: "Tuunisiyaa", flag: "🇹🇳", code: "TN" },
    { name: "Liibiyaa", flag: "🇱🇾", code: "LY" },
    { name: "Suudaan", flag: "🇸🇩", code: "SD" },
    { name: "Yugaandaa", flag: "🇺🇬", code: "UG" },
    { name: "Tanziiniyaa", flag: "🇹🇿", code: "TZ" },
    { name: "Ruwaandaa", flag: "🇷🇼", code: "RW" },
    { name: "Zaambiyaa", flag: "🇿🇲", code: "ZM" },
    { name: "Zimbaabwee", flag: "🇿🇼", code: "ZW" },
    { name: "Botswaanaa", flag: "🇧🇼", code: "BW" },
    { name: "Naamiibiyaa", flag: "🇳🇦", code: "NA" },
    { name: "Angoolaa", flag: "🇦🇴", code: "AO" },
    { name: "Moozaambiiqu", flag: "🇲🇿", code: "MZ" },
    { name: "Madagaaskar", flag: "🇲🇬", code: "MG" },
    { name: "Moorishaas", flag: "🇲🇺", code: "MU" },
    { name: "Seyshelles", flag: "🇸🇨", code: "SC" },
    { name: "Komoroos", flag: "🇰🇲", code: "KM" },
    { name: "Jibuutii", flag: "🇩🇯", code: "DJ" },
    { name: "Soomaaliyaa", flag: "🇸🇴", code: "SO" },
    { name: "Erxiraayaa", flag: "🇪🇷", code: "ER" },
    { name: "Chaad", flag: "🇹🇩", code: "TD" },
    { name: "Niijeer", flag: "🇳🇪", code: "NE" },
    { name: "Maali", flag: "🇲🇱", code: "ML" },
    { name: "Burkiinaa Faaso", flag: "🇧🇫", code: "BF" },
    { name: "Senegaal", flag: "🇸🇳", code: "SN" },
    { name: "Giiinee", flag: "🇬🇳", code: "GN" },
    { name: "Siraa Liyoon", flag: "🇸🇱", code: "SL" },
    { name: "Laayibeeriyaa", flag: "🇱🇷", code: "LR" },
    { name: "Koost Aayivrii", flag: "🇨🇮", code: "CI" },
    { name: "Toogoo", flag: "🇹🇬", code: "TG" },
    { name: "Beniin", flag: "🇧🇯", code: "BJ" },
    { name: "Kaamruun", flag: "🇨🇲", code: "CM" },
    { name: "Riphablika Afrikaa Giddugaleessaa", flag: "🇨🇫", code: "CF" },
    { name: "Riphablika Dimokiraatawaa Kongo", flag: "🇨🇩", code: "CD" },
    { name: "Riphablika Kongo", flag: "🇨🇬", code: "CG" },
    { name: "Gaaboon", flag: "🇬🇦", code: "GA" },
    { name: "Giiinee Ekwadoor", flag: "🇬🇶", code: "GQ" },
    { name: "Saawoo Tomee fi Pirinsipii", flag: "🇸🇹", code: "ST" },
    { name: "Kaappii Verdii", flag: "🇨🇻", code: "CV" },
    { name: "Gaambiyaa", flag: "🇬🇲", code: "GM" },
    { name: "Giiinee-Bisaawu", flag: "🇬🇼", code: "GW" },
    { name: "Malaawii", flag: "🇲🇼", code: "MW" },
    { name: "Lesootoo", flag: "🇱🇸", code: "LS" },
    { name: "Eswatiinii", flag: "🇸🇿", code: "SZ" },
    { name: "Arjenxiinaa", flag: "🇦🇷", code: "AR" },
    { name: "Chilii", flag: "🇨🇱", code: "CL" },
    { name: "Peeruu", flag: "🇵🇪", code: "PE" },
    { name: "Kolombiyaa", flag: "🇨🇴", code: "CO" },
    { name: "Venezuwelaa", flag: "🇻🇪", code: "VE" },
    { name: "Ekwaadoor", flag: "🇪🇨", code: "EC" },
    { name: "Boliiviyaa", flag: "🇧🇴", code: "BO" },
    { name: "Paraagwaay", flag: "🇵🇾", code: "PY" },
    { name: "Uruguwaay", flag: "🇺🇾", code: "UY" },
    { name: "Guyaanaa", flag: "🇬🇾", code: "GY" },
    { name: "Suriinaam", flag: "🇸🇷", code: "SR" },
    { name: "Guyaanaa Faransaay", flag: "🇬🇫", code: "GF" },
    { name: "Noorweey", flag: "🇳🇴", code: "NO" },
    { name: "Siwiidin", flag: "🇸🇪", code: "SE" },
    { name: "Deenmaark", flag: "🇩🇰", code: "DK" },
    { name: "Fiinlaand", flag: "🇫🇮", code: "FI" },
    { name: "Aayislaand", flag: "🇮🇸", code: "IS" },
    { name: "Nedaarlaand", flag: "🇳🇱", code: "NL" },
    { name: "Beeljiyam", flag: "🇧🇪", code: "BE" },
    { name: "Luksemboorg", flag: "🇱🇺", code: "LU" },
    { name: "Siwizarlaand", flag: "🇨🇭", code: "CH" },
    { name: "Awustriyaa", flag: "🇦🇹", code: "AT" },
    { name: "Poorchugaal", flag: "🇵🇹", code: "PT" },
    { name: "Ayarlaand", flag: "🇮🇪", code: "IE" },
    { name: "Poolaand", flag: "🇵🇱", code: "PL" },
    { name: "Riphablika Cheek", flag: "🇨🇿", code: "CZ" },
    { name: "Silovaakiyaa", flag: "🇸🇰", code: "SK" },
    { name: "Hungaarii", flag: "🇭🇺", code: "HU" },
    { name: "Roomaaniyaa", flag: "🇷🇴", code: "RO" },
    { name: "Bulgaariyaa", flag: "🇧🇬", code: "BG" },
    { name: "Giriik", flag: "🇬🇷", code: "GR" },
    { name: "Serbiyaa", flag: "🇷🇸", code: "RS" },
    { name: "Korooshiyaa", flag: "🇭🇷", code: "HR" },
    { name: "Siloveeniyaa", flag: "🇸🇮", code: "SI" },
    { name: "Boosniyaa fi Herzegoviinaa", flag: "🇧🇦", code: "BA" },
    { name: "Monteneegroo", flag: "🇲🇪", code: "ME" },
    { name: "Makedoniyaa Kaabaa", flag: "🇲🇰", code: "MK" },
    { name: "Albaaniyaa", flag: "🇦🇱", code: "AL" },
    { name: "Tayilaand", flag: "🇹🇭", code: "TH" },
    { name: "Veetinaam", flag: "🇻🇳", code: "VN" },
    { name: "Filiippiyaas", flag: "🇵🇭", code: "PH" },
    { name: "Indoneesiyaa", flag: "🇮🇩", code: "ID" },
    { name: "Maleesiyaa", flag: "🇲🇾", code: "MY" },
    { name: "Singaapoor", flag: "🇸🇬", code: "SG" },
    { name: "Miyaanmaar", flag: "🇲🇲", code: "MM" },
    { name: "Kamboojiyaa", flag: "🇰🇭", code: "KH" },
    { name: "Laaoos", flag: "🇱🇦", code: "LA" },
    { name: "Burunaay", flag: "🇧🇳", code: "BN" },
    { name: "Neepaal", flag: "🇳🇵", code: "NP" },
    { name: "Baanglaadeesh", flag: "🇧🇩", code: "BD" },
    { name: "Siri Laankaa", flag: "🇱🇰", code: "LK" },
    { name: "Paakistaan", flag: "🇵🇰", code: "PK" },
    { name: "Afgaanistaan", flag: "🇦🇫", code: "AF" },
    { name: "Iraan", flag: "🇮🇷", code: "IR" },
    { name: "Iraaq", flag: "🇮🇶", code: "IQ" },
    { name: "Arabiyaa Sawudii", flag: "🇸🇦", code: "SA" },
    { name: "Kuweeti", flag: "🇰🇼", code: "KW" },
    { name: "Qaxaar", flag: "🇶🇦", code: "QA" },
    { name: "Imaaraatii Arabii Walxaxanii", flag: "🇦🇪", code: "AE" },
    { name: "Omaan", flag: "🇴🇲", code: "OM" },
    { name: "Yaman", flag: "🇾🇪", code: "YE" },
    { name: "Jordaan", flag: "🇯🇴", code: "JO" },
    { name: "Lebaanoon", flag: "🇱🇧", code: "LB" },
    { name: "Suuriyaa", flag: "🇸🇾", code: "SY" },
    { name: "Israa'iil", flag: "🇮🇱", code: "IL" },
    { name: "Falasxiin", flag: "🇵🇸", code: "PS" },
    { name: "Saayipiraas", flag: "🇨🇾", code: "CY" }
  ]
};

const uiContent = {
  english: {
    title: "Learn Country Flags! 🏁",
    subtitle: "Click on any flag to hear the country name!",
    back: "Back to Levels",
    clickToHear: "Click to hear"
  },
  oromo: {
    title: "Alaabaa Biyyootaa Baradhu! 🏁",
    subtitle: "Maqaa biyyaa dhaggeeffachuuf alaabaa kamiyyuu cuqaasi!",
    back: "Gara Sadarkaalee",
    clickToHear: "Dhaggeeffachuuf cuqaasi"
  }
};

const FlagModule = ({ onBack, language }: FlagModuleProps) => {
  const flags = flagsData[language];
  const ui = uiContent[language];

  useEffect(() => {
    console.log(`Flag Module loaded with ${flags.length} flags in ${language}`);
  }, [flags.length, language]);

  const handleFlagClick = async (flag: { name: string; flag: string; code: string }) => {
    console.log(`Speaking: ${flag.name}`);
    await speakText(flag.name, language);
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-20 w-32 h-32 bg-gradient-to-r from-red-300 to-blue-300 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute top-40 right-16 w-24 h-24 bg-gradient-to-r from-green-300 to-yellow-300 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute bottom-32 left-10 w-28 h-28 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full animate-pulse delay-300 opacity-30"></div>
        
        {/* Floating Elements */}
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
          <div className="w-24"></div>
        </div>

        {/* Flags Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {flags.map((flag, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer hover:bg-white/30"
              onClick={() => handleFlagClick(flag)}
            >
              <div className="text-center">
                <div className="text-6xl mb-3 hover:scale-110 transform transition-all duration-300">
                  {flag.flag}
                </div>
                <div className="text-sm font-semibold text-white mb-2 min-h-[40px] flex items-center justify-center">
                  {flag.name}
                </div>
                <div className="text-xs text-white/70">
                  {ui.clickToHear}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlagModule;
