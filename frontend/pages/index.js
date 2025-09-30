import { useState, useEffect } from 'react'
import Header from '../components/Header'
import LeaderboardTable from '../components/LeaderboardTable'
import AddActivity from '../components/AddActivity'
import { leaderboardAPI } from '../services/api'

// Mock data as fallback
const mockData = [
  { userId: '1', fullName: 'Jake Williamson', totalPoints: 320, rank: 1 },
  { userId: '2', fullName: 'Alice Johnson', totalPoints: 300, rank: 2 },
  { userId: '3', fullName: 'Bob Smith', totalPoints: 280, rank: 3 },
  { userId: '4', fullName: 'Charlie Brown', totalPoints: 280, rank: 3 },
  { userId: '5', fullName: 'Diana Prince', totalPoints: 260, rank: 5 },
  { userId: '6', fullName: 'Edward Norton', totalPoints: 240, rank: 6 },
  { userId: '7', fullName: 'Fiona Green', totalPoints: 220, rank: 7 },
  { userId: '8', fullName: 'George Wilson', totalPoints: 200, rank: 8 },
  { userId: '9', fullName: 'Hannah Davis', totalPoints: 180, rank: 9 },
  { userId: '10', fullName: 'Ian Thompson', totalPoints: 160, rank: 10 }
]

export default function Home() {
  const [leaderboardData, setLeaderboardData] = useState(mockData)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sortBy, setSortBy] = useState('')
  const [highlightedUserId, setHighlightedUserId] = useState('1')

  const fetchLeaderboard = async (filter = sortBy, search = '') => {
    setLoading(true)
    setError('')
    try {
      const response = await leaderboardAPI.getLeaderboard(filter, search)
      setLeaderboardData(response.data || mockData)
    } catch (err) {
      setError('Failed to load leaderboard. Using mock data.')
      setLeaderboardData(mockData)
    } finally {
      setLoading(false)
    }
  }

  const handleRecalculate = async () => {
    setLoading(true)
    try {
      await leaderboardAPI.recalculateRanks()
      await fetchLeaderboard()
      console.log('Ranks recalculated successfully')
    } catch (err) {
      setError('Failed to recalculate ranks')
      console.log('Recalculate button clicked - using mock data')
    } finally {
      setLoading(false)
    }
  }

  const handleFilter = async (userId) => {
    if (userId.trim()) {
      await fetchLeaderboard(sortBy, userId.trim())
      setHighlightedUserId(userId.trim())
    } else {
      setHighlightedUserId('')
      await fetchLeaderboard(sortBy)
    }
  }

  const handleSortChange = async (newSortBy) => {
    setSortBy(newSortBy)
    await fetchLeaderboard(newSortBy, highlightedUserId)
  }

  useEffect(() => {
    fetchLeaderboard()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">User Leaderboard Dashboard</h1>
        
        <Header
          onRecalculate={handleRecalculate}
          onFilter={handleFilter}
          onSortChange={handleSortChange}
          userIdFilter={highlightedUserId}
          sortBy={sortBy}
        />

        <AddActivity onActivityAdded={() => fetchLeaderboard(sortBy, highlightedUserId)} />

        {error && (
          <div className="bg-yellow-600 text-white p-3 rounded mb-4">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <div className="text-xl">Loading...</div>
          </div>
        ) : (
          <LeaderboardTable
            data={leaderboardData}
            highlightedUserId={highlightedUserId}
          />
        )}
      </div>
    </div>
  )
}
