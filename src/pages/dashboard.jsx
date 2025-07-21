import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const isAdmin = localStorage.getItem("admin");
    if (!token || !isAdmin) {
      window.location.href = "/login"; // redirect if not admin
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin-dashboard/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(statsRes.data);

        const usersRes = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin-dashboard/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(usersRes.data.users);
      } catch (err) {
        console.error("Error loading dashboard data", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

 const handleBlockToggle = async (userId, currentStatus) => {
  const action = currentStatus ? "unblock" : "block";

  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/admin-dashboard/users/${userId}/block`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setUsers(prev =>
      prev.map(u =>
        u._id === userId ? { ...u, isBlocked: res.data.isBlocked } : u
      )
    );

    toast.success(`User ${action}ed successfully.`);
  } catch (err) {
    console.error("Block/unblock error", err);
    toast.error(`Failed to ${action} user.`);
  }
};


  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">🛠️ Admin Dashboard</h2>

      {loading ? (
        <p className="text-muted text-center">Loading...</p>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : (
        <>
          {/* 📊 Stats Section */}
          <div className="row text-center mb-5">
            <div className="col-md-4">
              <div className="card p-4 shadow-sm border-0 rounded-4">
                <h4>Total Users</h4>
                <p className="fs-1 fw-bold">{stats.users}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-4 shadow-sm border-0 rounded-4">
                <h4>Total Matches</h4>
                <p className="fs-1 fw-bold">{stats.matches}</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card p-4 shadow-sm border-0 rounded-4">
                <h4>Reports</h4>
                <p className="fs-1 fw-bold text-danger">{stats.reports}</p>
              </div>
            </div>
          </div>

          {/* 👥 User List Section */}
          <h4 className="fw-bold mb-3">👥 Registered Users</h4>
          <div className="table-responsive">
            <table className="table table-bordered table-hover align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th>City</th>
                  <th>Status</th>

                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan="5" className="text-center">No users found.</td></tr>
                ) : (
                  users.map(user => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.gender || "—"}</td>
                      <td>{user.city || "—"}</td>
                      <td className={user.isBlocked ? "text-danger" : "text-success"}>
                        {user.isBlocked ? "Blocked" : "Active"}
                      </td>
                      <td>
                        <button
                          className={`btn btn-sm ${user.isBlocked ? "btn-success" : "btn-danger"}`}
                          onClick={() => handleBlockToggle(user._id, user.isBlocked)}
                        >
                          {user.isBlocked ? "Unblock" : "Block"}
                        </button>
                      </td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
