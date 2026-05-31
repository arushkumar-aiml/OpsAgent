# ⚡ OpsAgent

<div align="center">

### AI-Native DevOps Copilot for Engineering Teams

Built in **48 Hours** on an **Android Phone** for the  
🏆 **Microsoft Build AI Dashboard Hackathon 2025**

<br/>

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Groq](https://img.shields.io/badge/Groq-LLaMA%203.1-orange?style=for-the-badge)](https://groq.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

</div>

---

## 📖 Overview

OpsAgent is an AI-powered DevOps productivity platform that helps engineering teams automate repetitive workflows using intelligent AI agents.

Modern teams waste hours every day:
- Writing meeting notes manually
- Waiting for pull request reviews
- Debugging production issues
- Searching DevOps commands
- Planning sprints

OpsAgent solves this using **5 AI Agents** inside one modern dashboard.

---

# ✨ Core Features

## 🎙️ Meeting Analyzer

Transform messy meeting transcripts into structured outputs instantly.

### ✅ Extracts:
- Decisions
- Action Items
- Owners
- Risks
- Blockers
- Executive Summary

### ⚡ Example

#### Input

```txt
Arush will deploy the backend tomorrow.
Ayushi will redesign the dashboard cards.
The authentication issue is still unresolved.
```

#### Output

```txt
✅ Action Items
- Arush → Deploy backend
- Ayushi → Redesign dashboard

⚠️ Blockers
- Authentication issue unresolved
```

---

## ⚡ Smart Sprint Planner

Generate a complete sprint roadmap in seconds.

### ✅ AI Generates:
- Epics
- User Stories
- Story Points
- Task Breakdown
- Daily Planning
- Sprint Goals

### ⚡ Example

#### Input

```txt
Build authentication module in 7 days with 3 developers
```

#### Output

```txt
Epic: User Authentication

Stories:
- Login API
- JWT Middleware
- Password Reset
- OAuth Integration
```

---

## 🔍 AI Pull Request Reviewer

Paste any git diff and receive a senior-level code review instantly.

### ✅ Detects:
- Bugs
- Security Issues
- Bad Practices
- Performance Problems
- Code Smells

### ⚡ Example

#### Git Diff

```diff
- const password = "123456";
+ const password = process.env.PASSWORD;
```

### 🤖 AI Review

```txt
Security improved:
Environment variables are safer than hardcoded secrets.
```

---

## 🚨 Incident Explainer

Convert production error logs into plain English.

### ✅ Provides:
- Root Cause Analysis
- Human-Friendly Explanation
- Immediate Fix
- Prevention Tips

### ⚡ Example

#### Input

```bash
502 Bad Gateway nginx
```

#### Output

```txt
The backend server is not responding to nginx.

Possible Causes:
- Crashed Node.js process
- Port mismatch
- High server load
```

---

## 💻 Natural Language DevOps

Ask DevOps questions like chatting with an engineer.

### ⚡ Example

#### Input

```txt
restart nginx without downtime
```

#### Output

```bash
sudo nginx -s reload
```

### ✅ Includes:
- Explanation
- Warnings
- Best Practices

---

# 🧠 AI Architecture

```txt
┌──────────────────────┐
│   Next.js Frontend   │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│  API Route Handlers  │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      Groq API        │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│   LLaMA 3.1 Model    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│ Structured Responses │
└──────────────────────┘
```

---

# 🛠️ Tech Stack

| Category | Technology |
|----------|-------------|
| Framework | Next.js 16 |
| Language | TypeScript |
| Styling | TailwindCSS |
| Animation | Framer Motion |
| AI Provider | Groq API |
| LLM Model | LLaMA 3.1 8B Instant |
| Backend | Next.js API Routes |
| Hosting | Vercel |
| Development | Android + Termux |

---

# 📂 Folder Structure

```bash
OpsAgent/
│
├── app/
│   ├── api/
│   │   ├── meeting/
│   │   ├── sprint/
│   │   ├── pr-review/
│   │   ├── incident/
│   │   └── devops/
│   │
│   ├── dashboard/
│   ├── components/
│   └── globals.css
│
├── public/
├── utils/
├── types/
├── lib/
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

# ⚙️ Local Development Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/arushkumar-aiml/OpsAgent.git
```

## 2️⃣ Move Into Project

```bash
cd OpsAgent
```

## 3️⃣ Install Dependencies

```bash
npm install
```

## 4️⃣ Configure Environment Variables

Create a `.env.local` file.

```env
GROQ_API_KEY=your_api_key_here
```

## 5️⃣ Start Development Server

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

---

# 🌐 Deployment

OpsAgent is deployed on **Vercel Free Tier**.

### Deploy Yourself

```bash
npm run build
```

---

# 📱 Built Entirely on Android

This project was developed completely using:
- Android Phone
- Termux
- Node.js
- Git
- AI Pair Programming

No laptop was used during development.

---

# 👥 Team Warriors

## 👨‍💻 Arush Kumar
### Full Stack + AI Integration

#### Responsibilities
- Backend Development
- AI Integration
- API Engineering
- Prompt Engineering
- Deployment

GitHub:
`@arushkumar-aiml`

---

## 🎨 Ayushi Shukla
### Frontend + UI/UX Engineering

#### Responsibilities
- Dashboard Design
- UI Components
- Animations
- Glassmorphism Styling
- Responsive Design

---

# 🏆 Hackathon Submission

### Microsoft Build AI Dashboard Hackathon 2025

Theme:
> AI-Native Productivity & Engineering Tools

---

# 🚀 Future Improvements

- GitHub OAuth
- Slack Integration
- Kubernetes Monitoring
- AI Agent Collaboration
- Team Workspaces
- Real-Time Notifications
- Docker Support
- CI/CD Automation

---

# 🤝 Contributing

Contributions are welcome.

## Steps

```bash
# Fork Repository

# Clone Fork
git clone your-fork-url

# Create Branch
git checkout -b feature-name

# Commit Changes
git commit -m "Added new feature"

# Push Branch
git push origin feature-name
```

Then open a Pull Request 🚀

---

# 📄 License

Licensed under the MIT License.

---

# ⭐ Support the Project

If you found OpsAgent useful:

- ⭐ Star the repository
- 🍴 Fork the project
- 🧠 Share with developers
- 🚀 Build something awesome

---

<div align="center">

## ⚡ 48 Hours • One Phone • Two Engineers • Five AI Agents

### Built with passion, hustle, and AI.

</div>
