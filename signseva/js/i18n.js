// SIGNSEVA Internationalization (i18n) Module
// Supports English, Hindi (हिंदी), and Tamil (தமிழ்)

const translations = {
  en: {
    appTitle: "SIGNSEVA",
    appSubtitle: "AI-Powered Assistive Communication System",
    themeBadge: "Swasth & Samavesh Bharat",
    teamBadge: "Team CodeCure | HIT",
    
    // Navigation Tabs
    tabSignAI: "AI Sign Recognition",
    tabTwoWay: "Two-Way Speech/Text",
    tabVisualGuide: "Visual Sign Guide",
    tabEmergency: "Emergency SOS",
    tabScenarios: "Sector Scenarios",
    tabTeam: "Project Info",

    // Sign Recognition
    cameraStart: "Start Camera",
    cameraStop: "Stop Camera",
    cameraSwitch: "Flip Camera",
    cameraTip: "Position your hand clearly within the camera frame. Ensure good lighting.",
    detectedGesture: "Detected Gesture",
    confidence: "Confidence",
    speakAloud: "Speak Out Loud",
    addToMessage: "Add to Sentence",
    clearText: "Clear Text",
    composedSentence: "Composed Message",
    unsupportedGesture: "No supported gesture detected or confidence low.",
    gestureSimulator: "Test with Gesture Simulator",
    simulatorHelp: "Camera not available? Click any gesture below to simulate recognition:",

    // Two-Way Communication
    twoWayTitle: "Two-Way Communication Hub",
    twoWayDesc: "Bridges the gap between Deaf individuals and hearing people using Speech-to-Text and Text-to-Speech.",
    hearingPersonSpeaks: "Hearing Person (Tap & Speak)",
    startListening: "Start Microphone",
    stopListening: "Listening... (Tap to Stop)",
    spokenTextPlaceholder: "Spoken words will appear here in real-time...",
    deafPersonReplies: "Deaf Person (Type or Use Signs)",
    replyPlaceholder: "Type your message or use detected signs above...",
    sendAndSpeak: "Send & Speak Aloud",
    quickResponses: "Quick Common Responses",
    
    // Visual Guide
    visualGuideTitle: "Visual Sign Language Guidance",
    visualGuideDesc: "Search or browse verified sign language animations, illustrations and step-by-step hand guides.",
    searchSigns: "Search signs (e.g. Doctor, Water, Help, Thank You)...",
    categoryAll: "All Signs",
    categoryMedical: "Medical & Health",
    categoryEmergency: "Emergency",
    categoryDaily: "Daily & Social",
    categoryEducation: "College & Learning",

    // Emergency SOS
    sosTitle: "Emergency Communication Mode",
    sosSubtitle: "Immediate assistance without spoken words. Instant GPS sharing & alerts.",
    medicalHelp: "Medical Emergency",
    medicalHelpDesc: "I have a severe medical problem. Need doctor / ambulance immediately.",
    policeHelp: "Police Assistance",
    policeHelpDesc: "I am in danger or crime occurred. Please call the police now.",
    dangerHelp: "Accident / Danger",
    dangerHelpDesc: "Accident or fire hazard! Urgent rescue needed.",
    generalHelp: "I Need Help",
    generalHelpDesc: "I am speech/hearing impaired. I need immediate local assistance.",
    shareLocationWhatsapp: "Share SOS via WhatsApp",
    sendSmsSos: "Send Emergency SMS",
    triggerSiren: "Sound Audible Siren",
    stopSiren: "Stop Siren",
    strobeFlash: "Visual Emergency Strobe",
    gpsStatus: "GPS Location Status",
    gpsFetching: "Fetching exact GPS coordinates...",
    gpsReady: "GPS Ready",
    contactsTitle: "Emergency Trusted Contacts",
    addContact: "Add Emergency Contact",
    contactName: "Contact Name",
    contactPhone: "Phone Number",
    saveContact: "Save Contact",

    // Scenarios
    scenariosTitle: "Everyday Public Scenarios",
    scenariosSubtitle: "Pre-crafted communication cards for hospitals, police stations, colleges, and public offices.",
    hospitalTab: "Hospital & Clinic",
    policeTab: "Police & Safety",
    collegeTab: "College / HIT",
    publicOfficeTab: "Public Office",

    // Accessibility
    highContrast: "High Contrast",
    largeText: "Large Text",
    soundEnabled: "Voice TTS Active"
  },

  hi: {
    appTitle: "साइनसेवा (SIGNSEVA)",
    appSubtitle: "एआई-संचालित समावेशी संचार प्रणाली",
    themeBadge: "स्वस्थ एवं समावेश भारत",
    teamBadge: "टीम कोडक्योर | HIT",

    tabSignAI: "एआई संकेत पहचान",
    tabTwoWay: "दो-तरफा वाक / पाठ",
    tabVisualGuide: "दृश्य संकेत मार्गदर्शिका",
    tabEmergency: "आपातकालीन SOS",
    tabScenarios: "सार्वजनिक परिदृश्य",
    tabTeam: "परियोजना विवरण",

    cameraStart: "कैमरा शुरू करें",
    cameraStop: "कैमरा रोकें",
    cameraSwitch: "कैमरा बदलें",
    cameraTip: "अपने हाथ को कैमरे के फ्रेम में रखें। रोशनी पर्याप्त होनी चाहिए।",
    detectedGesture: "पहचाना गया संकेत",
    confidence: "सटीकता",
    speakAloud: "आवाज में बोलें",
    addToMessage: "वाक्य में जोड़ें",
    clearText: "हटाएं",
    composedSentence: "तैयार संदेश",
    unsupportedGesture: "कोई मान्य संकेत नहीं मिला या स्पष्टता कम है।",
    gestureSimulator: "संकेत सिम्युलेटर से परीक्षण करें",
    simulatorHelp: "कैमरा उपलब्ध नहीं है? परीक्षण हेतु नीचे किसी भी संकेत पर क्लिक करें:",

    twoWayTitle: "दो-तरफा संचार केंद्र",
    twoWayDesc: "मूक-बधिर और सामान्य लोगों के बीच संवाद को सुगम बनाता है।",
    hearingPersonSpeaks: "सामान्य व्यक्ति (माइक दबाकर बोलें)",
    startListening: "माइक शुरू करें",
    stopListening: "सुन रहा है... (रोकने के लिए दबाएं)",
    spokenTextPlaceholder: "बोले गए शब्द यहां तुरंत दिखाई देंगे...",
    deafPersonReplies: "मूक-बधिर व्यक्ति का उत्तर",
    replyPlaceholder: "अपना संदेश टाइप करें या संकेतों का उपयोग करें...",
    sendAndSpeak: "भेजें और बोलकर सुनाएं",
    quickResponses: "त्वरित उत्तर",

    visualGuideTitle: "दृश्य संकेत भाषा निर्देशिका",
    visualGuideDesc: "मान्यता प्राप्त सांकेतिक भाषा के चित्र एवं चरणबद्ध निर्देश देखें।",
    searchSigns: "संकेत खोजें (जैसे डॉक्टर, पानी, मदद)...",
    categoryAll: "सभी संकेत",
    categoryMedical: "स्वास्थ्य एवं चिकित्सा",
    categoryEmergency: "आपातकालीन",
    categoryDaily: "दैनिक वार्तालाप",
    categoryEducation: "कॉलेज एवं शिक्षा",

    sosTitle: "आपातकालीन संचार मोड (SOS)",
    sosSubtitle: "बिना बोले तत्काल सहायता प्राप्त करें। लाइव जीपीएस शेयरिंग उपलब्ध।",
    medicalHelp: "चिकित्सा आपातकाल",
    medicalHelpDesc: "गंभीर स्वास्थ्य समस्या है। तत्काल डॉक्टर/एम्बुलेंस की आवश्यकता है।",
    policeHelp: "पुलिस सहायता",
    policeHelpDesc: "मैं खतरे में हूं या कोई अपराध हुआ है। कृपया पुलिस को बुलाएं।",
    dangerHelp: "दुर्घटना / खतरा",
    dangerHelpDesc: "दुर्घटना या आग का खतरा! तत्काल सहायता चाहिए।",
    generalHelp: "मुझे सहायता चाहिए",
    generalHelpDesc: "मैं मूक-बधिर हूं। मुझे तत्काल सहायता की आवश्यकता है।",
    shareLocationWhatsapp: "व्हाट्सएप पर SOS भेजें",
    sendSmsSos: "एसएमएस SOS भेजें",
    triggerSiren: "अलार्म सायरन बजाएं",
    stopSiren: "सायरन बंद करें",
    strobeFlash: "फ्लैशर लाइट",
    gpsStatus: "जीपीएस स्थान स्थिति",
    gpsFetching: "जीपीएस स्थान प्राप्त किया जा रहा है...",
    gpsReady: "जीपीएस तैयार",
    contactsTitle: "विश्वसनीय आपातकालीन संपर्क",
    addContact: "संपर्क जोड़ें",
    contactName: "संपर्क नाम",
    contactPhone: "फ़ोन नंबर",
    saveContact: "सहेजें",

    scenariosTitle: "दैनिक सार्वजनिक परिदृश्य",
    scenariosSubtitle: "अस्पताल, पुलिस स्टेशन, कॉलेज और सरकारी कार्यालयों के लिए उपयोगी कार्ड।",
    hospitalTab: "अस्पताल और क्लिनिक",
    policeTab: "पुलिस और सुरक्षा",
    collegeTab: "कॉलेज / शिक्षा",
    publicOfficeTab: "सार्वजनिक कार्यालय",

    highContrast: "उच्च कंट्रास्ट",
    largeText: "बड़ा फ़ॉन्ट",
    soundEnabled: "आवाज सक्रिय"
  },

  ta: {
    appTitle: "சைன்சேவா (SIGNSEVA)",
    appSubtitle: "செயற்கை நுண்ணறிவு சைகை மொழி தொடர்பு தளம்",
    themeBadge: "ஸ்வஸ்த் & சமவேஷ் பாரத்",
    teamBadge: "குழு CodeCure | HIT",

    tabSignAI: "AI சைகை உணர்தல்",
    tabTwoWay: "இருவழி பேச்சு / உரை",
    tabVisualGuide: "சைகை வழிகாட்டி",
    tabEmergency: "அவசர உதவி SOS",
    tabScenarios: "பொது இட தேவைகள்",
    tabTeam: "திட்ட விவரம்",

    cameraStart: "கேமராவை தொடங்கு",
    cameraStop: "கேமராவை நிறுத்து",
    cameraSwitch: "கேமராவை மாற்று",
    cameraTip: "உங்கள் கையை கேமராவில் தெளிவாகக் காட்டவும். வெளிச்சம் போதுமானதாக இருக்கட்டும்.",
    detectedGesture: "கண்டறியப்பட்ட சைகை",
    confidence: "துல்லியம்",
    speakAloud: "குரலில் ஒலி",
    addToMessage: "வாக்கியத்தில் சேர்",
    clearText: "அழி",
    composedSentence: "உருவாக்கப்பட்ட செய்தி",
    unsupportedGesture: "ஆதரிக்கப்படும் சைகை எதுவும் கண்டறியப்படவில்லை.",
    gestureSimulator: "சைகை சிமுலேட்டர் சோதனை",
    simulatorHelp: "கேமரா இல்லையா? சோதிக்க கீழேயுள்ள சைகைகளில் ஏதேனும் ஒன்றை கிளிக் செய்யவும்:",

    twoWayTitle: "இருவழி தொடர்பு தளம்",
    twoWayDesc: "பேச்சு குறைபாடுடையவர்களுக்கும் மற்றவர்களுக்கும் இடையே தடையற்ற உரையாடல்.",
    hearingPersonSpeaks: "கேட்கும் நபர் (மைக் அழுத்தி பேசவும்)",
    startListening: "மைக் தொடங்கு",
    stopListening: "கேட்கிறது... (நிறுத்த அழுத்தவும்)",
    spokenTextPlaceholder: "பேசப்படும் வார்த்தைகள் இங்கே உடனே தோன்றும்...",
    deafPersonReplies: "பதில் அளிக்கவும் (தட்டச்சு அல்லது சைகை)",
    replyPlaceholder: "உங்கள் பதிலை தட்டச்சு செய்யவும்...",
    sendAndSpeak: "அனுப்பி குரலாக ஒலி",
    quickResponses: "விரைவான பதில்கள்",

    visualGuideTitle: "காட்சி சைகை மொழி வழிகாட்டி",
    visualGuideDesc: "அங்கீகரிக்கப்பட்ட இந்திய சைகை மொழி வழிகாட்டிகள் மற்றும் அனிமேஷன்.",
    searchSigns: "சைகைகளைத் தேடுங்கள் (எ.கா. மருத்துவர், உதவி, தண்ணீர்)...",
    categoryAll: "அனைத்து சைகைகள்",
    categoryMedical: "மருத்துவம் & நலம்",
    categoryEmergency: "அவசரம்",
    categoryDaily: "தினசரி தேவைகள்",
    categoryEducation: "கல்லூரி / கல்வி",

    sosTitle: "அவசர கால தொடர்பு முறை (SOS)",
    sosSubtitle: "பேச முடியாத நிலையிலும் உடனடி உதவி. நேரடி GPS பகிர்வு மற்றும் எச்சரிக்கை.",
    medicalHelp: "மருத்துவ அவசரம்",
    medicalHelpDesc: "எனக்கு தீவிர மருத்துவ உதவி தேவை. உடனடியாக மருத்துவர்/ஆம்புலன்ஸ் வேண்டும்.",
    policeHelp: "காவல்துறை உதவி",
    policeHelpDesc: "நான் ஆபத்தில் உள்ளேன். உடனடியாக காவல்துறையை அழைக்கவும்.",
    dangerHelp: "விபத்து / ஆபத்து",
    dangerHelpDesc: "விபத்து அல்லது தீ விபத்து! அவசர மீட்பு தேவை.",
    generalHelp: "எனக்கு உதவி தேவை",
    generalHelpDesc: "எனக்கு பேச/கேட்க இயலாது. உடனடி உள்ளூர் உதவி தேவை.",
    shareLocationWhatsapp: "வாட்ஸ்அப் வழி SOS பகிர்",
    sendSmsSos: "SMS மூலம் SOS அனுப்பு",
    triggerSiren: "அவசர எச்சரிக்கை ஒலி",
    stopSiren: "ஒலியை நிறுத்து",
    strobeFlash: "எச்சரிக்கை ஒளி",
    gpsStatus: "GPS இருப்பிட நிலை",
    gpsFetching: "இருப்பிடம் பெறப்படுகிறது...",
    gpsReady: "GPS தயாராக உள்ளது",
    contactsTitle: "அவசர தொடர்பு எண்கள்",
    addContact: "தொடர்பு எண் சேர்",
    contactName: "பெயர்",
    contactPhone: "தொலைபேசி எண்",
    saveContact: "சேமிக்கவும்",

    scenariosTitle: "அன்றாட பொது இட தேவைகள்",
    scenariosSubtitle: "மருத்துவமனை, காவல் நிலையம், கல்லூரி மற்றும் அரசு அலுவலகங்களுக்கான அட்டைகள்.",
    hospitalTab: "மருத்துவமனை",
    policeTab: "காவல் நிலையம்",
    collegeTab: "கல்லூரி / HIT",
    publicOfficeTab: "அரசு அலுவலகம்",

    highContrast: "அதிக மாறுபட்ட நிறம்",
    largeText: "பெரிய எழுத்து",
    soundEnabled: "குரல் ஒலி இயக்கத்தில் உள்ளது"
  }
};

var currentLanguage = 'en';
window.currentLanguage = currentLanguage;
window.translations = translations;

function setLanguage(lang) {
  if (translations[lang]) {
    currentLanguage = lang;
    window.currentLanguage = lang;
    try {
      localStorage.setItem('signseva_language', lang);
    } catch (e) {}
    if (document.documentElement) {
      document.documentElement.lang = lang;
    }
    applyTranslations();
  }
}
window.setLanguage = setLanguage;

function t(key) {
  return (translations[currentLanguage] && translations[currentLanguage][key]) ||
         (translations['en'] && translations['en'][key]) || key;
}
window.t = t;

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key && translations[currentLanguage] && translations[currentLanguage][key]) {
      el.textContent = translations[currentLanguage][key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key && translations[currentLanguage] && translations[currentLanguage][key]) {
      el.placeholder = translations[currentLanguage][key];
    }
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (key && translations[currentLanguage] && translations[currentLanguage][key]) {
      el.title = translations[currentLanguage][key];
    }
  });

  // Dispatch custom event so other modules can react
  try {
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: currentLanguage } }));
  } catch (e) {}
}
window.applyTranslations = applyTranslations;

// Initialize saved language
function initI18n() {
  let savedLang = 'en';
  try {
    savedLang = localStorage.getItem('signseva_language') || 'en';
  } catch (e) {}
  setLanguage(savedLang);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initI18n);
} else {
  initI18n();
}
