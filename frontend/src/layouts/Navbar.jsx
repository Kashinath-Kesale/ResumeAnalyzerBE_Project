// src/layouts/Navbar.jsx
import { Bell, Search, Menu, User } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api.js";

const Navbar = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userAvatar, setUserAvatar] = useState(null);
  const [userName, setUserName] = useState("");
  const [avatarError, setAvatarError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const role = localStorage.getItem("role");
        if (role === "candidate") {
          const res = await api.get("/candidate/profile");
          const candidate = res.data?.candidate;
          if (candidate?.avatarUrl) {
            setUserAvatar(candidate.avatarUrl.startsWith('http') 
              ? candidate.avatarUrl 
              : `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'}${candidate.avatarUrl}`);
          }
          setUserName(candidate?.userId?.name || candidate?.name || "");
        }
      // eslint-disable-next-line no-unused-vars
      } catch (err) {
        console.log("Could not load user profile");
      }
    };
    fetchUserProfile();
  }, []);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white shadow flex items-center justify-between px-4 z-40">
      {/* Left: Hamburger for mobile */}
      <button onClick={toggleSidebar} className="md:hidden">
        <Menu />
      </button>

      {/* Center: Search */}
      <div className="flex-1 flex justify-center">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search jobs, companies..."
            className="w-full px-4 py-2 border rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={18} />
        </div>
      </div>

      {/* Right: Notifications + Avatar */}
      <div className="flex items-center gap-6 relative">
        {/* Notification bell with badge */}
        <div className="relative cursor-pointer">
          <Bell />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </div>

        {/* Avatar with dropdown */}
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full border border-gray-300 bg-gray-100 cursor-pointer flex items-center justify-center"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            {userAvatar && !avatarError ? (
              <img
                src={userAvatar}
                alt="user"
                className="w-full h-full rounded-full object-cover"
                onError={() => setAvatarError(true)}
              />
            ) : (
              userName ? (
                <span className="text-sm font-semibold text-gray-600">
                  {userName.split(' ').filter(Boolean).map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                </span>
              ) : (
                <User size={20} className="text-gray-400" />
              )
            )}
          </div>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg p-2">
              <Link
                to="/candidate/profile"
                className="block px-4 py-2 rounded hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/candidate/settings"
                className="block px-4 py-2 rounded hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Settings
              </Link>
              <button
                className="w-full text-left px-4 py-2 rounded hover:bg-gray-100 text-red-500"
                onClick={() => {
                  setDropdownOpen(false);
                  onLogout();
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
