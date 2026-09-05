# IntervAI — Next-Generation AI Mock Interview Platform

<div align="center">

![IntervAI Banner](https://img.shields.io/badge/IntervAI-AI%20Interview%20Platform-f59e0b?style=for-the-badge&logo=openai&logoColor=black)
<br />
<br />

[![Live Demo](https://img.shields.io/badge/Live%20Demo-intervai.vercel.app-10b981?style=for-the-badge&logo=vercel&logoColor=white)](https://intervai.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-nilanshukumarsingh-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nilanshukumarsingh/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-nilanshukumarsingh-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/nilanshukumarsingh)
[![X (Twitter)](https://img.shields.io/badge/X-@nilanshukumar81-000000?style=for-the-badge&logo=x&logoColor=white)](https://x.com/nilanshukumar81)

<br />

**Crack High-Stakes Tech & Behavioral Interviews with AI Precision.**  
*Realistic HR, Technical, and Resume-tailored voice interview simulations powered by advanced LLMs with real-time rubric feedback.*

</div>

---

## 🌟 Highlights & Features

- **🎙️ Real-Time Voice & Speech AI**: Practice with interactive speech recognition and real-time audio visualization, simulating authentic interview pressure.
- **🤖 Multi-Mode AI Simulations**:
  - **HR Mode**: Master behavioral questions, storytelling frameworks (STAR method), and cultural alignment.
  - **Technical Mode**: Deep-dive into systems, coding concepts, frameworks, and architecture problem-solving.
  - **Resume AI**: Upload your resume to experience personalized questions dynamically targeting your actual experience and tech stack.
- **📊 Real-Time Rubric Scoring**:
  - Immediate multi-dimensional feedback: **Confidence**, **Clarity**, and **Technical Accuracy**.
  - Detailed session summaries with actionable strengths, weaknesses, and improvement tips.
- **📈 History & Progress Analytics**: Track your progress over time, review past question transcripts, and monitor scoring trends.
- **🔐 Enterprise-Grade Authentication**:
  - Firebase Google OAuth and secure email/password auth.
  - 6-digit OTP verification via Nodemailer for seamless password resets.
  - HTTP-only cookie-based JWT session security.
- **💳 Credit & Subscription Management**: Integrated Razorpay workflow for mock interview session credits.
- **✨ Obsidian Dark Theme**: Sleek glassmorphism, fluid micro-interactions, custom scrollbars, and responsive layouts across all devices.

---

## 🛠️ Architecture & Tech Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Animations**: Framer Motion
- **State Management**: Redux Toolkit
- **Icons**: Lucide React & React Icons
- **Deployment**: Vercel SPA (`client/vercel.json` rewrite routing)

### Backend
- **Runtime**: Node.js & Express
- **Database**: MongoDB Atlas with Mongoose ODM
- **AI Engine**: OpenRouter API (Gemini / Claude / GPT models)
- **Authentication**: JWT & Firebase Admin SDK
- **Email Service**: Nodemailer (SMTP)
- **Payments**: Razorpay Node SDK

---

## 📁 Repository Structure

```text
AI-Interview/
├── .gitignore                   # Comprehensive git exclusions (secrets protected)
├── README.md                    # Project documentation
│
├── client/                      # Frontend Application (React + Vite)
│   ├── .env.example             # Client environment template
│   ├── vercel.json              # Vercel SPA routing rewrite rules
│   ├── index.html               # App entrypoint
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── components/          # Reusable UI (Hero, Navbar, Footer, Newsletter, etc.)
│       ├── pages/               # Views (Home, Auth, Interview, History, Pricing)
│       ├── redux/               # Global state slices
│       └── utils/               # Firebase and helper utilities
│
└── server/                      # Backend API (Node.js + Express)
    ├── .env.example             # Backend environment template
    ├── package.json
    ├── index.js                 # Server entrypoint & CORS configuration
    ├── config/                  # DB connection & external configs
    ├── controllers/             # Auth, User, Interview, and Payment logic
    ├── models/                  # Mongoose schemas (User, Interview, etc.)
    ├── routes/                  # Express API route declarations
    └── utils/                   # AI prompts, email sender, and tokens
```

---

## 🚀 Quickstart & Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/nilanshukumarsingh/AI-Interview.git
cd AI-Interview
```

### 2. Configure Environment Variables

Create `.env` files for both `client` and `server` using the provided `.env.example` templates:

#### Client Setup (`client/.env`):
```bash
cp client/.env.example client/.env
```
Populate `client/.env`:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_SERVER_URL=http://localhost:8000
```

#### Server Setup (`server/.env`):
```bash
cp server/.env.example server/.env
```
Populate `server/.env`:
```env
PORT=8000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/intervai?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
FIREBASE_WEB_API_KEY=your_firebase_web_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### 3. Install Dependencies & Run

#### Start Backend Server:
```bash
cd server
npm install
npm run dev
# Server will run on http://localhost:8000
```

#### Start Frontend Client:
```bash
cd client
npm install
npm run dev
# Frontend will run on http://localhost:5173 (or 5174)
```

---

## 🔒 Security & Git Hygiene

This repository enforces strict secrets protection:
- **Zero Leaked Keys**: All actual API keys, database credentials, and secrets are strictly loaded via `process.env` and `import.meta.env`.
- **Protected `.gitignore`**: All `.env`, `.env.*`, `*.local`, and build directories (`dist/`, `node_modules/`) are strictly ignored.
- **Safe Examples Only**: Only sanitized `.env.example` files containing dummy placeholders are tracked in git.

---

## 🌐 Vercel Deployment

The frontend is configured for instant deployment on [Vercel](https://vercel.com/):

1. Connect your repository on Vercel.
2. Set **Root Directory** to `client` (or keep root with build command `cd client && npm install && npm run build` and output directory `client/dist`).
3. Set Environment Variables in Vercel Dashboard matching `client/.env.example`.
4. Ensure your production domain (`https://intervai.vercel.app`) is included in `server/index.js` CORS `allowedOrigins`.
5. Client SPA routing is handled automatically by `client/vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 👨‍💻 Author & Connect

**Nilanshu Kumar Singh**  
- **GitHub**: [@nilanshukumarsingh](https://github.com/nilanshukumarsingh/)
- **LinkedIn**: [Nilanshu Kumar Singh](https://linkedin.com/in/nilanshukumarsingh)
- **X (Twitter)**: [@nilanshukumar81](https://x.com/nilanshukumar81)
- **Live Platform**: [https://intervai.vercel.app/](https://intervai.vercel.app/)

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
