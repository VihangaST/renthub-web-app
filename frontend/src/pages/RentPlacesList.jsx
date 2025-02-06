// import React from "react";

// export default function RentPlaceList() {
//   return (
//     <div className=" min-h-screen p-8">
//     {/* <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 min-h-screen p-8"> */}
//       <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Profile Card */}
//         <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
//           <img
//             src="https://via.placeholder.com/150"
//             alt="Profile"
//             className="rounded-full w-24 h-24 object-cover"
//           />
//           <h2 className="text-lg font-bold mt-4">Sami Rahman</h2>
//           <p className="text-sm text-gray-500 mt-1">
//             Last login: 07 Aug 2018, 15:44
//           </p>
//           <p className="text-sm text-gray-500">
//             Windows 10 pro, New York (US)
//           </p>
//           <p className="text-sm text-gray-500 mt-4">
//             +1 - 856-589-905-1236
//           </p>
//           <p className="text-sm text-gray-500">samirahman002@gmail.com</p>
//           <div className="flex items-center justify-between w-full mt-4">
//             <span className="text-sm font-medium">SMS alerts activation</span>
//             <span className="w-4 h-4 bg-green-500 rounded-full"></span>
//           </div>
//           <button className="bg-red-500 text-white px-6 py-2 rounded-lg mt-6">
//             Save
//           </button>
//         </div>

//         {/* xPay Accounts */}
//         {/* <div className="bg-white rounded-xl shadow-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-bold">My xPay accounts</h2>
//             <button className="text-gray-500 hover:text-black">
//               Edit
//             </button>
//           </div>
//           <div>
//             <p className="text-sm font-medium">Active account:</p>
//             <p className="text-sm text-gray-600">8649 5608 8009 6524</p>
//             <button className="bg-red-500 text-white text-sm px-4 py-1 rounded mt-2">
//               Block Account
//             </button>
//           </div>
//           <div className="mt-6">
//             <p className="text-sm font-medium">Blocked account:</p>
//             <p className="text-sm text-gray-600">7812 5896 1203 5842</p>
//             <button className="bg-green-500 text-white text-sm px-4 py-1 rounded mt-2">
//               Unblock Account
//             </button>
//           </div>
//         </div> */}

//         {/* My Bills */}
//         {/* <div className="bg-white rounded-xl shadow-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-bold">My bills</h2>
//             <button className="text-gray-500 hover:text-black">
//               Filter by
//             </button>
//           </div>
//           <ul className="space-y-3">
//             <li className="flex justify-between items-center">
//               <span>Phone bill</span>
//               <span className="bg-green-500 text-white text-xs px-3 py-1 rounded">
//                 Bill paid
//               </span>
//             </li>
//             <li className="flex justify-between items-center">
//               <span>Internet bill</span>
//               <span className="bg-red-500 text-white text-xs px-3 py-1 rounded">
//                 Not paid
//               </span>
//             </li>
//             <li className="flex justify-between items-center">
//               <span>House rent</span>
//               <span className="bg-green-500 text-white text-xs px-3 py-1 rounded">
//                 Bill paid
//               </span>
//             </li>
//             <li className="flex justify-between items-center">
//               <span>Income tax</span>
//               <span className="bg-green-500 text-white text-xs px-3 py-1 rounded">
//                 Bill paid
//               </span>
//             </li>
//           </ul>
//         </div> */}
//       </div>
//     </div>
//   );
// }

import React,{useEffect, useState} from "react";
import { BASE_URL } from "../constants/config";
import Property from "./Property";
import { useNavigate } from "react-router-dom";
// Example data for cards

export default function RentPlaceList() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [filteredProperties, setFilteredProperties] = useState([]); // State for filtered properties

    // const [properties, setProperties] = useState({
    //     list_ID:'',
    //     list_name:'',
    //     host_ID:'',
    //     host_name:'',
    //     neighbourhood:'',
    //     latitude:'',
    //     longitude:'',
    //     room_type:'',
    //     price:''
        
    // });

  const fetchPropertyList = async (e) => {
      // e.preventDefault();
          
          try {
          
              const response = await fetch(`${BASE_URL}/rentplaceslist`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  // 'Accept': 'application/json'
              },
              // body: JSON.stringify({}),
              });
      
              if (response.ok) {
                  const data = await response.json();
                  // alert(`Response: ${JSON.stringify(data)}`);
                  // alert(Response: ${JSON.stringify(data)});
                  localStorage.setItem('token', data.token);
                  // alert(token:${JSON.stringify(data.token)});
                  console.log("Server Response:", data);
                  console.log("data.properties",data.properties)
                  setProperties(data.properties);
                  // setProperties(data)
                  // login(data);
                  // navigate("/Dashboard/Charts")
                  // Assuming the fetched data is in the correct format (as an array of property objects)
              
              } else {
                  alert('unsuccessfully fetched');
                  // setValidationMessage({...validationMessage, password: 'Invalid Credentials' });
              }
          } catch (error) {
              alert(`Error: ${error.message}`);
              console.error('Error:', error);
          }
      };

  useEffect(() => {
      fetchPropertyList();
  }, []);

   // Filter properties when the search term changes
  useEffect(() => {
    const filtered = properties.filter((property) =>
      property.list_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProperties(filtered);
  }, [searchTerm, properties]);

  // Navigate to the details page of the selected property
  const handleMoreDetails = (propertyId) => {
    console.log(propertyId)
    navigate(`/property/${propertyId}`); // Navigate to the details page using the property ID
  };
  


  return (
    <div className="min-h-screen bg-gray-100 p-8 m-10">
     <div className="max-w-4xl mx-auto space-y-6">
      {/* Search Bar */}
      <input
          type="text"
          placeholder="Search by property name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        {/* Map over fetched properties to render each card */}
       {/* Map over filtered properties to render each card */}
       {filteredProperties.map((place, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-20"
          >
            <div className="flex-1">
              <h2 className="text-black text-lg font-bold">{place.list_name}</h2>
              <p className="text-sm text-gray-500 mt-1">
                Room Type: {place.room_type}
              </p>
            </div>
            <p className="text-sm text-gray-500 font-bold">Price: ${place.price}</p>
            <button className="bg-gray-600 text-white px-4 py-2 rounded-lg" 
              onClick={() => handleMoreDetails(place.list_ID)}>
              More details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
