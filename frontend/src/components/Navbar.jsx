import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const roleID = localStorage.getItem("roleID");

  const handleLogout = () => {
    // Clear user authentication data (e.g., token)
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userID");
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* <div className="flex justify-between items-center space-x-60"> */}
        {/* Left: Logo */}
        <h1 className="text-xl font-bold">Renthub</h1>

        {/* Center: Navigation Links */}

        {roleID==='1' ? (
        <div className="space-x-24">
          <a
            href="/propertyownerprofile"
            className="text-gray-400 hover:text-gray-100 transition duration-200"
          >
            Property Owner Profile
          </a>
          <a
            href="/bookings"
            className="text-gray-400 hover:text-gray-100 transition duration-200"
          >
            Bookings
          </a>
          <a
            href="/price"
            className="text-gray-400 hover:text-gray-100 transition duration-200"
          >
            Prices
          </a>
          <a
            href="/reviews"
            className="text-gray-400 hover:text-gray-100 transition duration-200"
          >
            Reviews
          </a>
      </div>

        ):(
          <div className="space-x-24">
            <a
              href="/userprofile"
              className="text-gray-400 hover:text-gray-100 transition duration-200"
            >
              User Profile
            </a>
            <a
              href="/rentplacelist"
              className="text-gray-400 hover:text-gray-100 transition duration-200"
            >
              Rent places
            </a>
        </div>
        )}
       

        {/* Right: Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
        >
          Logout
        </button>
      {/* </div> */}
    </nav>
  );
}
