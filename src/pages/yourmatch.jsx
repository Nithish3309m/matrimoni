import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";

export default function YourMatches() {
    const [matches, setMatches] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            const token = localStorage.getItem("token");

            try {
                const res = await axios.get(`${import.meta.env.VITE_API_YOURMATCH_URL}/matches`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                setMatches(res.data.matches || []);
            } catch (err) {
                console.error("Error fetching matches:", err);
                console.error("Response:", err.response);
            }
        };

        fetchMatches();
    }, []);

    return (
        <div className="container py-5">
            <h2 className="mb-4 text-center fw-bold">💑 Your Matches</h2>

            {matches.length === 0 ? (
                <p className="text-center text-muted">No matches found yet.</p>
            ) : (
                <div className="row g-4">
                    {matches.map((match) => (
                        <div className="col-md-4" key={match._id}>
                            <div className="card shadow-sm border-0 h-100 rounded-4">
                                <img
                                    src={
                                        match.image
                                            ? `${import.meta.env.VITE_BACKEND_URL}/${match.image}`
                                            : "https://via.placeholder.com/300x300?text=No+Image"
                                    }
                                    alt={match.name}
                                    className="card-img-top rounded-top-4"
                                    style={{ height: "280px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title text-primary fw-semibold">
                                        <FaUser className="me-2" />
                                        {match.name}, {match.age}
                                    </h5>
                                    <p className="card-text mb-1 text-muted">
                                        <FaMapMarkerAlt className="me-2 text-danger" />
                                        {match.city || "No city"}
                                    </p>
                                    <p className="small text-muted">{match.bio || "No bio available."}</p>

                                    <div className="d-grid gap-2">
                                        <Link to={`/profile/${match._id}`} className="btn btn-outline-success btn-sm rounded-pill">
                                            💌 View Profile
                                        </Link>

                                        {match.connected && (
                                            <Link to={`/chat/${match._id}`} className="btn btn-outline-primary btn-sm rounded-pill">
                                                💬 Chat
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
