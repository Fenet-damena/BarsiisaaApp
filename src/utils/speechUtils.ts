
export const speakText = (text: string, language: 'english' | 'oromo' = 'english', gender?: 'female' | 'male'): Promise<void> => {
  return new Promise((resolve) => {
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      speechSynthesis.cancel();
      
      let processedText = text;

      // Language-specific text processing for better pronunciation approximation
      if (language === 'oromo') {
        // Specific phonetic adjustments must come first to override general rules
        processedText = processedText.replace(/Sirrii/g, 'Seari');

        // In Oromo, 'c' is pronounced like 'ch' in English.
        // This replaces 'c' with 'ch', but uses a negative lookahead (?!h) 
        // to avoid altering a 'c' that's already part of a 'ch' digraph.
        processedText = processedText.replace(/c(?!h)/g, 'ch').replace(/C(?!h)/g, 'Ch');
        
        // In Oromo, 'x' is pronounced like 't' in English.
        processedText = processedText.replace(/x/g, 't').replace(/X/g, 'T');

        // General rules for double vowels to guide English TTS
        processedText = processedText.replace(/aa/g, 'a').replace(/AA/g, 'A');
        processedText = processedText.replace(/ee/g, 'e').replace(/EE/g, 'E');
        processedText = processedText.replace(/ii/g, 'i').replace(/II/g, 'I');
        processedText = processedText.replace(/oo/g, 'o').replace(/OO/g, 'O');
        processedText = processedText.replace(/uu/g, 'u').replace(/UU/g, 'U');
        
        // General rule for 'rr'
        processedText = processedText.replace(/rr/g, 'r').replace(/RR/g, 'R');
      }

      const utterance = new SpeechSynthesisUtterance(processedText);
      
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
        utterance.rate = 0.9; // Normal pace, slightly slowed down for clarity
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
