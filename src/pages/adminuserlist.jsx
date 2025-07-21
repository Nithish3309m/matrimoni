import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUserList() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin-dashboard/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data.users);
      } catch (err) {
        console.error("Failed to fetch users", err);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">👥 User Management</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>City</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr><td colSpan="5">No users found.</td></tr>
          ) : (
            users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.city}</td>
                <td>{user.isBlocked ? "Blocked" : "Active"}</td>
                <td>
                  <button className="btn btn-sm btn-warning me-2">
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
