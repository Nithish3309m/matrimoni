import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaUser } from "react-icons/fa";

export default function Matches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_MATCH_URL}/matches`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setMatches(res.data.matches);
      } catch (err) {
        console.error("Error fetching matches:", err);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div className="container py-5">
      <h2 className="text-center fw-bold mb-5">💑 Compatible Matches</h2>

      <div className="row g-4">
        {matches.length === 0 ? (
          <p className="text-center text-muted">No matches found at the moment.</p>
        ) : (
          matches.map((match) => (
            <div className="col-md-4" key={match._id}>
              <div className="card shadow rounded-4 border-0 h-100">
                <img
                  src={
                    match.image
                      ? `${import.meta.env.VITE_BACKEND_URL}/${match.image}`
                      : "https://via.placeholder.com/300"
                  }
                  className="card-img-top rounded-top-4"
                  alt={match.name}
                  style={{ height: "280px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-primary">
                    <FaUser className="me-2" />
                    {match.name}, {match.age}
                  </h5>
                  <p className="text-muted mb-1">
                    <FaMapMarkerAlt className="me-2 text-danger" />
                    {match.city || "City not mentioned"}
                  </p>
                  <p className="card-text small mb-3">
                    {match.bio ? <em>"{match.bio}"</em> : "No bio available."}
                  </p>

                  <div className="mt-auto d-grid">
                    <Link to={`/profile/${match._id}`} className="btn btn-success rounded-pill btn-sm">
                      💌 View Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
