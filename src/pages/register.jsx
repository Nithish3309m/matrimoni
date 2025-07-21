
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        age: '',
        gender: '',
        city: '',
        religion: '',
        bio: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/register`, formData);
            toast.success(res.data.message); // ✅ Correct way
            navigate('/login');              // ✅ Correct spelling and usage
        } catch (err) {
            toast.error(err.response?.data?.message || "Registration failed");
        }
    }


    return (
        <div className="bg-light min-vh-100 d-flex justify-content-center align-items-center">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-lg">
                            <div className="card-body">
                                <h2 className="mb-4 text-center">Register</h2>
                                <form onSubmit={handleSubmit} className="row g-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className="form-control" name="name" onChange={handleChange} required />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" name="email" onChange={handleChange} required />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label">Password</label>
                                        <input type="password" className="form-control" name="password" onChange={handleChange} required />
                                    </div>

                                    <div className="col-md-3">
                                        <label className="form-label">Age</label>
                                        <input type="number" className="form-control" name="age" onChange={handleChange} required />
                                    </div>

                                    <div className="col-md-3">
                                        <label className="form-label">City</label>
                                        <input type="text" className="form-control" name="city" onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Religion</label>
                                        <input type="text" className="form-control" name="religion" onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Education</label>
                                        <input type="text" className="form-control" name="education" onChange={handleChange} />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Job</label>
                                        <input type="text" className="form-control" name="job" onChange={handleChange} />
                                    </div>

                                    <div className="col-md-6">
                                        <label className="form-label d-block">Gender</label>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" value="male" onChange={handleChange} />
                                            <label className="form-check-label">Male</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="gender" value="female" onChange={handleChange} />
                                            <label className="form-check-label">Female</label>
                                        </div>
                                    </div>





                                    <div className="col-12">
                                        <label className="form-label">Short Bio</label>
                                        <textarea className="form-control" name="bio" rows="3" onChange={handleChange}></textarea>
                                    </div>
                                    <div className="col-12 text-center">
                                        <button type="submit" className="btn btn-primary w-50">Register</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <p className="text-center mt-3">Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );



}

