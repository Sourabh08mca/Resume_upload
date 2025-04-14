import React from 'react';

const Table = ({ users = [] }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full border border-gray-200 shadow-md rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Email</th>
            <th className="text-left px-4 py-2">Resume File</th>
            <th className="text-left px-4 py-2">Upload Date</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-4 py-4 text-center text-gray-500">No users found.</td>
            </tr>
          ) : (
            users.map((user, idx) => (
              <tr key={idx} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 text-blue-600 hover:underline">
                  <a href={user.resumeUrl} target="_blank" rel="noopener noreferrer">View</a>
                </td>
                <td className="px-4 py-2">{user.uploadDate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
