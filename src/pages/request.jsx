import { useEffect, useState } from "react";
import axios from "axios";
import { FaUser } from "react-icons/fa";

export default function Requests() {
  const [interestRequests, setInterestRequests] = useState([]);
  const [connectRequests, setConnectRequests] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchRequests = async () => {
      try {
        // Fetch interest requests
        const interestRes = await axios.get(
          `${import.meta.env.VITE_API_INTEREST_URL}/received`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setInterestRequests(interestRes.data.interests || []);

        // Fetch connect requests
        const connectRes = await axios.get(
          `${import.meta.env.VITE_API_CONNECT_URL}/received`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setConnectRequests(connectRes.data.connects || []);
      } catch (err) {
        console.error("Failed to fetch requests", err);
      }
    };

    fetchRequests();
  }, []);

  const handleRespond = async (type, requestId, action) => {
    const token = localStorage.getItem("token");
    const url =
      type === "interest"
        ? `${import.meta.env.VITE_API_INTEREST_URL}/respond`
        : `${import.meta.env.VITE_API_CONNECT_URL}/respond`;

    try {
      await axios.post(
        url,
        { requestId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (type === "interest") {
        setInterestRequests((prev) =>
          prev.map((req) =>
            req._id === requestId ? { ...req, status: action } : req
          )
        );
      } else {
        setConnectRequests((prev) =>
          prev.map((req) =>
            req._id === requestId ? { ...req, status: action } : req
          )
        );
      }
    } catch (err) {
      console.error("Respond failed", err);
    }
  };

  const RequestCard = ({ data, type }) => (
    <div className="col-md-4">
      <div className="card shadow-sm h-100 border-0 rounded-4">
        <div className="card-body text-center">
          <FaUser size={40} className="mb-2 text-secondary" />
          <h5>
            {data.sender?.name}, {data.sender?.age}
          </h5>
          <p className="text-muted">{data.sender?.city}</p>
          <p>{data.sender?.bio || "No bio available."}</p>

          <span
            className={`badge mb-2 px-3 py-1 rounded-pill ${
              data.status === "accepted"
                ? "bg-success"
                : data.status === "rejected"
                ? "bg-danger"
                : "bg-warning text-dark"
            }`}
          >
            {data.status}
          </span>

          {data.status === "sent" && (
            <div className="d-flex justify-content-center gap-2 mt-2">
              <button
                className="btn btn-sm btn-outline-success"
                onClick={() => handleRespond(type, data._id, "accepted")}
              >
                ✅ Accept
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => handleRespond(type, data._id, "rejected")}
              >
                ❌ Reject
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">💌 Incoming Interest Requests</h2>

      {interestRequests.length === 0 ? (
        <p className="text-center text-muted">No interest requests.</p>
      ) : (
        <div className="row g-4">
          {interestRequests.map((req) => (
            <RequestCard key={req._id} data={req} type="interest" />
          ))}
        </div>
      )}

      <h2 className="text-center my-5">🔗 Incoming Connect Requests</h2>

      {connectRequests.length === 0 ? (
        <p className="text-center text-muted">No connect requests.</p>
      ) : (
        <div className="row g-4">
          {connectRequests.map((req) => (
            <RequestCard key={req._id} data={req} type="connect" />
          ))}
        </div>
      )}
    </div>
  );
}
