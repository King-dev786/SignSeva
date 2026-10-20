// SIGNSEVA Speech Assistant
// Handles Speech-to-Text (Hearing person speaks) and Text-to-Speech (Speaks for Deaf person)

class SpeechAssistant {
  constructor() {
    this.synth = window.speechSynthesis;
    this.recognition = null;
    this.isListening = false;
    this.onResultCallback = null;
    this.onStateChangeCallback = null;
    this.speechRate = 0.95;
    this.speechVolume = 1.0;
    this.speechPitch = 1.0;

    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = true;
      this.recognition.interimResults = true;

      this.updateRecognitionLanguage();

      this.recognition.onstart = () => {
        this.isListening = true;
        if (this.onStateChangeCallback) this.onStateChangeCallback(true);
      };

      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        if (this.onResultCallback) {
          this.onResultCallback({
            final: finalTranscript.trim(),
            interim: interimTranscript.trim()
          });
        }
      };

      this.recognition.onerror = (event) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          alert('Microphone access was denied. Please allow microphone permissions in your browser settings.');
        }
        this.isListening = false;
        if (this.onStateChangeCallback) this.onStateChangeCallback(false);
      };

      this.recognition.onend = () => {
        this.isListening = false;
        if (this.onStateChangeCallback) this.onStateChangeCallback(false);
      };
    } else {
      console.warn('Web Speech API recognition not supported in this browser.');
    }
  }

  updateRecognitionLanguage() {
    if (!this.recognition) return;
    const langMap = {
      en: 'en-IN',
      hi: 'hi-IN',
      ta: 'ta-IN'
    };
    const activeLang = window.currentLanguage || 'en';
    this.recognition.lang = langMap[activeLang] || 'en-IN';
  }

  toggleListening(onResult, onStateChange) {
    this.onResultCallback = onResult;
    this.onStateChangeCallback = onStateChange;

    if (!this.recognition) {
      const simulatedText = prompt('Speech recognition requires Chrome/Edge on http://localhost or HTTPS. Enter spoken words to test the live transcription & sign matching:', 'Doctor, please help me with medicine.');
      if (simulatedText && this.onResultCallback) {
        this.onResultCallback({
          final: simulatedText.trim(),
          interim: ''
        });
      }
      return false;
    }

    if (this.isListening) {
      try { this.recognition.stop(); } catch (e) {}
      this.isListening = false;
      return false;
    } else {
      try {
        this.updateRecognitionLanguage();
        this.recognition.start();
        return true;
      } catch (err) {
        console.warn('Speech recognition start note:', err);
        const fallbackText = prompt('Microphone access not available on file://. Enter simulated spoken words to test:', 'Doctor, where is the clinic?');
        if (fallbackText && this.onResultCallback) {
          this.onResultCallback({ final: fallbackText.trim(), interim: '' });
        }
        return false;
      }
    }
  }

  speak(text, lang = (window.currentLanguage || 'en')) {
    if (!this.synth) {
      console.warn('Text-to-speech not supported.');
      return;
    }

    if (!text || text.trim() === '') return;

    // Cancel any ongoing speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = this.speechRate;
    utterance.volume = this.speechVolume;
    utterance.pitch = this.speechPitch;

    const langCodeMap = {
      en: 'en-IN',
      hi: 'hi-IN',
      ta: 'ta-IN'
    };
    utterance.lang = langCodeMap[lang] || 'en-IN';

    // Find best matching voice
    const voices = this.synth.getVoices();
    if (voices && voices.length > 0) {
      const preferred = voices.find(v => v.lang.startsWith(utterance.lang.split('-')[0]));
      if (preferred) utterance.voice = preferred;
    }

    this.synth.speak(utterance);
  }

  stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }
}

// Global instance
window.speechAssistant = new SpeechAssistant();
