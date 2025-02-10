export default function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 dark:border-gray-700">
        <thead className="bg-gray-200 dark:bg-gray-800">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="py-2 px-4 border-b border-gray-300 dark:border-gray-700 text-left">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="py-2 px-4 border-b border-gray-300 dark:border-gray-700">
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
