# 🎁 Prize Draw TMA

<div align="center">

[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14.2.7-black)](https://nextjs.org/)
[![Telegram](https://img.shields.io/badge/Telegram-2.0-blue)](https://telegram.org/)

</div>

<div align="center">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
</div>

## 📋 About the Project

An application for conducting prize draws with Telegram integration. Allows easy organization and management of draws, tracking participants, and analyzing results.

Some features remain unimplemented due to loss of interest in the project.

## 🏗️ Project Structure

```
prize-draw_tma/
├── client/          # Client-side (React + Vite)
│   ├── src/         # Source code
│   ├── public/      # Static files
│   └── ...          # Configuration files
└── server/          # Server-side (Next.js)
    ├── app/         # API and pages
    ├── prisma/      # Database schema
    └── ...          # Configuration files
```

## 🚀 Installation and Setup

### 📋 Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL (for database)

### ⚙️ Installing Dependencies

```bash
# Install client-side dependencies
cd client
npm install

# Install server-side dependencies
cd ../server
npm install
```

### 🔧 Environment Setup

1. Copy `.env.example` files to `.env` in both directories:
   ```bash
   cp client/.env.example client/.env
   cp server/.env.example server/.env
   ```
2. Configure environment variables according to your setup

### 🏃 Running in Development Mode

```bash
# Run client-side
cd client
npm run dev

# Run server-side
cd ../server
npm run dev
```

## ✨ Main Features

- 🤖 Telegram Integration
- 🎯 Prize Draw Management
- 👥 Participant Management
- 📊 Statistics and Analytics
- 🔒 Secure Authentication
- 📱 Responsive Design

## 🛠️ Technologies

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Next.js, Prisma, PostgreSQL
- **Integrations**: Telegram Bot API
- **Tools**: ESLint, Prettier, Husky

## 📄 License

This project is distributed under the ISC License. See [LICENSE](LICENSE) for details.

<div align="center">
  <sub>Built with ❤️ by Vl1ko</sub>
</div>
