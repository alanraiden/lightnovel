# 🌟 NovaSphere — Light Novel Platform

A full-stack, anime-aesthetic light novel reading platform built with React + Node.js/Express + MongoDB + Cloudinary.

---

## ✨ Features

- **Homepage** — Hero banner, Trending, Top Rated, Latest Updates, Recently Added
- **Browse Page** — Filter by genre, status, search by title/author/tags
- **Novel Page** — Cover, stats, chapter list, bookmark
- **Reading Page** — Dark/Sepia/Light modes, adjustable font size, progress bar
- **Author Dashboard** — Chapter upload with Cloudinary image storage
- **Google AdSense** — 2 ad slots per chapter page (top + mid-content)
- **Ko-fi Support** — https://ko-fi.com/idenwebstudio integrated in navbar, footer, and reading page
- **Responsive** — Desktop, tablet, and mobile

---

## 🚀 Quick Start

### 1. Frontend

```bash
cd lightnovel-app
npm install
npm run dev
# Open http://localhost:5173
```

### 2. Backend

```bash
cd lightnovel-app/backend
npm install
cp .env.example .env
# Fill in your MongoDB URI and Cloudinary credentials in .env
npm run dev
# API runs at http://localhost:5000
```

---

## ⚙️ Environment Variables

**Backend** (`backend/.env`):

```env
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.xxxxx.mongodb.net/novasphere
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

**Frontend** (`src/.env`):
```env
VITE_API_URL=http://localhost:5000/api
```

---

## 🔗 Setting Up Services

### MongoDB Atlas (Free)
1. Go to https://cloud.mongodb.com
2. Create a free cluster
3. Create a database user
4. Get the connection string → paste as `MONGODB_URI`

### Cloudinary (Free tier)
1. Go to https://console.cloudinary.com
2. Sign up / log in → Dashboard
3. Copy **Cloud name**, **API Key**, **API Secret**
4. Paste into your `.env`

### Google AdSense
Replace the `<AdSlot>` components in `src/pages/ReadPage.jsx`:

```jsx
// Replace <div className="ad-slot"> with:
<ins
  className="adsbygoogle"
  style={{ display: 'block' }}
  data-ad-client="ca-pub-XXXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"
  data-full-width-responsive="true"
/>
```

Also add to your `index.html` `<head>`:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
```

---

## 📁 Project Structure

```
lightnovel-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx / Navbar.css
│   │   ├── NovelCard.jsx
│   │   └── Footer.jsx / Footer.css
│   ├── pages/
│   │   ├── Home.jsx / Home.css
│   │   ├── Browse.jsx / Browse.css
│   │   ├── NovelPage.jsx / NovelPage.css
│   │   ├── ReadPage.jsx / ReadPage.css
│   │   ├── Dashboard.jsx / Dashboard.css
│   │   ├── Rankings.jsx
│   │   ├── Genres.jsx
│   │   └── Updates.jsx
│   ├── services/
│   │   └── api.js          ← Connect to your backend here
│   ├── data/
│   │   └── mockData.js     ← Replace with real API calls
│   ├── App.jsx
│   └── index.css
├── backend/
│   ├── server.js           ← Express API + MongoDB + Cloudinary
│   ├── package.json
│   └── .env.example
└── README.md
```

---

## 🎨 Switching from Mock Data to Live API

In any page component, replace mock data imports with API calls:

```jsx
// Before (mock data):
import { novels } from '../data/mockData';

// After (live API):
import { getNovels } from '../services/api';
import { useState, useEffect } from 'react';

const [novels, setNovels] = useState([]);
useEffect(() => {
  getNovels({ sort: 'rating' }).then(data => setNovels(data.novels));
}, []);
```

---

## 💛 Support

If you enjoy using NovaSphere, please consider supporting:  
👉 **https://ko-fi.com/idenwebstudio**
