// SIGNSEVA Visual Sign Language Guidance & Interactive Dictionary
// Contains verified Indian Sign Language (ISL) guidance with SVG illustrations and step-by-step instructions

const signDictionary = [
  {
    id: "help",
    title: "Help / Assistance",
    titleHi: "मदद / सहायता",
    titleTa: "உதவி",
    category: "emergency",
    icon: "🆘",
    signAnimation: "lift-up",
    difficulty: "Basic",
    descriptionEn: "Place closed fist with thumb up on top of flat palm of the non-dominant hand, then lift both hands upward together.",
    descriptionHi: "एक हथेली पर दूसरे हाथ का अंगूठा ऊपर रखते हुए दोनों हाथों को धीरे-धीरे ऊपर उठाएं।",
    descriptionTa: "ஒரு உள்ளங்கையின் மீது மற்றொரு கையின் கட்டைவிரலை வைத்து, இரு கைகளையும் ஒன்றாக மேலே உயர்த்தவும்.",
    keywords: ["help", "assist", "emergency", "save", "sos", "मदद", "உதவி"],
    svg: `<svg viewBox="0 0 200 200" class="w-full h-full">
      <defs>
        <linearGradient id="handGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#2563eb"/>
        </linearGradient>
      </defs>
      <!-- Base supporting hand -->
      <path d="M 40 140 Q 90 140 160 135 Q 165 145 150 155 Q 80 160 40 155 Z" fill="#64748b" opacity="0.8"/>
      <!-- Active fist with thumb pointing up -->
      <path d="M 90 135 C 85 105 85 85 95 65 C 105 60 115 70 112 85 C 118 85 125 90 125 100 C 128 102 132 108 130 118 C 128 128 115 135 90 135 Z" fill="url(#handGrad1)"/>
      <path d="M 95 65 Q 98 40 106 40 Q 112 40 112 60" fill="none" stroke="#38bdf8" stroke-width="8" stroke-linecap="round"/>
      <!-- Upward motion arrows -->
      <path d="M 155 90 L 155 50 M 150 60 L 155 50 L 160 60" fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M 45 90 L 45 50 M 40 60 L 45 50 L 50 60" fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: "doctor",
    title: "Doctor / Medical Help",
    titleHi: "डॉक्टर / चिकित्सा",
    titleTa: "மருத்துவர்",
    category: "medical",
    icon: "👨‍⚕️",
    signAnimation: "pulse-wrist",
    difficulty: "Basic",
    descriptionEn: "Tap the tips of your bent index and middle fingers lightly onto the radial pulse side of your opposite wrist twice.",
    descriptionHi: "अपनी तर्जनी और मध्यमा उंगलियों को दूसरे हाथ की कलाई की नाड़ी पर दो बार हल्के से स्पर्श करें।",
    descriptionTa: "உங்கள் ஆள்காட்டி மற்றும் நடுவிரல்களின் நுனிகளை மற்றொரு கையின் மணிக்கட்டு பகுதியில் இருமுறை மெதுவாக தொடவும்.",
    keywords: ["doctor", "hospital", "clinic", "medical", "pulse", "डॉक्टर", "மருத்துவர்"],
    svg: `<svg viewBox="0 0 200 200" class="w-full h-full">
      <defs>
        <linearGradient id="docGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#10b981"/>
          <stop offset="100%" stop-color="#059669"/>
        </linearGradient>
      </defs>
      <!-- Arm and wrist -->
      <path d="M 30 130 Q 80 125 150 125 Q 160 145 140 150 Q 80 148 30 150 Z" fill="#64748b" opacity="0.8"/>
      <!-- Two checking fingers on wrist -->
      <path d="M 105 50 L 105 125 M 120 55 L 120 125" stroke="url(#docGrad)" stroke-width="12" stroke-linecap="round"/>
      <!-- Pulse ripples -->
      <circle cx="112" cy="125" r="14" fill="none" stroke="#34d399" stroke-width="2" stroke-dasharray="3,3"/>
      <circle cx="112" cy="125" r="22" fill="none" stroke="#34d399" stroke-width="1.5" stroke-dasharray="4,4"/>
      <!-- Red Cross Badge -->
      <rect x="15" y="15" width="30" height="30" rx="6" fill="#ef4444"/>
      <rect x="27" y="20" width="6" height="20" fill="white"/>
      <rect x="20" y="27" width="20" height="6" fill="white"/>
    </svg>`
  },
  {
    id: "water",
    title: "Water / Thirst",
    titleHi: "पानी / प्यास",
    titleTa: "தண்ணீர் / தாகம்",
    category: "daily",
    icon: "💧",
    signAnimation: "tap-chin",
    difficulty: "Basic",
    descriptionEn: "Form a 'W' shape with three fingers (index, middle, ring extended) and tap the index finger against your chin twice.",
    descriptionHi: "तीन उंगलियों से 'W' का आकार बनाएं और तर्जनी उंगली को अपनी ठुड्डी पर दो बार हल्के से स्पर्श करें।",
    descriptionTa: "மூன்று விரல்களால் 'W' வடிவத்தை உருவாக்கி, ஆள்காட்டி விரலை உங்கள் கன்னத்தில் இருமுறை தொடவும்.",
    keywords: ["water", "drink", "thirsty", "fluid", "पानी", "தண்ணீர்"],
    svg: `<svg viewBox="0 0 200 200" class="w-full h-full">
      <!-- 3 finger W shape -->
      <path d="M 75 140 L 75 60 M 100 140 L 100 50 M 125 140 L 125 60" stroke="#38bdf8" stroke-width="12" stroke-linecap="round"/>
      <!-- Folded thumb & pinky -->
      <circle cx="58" cy="120" r="12" fill="#0284c7"/>
      <circle cx="142" cy="125" r="10" fill="#0284c7"/>
      <!-- Water droplet -->
      <path d="M 160 50 C 160 35 150 20 150 20 C 150 20 140 35 140 50 C 140 60 150 65 150 65 C 150 65 160 60 160 50 Z" fill="#06b6d4"/>
      <!-- Tap motion indicator -->
      <path d="M 60 45 Q 75 35 85 45" fill="none" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "police",
    title: "Police / Safety",
    titleHi: "पुलिस / सुरक्षा",
    titleTa: "காவல்துறை",
    category: "emergency",
    icon: "🚓",
    signAnimation: "badge-salute",
    difficulty: "Basic",
    descriptionEn: "Touch a 'C' shaped hand to the upper left chest (where police badge sits) or salute flat hand to forehead.",
    descriptionHi: "हाथ को 'C' आकार में अपनी बाईं छाती (पुलिस बैज की जगह) पर स्पर्श करें या माथे पर सलामी दें।",
    descriptionTa: "கையை 'C' வடிவில் உங்கள் இடது நெஞ்சில் (காவல் பேட்ஜ் பகுதி) வைக்கவும் அல்லது நெற்றியில் சல்யூட் செய்யவும்.",
    keywords: ["police", "cop", "emergency", "crime", "thief", "पुलिस", "காவல்துறை"],
    svg: `<svg viewBox="0 0 200 200" class="w-full h-full">
      <!-- Police Shield badge -->
      <path d="M 100 30 Q 145 30 145 75 Q 145 130 100 165 Q 55 130 55 75 Q 55 30 100 30 Z" fill="#1e3a8a" stroke="#60a5fa" stroke-width="4"/>
      <!-- Star in badge -->
      <polygon points="100,60 106,78 124,78 110,89 115,107 100,96 85,107 90,89 76,78 94,78" fill="#fbbf24"/>
      <!-- Salute gesture indication -->
      <path d="M 130 50 Q 165 40 175 65" fill="none" stroke="#f87171" stroke-width="4" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "pain",
    title: "Pain / Hurt / Injured",
    titleHi: "दर्द / चोट लगी है",
    titleTa: "வலி / காயம்",
    category: "medical",
    icon: "⚡",
    signAnimation: "twisting-fingers",
    difficulty: "Intermediate",
    descriptionEn: "Point index fingers toward each other with fingertips almost touching, twist hands back and forth near the painful area.",
    descriptionHi: "दोनों तर्जनी उंगलियों को एक-दूसरे की ओर रखें और दर्द वाले हिस्से के पास दोनों हाथों को विपरीत दिशा में घुमाएं।",
    descriptionTa: "இரு ஆள்காட்டி விரல்களையும் ஒன்றையொன்று நோக்கி வைத்து, வலி இருக்கும் இடத்தின் அருகே கைகளை அசைக்கவும்.",
    keywords: ["pain", "hurt", "ache", "injury", "sick", "wound", "दर्द", "வலி"],
    svg: `<svg viewBox="0 0 200 200" class="w-full h-full">
      <!-- Two index fingers pointing towards each other -->
      <path d="M 40 100 L 85 100" stroke="#f43f5e" stroke-width="12" stroke-linecap="round"/>
      <path d="M 160 100 L 115 100" stroke="#f43f5e" stroke-width="12" stroke-linecap="round"/>
      <!-- Pain lightning sparks -->
      <path d="M 100 70 L 93 95 L 105 95 L 98 120" stroke="#fbbf24" stroke-width="4" fill="none" stroke-linejoin="round"/>
      <circle cx="100" cy="100" r="18" fill="none" stroke="#f43f5e" stroke-width="2" stroke-dasharray="4,4"/>
    </svg>`
  },
  {
    id: "thank_you",
    title: "Thank You / Gratitude",
    titleHi: "धन्यवाद",
    titleTa: "நன்றி",
    category: "daily",
    icon: "🙏",
    signAnimation: "forward-chin",
    difficulty: "Basic",
    descriptionEn: "Touch the fingers of your flat, open dominant hand to your chin/lips, then extend your hand forward toward the other person.",
    descriptionHi: "हथेली की उंगलियों को अपने होठों या ठुड्डी पर स्पर्श करें, फिर हाथ को सामने वाले व्यक्ति की ओर आगे बढ़ाएं।",
    descriptionTa: "உங்கள் விரல்களை உதடு/கன்னத்தில் வைத்து, பின்னர் கையை மற்றவரை நோக்கி நேராக முன்னோக்கி நீட்டவும்.",
    keywords: ["thank", "thanks", "gratitude", "welcome", "धन्यवाद", "நன்றி"],
    svg: `<svg viewBox="0 0 200 200" class="w-full h-full">
      <!-- Flat hand moving forward -->
      <path d="M 80 130 C 75 100 80 70 95 60 C 105 55 115 65 115 80 C 120 70 130 75 130 90 C 135 85 145 90 140 110 C 138 125 125 140 90 145 Z" fill="#818cf8"/>
      <!-- Forward motion arrow -->
      <path d="M 130 140 Q 160 140 180 115 M 175 130 L 180 115 L 165 112" fill="none" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="100" cy="40" r="8" fill="#fbbf24"/>
    </svg>`
  },
  {
    id: "yes",
    title: "Yes / Agreed",
    titleHi: "हाँ / सहमत",
    titleTa: "ஆம் / சரி",
    category: "daily",
    icon: "👍",
    signAnimation: "nodding-fist",
    difficulty: "Basic",
    descriptionEn: "Make a closed fist (or thumbs up) and tilt your wrist up and down, mimicking a head nodding yes.",
    descriptionHi: "मुट्ठी बांधकर कलाई को ऊपर-नीचे हिलाएं, जैसे सिर हिलाकर 'हाँ' कह रहे हों।",
    descriptionTa: "கையை மூடி முஷ்டியாக்கி, தலை ஆட்டுவது போல மணிக்கட்டை மேலும் கீழும் அசைக்கவும்.",
    keywords: ["yes", "agree", "ok", "sure", "हाँ", "ஆம்"],
    svg: `<svg viewBox="0 0 200 200" class="w-full h-full">
      <!-- Thumbs up fist -->
      <path d="M 70 140 C 65 120 70 100 85 95 C 80 80 85 50 98 45 C 108 45 108 70 105 85 C 120 85 135 90 135 105 C 135 120 120 140 85 145 Z" fill="#22c55e"/>
      <!-- Nodding arrows -->
      <path d="M 145 60 Q 160 80 145 100 M 155 70 L 145 60 L 140 75" fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
  },
  {
    id: "no",
    title: "No / Disagree",
    titleHi: "नहीं / मना करना",
    titleTa: "இல்லை / மறுப்பு",
    category: "daily",
    icon: "🙅",
    signAnimation: "wag-finger",
    difficulty: "Basic",
    descriptionEn: "Extend index finger upright and gently wave it side to side, or snap index and middle fingers down onto the thumb.",
    descriptionHi: "तर्जनी उंगली को सीधा खड़ा करके अगल-बगल हिलाएं (ना का इशारा)।",
    descriptionTa: "ஆள்காட்டி விரலை உயர்த்தி பக்கவாட்டில் அசைக்கவும் (இல்லை என்ற சைகை).",
    keywords: ["no", "never", "disagree", "not", "नहीं", "இல்லை"],
    svg: `<svg viewBox="0 0 200 200" class="w-full h-full">
      <!-- Hand with single index pointing up -->
      <path d="M 90 145 L 90 60 C 90 48 105 48 105 60 L 105 145 Z" fill="#ef4444"/>
      <!-- Curled other fingers -->
      <path d="M 75 145 C 75 120 90 115 125 115 C 135 120 135 145 105 150 Z" fill="#b91c1c"/>
      <!-- Wag side-to-side arrows -->
      <path d="M 60 55 Q 98 45 135 55 M 70 50 L 60 55 L 70 65 M 125 50 L 135 55 L 125 65" fill="none" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "classroom",
    title: "Classroom / Study (College)",
    titleHi: "कक्षा / अध्ययन (कॉलेज)",
    titleTa: "வகுப்பறை / கல்வி",
    category: "education",
    icon: "🎓",
    signAnimation: "book-open",
    difficulty: "Intermediate",
    descriptionEn: "Place palms together side by side like an open book, then form a 'C' shape with dominant hand indicating a class/group.",
    descriptionHi: "दोनों हथेलियों को खुली किताब की तरह साथ रखें, फिर क्लास या समूह दर्शाने के लिए 'C' बनाएं।",
    descriptionTa: "இரு உள்ளங்கைகளையும் திறந்த புத்தகம் போல வைத்து, பின்னர் 'C' வடிவில் வகுப்பறையைக் குறிக்கவும்.",
    keywords: ["class", "college", "study", "exam", "hit", "education", "கல்லூரி", "कक्षा"],
    svg: `<svg viewBox="0 0 200 200" class="w-full h-full">
      <!-- Graduation Cap & Book -->
      <polygon points="100,40 160,65 100,90 40,65" fill="#3b82f6"/>
      <path d="M 70 80 L 70 110 Q 100 130 130 110 L 130 80" fill="none" stroke="#1d4ed8" stroke-width="4"/>
      <!-- Open Book below -->
      <path d="M 45 145 Q 100 135 100 160 Q 100 135 155 145 L 155 125 Q 100 115 100 135 Q 100 115 45 125 Z" fill="#60a5fa"/>
    </svg>`
  },
  {
    id: "medicine",
    title: "Medicine / Tablets",
    titleHi: "दवा / गोली",
    titleTa: "மருந்து / மாத்திரை",
    category: "medical",
    icon: "💊",
    signAnimation: "crush-palm",
    difficulty: "Basic",
    descriptionEn: "Place middle finger tip into center of open palm and grind/twist in small circles like crushing a pill with a pestle.",
    descriptionHi: "खुली हथेली के बीच में दूसरे हाथ की बीच की उंगली को रखकर गोल-गोल घुमाएं (दवा पीसने जैसा)।",
    descriptionTa: "திறந்த உள்ளங்கையின் நடுவில் நடுவிரலை வைத்து மாத்திரையை அரைப்பது போல வட்டமாக சுழற்றவும்.",
    keywords: ["medicine", "tablet", "pill", "pharmacy", "drug", "दवा", "மருந்து"],
    svg: `<svg viewBox="0 0 200 200" class="w-full h-full">
      <!-- Flat palm -->
      <ellipse cx="100" cy="140" rx="55" ry="25" fill="#475569"/>
      <!-- Grinding finger -->
      <path d="M 100 60 L 100 135" stroke="#f59e0b" stroke-width="14" stroke-linecap="round"/>
      <!-- Circular motion -->
      <ellipse cx="100" cy="135" rx="20" ry="10" fill="none" stroke="#fbbf24" stroke-width="3" stroke-dasharray="4,4"/>
      <!-- Capsule badge -->
      <rect x="140" y="30" width="35" height="18" rx="9" fill="#ef4444"/>
      <rect x="157" y="30" width="18" height="18" rx="9" fill="#f8fafc"/>
    </svg>`
  }
];

class VisualSignGuide {
  constructor() {
    this.container = null;
    this.currentCategory = 'all';
    this.searchQuery = '';
  }

  init(containerEl) {
    this.container = containerEl;
    this.render();
  }

  setCategory(category) {
    this.currentCategory = category;
    this.render();
  }

  search(query) {
    this.searchQuery = (query || '').toLowerCase().trim();
    this.render();
  }

  getFilteredSigns() {
    return signDictionary.filter(sign => {
      const matchCategory = this.currentCategory === 'all' || sign.category === this.currentCategory;
      if (!matchCategory) return false;

      if (!this.searchQuery) return true;

      const titleMatch = sign.title.toLowerCase().includes(this.searchQuery) ||
                         sign.titleHi.toLowerCase().includes(this.searchQuery) ||
                         sign.titleTa.toLowerCase().includes(this.searchQuery);

      const keywordMatch = sign.keywords.some(k => k.toLowerCase().includes(this.searchQuery));
      return titleMatch || keywordMatch;
    });
  }

  render() {
    if (!this.container) return;

    const signs = this.getFilteredSigns();

    if (signs.length === 0) {
      this.container.innerHTML = `
        <div class="col-span-full text-center py-12 text-slate-400">
          <div class="text-4xl mb-3">🔍</div>
          <p class="text-lg font-medium">No matching sign found for "${this.searchQuery}"</p>
          <p class="text-sm mt-1">Try searching for "Doctor", "Water", "Help", or "Hospital"</p>
        </div>
      `;
      return;
    }

    this.container.innerHTML = signs.map(sign => {
      let title = sign.title;
      let desc = sign.descriptionEn;
      const lang = window.currentLanguage || 'en';
      if (lang === 'hi') {
        title = sign.titleHi;
        desc = sign.descriptionHi;
      } else if (lang === 'ta') {
        title = sign.titleTa;
        desc = sign.descriptionTa;
      }

      return `
        <div class="bg-slate-800/90 border border-slate-700 hover:border-blue-500 rounded-2xl p-5 shadow-lg transition-all transform hover:-translate-y-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                sign.category === 'emergency' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                sign.category === 'medical' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                sign.category === 'education' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }">
                <span>${sign.icon}</span>
                <span class="capitalize">${sign.category}</span>
              </span>
              <span class="text-xs px-2.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">${sign.difficulty}</span>
            </div>

            <!-- SVG Illustration Container -->
            <div class="w-full h-44 bg-slate-900/80 rounded-xl p-3 flex items-center justify-center border border-slate-700/50 mb-4 overflow-hidden relative group">
              ${sign.svg}
              <div class="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl"></div>
            </div>

            <h4 class="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span>${title}</span>
            </h4>
            <p class="text-slate-300 text-sm leading-relaxed mb-4">${desc}</p>
          </div>

          <div class="pt-3 border-t border-slate-700/60 flex items-center gap-2">
            <button onclick="window.speechAssistant.speak('${title.replace(/'/g, "\\'")}', currentLanguage)" aria-label="Pronounce sign ${title} aloud" class="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-100 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
              <span>Pronounce</span>
            </button>
            <button onclick="window.testSignSimulator('${sign.id.toUpperCase()}')" aria-label="Test sign ${title} in AI Gesture Simulator" class="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span>Test AI Sign</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }
}

// Global instance
window.visualSignGuide = new VisualSignGuide();

window.testSignSimulator = function(gestureKey) {
  // Switch to sign recognition tab and trigger simulator
  if (window.switchTab) {
    window.switchTab('tab-sign-ai');
  } else {
    const tabBtn = document.querySelector('[data-tab="tab-sign-ai"]');
    if (tabBtn) tabBtn.click();
  }

  if (window.gestureRecognizer) {
    window.gestureRecognizer.simulateGesture(gestureKey);
  }
};
