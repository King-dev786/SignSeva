# SIGNSEVA - AI-Powered Assistive Communication System
**SEVA Hackathon 2026 Submission**  
**Theme:** Swasth & Samavesh Bharat  
**Track:** Product / Technology  
**Team Name:** CodeCure  
**Institution:** Hindusthan Institute of Technology, Coimbatore  
**Department / Class / Year:** B.E CSE II B  
**Team Leader:** Mohammed Thoufiq S (9698860002 | 720825103090@hit.edu.in)  
**Team Members:** Nandhini Priya D, Mohamed Meera J  
**Faculty Mentor:** UdhayaKumar  

---

## 🌟 Executive Summary

**SIGNSEVA** is an AI-powered assistive communication web application designed to eliminate communication barriers faced by deaf and speech-impaired citizens when interacting with hospitals, police stations, colleges, public offices, and emergency services. 

By combining browser-native computer vision (MediaPipe Hands), real-time speech-to-text, text-to-speech synthesis, visual Indian Sign Language (ISL) guides, and one-touch emergency SOS with GPS geolocation, SIGNSEVA delivers a complete two-way communication bridge without requiring expensive specialized hardware.

---

## 🚀 Key Features

### 1. 🤖 AI Sign Language Recognition (Camera-Based)
- **21-Landmark Hand Skeleton Tracking:** Uses Google MediaPipe Hands to capture hand landmark coordinates in real-time.
- **Geometric Landmark Classifier:** Identifies key gestures:
  - 🆘 **Help / Emergency** (Open palm facing forward)
  - 👨‍⚕️ **Doctor / Medical** (V-shape / two fingers upright)
  - 💧 **Water / Thirst** (W-shape 3-finger gesture)
  - 🚓 **Police / Security** (Fist / salute)
  - 👍 **Yes / Agree** (Thumbs up)
  - ☝️ **No / Disagree** (Index finger upright)
  - 🙏 **Thank You** (Flat hand forward)
  - ⚡ **Pain / Injured** (Horns gesture)
  - 🍲 **Food / Hungry** (Pinched fingertips)
  - 👌 **OK / Fine** (Index and thumb circle)
- **Interactive Gesture Simulator:** Allows instant testing and demonstration without a camera or in low-light environments.
- **Auto-Speak (TTS):** Automatically announces recognized gestures aloud using natural speech synthesis.
- **Sentence Composer:** Combines detected gestures and typed words into complete sentences.

### 2. 💬 Two-Way Communication Hub
- **Hearing Person Speaks (Microphone / STT):** Speech is captured via the Web Speech API and converted into large, high-contrast text for the deaf person.
- **Smart Sign Card Trigger:** When the hearing person speaks words like *"Doctor"*, *"Water"*, or *"Medicine"*, SIGNSEVA automatically displays the visual sign card.
- **Deaf Person Responds (TTS):** Deaf user types or taps quick reply chips, which are immediately spoken aloud in natural Indian English, Hindi, or Tamil.

### 3. 📖 Visual Sign Language Guidance & Interactive Dictionary
- Verified Indian Sign Language (ISL) guidance with high-quality SVG vector illustrations.
- Categories: Medical & Health, Emergency, Daily & Social, and College/Learning (HIT context).
- Audio pronunciation button for every sign.
- "Test with AI" button that launches the recognition simulator.

### 4. 🚨 Emergency SOS & Geolocation Dispatch (Swasth & Samavesh Bharat)
- **One-Touch SOS Cards:** Medical Emergency, Police Assistance, Accident/Danger, General Help.
- **Automatic GPS Location Retrieval:** Fetches high-accuracy latitude and longitude, generating a clickable Google Maps link.
- **One-Click Dispatch:**
  - **WhatsApp SOS:** Formats an urgent message with GPS link to send to contacts or helplines.
  - **SMS SOS:** Native SMS composer pre-filled with location.
  - **Audible Siren Buzzer:** Web Audio API modulated siren buzzer to alert people nearby.
  - **Visual Strobe Light:** High-contrast flashing strobe for dark or noisy environments.
- **Trusted Contacts Manager:** Store family, caregivers, and local hospital numbers in LocalStorage.

### 5. 🏢 Sector-Specific Quick Communication Cards
Pre-crafted communication phrases tailored to public places:
- **🏥 Hospitals & Clinics:** "Where is doctor?", "Severe chest pain", "Need wheelchair", "Drug allergy", "Drinking water".
- **🚓 Police & Safety:** "I am deaf, reporting crime", "Stolen bag", "Being followed", "Road accident".
- **🎓 College / HIT (Hindusthan Institute of Technology):** "Where is CSE Lab?", "Exam hall location", "Library books", "Meeting Mentor UdhayaKumar".
- **🏛️ Public Offices:** "Form filling help", "Token counter", "Aadhaar / ID verification", "Bus schedule".

### 6. 🌐 Multilingual & Accessible Design
- **3 Languages Supported:** English, Hindi (हिंदी), and Tamil (தமிழ்).
- **High-Contrast Mode (AAA standard):** High contrast black & yellow mode for low-vision users.
- **Large-Text Toggle:** Instant font-scaling across the entire application.
- **PWA & Offline First:** Service worker (`sw.js`) and manifest (`manifest.json`) enable offline emergency flashcards without active internet.

---

## 🛠️ Technology Stack

| Layer | Technologies Used |
|---|---|
| **Frontend Framework** | HTML5, Modern Vanilla ES6+ JavaScript, Tailwind CSS (CDN) |
| **Computer Vision / AI** | Google MediaPipe Hands (`@mediapipe/hands`, `@mediapipe/camera_utils`) |
| **Speech Technologies** | Web Speech API (`SpeechRecognition` & `SpeechSynthesisUtterance`) |
| **Audio Synthesis** | Web Audio API (`AudioContext`, `OscillatorNode`, `GainNode`) |
| **Location & Device** | Browser Geolocation API (`navigator.geolocation`), Vibration API |
| **Storage & Offline** | LocalStorage API, Service Worker (`CacheStorage`), Web App Manifest |

---

## 💻 How to Run the Application

### Option 1: Direct Browser Launch
Simply double-click `index.html` or drag it into any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).

### Option 2: Local HTTP Server (Recommended for Webcam Permissions)
Modern browsers require HTTPS or `localhost` to grant full camera and microphone permissions:

Using Python:
```bash
cd "C:\Users\THOUFIQ\.gemini\antigravity\scratch\signseva"
python -m http.server 8080
```
Then open `http://localhost:8080` in your browser.

Using Node.js:
```bash
npx serve "C:\Users\THOUFIQ\.gemini\antigravity\scratch\signseva"
```

---

## 📁 Project Structure

```
signseva/
├── index.html               # Main responsive single-page web application
├── manifest.json            # PWA manifest for smartphone installation
├── sw.js                    # Service worker for offline capability
├── README.md                # Project documentation and hackathon overview
├── css/
│   └── styles.css           # Custom animations, high contrast & accessibility styles
└── js/
    ├── app.js               # Application coordinator, tab controller & sector scenarios
    ├── gesture-recognition.js # MediaPipe 21-landmark tracking & gesture classifier
    ├── speech-assistant.js  # Speech-to-Text & Text-to-Speech engine
    ├── visual-signs.js      # ISL visual dictionary & SVG illustrations
    ├── emergency.js         # SOS trigger, GPS geolocation, siren & strobe
    ├── contacts.js          # Trusted emergency contacts manager
    └── i18n.js              # Multilingual translations (English, Hindi, Tamil)
```

---

## 👥 Team & Submission Info

- **Project:** SIGNSEVA
- **Team Name:** CodeCure
- **Institution:** Hindusthan Institute of Technology, Coimbatore
- **Team Leader:** Mohammed Thoufiq S (CSE II B)
- **Members:** Nandhini Priya D, Mohamed Meera J
- **Faculty Mentor:** UdhayaKumar
- **Target Event:** SEVA Hackathon 2026 (Swasth & Samavesh Bharat Track)
