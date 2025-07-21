
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Register from "./pages/register";
import Login from "./pages/login";
import Profile from "./pages/profile";
import Matches from "./pages/matches";
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from "./components/ProtectedRoute";
import MatchProfile from "./pages/matchprofile";
import ReceivedRequests from "./pages/request";
import YourMatches from "./pages/yourmatch";
import ChatPage from "./pages/Chat";

import AdminLogin from "./pages/adminlogin";
import AdminDashboard from "./pages/dashboard";
import AdminRoute from "./components/adminroute";
import AdminUserList from "./pages/adminuserlist";
import BlockedUser from "./pages/userblocked";


function App() {


  return (
    <>

      <BrowserRouter>

        <Navbar />
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/matches" element={<ProtectedRoute><Matches /></ProtectedRoute>} />
          <Route path="/profile/:id" element={<ProtectedRoute><MatchProfile /></ProtectedRoute>} />
          <Route path="/requests" element={<ProtectedRoute><ReceivedRequests /></ProtectedRoute>} />
          <Route path="/yourmatch" element={<ProtectedRoute><YourMatches /></ProtectedRoute>} />
          <Route path="/chat/:id" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminUserList />} />
          <Route path="/blocked-user" element={<BlockedUser />} />

        </Routes>


      </BrowserRouter>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  )
}

export default App
