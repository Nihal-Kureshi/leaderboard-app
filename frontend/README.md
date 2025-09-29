# Leaderboard Dashboard Frontend

A Next.js-based user leaderboard dashboard with dark theme and real-time filtering capabilities.

## Features

- Dark-themed interface with clean, modern design
- User filtering by ID with visual highlighting
- Sorting by Day/Month/Year timeframes
- Recalculate ranks functionality
- Responsive table layout
- Mock data fallback when backend is unavailable

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Backend Integration

The frontend connects to the backend API at `http://localhost:5000/api`. Make sure your backend server is running for full functionality.

If the backend is not available, the app will fall back to mock data for demonstration purposes.

## Components

- `Header`: Contains recalculate button, user ID filter, and sort dropdown
- `LeaderboardTable`: Displays user rankings with highlighting
- `pages/index.js`: Main dashboard page orchestrating all components
- `services/api.js`: API service for backend communication