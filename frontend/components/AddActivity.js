import { useState } from 'react'
import { leaderboardAPI } from '../services/api'

export default function AddActivity({ onActivityAdded }) {
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!userId.trim()) return

    setLoading(true)
    try {
      await leaderboardAPI.addActivity(userId.trim())
      setUserId('')
      onActivityAdded()
    } catch (err) {
      console.error('Failed to add activity:', err)
      alert(err.message || 'Failed to add activity')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-6">
      <h3 className="text-lg font-medium mb-3">Add Activity</h3>
      <form onSubmit={handleSubmit} className="flex items-center space-x-3">
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading || !userId.trim()}
          className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded font-medium transition-colors"
        >
          {loading ? 'Adding...' : 'Add'}
        </button>
      </form>
    </div>
  )
}