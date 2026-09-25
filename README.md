# Gusto - Modern Payroll & HR Platform

An interactive payroll, HR, and benefits management web platform inspired by Gusto, built with React, Vite, Tailwind CSS, TypeScript, and Google Gemini.

## ✨ Features

- **Interactive Payroll Processing**: Run live payroll simulations with instant wage, withholding, and net pay calculations.
- **Horizontal Motion Experience**: Smooth continuous customer story carousels and product suite marquee showcases.
- **Google Workspace Contacts Integration**: Connect directly to Google Contacts to import team members and manage emergency contacts.
- **Firebase Firestore Integration**: Secure storage for employees, benefits plans, payroll run records, and historical logs.
- **Gemini AI Intelligence**:
  - Compliance and tax credit analysis
  - Fast wage and overtime calculation via `gemini-3.1-flash-lite`
  - Local CPA and tax advisor locator with Google Maps Grounding via `gemini-3.5-flash`
  - Audio payroll readouts and team announcements with `gemini-3.8-flash-tts`
  - Cinematic team celebration video generator via Veo models

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- npm or bun

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd <repo-folder>

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Configuration
Copy `.env.example` to `.env` and fill in your keys:
```env
GEMINI_API_KEY="your_gemini_api_key"
APP_URL="http://localhost:3000"
```

### Build for Production
```bash
npm run build
npm start
```

## 🛠 Tech Stack
- **Frontend**: React 19, TypeScript, Tailwind CSS, Motion, Lucide React
- **Backend / API**: Express, Vite middlewares
- **AI SDK**: `@google/genai` (Gemini Flash, TTS, Maps Grounding)
- **Database & Auth**: Firebase Firestore & Auth
- **Integration**: Google People API (Contacts)
