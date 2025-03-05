import React from "react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/config";

export default function OwnerProfile() {
    // const BASE_URL = "http://localhost:5000"; // Replace with your backend URL
    const username = localStorage.getItem("username"); // Retrieve username from localStorage
    const userID = localStorage.getItem("userID"); // Retrieve userID from localStorage
    const [userDetails, setUserDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState();

    //for properties of user
    const [userProperties, setUserProperties] = useState([]);
    // const [updateUserProperties, setUpdateUserProperties] = useState({});

    const [isEditable, setIsEditable] = useState(false); // State to toggle editability
    const [updatedDetails, setUpdatedDetails] = useState({}); // State for edited details

    useEffect(() => {
        fetchUserDetails();
        fetchOwnerProperties();
    }, []);

    const fetchUserDetails = async () => {
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
            fetchUserDetails(); // Fetch updated details
        } else {
            alert("Failed to update details.");
        }
        } catch (error) {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
        }
    };

    const fetchOwnerProperties = async () => {
        try {
        const response = await fetch(`${BASE_URL}/ownerproperties`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify({ userID }),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Server Response:", data);
            setUserProperties(data);
            // setUpdateUserProperties(data); // Set editable fields with fetched data
            
            console.log("Server Response:", data);
        } else {
            alert("Failed to fetch user details.");
        }
        } catch (error) {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
        }
    };

    const handleDoubleClick = (property) => {
        // setSelectedProperty(property);
        setFormData(property);
        setIsModalOpen(true);
    };

    const handlePropertyInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdatePropertyDetails = async () => {
        try {
        const response = await fetch(`${BASE_URL}/updateownerdetails`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify({ formData }),
        });

        if (response.ok) {
            alert("Details updated successfully!");
            setIsEditable(false);
            fetchOwnerProperties(); // Fetch updated details
            setIsModalOpen(false);
        } else {
            alert("Failed to update details.");
        }
        } catch (error) {
        console.error("Error:", error);
        alert(`Error: ${error.message}`);
        }
    };



    return (
        <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 max-h-screen p-10">
        {/* <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8"> */}
            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-lg p-10 flex flex-col items-center">
            {userDetails ? (
                <>
                <h2 className="text-lg text-gray-800 font-bold mt-4">User Profile</h2>
                {/* <p className="text-sm text-gray-500 mt-4">Login ID: {userDetails.LoginName}</p> */}
                <div className="mt-4 flex w-full">
                    <label className="mt-2 w-2/3 block text-sm font-medium text-gray-700">LoginName</label>
                    <input
                    type="text"
                    name="PhoneNo"
                    value={userDetails.LoginName || ""}
                    onChange={handleInputChange}
                    disabled={true}
                    className={`p-2 h-8 mt-1 block w-full rounded-md border ${
                        isEditable ? "border-blue-500" : "border-gray-300"
                    } shadow-sm focus:ring-indigo-500 focus:border-indigo-500- sm:text-sm`}
                    />
                </div>
                {/* <p className="text-sm text-gray-500 mt-1">Role: {userDetails.UserRole}</p> */}
                <div className="mt-4 flex w-full">
                    <label className="mt-2 w-2/3 block text-sm font-medium text-gray-700">Role</label>
                    <input
                    type="text"
                    name="PhoneNo"
                    value={userDetails.UserRole || ""}
                    onChange={handleInputChange}
                    disabled={true}
                    className={`p-2 h-8 mt-1 block w-full rounded-md border ${
                        isEditable ? "border-blue-500" : "border-gray-300"
                    } shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />
                </div>

                {/* Editable Fields */}
                <div className="mt-4 flex w-full">
                    <label className="mt-2 w-2/3 block text-sm font-medium text-gray-700">Phone Number</label>
                    <input
                    type="text"
                    name="PhoneNo"
                    value={updatedDetails.PhoneNo || ""}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                    className={`p-2 h-8 mt-1 block w-full rounded-md border ${
                        isEditable ? "border-blue-500" : "border-gray-300"
                    } shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />
                </div>
                <div className="mt-4 flex w-full">
                    <label className="mt-2 w-2/3 block text-sm font-medium text-gray-700">Email</label>
                    <input
                    type="email"
                    name="Email"
                    value={updatedDetails.Email || ""}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                    className={`p-2 h-8 mt-1 block w-full rounded-md border ${
                        isEditable ? "border-blue-500" : "border-gray-300"
                    } shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />
                </div>
                <div className="mt-4 flex w-full">
                    <label className="mt-2 w-2/3 block text-sm font-medium text-gray-700">Home Town</label>
                    <input
                    type="text"
                    name="HomeTown"
                    value={updatedDetails.HomeTown || ""}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                    className={`p-2 h-8 mt-1 block w-full rounded-md border ${
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
                </>
            ) : (
                <p className="text-sm text-gray-500 mt-4">Loading user details...</p>
            )}
            </div>


            <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Owner Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userProperties.map((property) => (
                <div
                    key={property.list_ID}
                    onDoubleClick={() => handleDoubleClick(property)}
                    className="border p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                >
                    <h3 className="text-xl font-semibold">{property.list_name}</h3>
                    <p>Latitude: {property.latitude}</p>
                    <p>Longitude: {property.longitude}</p>
                    <p>Minimum nights: {property.minmum_nights}</p>
                    <p>Neighbourhood: {property.neighbourhood}</p>
                    <p>Room type: {property.room_type}</p>
                    <p>Price: ${property.price}</p>

                </div>
                ))}
            </div>

            {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-xl text-black font-bold mb-4">Edit Property</h3>

                <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center text-black">Name:</label>
                    <input
                        type="text"
                        name="list_name"
                        value={formData.list_name}
                        onChange={handleInputChange}
                        className="w-full border rounded p-2"
                    />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center text-black">
                    Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handlePropertyInputChange}
                        className="w-100 border rounded p-2"
                    />
                    
                    </div>
                

                    <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center text-black">
                    Latitude:
                    </label>
                    <input
                        type="number"
                        name="latitude"
                        value={formData.latitude}
                        onChange={handlePropertyInputChange}
                        className="w-full border rounded p-2"
                    />
                    </div>
                
                    <div className="grid grid-cols-2 gap-4">
            
                    <label className="flex items-center text-black">
                    Longitude:
                    </label>
                    <input
                        type="number"
                        name="longitude"
                        value={formData.longitude}
                        onChange={handlePropertyInputChange}
                        className="w-full border rounded p-2"
                    />
                    
                

                    </div>
                    <div className="grid grid-cols-2 gap-4">

                    <label className="flex items-center text-black">
                    Minimum nights:</label>
                    <input
                        type="number"
                        name="minmum_nights"
                        value={formData.minmum_nights}
                        onChange={handlePropertyInputChange}
                        className="w-full border rounded p-2"
                    />
                    
                    </div>

                

                    <div className="grid grid-cols-2 gap-4">

                    <label className="flex items-center text-black">
                    Neighbourhood: </label>
                    <input
                        type="text"
                        name="neighbourhood"
                        value={formData.neighbourhood}
                        onChange={handlePropertyInputChange}
                        className="w-full border rounded p-2"
                    />
                   
                
                    </div>

                    <div className="grid grid-cols-2 gap-4">

                    <label className="flex items-center text-black">
                    Room type:
                    </label>
                    <input
                        type="text"
                        name="room_type"
                        value={formData.room_type}
                        onChange={handlePropertyInputChange}
                        className="w-full border rounded p-2"
                    />
                
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdatePropertyDetails}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save
                    </button>
                    </div>
                </div>
                </div>
            )}
            </div>


        {/* </div> */}
        </div>
    );
    }

