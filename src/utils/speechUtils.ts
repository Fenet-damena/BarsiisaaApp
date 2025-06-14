
export const speakText = (text: string, language: 'english' | 'oromo' = 'english') => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language-specific voice settings
    if (language === 'english') {
      utterance.lang = 'en-US';
      utterance.rate = 0.8; // Slower for children
      utterance.pitch = 1.1; // Slightly higher pitch for children
    } else {
      // For Oromo, use phonetic approximation with English pronunciation
      utterance.lang = 'en-US'; // Use English voice but slower for better pronunciation
      utterance.rate = 0.5; // Much slower for non-native language
      utterance.pitch = 1.0;
    }
    
    utterance.volume = 1.0;
    
    // Try to find the best available voice
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith('en') && voice.name.includes('Google')
    ) || voices.find(voice => voice.lang.startsWith('en'));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    speechSynthesis.speak(utterance);
  }
};
