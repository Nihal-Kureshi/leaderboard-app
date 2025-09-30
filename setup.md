# Leaderboard App Setup Guide

## Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

## Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create/update .env file:
```bash
MONGO_URI=mongodb://localhost:27017/leaderboardDB
PORT=5000
```

4. Seed the database with dummy data:
```bash
sudo systemctl start mongod
sudo systemctl enable mongod
npm run seed
```

5. Start the backend server:
```bash
npm start
```

## Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:3000 in your browser

## API Endpoints

- `GET /api/leaderboard?filter=day|month|year&search=userId` - Get leaderboard data
- `POST /api/recalculate` - Recalculate ranks
- `POST /api/activity` - Add new activity (body: {userId})
- `POST /api/seed` - Seed database with dummy data

## Features Implemented

✅ Database with User and Activity tables
✅ Rank stored in database (no GROUP BY/COUNT)
✅ Tied ranks handled correctly
✅ Filter by Day/Month/Year
✅ Search by User ID (shows user as first entry)
✅ Recalculate functionality
✅ Activities always give +20 points
✅ Seeder with dummy data including full name, ID, date/time, points