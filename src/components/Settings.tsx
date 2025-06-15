
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Settings as SettingsIcon } from "lucide-react"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface SettingsProps {
  onBackgroundChange: (theme: string) => void;
  currentBackground: string;
}

export function Settings({ onBackgroundChange, currentBackground }: SettingsProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="fixed top-4 right-4 z-50 bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 rounded-full">
          <SettingsIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Customize your experience.
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
        </div>
      </SheetContent>
    </Sheet>
  )
}
