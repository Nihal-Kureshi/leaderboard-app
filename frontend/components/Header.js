import { useState } from 'react'

export default function Header({ onRecalculate, onFilter, onSortChange, userIdFilter, sortBy }) {
  const [userId, setUserId] = useState(userIdFilter || '')

  const handleFilter = () => {
    onFilter(userId)
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-6">
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={onRecalculate}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Recalculate
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleFilter}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-medium transition-colors"
            >
              Filter
            </button>
          </div>
          
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">All Time</option>
            <option value="day">Day</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
      </div>
    </div>
  )
}
