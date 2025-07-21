import { Link, useNavigate } from "react-router-dom";
import { FaHeart, FaUserFriends, FaComments } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";
import "../home.css"; // optional: create this for custom CSS if needed

export default function Home() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_USER_URL}/featured`);
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Failed to fetch featured users:", err);
      }
    };
    fetchFeaturedUsers();
  }, []);

  const handleGetStarted = () => {
    if (localStorage.getItem("token")) {
      navigate("/profile");
    } else {
      navigate("/register");
    }
  };

  return (
    <div>
      {/* ✅ Hero Section */}
      <div
        className="text-center text-white d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1525097487452-6278ff080c31')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "80vh",
          flexDirection: "column",
        }}
      >
      <h1 className="fw-bold display-4 text-dark">Find Your Life Partner ❤️</h1>
<p className="lead text-dark">India’s most trusted matrimonial platform</p>

        <button className="btn btn-light btn-lg mt-3 px-4" onClick={handleGetStarted}>
          🚀 Get Started
        </button>
      </div>

      {/* ✅ How It Works */}
      <div className="container py-5">
        <h2 className="text-center mb-5 fw-bold">How It Works</h2>
        <div className="row text-center">
          <div className="col-md-4">
            <FaUserFriends size={50} className="text-primary mb-3" />
            <h5 className="fw-semibold">1. Create Your Profile</h5>
            <p className="text-muted">Let others know who you are and what you seek.</p>
          </div>
          <div className="col-md-4">
            <FaHeart size={50} className="text-danger mb-3" />
            <h5 className="fw-semibold">2. Send Interests</h5>
            <p className="text-muted">Like profiles and express interest to connect.</p>
          </div>
          <div className="col-md-4">
            <FaComments size={50} className="text-success mb-3" />
            <h5 className="fw-semibold">3. Start Chatting</h5>
            <p className="text-muted">Once matched, chat and build your connection.</p>
          </div>
        </div>
      </div>

      {/* ✅ Featured Profiles */}
      <div className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5 fw-bold">🌟 Featured Profiles</h2>
          <div className="row g-4">
            {users.length === 0 ? (
              <p className="text-muted text-center">No featured profiles available right now.</p>
            ) : (
              users.map((user) => (
                <div className="col-md-4" key={user._id}>
                  <div className="card shadow border-0 h-100 rounded-4">
                    <img
                      src={
                        user.image
                          ? `${import.meta.env.VITE_BACKEND_URL}/${user.image}`
                          : "https://via.placeholder.com/300x300?text=No+Image"
                      }
                      alt={user.name}
                      className="card-img-top rounded-top-4"
                      style={{ height: "280px", objectFit: "cover" }}
                    />
                    <div className="card-body text-center">
                      <h5 className="fw-bold">{user.name}, {user.age}</h5>
                      <p className="text-muted">{user.city || "Unknown City"} | {user.job || "No Job Info"}</p>
                      <Link to={`/profile/${user._id}`} className="btn btn-outline-primary btn-sm rounded-pill">
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ✅ Why Choose Us */}
      <div className="py-5 text-white" style={{ background: "linear-gradient(135deg, #ff4e50, #f9d423)" }}>
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Why Choose Us?</h2>
          <p className="lead">
            💯 100% Verified Profiles | 🔒 Safe & Secure | 💬 Real-Time Chat | ❤️ Genuine Matches
          </p>
        </div>
      </div>

      {/* ✅ Footer */}
      <footer className="bg-dark text-white text-center py-4 mt-5">
        <p className="mb-0">&copy; {new Date().getFullYear()} My Matrimonial App. All rights reserved.</p>
      </footer>
    </div>
  );
}
