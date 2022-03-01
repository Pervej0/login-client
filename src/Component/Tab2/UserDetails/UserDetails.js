import React from "react";

const UserDetails = ({ user, handleRemove, serial }) => {
  return (
    <tr className="text-gray-600">
      <td className="px-4 py-3 border">{serial}</td>
      <td className="px-4 py-3 border text-lg text-md font-semibold">
        {user.displayName}
      </td>

      <td className="px-4 py-3 border text-md font-semibold">{user.email}</td>
      <td className="px-4 py-3 border text-md font-semibold">
        {user.phone || "N/A"}
      </td>
      <td className="px-4 py-3 border text-md font-semibold">
        {user.address || "N/A"}
      </td>

      <td className="px-4 py-3 border text-sm">
        <button
          onClick={() => handleRemove(user._id, user.uid)}
          className="text-white bg-red-600 px-2 rounded"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default UserDetails;
