# Leaderboard App

A full-stack leaderboard application for tracking user activity points with real-time ranking system.

## Features

- User activity tracking (+20 points per activity)
- Real-time leaderboard with rankings
- Filter by Day/Month/Year
- Search users by ID
- Rank recalculation
- Dark theme UI

## Tech Stack

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- RESTful APIs

**Frontend:**
- Next.js + React
- Tailwind CSS
- Responsive design

## Setup

### Backend
```bash
cd backend
npm install
npm run seed    # Populate dummy data
npm start       # Start server on port 5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev     # Start on port 3000
```

## API Endpoints

- `GET /api/leaderboard?filter=day|month|year&search=userId`
- `POST /api/activity` - Add activity
- `POST /api/recalculate` - Recalculate ranks

## Database Schema

**Users:** userId, fullName, totalPoints, rank
**Activities:** userId, points (20), date

## Project Structure

```
leaderboard-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── seeders/
│   └── utils/
└── frontend/
    ├── components/
    ├── pages/
    ├── services/
    └── styles/
```