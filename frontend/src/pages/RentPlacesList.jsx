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
    <>
    <h1 className="mt-10 text-2xl md:text-3xl text-primary-light dark:text-primary-lighter font-bold">Rent Places</h1>
            
    <div className="min-h-screen bg-gray-100 p-8 mt-8 rounded">
     <div className="max-w-4xl mx-auto space-y-6 rounded">
      {/* Search Bar */}
      <input
          type="text"
          placeholder="Search by property name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
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
    </>
    
  );
}
