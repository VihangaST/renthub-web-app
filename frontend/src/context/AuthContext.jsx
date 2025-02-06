// // // import { createContext, useContext, useEffect, useState } from "react";
// // // import PropTypes from "prop-types";
// // // import { BASE_URL } from "../constants/config";

// // // const AuthContext = createContext();

// // // export const AuthContextProvider = ({ children }) => {
// // //     const [menus, setMenus] = useState([]);
// // //     const [open, setOpen] = useState(false);
// // //     const [user, setUser] = useState(null); // State to hold user information



// // //     const login = (userMenus) => {
// // //     // setUser(userMenus); 
// // //     // Set menus based on the logged-in user
// // //     setMenus(userMenus);
// // //     setOpen(true); // Open the sidebar menu
// // //     };

// // //     const logout = () => {
// // //     // Clear menus on logout
// // //     setMenus([]);
// // //     };
// // //     useEffect(() => {
// // //     const fetchMenus = async () => {
// // //     try {
// // //     const token = localStorage.getItem('token')
// // //         const userId = 16; //admin
// // //         const response = await fetch(`${BASE_URL}/menu`, {
// // //         method: 'POST',
// // //         headers: {
// // //             'Content-Type': 'application/json',
// // //             'Authorization': `Bearer ${token}`
// // //         },
// // //         body: JSON.stringify({userId }),
// // //         });

// // //         if (!response.ok) {
// // //         throw new Error('Network response was not ok');
// // //         }

// // //         const data = await response.json();
// // //         console.log("🚀 ~ fetchMenus ~ data:", data)
// // //         setMenus(data);
// // //     } catch (error) {
// // //         console.error('Error fetching menus:', error);
// // //     }
// // //     };
// // //     if (!menus.length) {
// // //         fetchMenus();
// // //     }


// // //     }, [menus]);

// // //     return (
// // //     <AuthContext.Provider
// // //         value={{
// // //         menus,
// // //         setMenus,
// // //         open,
// // //         setOpen,
// // //         login,
// // //         logout,
// // //         user
// // //         }}
// // //     >
// // //         {children}
// // //     </AuthContext.Provider>
// // //     );
// // //     };

// // //     AuthContextProvider.propTypes = {
// // //     children: PropTypes.node.isRequired,
// // //     };

// // //     export default AuthContext;


// // import { createContext, useEffect, useState } from "react";
// // import PropTypes from "prop-types";
// // import { BASE_URL } from "../constants/config";
 
// // const AuthContext = createContext();
 
// // export const AuthContextProvider = ({ children }) => {
// //   const [menus, setMenus] = useState([]);
// //   const [open, setOpen] = useState(false);
// //   const [user, setUser] = useState(null); // State to hold user information



// //   const login = (userMenus) => {
// //   // setUser(userMenus); 
// //     // Set menus based on the logged-in user
// //     setMenus(userMenus);
// //     setOpen(true); // Open the sidebar menu
// //   };

// //   const logout = () => {
// //     // Clear menus on logout
// //     setMenus([]);
// //   };

// // //   const { setToastTitle, setToastVariant, setToastMessage, setShowToast } =
// // //     useContext(ToastContext);
// // //   const navigate = useNavigate();
// // //   const location = useLocation();
 
// // //   useEffect(() => {
// // //     const checkAuth = async () => {
// // //       setIsLoading(true);
// // //       const response = await checkUserAuthenticated();
// // //       console.log("🚀 ~ checkAuth ~ response:", response);
// // //       if (response.success) {
// // //         setIsAuthenticated(true);
// // //         setUserId(response.data.user_id);
// // //         if (location.pathname === "/login") {
// // //           setTimeout(() => {
// // //             navigate("/", { replace: true });
// // //           }, 500);
// // //         }
// // //       } else {
// // //         setIsAuthenticated(false);
// // //         navigate("/login", { replace: true });
// // //       }
 
// // //       setTimeout(() => {
// // //         setIsLoading(false);
// // //       }, 500);
// // //     };
 
// // //     checkAuth();
// // //   }, [location.pathname, navigate]);
 
// // //   const handleToast = (title, variant, message) => {
// // //     setToastTitle(title);
// // //     setToastVariant(variant);
// // //     setToastMessage(message);
// // //     setShowToast(true);
// // //   };
 
// //   useEffect(() => {
// //     const fetchMenus = async () => {
// //     try {
// //     const token = localStorage.getItem('token')
// //       const userId = 0; //admin
// //       const response = await fetch(`${BASE_URL}/menu`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: JSON.stringify({userId }),
// //       });

// //       if (!response.ok) {
// //         throw new Error('Network response was not ok');
// //       }

// //       const data = await response.json();
// //       // console.log("🚀 ~ fetchMenus ~ data:", data)
// //       setMenus(data);
// //     } catch (error) {
// //       // console.error('Error fetching menus:', error);
// //     }
// //   };
// //   if (!menus.length) {
// //       fetchMenus();
// //     }
    
    
// //   }, [menus]);
 
// //   return (
// //     <AuthContext.Provider
// //       value={{
// //         menus,
// //         setMenus,
// //         open,
// //         setOpen,
// //         login,
// //         logout,
// //         user
// //       }}
// //     >
// //       {children}
// //     </AuthContext.Provider>
// //   );
// // };
 
// // AuthContextProvider.propTypes = {
// //   children: PropTypes.node.isRequired,
// // };
 
// // export default AuthContext;


// import { createContext, useContext, useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { BASE_URL } from "../constants/config";
 
// const AuthContext = createContext();
 
// export const AuthContextProvider = ({ children }) => {
//   const [menus, setMenus] = useState([]);
//   const [open, setOpen] = useState(false);
//   const [user, setUser] = useState(null); // State to hold user information



//   const login = (userMenus) => {
//   // setUser(userMenus); 
//     // Set menus based on the logged-in user
//     setMenus(userMenus);
//     setOpen(true); // Open the sidebar menu
//   };

//   const logout = () => {
//     // Clear menus on logout
//     setMenus([]);
//   };

//   useEffect(() => {
//     const fetchMenus = async () => {
//     try {
//     const token = localStorage.getItem('token')
//       const userId = 0; //admin
//       const response = await fetch(`${BASE_URL}/menu`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ userId }),
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const data = await response.json();
//       // console.log("🚀 ~ fetchMenus ~ data:", data)
//       setMenus(data);
//     } catch (error) {
//       // console.error('Error fetching menus:', error);
//     }
//   };
//   if (!menus.length) {
//       fetchMenus();
//     }
    
    
//   }, [menus]);
 
//   return (
//     <AuthContext.Provider
//       value={{
//         menus,
//         setMenus,
//         open,
//         setOpen,
//         login,
//         logout,
//         user
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };
 
// AuthContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// };
 
// export default AuthContext;