export default function LeaderboardTable({ data, highlightedUserId }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Rank
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Points
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {data.map((user, index) => (
              <tr
                key={user.userId}
                className={`
                  ${highlightedUserId === user.userId 
                    ? 'bg-blue-900 border-2 border-blue-500' 
                    : 'bg-gray-800 hover:bg-gray-700'
                  } transition-colors
                `}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                  #{user.rank || index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                  {user.userId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                  {user.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-white font-semibold">
                  {user.totalPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}