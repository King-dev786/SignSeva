// SIGNSEVA Emergency SOS & Geolocation Dispatch System
// Generates emergency alerts, GPS links, WhatsApp/SMS triggers, and audio/visual sirens

class EmergencyManager {
  constructor() {
    this.currentPosition = null;
    this.isFetchingGps = false;
    this.sirenAudioCtx = null;
    this.sirenOscillator = null;
    this.sirenGainNode = null;
    this.isSirenPlaying = false;
    this.isStrobeActive = false;
    this.strobeInterval = null;

    this.initGps();
  }

  initGps() {
    if ('geolocation' in navigator) {
      this.isFetchingGps = true;
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          this.currentPosition = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
            mapUrl: `https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`
          };
          this.isFetchingGps = false;
          this.updateGpsDisplay();
        },
        (err) => {
          console.warn('Geolocation error or denied:', err.message);
          this.isFetchingGps = false;
          // Fallback approximate location for demonstration (Coimbatore / HIT)
          this.currentPosition = {
            lat: 10.9025,
            lng: 76.9950,
            accuracy: 15,
            isSimulated: true,
            mapUrl: `https://maps.google.com/?q=10.9025,76.9950`
          };
          this.updateGpsDisplay();
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    }
  }

  updateGpsDisplay() {
    const statusEl = document.getElementById('gps-status-badge');
    const coordEl = document.getElementById('gps-coordinates-text');
    if (!statusEl || !coordEl) return;

    if (this.currentPosition) {
      statusEl.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
      statusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> GPS Active`;
      coordEl.innerHTML = `📍 Lat: <span class="font-mono text-white">${this.currentPosition.lat.toFixed(5)}</span>, Lng: <span class="font-mono text-white">${this.currentPosition.lng.toFixed(5)}</span> ${this.currentPosition.isSimulated ? '(HIT Coimbatore - Demo Mode)' : ''}`;
    } else {
      statusEl.className = 'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30';
      statusEl.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span> Locating...`;
      coordEl.textContent = 'Acquiring GPS satellite position...';
    }
  }

  getSosMessage(emergencyType) {
    const locStr = this.currentPosition
      ? `\n📍 My GPS Location: ${this.currentPosition.mapUrl} (Lat: ${this.currentPosition.lat.toFixed(5)}, Lng: ${this.currentPosition.lng.toFixed(5)})`
      : `\n📍 Location: (Please enable GPS or call responder directly)`;

    switch (emergencyType) {
      case 'medical':
        return `🚨 [SIGNSEVA MEDICAL SOS]\nI am deaf/speech-impaired. I am experiencing a SEVERE MEDICAL EMERGENCY and cannot speak. Please send an ambulance or doctor to my location immediately!${locStr}\n- Sent via SIGNSEVA Assistive System`;
      case 'police':
        return `🚓 [SIGNSEVA POLICE SOS]\nI am deaf/speech-impaired. I am in danger / emergency situation and require immediate POLICE assistance!${locStr}\n- Sent via SIGNSEVA Assistive System`;
      case 'danger':
        return `⚠️ [SIGNSEVA DANGER / ACCIDENT SOS]\nAccident / hazard reported! I am speech/hearing impaired and need urgent rescue help.${locStr}\n- Sent via SIGNSEVA Assistive System`;
      case 'general':
      default:
        return `🆘 [SIGNSEVA EMERGENCY ASSISTANCE]\nI am deaf/speech-impaired and need urgent assistance at my location.${locStr}\n- Sent via SIGNSEVA Assistive System`;
    }
  }

  triggerEmergency(type) {
    const msg = this.getSosMessage(type);

    // Speak aloud with high priority TTS
    let spokenPhrase = "Emergency! I need immediate help. I am speech and hearing impaired.";
    if (type === 'medical') spokenPhrase = "Medical emergency! Please call an ambulance or doctor immediately!";
    if (type === 'police') spokenPhrase = "Emergency! Danger! Please call the police immediately!";
    if (type === 'danger') spokenPhrase = "Danger! Emergency assistance required immediately!";

    if (window.speechAssistant) {
      window.speechAssistant.speak(spokenPhrase, window.currentLanguage || 'en');
    }

    // Vibrate device if supported (SOS Morse: ... --- ...)
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate([200, 100, 200, 100, 200, 300, 500, 100, 500, 100, 500, 300, 200, 100, 200, 100, 200]);
      } catch (e) {}
    }

    // Show modal banner
    this.showEmergencyOverlay(type, msg);
  }

  showEmergencyOverlay(type, fullMessage) {
    let overlay = document.getElementById('emergency-active-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'emergency-active-modal';
      document.body.appendChild(overlay);
    }

    const typeIcons = {
      medical: '🚑',
      police: '🚓',
      danger: '⚠️',
      general: '🆘'
    };

    const typeTitles = {
      medical: 'MEDICAL EMERGENCY BROADCAST',
      police: 'POLICE ASSISTANCE REQUESTED',
      danger: 'DANGER / ACCIDENT ALERT',
      general: 'GENERAL EMERGENCY SOS'
    };

    overlay.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-labelledby', 'emergency-modal-title');
    overlay.innerHTML = `
      <div class="bg-gradient-to-b from-red-900 to-slate-900 border-2 border-red-500 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl text-white text-center relative animate-bounce-subtle">
        <div class="w-20 h-20 mx-auto rounded-full bg-red-600/30 border-2 border-red-500 flex items-center justify-center text-4xl mb-4 animate-pulse" aria-hidden="true">
          ${typeIcons[type] || '🚨'}
        </div>
        <h3 id="emergency-modal-title" class="text-2xl md:text-3xl font-extrabold text-red-400 mb-2 tracking-wide uppercase">
          ${typeTitles[type]}
        </h3>
        <p class="text-slate-300 text-sm md:text-base mb-6">
          Emergency audio alert announced. Choose an action below to dispatch your GPS location to emergency responders or contacts:
        </p>

        <!-- Message Preview Box -->
        <div class="bg-slate-950/70 border border-red-900 rounded-xl p-4 text-left font-mono text-xs md:text-sm text-red-200 mb-6 max-h-40 overflow-y-auto whitespace-pre-wrap" tabindex="0" aria-label="Emergency SOS Message Text">
${fullMessage}
        </div>

        <!-- Action Buttons -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <button onclick="window.emergencyManager.dispatchWhatsApp('${type}')" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition" aria-label="Send Emergency SOS via WhatsApp">
            <span class="text-xl" aria-hidden="true">💬</span>
            <span>Send WhatsApp SOS</span>
          </button>

          <button onclick="window.emergencyManager.dispatchSms('${type}')" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition" aria-label="Send Emergency SOS via SMS">
            <span class="text-xl" aria-hidden="true">📱</span>
            <span>Send SMS SOS</span>
          </button>

          <button onclick="window.emergencyManager.toggleSiren()" id="overlay-siren-btn" class="bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition" aria-label="Toggle Siren Sound">
            <span class="text-xl" aria-hidden="true">📢</span>
            <span>${this.isSirenPlaying ? 'Stop Siren' : 'Play Siren Buzzer'}</span>
          </button>

          <button onclick="window.emergencyManager.toggleStrobe()" id="overlay-strobe-btn" class="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition" aria-label="Toggle Visual Emergency Strobe">
            <span class="text-xl" aria-hidden="true">🚨</span>
            <span>${this.isStrobeActive ? 'Stop Strobe' : 'Visual Strobe'}</span>
          </button>
        </div>

        <button onclick="window.emergencyManager.closeEmergencyOverlay()" class="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-3 rounded-xl font-semibold border border-slate-700 transition" aria-label="Dismiss Emergency Screen">
          Dismiss Emergency Screen
        </button>
      </div>
    `;

    // Handle Escape key to dismiss
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        this.closeEmergencyOverlay();
        document.removeEventListener('keydown', handleKey);
      }
    };
    document.addEventListener('keydown', handleKey);
  }

  closeEmergencyOverlay() {
    const overlay = document.getElementById('emergency-active-modal');
    if (overlay) {
      overlay.remove();
    }
    if (this.isSirenPlaying) this.toggleSiren();
    if (this.isStrobeActive) this.toggleStrobe();
  }

  dispatchWhatsApp(type) {
    const msg = encodeURIComponent(this.getSosMessage(type));
    // Check if user has primary emergency contact
    const contacts = window.contactsManager ? window.contactsManager.getContacts() : [];
    let url = `https://wa.me/?text=${msg}`;
    if (contacts.length > 0 && contacts[0].phone) {
      const cleanPhone = contacts[0].phone.replace(/[^0-9]/g, '');
      url = `https://wa.me/${cleanPhone}?text=${msg}`;
    }
    window.open(url, '_blank');
  }

  dispatchSms(type) {
    const msg = encodeURIComponent(this.getSosMessage(type));
    const contacts = window.contactsManager ? window.contactsManager.getContacts() : [];
    let url = `sms:?body=${msg}`;
    if (contacts.length > 0 && contacts[0].phone) {
      url = `sms:${contacts[0].phone}?body=${msg}`;
    }
    window.location.href = url;
  }

  // Web Audio Siren Generator
  toggleSiren() {
    if (this.isSirenPlaying) {
      this.stopSiren();
    } else {
      this.startSiren();
    }
    this.updateSirenButtons();
  }

  startSiren() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.sirenAudioCtx = new AudioCtx();
      this.sirenOscillator = this.sirenAudioCtx.createOscillator();
      this.sirenGainNode = this.sirenAudioCtx.createGain();

      this.sirenOscillator.type = 'sawtooth';
      this.sirenGainNode.gain.setValueAtTime(0.3, this.sirenAudioCtx.currentTime);

      this.sirenOscillator.connect(this.sirenGainNode);
      this.sirenGainNode.connect(this.sirenAudioCtx.destination);

      this.sirenOscillator.start();
      this.isSirenPlaying = true;

      // Frequency modulation for police / ambulance siren effect
      let freqHigh = true;
      const modInterval = () => {
        if (!this.isSirenPlaying) return;
        const targetFreq = freqHigh ? 960 : 640;
        freqHigh = !freqHigh;
        if (this.sirenOscillator && this.sirenAudioCtx) {
          this.sirenOscillator.frequency.setTargetAtTime(targetFreq, this.sirenAudioCtx.currentTime, 0.2);
        }
        this.sirenTimeout = setTimeout(modInterval, 500);
      };
      modInterval();
    } catch (e) {
      console.error('AudioContext error:', e);
    }
  }

  stopSiren() {
    this.isSirenPlaying = false;
    if (this.sirenTimeout) clearTimeout(this.sirenTimeout);
    if (this.sirenOscillator) {
      try {
        this.sirenOscillator.stop();
        this.sirenOscillator.disconnect();
      } catch (e) {}
    }
    if (this.sirenAudioCtx) {
      try {
        this.sirenAudioCtx.close();
      } catch (e) {}
    }
  }

  updateSirenButtons() {
    const btn = document.getElementById('overlay-siren-btn');
    if (btn) {
      btn.innerHTML = `<span class="text-xl">📢</span> <span>${this.isSirenPlaying ? 'Stop Siren' : 'Play Siren Buzzer'}</span>`;
      btn.className = this.isSirenPlaying
        ? 'bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg animate-pulse'
        : 'bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition';
    }
  }

  toggleStrobe() {
    this.isStrobeActive = !this.isStrobeActive;
    let strobeEl = document.getElementById('visual-strobe-overlay');

    if (this.isStrobeActive) {
      if (!strobeEl) {
        strobeEl = document.createElement('div');
        strobeEl.id = 'visual-strobe-overlay';
        strobeEl.className = 'fixed inset-0 pointer-events-none z-40 transition-colors duration-100 opacity-40';
        document.body.appendChild(strobeEl);
      }
      let red = true;
      this.strobeInterval = setInterval(() => {
        strobeEl.style.backgroundColor = red ? '#dc2626' : '#2563eb';
        red = !red;
      }, 180);
    } else {
      if (this.strobeInterval) clearInterval(this.strobeInterval);
      if (strobeEl) strobeEl.remove();
    }

    const btn = document.getElementById('overlay-strobe-btn');
    if (btn) {
      btn.innerHTML = `<span class="text-xl">🚨</span> <span>${this.isStrobeActive ? 'Stop Strobe' : 'Visual Strobe'}</span>`;
    }
  }
}

// Global instance
window.emergencyManager = new EmergencyManager();
