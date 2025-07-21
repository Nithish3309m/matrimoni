import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Profile() {



  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    age: "",
    gender: "",
    city: "",
    education: "",
    job: "",
    religion: "",
    bio: "",
    preference: "",
    ageMin: "",
    ageMax: "",
    cityPreference: "",
    language: "",
    lookingFor: " ",
    hobbies: "",
    image: null,
    imagePreview: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(`${import.meta.env.VITE_API_PROFILE_URL}/update`, data, {
        headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}`}
      });
      
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }


  };


  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_PROFILE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = res.data.user;

        setFormData((prev) => ({
          ...prev,
          ...user,
          imagePreview: user.image
            ? `${import.meta.env.VITE_BACKEND_URL}/${user.image}`
            : "",
        }));


      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };

    fetchProfile();
  }, []);



  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center">My Profile</h2>

      <form onSubmit={handleSubmit} className="row g-4">
        {/* 👤 Personal Info Card */}
        <div className="col-12 text-center">
          <div className="mb-3">
            <img
              src={formData.imagePreview || "https://via.placeholder.com/120"}
              alt="Profile"
              className="rounded-circle"
              width="120"
              height="120"
              style={{ objectFit: "cover", border: "3px solid #ccc" }}
            />
          </div>
          <div className="mb-4">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setFormData((prev) => ({
                    ...prev,
                    image: file,
                    imagePreview: URL.createObjectURL(file)
                  }));
                }
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">Personal Information</div>
            <div className="card-body">

              <label className="form-label">Full Name</label>
              <input type="text" className="form-control mb-2" name="name" value={formData.name} onChange={handleChange} />

              <label className="form-label">Email</label>
              <input type="email" className="form-control mb-2" name="email" value={formData.email} onChange={handleChange} />
              <label className="form-label">Password</label>
              <input type="password" className="form-control mb-2" name="password" value={formData.password} onChange={handleChange} />

              <label className="form-label">Age</label>
              <input type="number" className="form-control mb-2" name="age" value={formData.age} onChange={handleChange} />

              <label className="form-label">Gender</label>
              <select className="form-select mb-2" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <label className="form-label">City</label>
              <input type="text" className="form-control mb-2" name="city" value={formData.city} onChange={handleChange} />

              <label className="form-label">Education</label>
              <input type="text" className="form-control mb-2" name="education" value={formData.education} onChange={handleChange} />

              <label className="form-label">Job</label>
              <input type="text" className="form-control mb-2" name="job" value={formData.job} onChange={handleChange} />

              <label className="form-label">Religion</label>
              <input type="text" className="form-control mb-2" name="religion" value={formData.religion} onChange={handleChange} />

              <label className="form-label">Bio</label>
              <textarea className="form-control" name="bio" rows="2" value={formData.bio} onChange={handleChange}></textarea>
            </div>
          </div>
        </div>

        {/* 💘 Partner Preferences Card */}
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white">Partner Preferences</div>
            <div className="card-body">

              <label className="form-label">Looking for (Gender)</label>
              <select className="form-select mb-2" name="preference" value={formData.preference} onChange={handleChange}>
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <div className="d-flex gap-2 mb-2">
                <div className="flex-fill">
                  <label className="form-label">Min Age</label>
                  <input type="number" className="form-control" name="ageMin" value={formData.ageMin} onChange={handleChange} />
                </div>
                <div className="flex-fill">
                  <label className="form-label">Max Age</label>
                  <input type="number" className="form-control" name="ageMax" value={formData.ageMax} onChange={handleChange} />
                </div>
              </div>

              <label className="form-label">Preferred City</label>
              <input type="text" className="form-control mb-2" name="cityPreference" value={formData.cityPreference} onChange={handleChange} />

              <label className="form-label">Language</label>
              <input type="text" className="form-control mb-2" name="language" value={formData.language} onChange={handleChange} />

              <label className="form-label">Looking For</label>
              <input type="text" className="form-control mb-2" name="lookingFor" value={formData.lookingFor} onChange={handleChange} />

              <label className="form-label">Hobbies</label>
              <input type="text" className="form-control" name="hobbies" value={formData.hobbies} onChange={handleChange} />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="col-12 text-center mt-3">
          <button type="submit" className="btn btn-success px-5">Update Profile</button>
        </div>
      </form>
    </div>
  );
}
