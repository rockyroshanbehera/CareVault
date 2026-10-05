# CareVault — Family Health OS

> **"Your family's health, organized for life."**
>
## 📸 Product Preview

![CareVault Dashboard](./Screenshot%202026-10-05%20195006.png)

## 🎥 Demo

[▶️ Watch the CareVault Demo](https://drive.google.com/file/d/1QPb6w4vt3_HOgzfiqaxX2jsSWf_CTycB/view?usp=sharing)

CareVault is a family-first healthcare management and navigation MVP designed for hackathons. It brings together family profiles, a lifelong medical vault, document summarization, an AI health assistant, doctor visit preparation, hospital/doctor/pharmacy discovery, insurance comparison, expense estimation, and a high-visibility emergency SOS mode into a unified workspace.

---

## 🌟 The Problem
Families maintain medical records across scattered physical files, WhatsApp chats, email attachments, and lab portals. During doctor visits or medical emergencies, critical information like past prescriptions, allergies, blood groups, and chronic conditions is difficult to retrieve quickly or comprehend.

---

## 💡 The Solution
CareVault provides a single, secure family health OS to:
**STORE** ➔ **UNDERSTAND** ➔ **NAVIGATE** ➔ **PREPARE**

1. **STORE**: Upload and organize lab reports, prescriptions, discharge summaries, and insurance policies in one vault.
2. **UNDERSTAND**: Instant AI summaries break down complex medical jargon into clear, layperson language with actionable questions.
3. **NAVIGATE**: Find nearby hospitals, doctors, and pharmacies with smart criteria matching (distance, budget, specialty, 24/7 emergency).
4. **PREPARE**: Generate concise, printable clinical briefs before visiting a doctor.

---

## 🚀 Features (All 11 MVP Modules)

1. **Dashboard** — Overview of family profiles, documents, quick actions, and visual health workflow.
2. **Family Profiles** — Detailed health cards for father, mother, son/daughter, and grandmother with conditions, allergies, and active medications. Supports adding new family members with `localStorage` persistence.
3. **Health Vault** — Categorized, searchable document repository with upload simulation, review tracking, and structured clinical summaries.
4. **CareVault AI Assistant** — Interactive chat assistant with zero API key dependency (uses `MockAIProvider`) and source citation chips.
5. **Doctor Visit Prep** — Generates printable summary briefs with mandatory documents checklist and tailored questions to ask the doctor.
6. **Hospital Finder & Comparison** — Search nearby hospitals with percentage match score and side-by-side spec comparison (ICU, emergency, budget).
7. **Doctor Finder & Booking** — Discover verified specialists, view consultation fees, and create demo appointment requests.
8. **Insurance Planner & Cost Estimator** — Policy comparison engine and out-of-pocket expense calculator.
9. **Pharmacy Finder** — Locates open medical stores with operating hours, stock status, and home delivery info.
10. **Emergency SOS Mode** — High-visibility red alert screen featuring 108 ambulance dispatch, blood groups, emergency notes, and nearest ER hospitals.
11. **Global Search** — `Ctrl+K` global search across members, medical documents, hospitals, doctors, and pharmacies.

---

## 🏗️ Technical Architecture & Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS + Lucide React Icons
- **State Management**: React Context (`CareVaultContext`) with `localStorage` persistence
- **AI Engine**: Client-side `MockAIProvider` abstraction (built for zero-key execution & extensible to Gemini/OpenAI APIs)

---

## 📦 How to Run Locally

```bash
# 1. Clone or navigate to the project directory
cd carevault

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Build for production
npm run build
```

---

## 🛡️ Medical Safety Notice
> **CareVault** is a healthcare information organization and navigation prototype. It does not diagnose medical conditions, prescribe medication, or replace professional medical advice. Demo data is fictional.

---

## 🛠️ Demo Flow for Presentation
1. **Dashboard** ➔ Review family status & quick actions.
2. **Family Profiles** ➔ Explore Rajesh (Dad), Sunita (Mom), and Kamala (Grandmother) profiles.
3. **Health Vault** ➔ Click "View Summary" on Dad's Blood Test Report.
4. **AI Assistant** ➔ Ask *"What health information do we have for Dad?"* and view source citations.
5. **Doctor Visit Prep** ➔ Select Rajesh ➔ Generate Clinical Brief ➔ Click Print/Copy.
6. **Hospital Finder** ➔ Filter by 24/7 Emergency & Compare Hospitals.
7. **Insurance Planner** ➔ Calculate out-of-pocket expense for a ₹100,000 procedure.
8. **Emergency SOS** ➔ Click the red Emergency button in the header/sidebar for immediate SOS view.
