
import { useState } from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Settings as SettingsIcon, Star, MessageSquare, Info } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

interface SettingsProps {
  onBackgroundChange: (theme: string) => void;
  currentBackground: string;
}

export function Settings({ onBackgroundChange, currentBackground }: SettingsProps) {
  const { toast } = useToast()
  const [feedback, setFeedback] = useState("")
  const [rating, setRating] = useState(0)

  const handleRating = (rate: number) => {
    setRating(rate)
    toast({
      title: "Thank you for your rating!",
      description: `You've rated us ${rate} out of 5 stars.`,
    })
  }

  const handleFeedbackSubmit = () => {
    if (feedback.trim() === "") {
      toast({
        title: "Uh oh!",
        description: "Please enter your feedback before submitting.",
        variant: "destructive",
      })
      return
    }
    
    const mailtoLink = `mailto:fenetdamena74@gmail.com?subject=App Feedback&body=${encodeURIComponent(feedback)}`;
    window.location.href = mailtoLink;
    
    setFeedback("")
    toast({
      title: "Thank you!",
      description: "We're redirecting you to your email client to send your feedback.",
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 right-4 z-50 bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Customize your experience and share your thoughts.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="rounded-lg border p-4">
             <Label className="text-base font-semibold">Background Theme</Label>
             <p className="text-sm text-muted-foreground mb-4">
                Select the theme for the application's background.
             </p>
            <RadioGroup
              value={currentBackground}
              onValueChange={onBackgroundChange}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="default" />
                <Label htmlFor="default">Default</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ocean" id="ocean" />
                <Label htmlFor="ocean">Ocean</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sunset" id="sunset" />
                <Label htmlFor="sunset">Sunset</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="forest" id="forest" />
                <Label htmlFor="forest">Forest</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="h-5 w-5" />
              <Label className="text-base font-semibold">Rate Us</Label>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              If you enjoy using our app, please take a moment to rate it.
            </p>
            <div className="flex justify-center items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-8 w-8 cursor-pointer transition-colors ${
                    rating >= star ? "text-yellow-400 fill-yellow-400" : "text-gray-300 hover:text-gray-400"
                  }`}
                  onClick={() => handleRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-5 w-5" />
              <Label className="text-base font-semibold">Send Feedback</Label>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Have a suggestion or found a bug? Let us know!
            </p>
            <Textarea
              placeholder="Type your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="mb-2"
            />
            <Button onClick={handleFeedbackSubmit} className="w-full">
              Submit Feedback
            </Button>
          </div>
          <div className="rounded-lg border p-4">
            <div className="flex items-center gap-2 mb-2">
              <Info className="h-5 w-5" />
              <Label className="text-base font-semibold">About Us</Label>
            </div>
            <p className="text-sm text-muted-foreground">
              Welcome, little explorer! This app is a magical place for you to learn new languages and cool things about the world. Let's play, learn, and grow together!
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
