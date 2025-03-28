import React from "react";
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/config";

export default function OwnerProfile() {
    const username = localStorage.getItem("username"); // Retrieve username from localStorage
    const userID = localStorage.getItem("userID"); // Retrieve userID from localStorage
    const [userDetails, setUserDetails] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState();
    const [expandedProperty, setExpandedProperty] = useState(null);
    const [userProperties, setUserProperties] = useState([]);
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

    // update owner profile details
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

    // fetch owner property details
    const fetchOwnerProperties = async () => {
        try {
        const response = await fetch(`${BASE_URL}/getownerpropertiesdetails`, {
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


    const handleDoubleClick = (property = null) => {
        if (property) {
            setFormData(property); // Edit existing property
        } else {
            handleAddNewProperty(); // Create a new property
        }
        setIsModalOpen(true);
    };
    // Create a new property with default values
    const handleAddNewProperty = () => {
        setFormData({
            list_ID: null, // Null ID means it's a new property
            list_name: "",
            price: "",
            // latitude: "",
            // longitude: "",
            neighbourhood: "",
            room_type: "",
            property_type: "",
            accommodates: "",
            bathrooms_text: "",
            bedrooms: "",
            beds: "",
            amenities: "",
            description: "",
        });
    };
    const roomTypes = ["Entire home/apt", "Private room", "Hotel room", "Shared room"];
    const neighbourhoods = [
        "Molenbeek-Saint-Jean", "Bruxelles", "Etterbeek", "Saint-Gilles", "Ixelles",
        "Schaerbeek", "Forest", "Saint-Josse-ten-Noode", "Uccle", "Auderghem",
        "Woluwe-Saint-Lambert", "Anderlecht", "Woluwe-Saint-Pierre",
        "Watermael-Boitsfort", "Evere", "Koekelberg", "Jette",
        "Berchem-Sainte-Agathe", "Ganshoren"
    ];
    const bathroomOptions = [
        "1 bath", "1.5 baths", "1 private bath", "1 shared bath", "2 baths",
        "0 shared baths", "Shared half-bath", "2.5 baths", "1.5 shared baths",
        "3 baths", "3.5 baths", "4.5 baths", "11 baths", "Half-bath",
        "2 shared baths", "3 shared baths", "2.5 shared baths"
    ];
    const propertyTypes = [
        "Entire rental unit", "Entire condo", "Entire loft",
        "Private room in rental unit", "Private room in home",
        "Private room in townhouse", "Private room in bed and breakfast",
        "Private room in condo", "Entire home", "Entire serviced apartment",
        "Entire townhouse", "Private room in loft", "Room in bed and breakfast",
        "Private room in guest suite", "Private room in villa",
        "Private room in guesthouse", "Tiny home", "Private room in nature lodge",
        "Room in aparthotel", "Private room in barn",
        "Private room in serviced apartment", "Entire guesthouse",
        "Entire guest suite", "Shared room in condo", "Shared room", "Private room",
        "Shared room in rental unit", "Private room in farm stay", "Barn",
        "Entire villa", "Entire vacation home"
    ];
    
    const handlePropertyInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    // Update property details
    const handleUpdatePropertyDetails = async () => {
        const isNew = formData.list_ID === null;

        console.log("Form Data:", formData);
        console.log(username)
        try {
        const response = await fetch(`${BASE_URL}/updatepropertydetails`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify({ ...formData, host_ID: userID ,host_name:username}),
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
    const toggleExpand = (propertyID) => {
        setExpandedProperty(expandedProperty === propertyID ? null : propertyID);
    };

    
    return (
        <div className="flex bg-gray-200 rounded-lg max-h-full p-10 gap-5">
            {/* Profile Card */}
            <div className="w-3/5 bg-white rounded-xl shadow-lg p-5 flex flex-col items-center">
            {userDetails ? (
                <>
                <h2 className="text-lg text-gray-800 font-bold">User Profile</h2>
                {/* <p className="text-sm text-gray-500 mt-4">Login ID: {userDetails.LoginName}</p> */}
                <div className="mt-4 flex w-full">
                    <label className="text-left mt-2 w-2/3 block text-sm font-medium text-gray-700">Login Name</label>
                    <input
                    type="text"
                    name="PhoneNo"
                    value={userDetails.LoginName || ""}
                    onChange={handleInputChange}
                    disabled={true}
                    className={`bg-black p-2 h-8 mt-1 block w-full rounded-md border ${
                        isEditable ? "border-blue-500" : "border-gray-300"
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
                    className={`bg-black p-2 h-8 mt-1 block w-full rounded-md border ${
                        isEditable ? "border-blue-500" : "border-gray-300"
                    } shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                    />
                </div>

                {/* Editable Fields */}
                <div className="mt-4 flex w-full">
                    <label className="text-left mt-2 w-2/3 block text-sm font-medium text-gray-700">Phone No:</label>
                    <input
                    type="text"
                    name="PhoneNo"
                    value={updatedDetails.PhoneNo || ""}
                    onChange={handleInputChange}
                    disabled={!isEditable}
                    className={`bg-black p-2 h-8 mt-1 block w-full rounded-md border ${
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
                    className={`bg-black p-2 h-8 mt-1 block w-full rounded-md border ${
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
                    className={`bg-black p-2 h-8 mt-1 block w-full rounded-md border ${
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
                        className="bg-blue-500 text-white px-6 py-2 rounded-lg"
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
                        className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
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
            {/* right part */}
            <div className="w-2/3 p-4 bg-white rounded-xl">
                <h2 className="text-lg font-bold text-gray-500 mb-4">Owner Properties</h2>
                <div className="flex grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                {userProperties.map((property) => {
                        const isExpanded = expandedProperty === property.list_ID;
                        return (
                            <div
                                key={property.list_ID}
                                onDoubleClick={() => handleDoubleClick(property)}
                                className="border text-gray-600 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                            >
                            <h3 className="text-gray-700 text-lg mb-5 font-semibold">{property.list_name}</h3>
                                <div className="grid grid-cols-2 gap-x-2 ml-10 mr-10">
                                    <p className="font-bold text-left">Neighbourhood:</p>
                                    <p className="text-left">{property.neighbourhood}</p>

                                    <p className="font-bold text-left">Room Type:</p>
                                    <p className="text-left">{property.room_type}</p>

                                    <p className="font-bold text-left">Price:</p>
                                    <p className="text-left">${property.price}</p>

                                    <p className="font-bold text-left">Property Type:</p>
                                    <p className="text-left">{property.property_type}</p>

                                    <p className="font-bold text-left">Accommodates:</p>
                                    <p className="text-left">{property.accommodates}</p>

                                    <p className="font-bold text-left">Bathrooms:</p>
                                    <p className="text-left">{property.bathrooms_text}</p>

                                    <p className="font-bold text-left">Bedrooms:</p>
                                    <p className="text-left">{property.bedrooms}</p>

                                    <p className="font-bold text-left">Beds:</p>
                                    <p className="text-left">{property.beds}</p>

                                    </div>
                                {/* Expandable Section */}
                                {isExpanded && (
                                <div className="grid grid-cols-2 gap-x-2 ml-10 mr-10">     
                                    <p className="font-bold text-left">Amenities:</p>
                                    <p className="text-left">{property.amenities}</p>                            
                                    <p className="font-bold text-left">Description:</p>
                                    <p className="text-left">{property.description}</p>
                                    
                                </div>
                                )}
                                {/* See More / See Less Button */}
                                <a
                                    onClick={() => toggleExpand(property.list_ID)}
                                    className="underline"
                                >
                                    {isExpanded ? "See Less" : "See More"}
                                </a>
                            </div>
                        );
                    })}
                </div>    
                <button
                onClick={() => handleDoubleClick(null)}
                className="px-4 py-2 bg-blue-500 m-2 rounded hover:bg-blue-600">Add New</button>       

                {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1084">
                        <h3 className="text-xl text-black font-bold mb-4">Edit Property</h3>
                        <div className="flex gap-10 width-full">
                        <div>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center text-black">Name:</label>
                            <input
                                type="text"
                                name="list_name"
                                value={formData.list_name}
                                onChange={handlePropertyInputChange}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center text-black">Price:</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handlePropertyInputChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center text-black">Neighbourhood:</label>
                            <select
                                name="neighbourhood"
                                value={formData.neighbourhood}
                                onChange={handlePropertyInputChange}
                                className="w-full border rounded p-2"
                            >
                                <option value="">Select Neighbourhood</option>
                                {neighbourhoods.map((neighbourhood) => (
                                    <option key={neighbourhood} value={neighbourhood}>
                                        {neighbourhood}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center text-black">Property type:</label>
                            <select
                                name="property_type"
                                value={formData.property_type}
                                onChange={handlePropertyInputChange}
                                className="w-full border rounded p-2"
                            >
                                <option value="">Select Property Type</option>
                                {propertyTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                        </div>

                    <div> 
                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center text-black">Room type:</label>
                            <select
                                name="room_type"
                                value={formData.room_type}
                                onChange={handlePropertyInputChange}
                                className="w-full border rounded p-2"
                            >
                                <option value="">Select Room Type</option>
                                {roomTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center text-black">Accommodates:</label>
                            <input
                                type="number"
                                name="accommodates"
                                value={formData.accommodates}
                                onChange={handlePropertyInputChange}
                                className="w-full border rounded p-2"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                        <label className="flex items-center text-black">Bathrooms:</label>
                        <select
                            name="bathrooms_text"
                            value={formData.bathrooms_text}
                            onChange={handlePropertyInputChange}
                            className="w-full border rounded p-2"
                        >
                            <option value="">Select Bathroom Type</option>
                            {bathroomOptions.map((option) => (
                                <option key={option} value={option}>
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center text-black">Bedrooms:</label>
                            <input
                                type="number"
                                name="bedrooms"
                                value={formData.bedrooms}
                                onChange={handlePropertyInputChange}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center text-black">Beds:</label>
                            <input
                                type="number"
                                name="beds"
                                value={formData.beds}
                                onChange={handlePropertyInputChange}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center text-black">Amenities:</label>
                            <input
                                type="text"
                                name="amenities"
                                value={formData.amenities}
                                onChange={handlePropertyInputChange}
                                className="w-full border rounded p-2"
                            />
                        </div>

                        </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <label className="flex items-center text-black">Description:</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handlePropertyInputChange}
                                className="w-full border rounded p-2 col-span-2"
                                rows="4" // Adjust the number of rows as needed
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
        </div>
    );
    }

