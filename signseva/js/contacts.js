// SIGNSEVA Trusted Emergency Contacts Manager
// Stores emergency numbers & trusted caregivers locally for quick dispatch

class ContactsManager {
  constructor() {
    this.storageKey = 'signseva_emergency_contacts';
    this.contacts = [];
    this.loadContacts();
  }

  loadContacts() {
    const raw = localStorage.getItem(this.storageKey);
    if (raw) {
      try {
        this.contacts = JSON.parse(raw);
      } catch (e) {
        this.setDefaultContacts();
      }
    } else {
      this.setDefaultContacts();
    }
    this.renderContacts();
  }

  setDefaultContacts() {
    this.contacts = [
      { id: '1', name: 'Emergency Helpline (National)', phone: '112', relation: 'Government Helpline' },
      { id: '2', name: 'Mohammed Thoufiq S (Team Leader)', phone: '+919698860002', relation: 'Caregiver / CodeCure' }
    ];
    this.saveContacts();
  }

  saveContacts() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.contacts));
  }

  getContacts() {
    return this.contacts;
  }

  addContact(name, phone, relation) {
    if (!name || !phone) return false;
    const newContact = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone.trim(),
      relation: relation ? relation.trim() : 'Family / Friend'
    };
    this.contacts.push(newContact);
    this.saveContacts();
    this.renderContacts();
    return true;
  }

  deleteContact(id) {
    this.contacts = this.contacts.filter(c => c.id !== id);
    this.saveContacts();
    this.renderContacts();
  }

  renderContacts() {
    const listEl = document.getElementById('emergency-contacts-list');
    if (!listEl) return;

    if (this.contacts.length === 0) {
      listEl.innerHTML = `
        <div class="text-slate-400 text-sm italic py-4 text-center">
          No emergency contacts saved yet. Add your trusted family, hospital, or doctor below.
        </div>
      `;
      return;
    }

    listEl.innerHTML = this.contacts.map(c => `
      <div class="flex items-center justify-between p-3 bg-slate-900/80 rounded-xl border border-slate-700/60 hover:border-slate-600 transition">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-base">
            ${c.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div class="font-semibold text-white text-sm flex items-center gap-2">
              <span>${c.name}</span>
              <span class="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-normal">${c.relation}</span>
            </div>
            <div class="text-xs text-slate-400 font-mono mt-0.5">${c.phone}</div>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <a href="tel:${c.phone}" aria-label="Call emergency contact ${c.name}" class="p-2 rounded-lg bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/40 transition" title="Call">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          </a>
          <button onclick="contactsManager.sendDirectSos('${c.id}')" aria-label="Send WhatsApp emergency SOS to ${c.name}" class="p-2 rounded-lg bg-red-600/20 text-red-400 hover:bg-red-600/40 transition" title="Send SOS Message">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </button>
          <button onclick="contactsManager.deleteContact('${c.id}')" aria-label="Delete contact ${c.name}" class="p-2 rounded-lg bg-slate-800 text-slate-500 hover:text-red-400 transition" title="Delete">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>
    `).join('');
  }

  sendDirectSos(contactId) {
    const contact = this.contacts.find(c => c.id === contactId);
    if (!contact) return;

    const locStr = window.emergencyManager && window.emergencyManager.currentPosition
      ? `\n📍 My GPS: ${window.emergencyManager.currentPosition.mapUrl}`
      : '';
    const message = encodeURIComponent(`🚨 [SIGNSEVA EMERGENCY ALERT to ${contact.name}]\nI am deaf/speech-impaired and need urgent assistance! Please help or call emergency responders to my location.${locStr}`);

    const cleanPhone = contact.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  }
}

// Global instance
window.contactsManager = new ContactsManager();
