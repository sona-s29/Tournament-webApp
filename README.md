🎮 Tournament Web App

A full-stack web application for hosting and managing Free Fire tournaments. Players can join by submitting their UID and making a secure payment. The app includes slot management, payment integration, admin panel, and real-time updates for a smooth tournament experience.

🚀 Features

🔥 User-Side Features

Join tournaments with UID submission

Secure online payment (Razorpay integration)

WhatsApp group access after successful payment

Live slot updates (persistent across reloads)

Mobile-friendly responsive UI

🛠️ Admin-Side Features

Admin authentication & dashboard

Reset or update slots anytime

View joined users list

📌 General Features

Terms & Conditions, Privacy, Refund, and Contact sections

Reload/refresh prevention for secure tournament flow


🏗️ Tech Stack

Frontend: React.js, Tailwind CSS

Backend: Node.js, Express.js

Database: Firebase

Payments: Razorpay Integration

Hosting: Vercel (Frontend) + Render (Backend)

📂 Project Structure
tournament-webapp/
│── frontend/         # React.js UI
│   ├── src/
│   ├── public/
│   └── package.json
│
│── backend/          # Node.js + Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
│
│── README.md

⚡ Getting Started
1. Clone the Repository
git clone https://github.com/sona-s29/Tournament-webApp
cd tournament-webapp

2. Setup Frontend
cd frontend
npm install
npm run dev

3. Setup Backend
cd backend
npm install
npm run dev

4. Environment Variables

Create a .env file inside backend/ and add:

PORT=5000
FIREBASE_CONFIG=your_firebase_config
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret