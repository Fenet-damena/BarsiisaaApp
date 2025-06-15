import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

interface StoryModuleProps {
  onBack: () => void;
  language: 'english' | 'oromo';
}

const englishStories = [
    { title: "The Bear and the Bee", videoId: "jKi2SvWOCXc" },
    { title: "The Boy Who Cried Wolf", videoId: "b9YllX5eeKY" },
    { title: "The Ant and The Dove", videoId: "TpLhLBhFTag" }
];

const oromoStories = [
    { title: "Hantuutaa fi Jaldeessa", videoId: "nvrIvnnQDqc" },
    { title: "Raachaa illimaa mootti tahee", videoId: "qmvwakg5pqk" },
    { title: "Hoolaa fi Yeeyyii", videoId: "KRlmBel_D8M" }
];

const uiContent = {
  english: {
    title: 'Story Time',
    back: 'Back',
  },
  oromo: {
    title: 'Oduu Durii',
    back: 'Duubatti',
  },
};

const StoryModule = ({ onBack, language }: StoryModuleProps) => {
  const ui = uiContent[language];
  const currentStories = language === 'english' ? englishStories : oromoStories;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-5xl">
        <div className="flex items-center justify-between mb-6">
          <Button onClick={onBack} className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full px-6 py-3">
            ← {ui.back}
          </Button>
          <h1 className="text-4xl font-bold text-white flex items-center gap-2 text-center">
            <BookOpen className="h-10 w-10" />
            {ui.title}
          </h1>
          <div className="w-24"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentStories.map((story, index) => (
            <Card key={index} className="bg-white/20 backdrop-blur-sm border-0 shadow-lg text-white rounded-2xl">
              <CardHeader>
                <CardTitle className="text-xl">{story.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src={`https://www.youtube.com/embed/${story.videoId}`}
                    title={story.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoryModule;
