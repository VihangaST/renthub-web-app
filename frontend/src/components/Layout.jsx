// import React, { useEffect, useState } from 'react'
// import { useLocation } from 'react-router-dom';
// // import Sidebar from './SideBar';
// import Navbar from './Navbar';
// const Layout = ({children}) => {

// const location = useLocation()

// return (

//     <div className="flex w-screen h-screen antialiased text-gray-900 bg-gray-100 dark:bg-dark dark:text-light">
//     {/* {location.pathname !=='/login' && <Sidebar/>  } */}
//         <main className="flex-1 overflow-auto">
//     {/* {location.pathname !=='/login' && <Navbar/>} */}
//     <Navbar/>
//     {children}
//     </main>
// </div>

// )
// }

// export default Layout

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";

function App() {
  const location = useLocation();
  const excludeNavbarRoutes = ["/login", "/signup"];

  return (
    <div>
      {/* Conditionally render Navbar */}
      {!excludeNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default function MainApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
