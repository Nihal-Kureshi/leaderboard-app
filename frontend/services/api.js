const API_BASE_URL = 'http://localhost:3001/api'

export const leaderboardAPI = {
  async getLeaderboard(filter = '', search = '') {
    const params = new URLSearchParams()
    if (filter) params.append('filter', filter)
    if (search) params.append('search', search)
    
    const response = await fetch(`${API_BASE_URL}/leaderboard?${params}`)
    if (!response.ok) throw new Error('Failed to fetch leaderboard')
    return response.json()
  },

  async addActivity(userId) {
    const response = await fetch(`${API_BASE_URL}/activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId })
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to add activity')
    }
    return response.json()
  },

  async recalculateRanks() {
    const response = await fetch(`${API_BASE_URL}/recalculate`, {
      method: 'POST',
    })
    if (!response.ok) throw new Error('Failed to recalculate ranks')
    return response.json()
  },


}