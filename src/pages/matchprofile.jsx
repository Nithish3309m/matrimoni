import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
    FaMapMarkerAlt,
    FaBook,
    FaBriefcase,
    FaHeart,
    FaLanguage,
    FaHandshake,
} from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function MatchProfile() {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [likeSent, setLikeSent] = useState(false);
    const [connectSent, setConnectSent] = useState(false);
    const [interestStatus, setInterestStatus] = useState(null);
    const [connectStatus, setConnectStatus] = useState(null);


    useEffect(() => {
        const token = localStorage.getItem("token");

        const fetchProfile = async () => {
            try {
                const res = await axios.get(
                    `${import.meta.env.VITE_API_PROFILE_URL}/user/${id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setProfile(res.data.user);
                setInterestStatus(res.data.interestStatus); // 👈 store status
                setConnectStatus(res.data.connectStatus);

            } catch (err) {
                console.error("Error fetching match profile", err);
                toast.error("Failed to load profile.");
            }
        };
        const checkStatus = async () => {
            const [interestRes, connectRes] = await Promise.all([
                axios.get(`${import.meta.env.VITE_API_INTEREST_URL}/status/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }),
                axios.get(`${import.meta.env.VITE_API_CONNECT_URL}/status/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
            ]);

            setLikeSent(interestRes.data.sent);
            setConnectSent(connectRes.data.sent);
        };

        checkStatus();

        fetchProfile();
    }, [id]);

    const handleSendInterest = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_INTEREST_URL}/send`,
                { receiverId: profile._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(res.data.message);
            setLikeSent(true);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to send interest");
        }
    };

    const handleConnect = async () => {
        const token = localStorage.getItem("token");

        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_CONNECT_URL}/send`,
                { receiverId: profile._id },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(res.data.message);
            setConnectSent(true);
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to connect");
        }
    };

    if (!profile) return <div className="text-center py-5">Loading profile...</div>;

    return (
        <div className="container py-5">
            <ToastContainer position="top-center" autoClose={3000} />

            <div className="card shadow-lg mx-auto" style={{ maxWidth: "850px" }}>
                <div className="row g-0">
                    <div className="col-md-4 text-center bg-light d-flex flex-column justify-content-center p-4">
                        <img
                            src={
                                profile.image
                                    ? `${import.meta.env.VITE_BACKEND_URL}/${profile.image}`
                                    : "https://via.placeholder.com/300"
                            }
                            alt={profile.name}
                            className="img-fluid rounded-circle mb-3"
                            style={{ width: "150px", height: "150px", objectFit: "cover" }}
                        />
                        <h4>
                            {profile.name}, {profile.age}
                        </h4>
                        <p className="text-muted">
                            <FaMapMarkerAlt className="me-1" /> {profile.city || "Unknown"}
                        </p>

                        <div className="d-grid gap-2 mt-3">
                            <button
                                className={`btn ${interestStatus === "accepted"
                                    ? "btn-success"
                                    : interestStatus === "rejected"
                                        ? "btn-danger"
                                        : likeSent
                                            ? "btn-secondary"
                                            : "btn-outline-success"
                                    }`}
                                onClick={handleSendInterest}
                                disabled={likeSent || interestStatus}
                            >
                                <FaHeart className="me-1" />
                                {interestStatus === "accepted"
                                    ? "Accepted"
                                    : interestStatus === "rejected"
                                        ? "Rejected"
                                        : likeSent
                                            ? "Interest Sent"
                                            : "Send Interest"}
                            </button>
                            <button
                                className={`btn ${connectStatus === "accepted"
                                        ? "btn-success"
                                        : connectStatus === "rejected"
                                            ? "btn-danger"
                                            : connectSent
                                                ? "btn-secondary"
                                                : "btn-outline-primary"
                                    }`}
                                onClick={handleConnect}
                                disabled={connectSent || connectStatus}
                            >
                                <FaHandshake className="me-1" />
                                {connectStatus === "accepted"
                                    ? "Connected"
                                    : connectStatus === "rejected"
                                        ? "Rejected"
                                        : connectSent
                                            ? "Requested"
                                            : "Connect Now"}
                            </button>

                        </div>
                    </div>

                    <div className="col-md-8 p-4">
                        <div className="row">
                            <div className="col-md-6">
                                <h6 className="text-success">📚 Personal Details</h6>
                                <p>
                                    <strong>Gender:</strong> {profile.gender || "N/A"}
                                </p>
                                <p>
                                    <FaBook className="me-2" />
                                    <strong>Education:</strong> {profile.education || "N/A"}
                                </p>
                                <p>
                                    <FaBriefcase className="me-2" />
                                    <strong>Job:</strong> {profile.job || "N/A"}
                                </p>
                                <p>
                                    <strong>Religion:</strong> {profile.religion || "N/A"}
                                </p>
                            </div>

                            <div className="col-md-6">
                                <h6 className="text-danger">💘 Partner Preferences</h6>
                                <p>
                                    <FaHeart className="me-2" />
                                    <strong>Looking for:</strong> {profile.preference || "N/A"}
                                </p>
                                <p>
                                    <strong>Age Range:</strong> {profile.ageMin || "?"} - {profile.ageMax || "?"}
                                </p>
                                <p>
                                    <strong>City Preference:</strong> {profile.cityPreference || "N/A"}
                                </p>
                                <p>
                                    <FaLanguage className="me-2" />
                                    <strong>Language:</strong> {profile.language || "N/A"}
                                </p>
                            </div>
                        </div>

                        <div className="mt-3">
                            <h6 className="text-info">🎯 Goals</h6>
                            <p>
                                <strong>Looking For:</strong> {profile.lookingFor || "Not specified"}
                            </p>
                            <p>
                                <strong>Hobbies:</strong> {profile.hobbies || "Not specified"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
