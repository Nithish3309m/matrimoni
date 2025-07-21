import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ On app load, validate token with backend
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios.get(`${import.meta.env.VITE_API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      })
      .catch((err) => {
        console.warn("Token invalid or expired. Logging out.");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
      });
    }
  }, []);

  // ✅ Login function
  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook to use auth context
export const useAuth = () => useContext(AuthContext);
