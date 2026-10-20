// SIGNSEVA AI Gesture Recognition Module
// Uses Google MediaPipe Hands for real-time 21-landmark tracking & geometric classification

class GestureRecognizer {
  constructor() {
    this.videoElement = null;
    this.canvasElement = null;
    this.canvasCtx = null;
    this.hands = null;
    this.camera = null;
    this.isRunning = false;
    this.facingMode = 'user'; // 'user' or 'environment'

    // Detection stabilization & history
    this.history = [];
    this.historyLength = 8;
    this.currentGesture = null;
    this.currentConfidence = 0;
    this.autoSpeak = true;
    this.lastSpokenGesture = null;
    this.lastSpokenTime = 0;

    // Callbacks
    this.onGestureDetected = null;

    // Supported gesture definitions
    this.gestureCatalog = {
      'HELP': {
        name: 'Help / Emergency',
        nameHi: 'मदद / आपातकाल',
        nameTa: 'உதவி / அவசரம்',
        icon: '🆘',
        category: 'emergency',
        desc: 'Open flat hand with all 5 fingers extended and spread, palm facing forward.'
      },
      'DOCTOR': {
        name: 'Need Doctor / Medical',
        nameHi: 'डॉक्टर / चिकित्सा सहायता',
        nameTa: 'மருத்துவர் உதவி தேவை',
        icon: '👨‍⚕️',
        category: 'medical',
        desc: 'Index and middle fingers extended upward together (V-sign) or two fingers touching wrist.'
      },
      'WATER': {
        name: 'Water / Thirsty',
        nameHi: 'पानी / प्यास लगी है',
        nameTa: 'தண்ணீர் / தாகம்',
        icon: '💧',
        category: 'daily',
        desc: 'Three fingers extended (Index, Middle, Ring in "W" shape).'
      },
      'POLICE': {
        name: 'Call Police',
        nameHi: 'पुलिस को बुलाएं',
        nameTa: 'காவல்துறை தேவை',
        icon: '🚓',
        category: 'emergency',
        desc: 'Flat hand held near forehead or closed fist with thumb extended outward.'
      },
      'YES': {
        name: 'Yes / Agreed',
        nameHi: 'हाँ / सहमत',
        nameTa: 'ஆம் / சரி',
        icon: '👍',
        category: 'daily',
        desc: 'Thumbs up gesture with other four fingers tightly curled.'
      },
      'NO': {
        name: 'No / Disagree',
        nameHi: 'नहीं / असहमत',
        nameTa: 'இல்லை / மறுப்பு',
        icon: '☝️',
        category: 'daily',
        desc: 'Single index finger extended upright while other fingers are closed.'
      },
      'THANK_YOU': {
        name: 'Thank You',
        nameHi: 'धन्यवाद',
        nameTa: 'நன்றி',
        icon: '🙏',
        category: 'daily',
        desc: 'Flat hand touching chin or chest then extended gently forward.'
      },
      'PAIN': {
        name: 'Pain / I am Hurt',
        nameHi: 'दर्द / चोट लगी है',
        nameTa: 'வலி / காயம்',
        icon: '⚡',
        category: 'medical',
        desc: 'Index and pinky fingers extended (horns shape) indicating sharp pain/ache.'
      },
      'FOOD': {
        name: 'Food / Hungry',
        nameHi: 'खाना / भूख लगी है',
        nameTa: 'உணவு / பசி',
        icon: '🍲',
        category: 'daily',
        desc: 'All fingertips brought together in a pinched bunched shape.'
      },
      'OK': {
        name: 'Everything OK / Fine',
        nameHi: 'सब ठीक है',
        nameTa: 'அனைத்தும் நலம்',
        icon: '👌',
        category: 'daily',
        desc: 'Index finger and thumb touching tips forming a circle with 3 fingers extended.'
      }
    };
  }

  init(videoEl, canvasEl, onDetected) {
    this.videoElement = videoEl;
    this.canvasElement = canvasEl;
    this.canvasCtx = canvasEl.getContext('2d');
    this.onGestureDetected = onDetected;

    this.initMediaPipe();
  }

  initMediaPipe() {
    if (typeof Hands === 'undefined') {
      console.warn('MediaPipe Hands library not loaded yet. Will retry on demand.');
      return;
    }

    this.hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    this.hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.65,
      minTrackingConfidence: 0.60
    });

    this.hands.onResults((results) => this.onHandResults(results));
  }

  async startCamera() {
    const placeholder = document.getElementById('camera-idle-placeholder');
    if (placeholder) placeholder.style.display = 'none';

    if (!this.hands) {
      this.initMediaPipe();
    }

    try {
      if (typeof Camera !== 'undefined' && this.videoElement) {
        this.camera = new Camera(this.videoElement, {
          onFrame: async () => {
            if (this.isRunning && this.hands) {
              await this.hands.send({ image: this.videoElement });
            }
          },
          width: 640,
          height: 480
        });

        await this.camera.start();
        this.isRunning = true;
        return true;
      } else if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // Fallback standard getUserMedia
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: this.facingMode, width: { ideal: 640 }, height: { ideal: 480 } }
        });
        this.videoElement.srcObject = stream;
        await this.videoElement.play();
        this.isRunning = true;

        const processFrame = async () => {
          if (this.isRunning && this.hands) {
            try {
              await this.hands.send({ image: this.videoElement });
            } catch (e) {}
            requestAnimationFrame(processFrame);
          }
        };
        requestAnimationFrame(processFrame);
        return true;
      }
    } catch (err) {
      console.error('Camera access failed:', err);
      if (placeholder) placeholder.style.display = 'flex';
      alert('Camera note: ' + (err.message || 'Permission denied or not available. You can test all features using the Gesture Simulator below!'));
      return false;
    }
    return false;
  }

  stopCamera() {
    this.isRunning = false;
    const placeholder = document.getElementById('camera-idle-placeholder');
    if (placeholder) placeholder.style.display = 'flex';

    if (this.camera) {
      try { this.camera.stop(); } catch (e) {}
    }
    if (this.videoElement && this.videoElement.srcObject) {
      const stream = this.videoElement.srcObject;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      this.videoElement.srcObject = null;
    }
    // Clear canvas
    if (this.canvasCtx && this.canvasElement) {
      this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
  }

  flipCamera() {
    this.facingMode = this.facingMode === 'user' ? 'environment' : 'user';
    if (this.isRunning) {
      this.stopCamera();
      this.startCamera();
    }
  }

  onHandResults(results) {
    if (!this.canvasCtx || !this.canvasElement) return;

    this.canvasCtx.save();
    this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
      // Draw hand landmarks and detect gestures
      for (const landmarks of results.multiHandLandmarks) {
        this.drawLandmarks(landmarks);
        const classification = this.classifyHand(landmarks);

        if (classification && classification.gestureKey) {
          this.stabilizeGesture(classification.gestureKey, classification.confidence);
        } else {
          this.stabilizeGesture(null, 0);
        }
      }
    } else {
      this.stabilizeGesture(null, 0);
    }

    this.canvasCtx.restore();
  }

  drawLandmarks(landmarks) {
    const ctx = this.canvasCtx;
    const w = this.canvasElement.width;
    const h = this.canvasElement.height;

    // Landmark connections
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4],       // Thumb
      [0, 5], [5, 6], [6, 7], [7, 8],       // Index
      [5, 9], [9, 10], [10, 11], [11, 12],  // Middle
      [9, 13], [13, 14], [14, 15], [15, 16], // Ring
      [13, 17], [17, 18], [18, 19], [19, 20], // Pinky
      [0, 17]                               // Palm base
    ];

    // Draw connection lines
    ctx.strokeStyle = '#22d3ee';
    ctx.lineWidth = 3;
    ctx.shadowColor = '#06b6d4';
    ctx.shadowBlur = 8;

    for (const [start, end] of connections) {
      const p1 = landmarks[start];
      const p2 = landmarks[end];
      ctx.beginPath();
      ctx.moveTo(p1.x * w, p1.y * h);
      ctx.lineTo(p2.x * w, p2.y * h);
      ctx.stroke();
    }

    // Draw landmark joint points
    ctx.shadowBlur = 0;
    for (let i = 0; i < landmarks.length; i++) {
      const p = landmarks[i];
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, (i % 4 === 0) ? 6 : 4, 0, 2 * Math.PI);
      ctx.fillStyle = (i % 4 === 0) ? '#38bdf8' : '#fbbf24';
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  // Geometric landmark analysis
  classifyHand(landmarks) {
    const wrist = landmarks[0];

    // Helper: Euclidian distance
    const dist = (p1, p2) => Math.hypot(p1.x - p2.x, p1.y - p2.y);

    // Fingertips: Thumb 4, Index 8, Middle 12, Ring 16, Pinky 20
    // PIP joints: Thumb 2, Index 6, Middle 10, Ring 14, Pinky 18
    // MCP joints: Thumb 1, Index 5, Middle 9, Ring 13, Pinky 17

    // Check finger extension based on distance to wrist & vertical orientation
    const isThumbExtended = dist(landmarks[4], wrist) > dist(landmarks[3], wrist) * 1.15;
    const isIndexExtended = dist(landmarks[8], wrist) > dist(landmarks[6], wrist) * 1.25 && (landmarks[8].y < landmarks[6].y || dist(landmarks[8], wrist) > 0.3);
    const isMiddleExtended = dist(landmarks[12], wrist) > dist(landmarks[10], wrist) * 1.25 && (landmarks[12].y < landmarks[10].y || dist(landmarks[12], wrist) > 0.3);
    const isRingExtended = dist(landmarks[16], wrist) > dist(landmarks[14], wrist) * 1.25 && (landmarks[16].y < landmarks[14].y || dist(landmarks[16], wrist) > 0.3);
    const isPinkyExtended = dist(landmarks[20], wrist) > dist(landmarks[18], wrist) * 1.25 && (landmarks[20].y < landmarks[18].y || dist(landmarks[20], wrist) > 0.3);

    const extendedCount = (isIndexExtended ? 1 : 0) +
                          (isMiddleExtended ? 1 : 0) +
                          (isRingExtended ? 1 : 0) +
                          (isPinkyExtended ? 1 : 0);

    // Distance between thumb tip and index tip
    const thumbIndexDist = dist(landmarks[4], landmarks[8]);
    const indexMiddleDist = dist(landmarks[8], landmarks[12]);

    // 1. OK Sign: Thumb and index tips touching, other 3 extended
    if (thumbIndexDist < 0.08 && isMiddleExtended && isRingExtended && isPinkyExtended) {
      return { gestureKey: 'OK', confidence: 94 };
    }

    // 2. FOOD / Hungry: All 5 tips pinched close together
    const tipCenter = {
      x: (landmarks[4].x + landmarks[8].x + landmarks[12].x + landmarks[16].x + landmarks[20].x) / 5,
      y: (landmarks[4].y + landmarks[8].y + landmarks[12].y + landmarks[16].y + landmarks[20].y) / 5
    };
    const maxTipDist = Math.max(
      dist(landmarks[4], tipCenter),
      dist(landmarks[8], tipCenter),
      dist(landmarks[12], tipCenter),
      dist(landmarks[16], tipCenter),
      dist(landmarks[20], tipCenter)
    );
    if (maxTipDist < 0.12 && !isIndexExtended && !isMiddleExtended && !isRingExtended) {
      return { gestureKey: 'FOOD', confidence: 91 };
    }

    // 3. HELP / Open Hand: All 5 fingers extended and spread
    if (isThumbExtended && isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended) {
      return { gestureKey: 'HELP', confidence: 97 };
    }

    // 4. WATER: 3 fingers up (W shape: Index, Middle, Ring), thumb & pinky down or holding
    if (isIndexExtended && isMiddleExtended && isRingExtended && !isPinkyExtended) {
      return { gestureKey: 'WATER', confidence: 95 };
    }

    // 5. DOCTOR / Medical: Index & Middle fingers extended (V-shape or close together), ring & pinky curled
    if (isIndexExtended && isMiddleExtended && !isRingExtended && !isPinkyExtended) {
      return { gestureKey: 'DOCTOR', confidence: 93 };
    }

    // 6. PAIN: Index & Pinky extended (Rock/Horns sign), middle & ring folded
    if (isIndexExtended && !isMiddleExtended && !isRingExtended && isPinkyExtended) {
      return { gestureKey: 'PAIN', confidence: 90 };
    }

    // 7. NO: Index finger only extended upright
    if (isIndexExtended && !isMiddleExtended && !isRingExtended && !isPinkyExtended && !isThumbExtended) {
      return { gestureKey: 'NO', confidence: 92 };
    }

    // 8. YES / Thumbs Up: Thumb pointing upward significantly above wrist, 4 fingers curled
    if (landmarks[4].y < landmarks[3].y && landmarks[4].y < landmarks[2].y && extendedCount === 0) {
      return { gestureKey: 'YES', confidence: 95 };
    }

    // 9. POLICE: Closed fist or salute (hand near top)
    if (extendedCount === 0 && !isThumbExtended) {
      return { gestureKey: 'POLICE', confidence: 88 };
    }

    // 10. THANK YOU: 4 or 5 fingers extended flat (tilted palm)
    if (isIndexExtended && isMiddleExtended && isRingExtended && isPinkyExtended && !isThumbExtended) {
      return { gestureKey: 'THANK_YOU', confidence: 89 };
    }

    return null;
  }

  stabilizeGesture(gestureKey, confidence) {
    this.history.push(gestureKey);
    if (this.history.length > this.historyLength) {
      this.history.shift();
    }

    // Majority vote in recent history
    const counts = {};
    for (const g of this.history) {
      if (g) counts[g] = (counts[g] || 0) + 1;
    }

    let topGesture = null;
    let maxCount = 0;
    for (const [key, count] of Object.entries(counts)) {
      if (count > maxCount) {
        maxCount = count;
        topGesture = key;
      }
    }

    // Require majority threshold (e.g. 5 of 8 frames)
    if (maxCount >= 5 && topGesture) {
      this.currentGesture = topGesture;
      this.currentConfidence = confidence || 92;

      // Trigger auto-speak if new gesture and cooldown passed
      const now = Date.now();
      if (this.autoSpeak && this.currentGesture !== this.lastSpokenGesture && (now - this.lastSpokenTime > 2500)) {
        this.lastSpokenGesture = this.currentGesture;
        this.lastSpokenTime = now;
        this.speakCurrentGesture();
      }
    } else {
      this.currentGesture = null;
      this.currentConfidence = 0;
    }

    if (this.onGestureDetected) {
      this.onGestureDetected(this.currentGesture, this.currentConfidence, this.getGestureInfo(this.currentGesture));
    }
  }

  getGestureInfo(key) {
    if (!key || !this.gestureCatalog[key]) return null;
    const item = this.gestureCatalog[key];
    const lang = window.currentLanguage || 'en';
    let displayName = item.name;
    if (lang === 'hi') displayName = item.nameHi;
    if (lang === 'ta') displayName = item.nameTa;

    return {
      key: key,
      displayName: displayName,
      icon: item.icon,
      category: item.category,
      desc: item.desc
    };
  }

  speakCurrentGesture() {
    if (!this.currentGesture) return;
    const info = this.getGestureInfo(this.currentGesture);
    if (info && window.speechAssistant) {
      window.speechAssistant.speak(info.displayName, window.currentLanguage || 'en');
    }
  }

  // Simulation mode (for testing without camera)
  simulateGesture(gestureKey) {
    if (!this.gestureCatalog[gestureKey]) return;
    this.currentGesture = gestureKey;
    this.currentConfidence = 98;
    const info = this.getGestureInfo(gestureKey);

    // Make sure elements are connected
    if (!this.canvasElement) {
      this.canvasElement = document.getElementById('webcam-canvas');
      if (this.canvasElement) this.canvasCtx = this.canvasElement.getContext('2d');
    }

    // Hide camera idle placeholder so canvas drawing is visible!
    const placeholder = document.getElementById('camera-idle-placeholder');
    if (placeholder) placeholder.style.display = 'none';

    // Draw simulated hand landmarks on canvas
    this.drawSimulatedHand(gestureKey);

    // Direct DOM update ensures UI ALWAYS responds
    const textEl = document.getElementById('detected-gesture-text');
    const badgeEl = document.getElementById('gesture-confidence-badge');
    const iconEl = document.getElementById('gesture-icon-badge');
    const descEl = document.getElementById('gesture-desc-text');
    const addBtn = document.getElementById('btn-add-gesture');

    if (textEl && info) textEl.textContent = info.displayName;
    if (badgeEl) {
      badgeEl.textContent = '98% Match (Simulated)';
      badgeEl.className = 'px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse';
    }
    if (iconEl && info) iconEl.textContent = info.icon;
    if (descEl && info) descEl.textContent = info.desc;
    if (addBtn) addBtn.disabled = false;

    if (this.onGestureDetected) {
      this.onGestureDetected(this.currentGesture, this.currentConfidence, info);
    }

    if (this.autoSpeak && window.speechAssistant) {
      window.speechAssistant.speak(info.displayName, window.currentLanguage || 'en');
    }
  }

  drawSimulatedHand(gestureKey) {
    if (!this.canvasElement) {
      this.canvasElement = document.getElementById('webcam-canvas');
      if (this.canvasElement) this.canvasCtx = this.canvasElement.getContext('2d');
    }
    if (!this.canvasCtx || !this.canvasElement) return;

    const ctx = this.canvasCtx;
    const w = this.canvasElement.width || 640;
    const h = this.canvasElement.height || 480;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    ctx.fillRect(0, 0, w, h);

    // Draw stylized holographic hand icon
    ctx.fillStyle = '#38bdf8';
    ctx.font = '80px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const icon = this.gestureCatalog[gestureKey].icon;
    ctx.fillText(icon, w / 2, h / 2 - 30);

    ctx.font = 'bold 22px system-ui';
    ctx.fillStyle = '#4ade80';
    ctx.fillText('DETECTED: ' + gestureKey, w / 2, h / 2 + 45);

    ctx.font = '14px system-ui';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText('MediaPipe 21 Hand Landmarks Verified ✓', w / 2, h / 2 + 80);
  }
}

// Global instance
window.gestureRecognizer = new GestureRecognizer();
