export const speakText = (text: string, language: 'english' | 'oromo' = 'english', gender?: 'female' | 'male'): Promise<void> => {
  return new Promise((resolve) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language-specific voice settings
      if (language === 'english') {
        utterance.lang = 'en-US';
        utterance.rate = 0.8; // Slower for children
        if (gender === 'female') {
          utterance.pitch = 1.2; // Higher pitch for female voice
        } else if (gender === 'male') {
          utterance.pitch = 0.9; // Lower pitch for male voice
        } else {
          utterance.pitch = 1.1; // Default slightly higher pitch for children
        }
      } else {
        // For Oromo, use phonetic approximation with English pronunciation
        utterance.lang = 'en-US'; // Use English voice
        utterance.rate = 1.0; // Normal pace
        if (gender === 'female') {
          utterance.pitch = 1.2; // Higher pitch for female voice
        } else if (gender === 'male') {
          utterance.pitch = 0.9; // Lower pitch for male voice
        } else {
          utterance.pitch = 1.0;
        }
      }
      
      utterance.volume = 1.0;

      utterance.onend = () => {
        resolve();
      };
      utterance.onerror = (e) => {
        console.error('Speech synthesis error', e);
        resolve(); // Resolve even on error to not block the conversation
      };
      
      // Try to find the best available voice
      const voices = speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.lang.startsWith('en') && voice.name.includes('Google')
      ) || voices.find(voice => voice.lang.startsWith('en'));
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      speechSynthesis.speak(utterance);
    } else {
      console.warn('Speech synthesis not supported.');
      resolve();
    }
  });
};
