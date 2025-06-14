
import { Button } from '@/components/ui/button';
import { speakText } from '@/utils/speechUtils';

interface CalendarModuleProps {
  onBack: () => void;
  language: 'english' | 'oromo';
}

const calendarData = {
  days: {
    english: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    oromo: ["Wiixata", "Qibxata", "Roobii", "Kamiisa", "Jimaata", "Sanbata", "Dilbata"],
  },
  months: {
    english: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    oromo: [
      "Fuulbana",
      "Onkololeessa",
      "Sadaasa",
      "Muddee",
      "Amajjii",
      "Guraandhala",
      "Bitooteessa",
      "Elba",
      "Caamsa",
      "Waxabajjii",
      "Adoolessa",
      "Hagayya",
    ],
  }
};

const uiContent = {
  english: {
    back: "Back to Levels",
    title: "Days & Months",
    daysHeader: "Days of the Week",
    monthsHeader: "Months of the Year",
    listen: "Listen",
  },
  oromo: {
    back: "Gara Sadarkootatti",
    title: "Guyyoota & Ji'oota",
    daysHeader: "Guyyoota Torbanii",
    monthsHeader: "Ji'oota Waggaa",
    listen: "Dhaggeeffadhu",
  }
};

const CalendarModule = ({ onBack, language }: CalendarModuleProps) => {
  const ui = uiContent[language];
  const days = calendarData.days[language];
  const months = calendarData.months[language];

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Button
            onClick={onBack}
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3"
          >
            ← {ui.back}
          </Button>
          <h1 className="text-4xl font-bold text-white text-center flex-1">
            🗓️ {ui.title}
          </h1>
          <div className="w-24"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-3xl font-bold text-white text-center mb-6">{ui.daysHeader}</h2>
            <div className="space-y-4">
              {days.map((day, index) => (
                <div key={day} className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between shadow-lg">
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-white mr-4">{index + 1}.</span>
                    <span className="text-xl font-semibold text-white">{day}</span>
                  </div>
                  <Button onClick={() => speakText(day, language)} className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2">
                    🔊 <span className="sr-only">{ui.listen}</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-white text-center mb-6">{ui.monthsHeader}</h2>
            <div className="space-y-4">
              {months.map((month, index) => (
                <div key={month} className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 flex items-center justify-between shadow-lg">
                  <div className="flex items-center">
                    <span className="text-xl font-bold text-white mr-4">{index + 1}.</span>
                    <span className="text-xl font-semibold text-white">{month}</span>
                  </div>
                  <Button onClick={() => speakText(month, language)} className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-2">
                    🔊 <span className="sr-only">{ui.listen}</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarModule;
