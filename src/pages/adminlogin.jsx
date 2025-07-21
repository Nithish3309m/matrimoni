import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin-auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("admin", JSON.stringify(res.data.admin));

      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Admin Login</h2>
      <form onSubmit={handleLogin}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" required value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <button className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}
