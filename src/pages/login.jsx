
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };



    const { login } = useAuth(); // 👈 use login from context

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, formData);
            toast.success(res.data.message);

            // ✅ Use context to set user + token globally
            login(res.data.user, res.data.token);

            // ✅ Redirect to home
            navigate("/");
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
            navigate("/blocked-user");
        }
    };


    return (
        <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h2 className="mb-4 text-center">Login</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>

                                    <div className="d-grid">
                                        <button type="submit" className="btn btn-primary">Login</button>
                                    </div>
                                </form>

                                <p className="mt-3 text-center">
                                    Don't have an account? <Link to="/register">Register here</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

