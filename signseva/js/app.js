// SIGNSEVA Main Application Controller
// Orchestrates AI recognition, Two-Way Chat, Sector Scenarios, Accessibility & UI State

// Global Tab Switcher (Directly callable anywhere)
window.switchTab = function(targetId) {
  const tabButtons = document.querySelectorAll('[data-tab]');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(b => {
    const isTarget = b.getAttribute('data-tab') === targetId;
    if (isTarget) {
      b.classList.add('bg-blue-600', 'text-white', 'shadow-md');
      b.classList.remove('text-slate-400', 'hover:text-slate-200', 'hover:bg-slate-800');
      b.setAttribute('aria-selected', 'true');
    } else {
      b.classList.remove('bg-blue-600', 'text-white', 'shadow-md');
      b.classList.add('text-slate-400', 'hover:text-slate-200', 'hover:bg-slate-800');
      b.setAttribute('aria-selected', 'false');
    }
  });

  tabPanels.forEach(panel => {
    if (panel.id === targetId) {
      panel.classList.remove('hidden');
      panel.style.display = 'block';
      panel.classList.add('animate-fade-in');
    } else {
      panel.classList.add('hidden');
      panel.style.display = 'none';
      panel.classList.remove('animate-fade-in');
    }
  });

  // Re-render submodules if their tab was opened
  try {
    if (targetId === 'tab-visual-guide' && window.visualSignGuide) {
      window.visualSignGuide.render();
    } else if (targetId === 'tab-emergency' && window.emergencyManager) {
      window.emergencyManager.updateGpsDisplay();
      if (window.contactsManager) window.contactsManager.renderContacts();
    }
  } catch (e) {
    console.warn('Tab transition hook note:', e);
  }
};

function initApp() {
  // Bind Tab Click Handlers
  const tabButtons = document.querySelectorAll('[data-tab]');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      if (targetId) window.switchTab(targetId);
    });
  });

  // Ensure initial active tab display
  window.switchTab('tab-sign-ai');

  // Language Dropdown
  const langSelect = document.getElementById('language-selector');
  if (langSelect) {
    langSelect.value = localStorage.getItem('signseva_language') || 'en';
    langSelect.addEventListener('change', (e) => {
      if (window.setLanguage) window.setLanguage(e.target.value);
    });
  }

  // Accessibility Toggles
  const contrastToggle = document.getElementById('toggle-high-contrast');
  if (contrastToggle) {
    contrastToggle.addEventListener('click', () => {
      document.body.classList.toggle('high-contrast');
      const isHigh = document.body.classList.contains('high-contrast');
      try { localStorage.setItem('signseva_high_contrast', isHigh); } catch (e) {}
      contrastToggle.classList.toggle('bg-amber-400', isHigh);
      contrastToggle.classList.toggle('text-black', isHigh);
      contrastToggle.setAttribute('aria-pressed', isHigh.toString());
    });
    try {
      if (localStorage.getItem('signseva_high_contrast') === 'true') {
        document.body.classList.add('high-contrast');
        contrastToggle.classList.add('bg-amber-400', 'text-black');
        contrastToggle.setAttribute('aria-pressed', 'true');
      }
    } catch (e) {}
  }

  const textSizeToggle = document.getElementById('toggle-large-text');
  if (textSizeToggle) {
    textSizeToggle.addEventListener('click', () => {
      document.body.classList.toggle('large-text');
      const isLarge = document.body.classList.contains('large-text');
      try { localStorage.setItem('signseva_large_text', isLarge); } catch (e) {}
      textSizeToggle.classList.toggle('bg-blue-500', isLarge);
      textSizeToggle.classList.toggle('text-white', isLarge);
      textSizeToggle.setAttribute('aria-pressed', isLarge.toString());
    });
    try {
      if (localStorage.getItem('signseva_large_text') === 'true') {
        document.body.classList.add('large-text');
        textSizeToggle.classList.add('bg-blue-500', 'text-white');
        textSizeToggle.setAttribute('aria-pressed', 'true');
      }
    } catch (e) {}
  }

  // Initialize Gesture Recognition Elements
  initGestureUI();

  // Initialize Two-Way Chat
  try { initTwoWayChat(); } catch (e) { console.error('Two-way chat init error:', e); }

  // Initialize Sector Scenarios
  try { initScenarios(); } catch (e) { console.error('Scenarios init error:', e); }

  // Initialize Visual Signs Guide
  try { initVisualGuide(); } catch (e) { console.error('Visual guide init error:', e); }

  // Initialize Emergency Contacts
  try { initContactsUI(); } catch (e) { console.error('Contacts UI init error:', e); }
}

function initGestureUI() {
  const videoEl = document.getElementById('webcam-video');
  const canvasEl = document.getElementById('webcam-canvas');
  const cameraToggleBtn = document.getElementById('btn-camera-toggle');
  const cameraFlipBtn = document.getElementById('btn-camera-flip');
  const autoSpeakToggle = document.getElementById('toggle-auto-speak');
  const detectedGestureText = document.getElementById('detected-gesture-text');
  const gestureConfidenceBadge = document.getElementById('gesture-confidence-badge');
  const gestureIconBadge = document.getElementById('gesture-icon-badge');
  const gestureDescText = document.getElementById('gesture-desc-text');
  const addGestureBtn = document.getElementById('btn-add-gesture');
  const composedTextBox = document.getElementById('composed-message-input');
  const speakComposedBtn = document.getElementById('btn-speak-composed');
  const clearComposedBtn = document.getElementById('btn-clear-composed');

  const handleGestureDetected = (gestureKey, confidence, info) => {
    if (gestureKey && info) {
      if (detectedGestureText) detectedGestureText.textContent = info.displayName;
      if (gestureConfidenceBadge) {
        gestureConfidenceBadge.textContent = `${confidence}% Match`;
        gestureConfidenceBadge.className = 'px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse';
      }
      if (gestureIconBadge) gestureIconBadge.textContent = info.icon;
      if (gestureDescText) gestureDescText.textContent = info.desc;
      if (addGestureBtn) addGestureBtn.disabled = false;
    } else {
      if (detectedGestureText) detectedGestureText.textContent = (window.t ? window.t('unsupportedGesture') : 'No gesture detected.');
      if (gestureConfidenceBadge) {
        gestureConfidenceBadge.textContent = 'Scanning...';
        gestureConfidenceBadge.className = 'px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700';
      }
      if (gestureIconBadge) gestureIconBadge.textContent = '🖐️';
      if (gestureDescText) gestureDescText.textContent = 'Position your hand clearly facing the camera.';
      if (addGestureBtn) addGestureBtn.disabled = true;
    }
  };

  if (window.gestureRecognizer) {
    window.gestureRecognizer.init(videoEl, canvasEl, handleGestureDetected);
  }

  if (cameraToggleBtn) {
    cameraToggleBtn.addEventListener('click', async () => {
      if (!window.gestureRecognizer) return;

      if (window.gestureRecognizer.isRunning) {
        window.gestureRecognizer.stopCamera();
        cameraToggleBtn.innerHTML = `
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
          <span>Start Camera</span>
        `;
        cameraToggleBtn.className = 'flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg transition';
      } else {
        cameraToggleBtn.innerHTML = `
          <svg class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
          <span>Starting Camera...</span>
        `;
        const ok = await window.gestureRecognizer.startCamera();
        if (ok) {
          cameraToggleBtn.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/></svg>
            <span>Stop Camera</span>
          `;
          cameraToggleBtn.className = 'flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold shadow-lg transition';
        } else {
          cameraToggleBtn.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            <span>Start Camera</span>
          `;
        }
      }
    });
  }

  if (cameraFlipBtn && window.gestureRecognizer) {
    cameraFlipBtn.addEventListener('click', () => {
      window.gestureRecognizer.flipCamera();
    });
  }

  if (autoSpeakToggle && window.gestureRecognizer) {
    autoSpeakToggle.addEventListener('change', (e) => {
      window.gestureRecognizer.autoSpeak = e.target.checked;
    });
  }

  if (addGestureBtn && composedTextBox) {
    addGestureBtn.addEventListener('click', () => {
      if (window.gestureRecognizer && window.gestureRecognizer.currentGesture) {
        const info = window.gestureRecognizer.getGestureInfo(window.gestureRecognizer.currentGesture);
        if (info) {
          const current = composedTextBox.value.trim();
          composedTextBox.value = current ? `${current} ${info.displayName}` : info.displayName;
        }
      }
    });
  }

  if (speakComposedBtn && composedTextBox) {
    speakComposedBtn.addEventListener('click', () => {
      const text = composedTextBox.value.trim();
      if (text && window.speechAssistant) {
        window.speechAssistant.speak(text, window.currentLanguage || 'en');
      }
    });
  }

  if (clearComposedBtn && composedTextBox) {
    clearComposedBtn.addEventListener('click', () => {
      composedTextBox.value = '';
    });
  }
}

// Two-Way Chat Controller
function initTwoWayChat() {
  const micBtn = document.getElementById('btn-mic-toggle');
  const micWave = document.getElementById('mic-listening-wave');
  const spokenLiveText = document.getElementById('spoken-live-text');
  const chatMessagesList = document.getElementById('two-way-messages-list');
  const deafReplyInput = document.getElementById('deaf-reply-input');
  const deafSendBtn = document.getElementById('btn-deaf-send');
  const visualGuidePreview = document.getElementById('detected-speech-sign-preview');

  window.addChatMessage = (sender, text) => {
    if (!chatMessagesList || !text) return;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isDeaf = sender === 'deaf';
    const bubbleClass = isDeaf
      ? 'ml-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm'
      : 'mr-auto bg-slate-800 text-slate-100 border border-slate-700 rounded-2xl rounded-tl-sm';

    const senderLabel = isDeaf ? 'Deaf User (SIGNSEVA)' : 'Hearing Person / Responder';
    const avatar = isDeaf ? '🤟' : '🗣️';

    const div = document.createElement('div');
    div.className = `max-w-[85%] md:max-w-[70%] p-4 shadow-lg mb-3 ${bubbleClass} animate-fade-in`;
    div.innerHTML = `
      <div class="flex items-center justify-between gap-4 mb-1.5 text-xs opacity-85">
        <span class="font-bold flex items-center gap-1.5">
          <span>${avatar}</span>
          <span>${senderLabel}</span>
        </span>
        <span class="font-mono text-[11px]">${timeStr}</span>
      </div>
      <p class="text-base font-medium leading-relaxed">${text}</p>
      <div class="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-end gap-2">
        <button onclick="window.speechAssistant.speak('${text.replace(/'/g, "\\'")}', window.currentLanguage || 'en')" class="text-xs px-2.5 py-1 rounded bg-black/20 hover:bg-black/40 text-white flex items-center gap-1 transition">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
          <span>Speak</span>
        </button>
      </div>
    `;

    chatMessagesList.appendChild(div);
    chatMessagesList.scrollTop = chatMessagesList.scrollHeight;

    if (!isDeaf) {
      checkForMatchingSigns(text);
    }
  };

  const checkForMatchingSigns = (text) => {
    if (!visualGuidePreview || typeof signDictionary === 'undefined') return;
    const lower = text.toLowerCase();
    const matched = signDictionary.filter(s =>
      s.keywords.some(k => lower.includes(k.toLowerCase())) ||
      lower.includes(s.title.toLowerCase())
    );

    if (matched.length > 0) {
      visualGuidePreview.classList.remove('hidden');
      visualGuidePreview.style.display = 'block';
      visualGuidePreview.innerHTML = `
        <div class="bg-blue-950/60 border border-blue-500/40 rounded-xl p-3 mb-3">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <span>💡</span> Matching Sign Visual Guide for "${matched[0].title}"
            </span>
            <button onclick="document.getElementById('detected-speech-sign-preview').style.display='none'" class="text-slate-400 hover:text-white text-xs">✕</button>
          </div>
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 bg-slate-900 rounded-lg p-1.5 border border-slate-700 flex-shrink-0">
              ${matched[0].svg}
            </div>
            <div>
              <div class="font-bold text-white text-sm">${matched[0].title}</div>
              <p class="text-xs text-slate-300 mt-1">${matched[0].descriptionEn}</p>
            </div>
          </div>
        </div>
      `;
    }
  };

  if (micBtn && window.speechAssistant) {
    micBtn.addEventListener('click', () => {
      window.speechAssistant.toggleListening(
        (result) => {
          if (spokenLiveText) {
            spokenLiveText.textContent = result.final || result.interim || 'Listening...';
          }
          if (result.final) {
            window.addChatMessage('hearing', result.final);
          }
        },
        (active) => {
          if (active) {
            micBtn.classList.remove('bg-blue-600', 'hover:bg-blue-500');
            micBtn.classList.add('bg-red-600', 'hover:bg-red-500', 'animate-pulse');
            micBtn.querySelector('span').textContent = 'Listening... (Tap to Stop)';
            if (micWave) {
              micWave.classList.remove('hidden');
              micWave.style.display = 'flex';
            }
          } else {
            micBtn.classList.add('bg-blue-600', 'hover:bg-blue-500');
            micBtn.classList.remove('bg-red-600', 'hover:bg-red-500', 'animate-pulse');
            micBtn.querySelector('span').textContent = 'Start Microphone';
            if (micWave) {
              micWave.classList.add('hidden');
              micWave.style.display = 'none';
            }
          }
        }
      );
    });
  }

  const sendDeafMessage = () => {
    if (!deafReplyInput) return;
    const text = deafReplyInput.value.trim();
    if (!text) return;

    window.addChatMessage('deaf', text);
    if (window.speechAssistant) {
      window.speechAssistant.speak(text, window.currentLanguage || 'en');
    }
    deafReplyInput.value = '';
  };

  if (deafSendBtn) {
    deafSendBtn.addEventListener('click', sendDeafMessage);
  }

  if (deafReplyInput) {
    deafReplyInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendDeafMessage();
      }
    });
  }

  // Quick reply chips
  document.querySelectorAll('[data-quick-reply]').forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-quick-reply');
      if (deafReplyInput) {
        deafReplyInput.value = text;
        sendDeafMessage();
      }
    });
  });
}

// Sector Scenarios Controller
function initScenarios() {
  const scenarioCardsContainer = document.getElementById('scenarios-cards-container');
  const scenarioTabBtns = document.querySelectorAll('[data-scenario-sector]');

  const scenariosData = {
    hospital: [
      { icon: '👨‍⚕️', title: 'Where is the Doctor?', text: 'Where can I find the doctor or duty physician?', textHi: 'डॉक्टर कहाँ मिलेंगे?', textTa: 'மருத்துவர் எங்கு உள்ளார்?' },
      { icon: '💔', title: 'Chest Pain / Heart Ache', text: 'I am experiencing severe chest pain. Need emergency ECG/care!', textHi: 'मेरे सीने में बहुत दर्द है। तुरंत जांच चाहिए!', textTa: 'நெஞ்சில் கடுமையான வலி உள்ளது. உடனே கவனிக்கவும்!' },
      { icon: '♿', title: 'Need Wheelchair', text: 'I cannot walk properly. Please arrange a wheelchair.', textHi: 'मुझे व्हीलचेयर की जरूरत है।', textTa: 'எனக்கு சக்கர நாற்காலி வேண்டும்.' },
      { icon: '💊', title: 'Pharmacy / Medicine', text: 'Where is the hospital medical pharmacy counter?', textHi: 'दवा काउंटर (फार्मेसी) कहाँ है?', textTa: 'மருந்து வழங்கும் இடம் எங்குள்ளது?' },
      { icon: '⚠️', title: 'Drug Allergy', text: 'I am allergic to penicillin and specific medicines. Please check.', textHi: 'मुझे कुछ दवाओं से एलर्जी है। कृपया जांचें।', textTa: 'எனக்கு மருந்து ஒவ்வாமை (Allergy) உள்ளது.' },
      { icon: '💧', title: 'Need Drinking Water', text: 'Please help me get clean drinking water.', textHi: 'कृपया मुझे पीने का पानी चाहिए।', textTa: 'தயவுசெய்து குடிக்க தண்ணீர் தரவும்.' }
    ],
    police: [
      { icon: '🚨', title: 'Emergency / File Report', text: 'I am deaf and speech impaired. I need to report an incident.', textHi: 'मैं मूक-बधिर हूँ। मुझे शिकायत दर्ज करानी है।', textTa: 'எனக்கு பேச இயலாது. புகார் பதிவு செய்ய வேண்டும்.' },
      { icon: '👜', title: 'Theft / Stolen Bag', text: 'My bag and wallet have been stolen. Please help.', textHi: 'मेरा बैग और पर्स चोरी हो गया है। मदद करें।', textTa: 'எனது பை மற்றும் பணம் திருடு போய்விட்டது.' },
      { icon: '🛡️', title: 'Harassment / Danger', text: 'Someone is stalking / threatening me. I need protection.', textHi: 'कोई मुझे परेशान/धमका रहा है। मुझे सुरक्षा चाहिए।', textTa: 'யாரோ என்னை அச்சுறுத்துகிறார்கள். பாதுகாப்பு தேவை.' },
      { icon: '🚗', title: 'Road Accident', text: 'A traffic accident just happened here. People need aid.', textHi: 'यहाँ सड़क दुर्घटना हुई है। तत्काल सहायता चाहिए।', textTa: 'இங்கு சாலை விபத்து நடந்துள்ளது. உதவி தேவை.' }
    ],
    college: [
      { icon: '🏫', title: 'Where is the Classroom / Lab?', text: 'Which floor and room is the CSE Lab / Class in Hindusthan Institute?', textHi: 'कंप्यूटर लैब और क्लासरूम किस तल पर है?', textTa: 'CSE ஆய்வகம் மற்றும் வகுப்பறை எந்த தளத்தில் உள்ளது?' },
      { icon: '📝', title: 'Exam Hall Location', text: 'Where is my semester examination hall situated?', textHi: 'मेरा परीक्षा हॉल कहाँ पर है?', textTa: 'எனது தேர்வு அறை எங்குள்ளது?' },
      { icon: '📚', title: 'Library & Study Material', text: 'I need reference textbooks and study notes from the library.', textHi: 'मुझे लाइब्रेरी से किताबें और नोट्स चाहिए।', textTa: 'நூலகத்திலிருந்து புத்தகங்கள் மற்றும் குறிப்புகள் தேவை.' },
      { icon: '👨‍🏫', title: 'Faculty / Mentor Meeting', text: 'I need to meet Mentor UdhayaKumar / HOD CSE.', textHi: 'मुझे शिक्षक/मेंटर से मिलना है।', textTa: 'எனது துறை பேராசிரியரை சந்திக்க வேண்டும்.' }
    ],
    publicOffice: [
      { icon: '🏛️', title: 'Application Form Help', text: 'Please assist me to fill out this official government form.', textHi: 'कृपया इस सरकारी फॉर्म को भरने में मेरी सहायता करें।', textTa: 'இந்த படிவத்தை நிரப்ப உதவி செய்யவும்.' },
      { icon: '🎫', title: 'Token & Counter Queue', text: 'Which counter number handles my service token?', textHi: 'मेरे टोकन के लिए कौन सा काउंटर है?', textTa: 'எனது டோக்கன் எண் எந்த கவுண்டரில் அழைக்கப்படும்?' },
      { icon: '📄', title: 'Aadhaar / ID Verification', text: 'I am here for Aadhaar / Disability Certificate verification.', textHi: 'मैं पहचान पत्र/प्रमाणपत्र सत्यापन के लिए आया हूँ।', textTa: 'சான்றிதழ் சரிபார்ப்பிற்காக வந்துள்ளேன்.' },
      { icon: '🚍', title: 'Bus / Train Enquiry', text: 'When does the next bus / train arrive at this station?', textHi: 'अगली बस/ट्रेन कब आएगी?', textTa: 'அடுத்த பேருந்து/ரயில் எப்போது வரும்?' }
    ]
  };

  window.renderScenarioCards = (sector) => {
    if (!scenarioCardsContainer) return;
    const cards = scenariosData[sector] || scenariosData.hospital;

    scenarioCardsContainer.innerHTML = cards.map(c => {
      let phrase = c.text;
      if (window.currentLanguage === 'hi') phrase = c.textHi;
      if (window.currentLanguage === 'ta') phrase = c.textTa;

      return `
        <div class="bg-slate-800/80 border border-slate-700 hover:border-blue-500 rounded-2xl p-5 shadow-lg flex flex-col justify-between group transition">
          <div>
            <div class="text-3xl mb-3">${c.icon}</div>
            <h4 class="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition">${c.title}</h4>
            <p class="text-slate-300 text-sm leading-relaxed mb-4">"${phrase}"</p>
          </div>
          <div class="flex items-center gap-2 pt-3 border-t border-slate-700/60">
            <button onclick="window.speechAssistant.speak('${phrase.replace(/'/g, "\\'")}', window.currentLanguage || 'en')" aria-label="Speak phrase: ${phrase.replace(/'/g, "\\'")}" class="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/></svg>
              <span>Speak Aloud</span>
            </button>
            <button onclick="window.copyScenarioText('${phrase.replace(/'/g, "\\'")}')" aria-label="Copy phrase text to clipboard" class="p-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 transition" title="Copy Text">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');
  };

  scenarioTabBtns.forEach(b => {
    b.addEventListener('click', () => {
      scenarioTabBtns.forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-slate-800', 'text-slate-300');
        btn.setAttribute('aria-selected', 'false');
      });
      b.classList.add('bg-blue-600', 'text-white');
      b.classList.remove('bg-slate-800', 'text-slate-300');
      b.setAttribute('aria-selected', 'true');

      const sector = b.getAttribute('data-scenario-sector');
      window.renderScenarioCards(sector);
    });
  });

  window.renderScenarioCards('hospital');
}

// Visual Guide Initializer
function initVisualGuide() {
  const visualGuideContainer = document.getElementById('visual-signs-grid');
  if (visualGuideContainer && window.visualSignGuide) {
    window.visualSignGuide.init(visualGuideContainer);

    const searchInput = document.getElementById('search-signs-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        window.visualSignGuide.search(e.target.value);
      });
    }

    const categoryBtns = document.querySelectorAll('[data-sign-category]');
    categoryBtns.forEach(b => {
      b.addEventListener('click', () => {
        categoryBtns.forEach(btn => btn.classList.remove('active', 'bg-blue-600', 'text-white'));
        b.classList.add('active', 'bg-blue-600', 'text-white');
        const cat = b.getAttribute('data-sign-category');
        window.visualSignGuide.setCategory(cat);
      });
    });
  }
}

// Emergency Contacts Form
function initContactsUI() {
  if (window.contactsManager) {
    window.contactsManager.renderContacts();
  }

  const contactForm = document.getElementById('add-contact-form');
  if (contactForm && window.contactsManager) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('new-contact-name');
      const phoneInput = document.getElementById('new-contact-phone');
      const relInput = document.getElementById('new-contact-relation');

      if (nameInput && phoneInput) {
        const ok = window.contactsManager.addContact(nameInput.value, phoneInput.value, relInput ? relInput.value : '');
        if (ok) {
          nameInput.value = '';
          phoneInput.value = '';
          if (relInput) relInput.value = '';
          alert('Emergency contact saved successfully!');
        }
      }
    });
  }
}

window.copyScenarioText = function(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to clipboard: "' + text + '"');
  }).catch(() => {
    prompt('Copy text below:', text);
  });
};

// Safe startup execution
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
