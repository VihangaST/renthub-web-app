import React from "react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/config";

export default function UserProfile() {
  const BASE_URL = "http://localhost:5000"; // Replace with your backend URL
  const username = localStorage.getItem("username"); // Retrieve username from localStorage
  const [userDetails, setUserDetails] = useState(null);
  const [isEditable, setIsEditable] = useState(false); // State to toggle editability
  const [updatedDetails, setUpdatedDetails] = useState({}); // State for edited details

  useEffect(() => {
    handleUserDetails();
  }, []);

  const handleUserDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/loginuserdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data);
        setUpdatedDetails(data); // Set editable fields with fetched data
        console.log("Server Response:", data);
      } else {
        alert("Failed to fetch user details.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleUpdateDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/updateuserdetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ username, ...updatedDetails }),
      });

      if (response.ok) {
        alert("Details updated successfully!");
        setIsEditable(false);
        handleUserDetails(); // Fetch updated details
      } else {
        alert("Failed to update details.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-h-screen p-10">
      {/* <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"> */}
        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
          {userDetails ? (
            <>
              <h2 className="text-2xl text-gray-800 font-bold">User Profile</h2>
              <div className="bg-gray-100 rounded-md p-4 mt-4">
                {/* <p className="text-sm text-gray-500 mt-4">Login ID: {userDetails.LoginName}</p> */}
              <div className="mt-4 flex w-full">
                <label className="text-left mt-2 w-2/3 block text-sm font-medium text-gray-700">LoginName</label>
                <input
                  type="text"
                  name="PhoneNo"
                  value={userDetails.LoginName || ""}
                  onChange={handleInputChange}
                  disabled={true}
                  className={`p-2 h-8 mt-1 bg-black block w-full rounded-md border ${
                    isEditable ? "border-blue-500" : "border-black"
                  } shadow-sm focus:ring-indigo-500 focus:border-indigo-500- sm:text-sm`}
                />
              </div>
              {/* <p className="text-sm text-gray-500 mt-1">Role: {userDetails.UserRole}</p> */}
              <div className="mt-4 flex w-full">
                <label className="text-left mt-2 w-2/3 block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  name="PhoneNo"
                  value={userDetails.UserRole || ""}
                  onChange={handleInputChange}
                  disabled={true}
                  className={`p-2 h-8 mt-1 bg-black block w-full rounded-md border ${
                    isEditable ? "border-blue-500" : "border-gray-300"
                  } shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
              </div>
              {/* Editable Fields */}
              <div className="mt-4 flex w-full">
                <label className="text-left mt-2 w-2/3 block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="text"
                  name="PhoneNo"
                  value={updatedDetails.PhoneNo || ""}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  className={`p-2 h-8 mt-1 bg-black block w-full rounded-md border ${
                    isEditable ? "border-blue-500" : "border-gray-300"
                  } shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
              </div>
              <div className="mt-4 flex w-full">
                <label className="text-left mt-2 w-2/3 block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="Email"
                  value={updatedDetails.Email || ""}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  className={`p-2 h-8 mt-1 bg-black block w-full rounded-md border ${
                    isEditable ? "border-blue-500" : "border-gray-300"
                  } shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
              </div>
              <div className="mt-4 flex w-full">
                <label className="text-left mt-2 w-2/3 block text-sm font-medium text-gray-700">Home Town</label>
                <input
                  type="text"
                  name="HomeTown"
                  value={updatedDetails.HomeTown || ""}
                  onChange={handleInputChange}
                  disabled={!isEditable}
                  className={`p-2 h-8 mt-1 bg-black block w-full rounded-md border ${
                    isEditable ? "border-blue-500" : "border-gray-300"
                  } shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                />
              </div>
              {/* Buttons */}
              <div className="mt-6 flex gap-4">
                {isEditable ? (
                  <>
                    <button
                      onClick={handleUpdateDetails}
                      className="bg-green-500 text-white px-6 py-2 rounded-lg"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditable(false)}
                      className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditable(true)}
                    className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                  >
                    Edit
                  </button>
                )}
              </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500 mt-4">Loading user details...</p>
          )}
        </div>
      {/* </div> */}
    </div>
  );
}

