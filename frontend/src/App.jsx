// import { useState } from 'react'
// import { BrowserRouter, Routes, Route,useLocation } from 'react-router-dom'
// // import {AuthContextProvider} from './context/AuthContext'

// import './App.css'
// import LoginPage from './pages/LoginPage'
// import Dashboard from './pages/Dashboard'
// import SignupPage from './pages/SignupPage'
// // import Property from './pages/Property'
// // import Layout from './components/Layout'
// import Navbar from './components/Navbar'

// function App() {
//   const location = useLocation();

//   const excludeNavbarRoutes = ["/login", "/signup"];



//   return (
//     <>
//      {/* <BrowserRouter> */}
//      {/* <AuthContextProvider>
//       <Layout> */}
//       {!excludeNavbarRoutes.includes(location.pathname) && <Navbar />}

//      <Routes>

//       <Route path="/login" element={<LoginPage />} />
//       <Route path='/signup' element={<SignupPage />} />
//       <Route path="/dashboard" element={<Dashboard />} />
//       {/*} />
//       <Route path='/signup' element={<SignupPage />} />
//       <Route path='/property' element={<Property/>} />
//       <Route path='/Navbar' element={<Navbar/>} /> */}
      
//      </Routes>
//      {/* </Layout>
     
//      </AuthContextProvider> */}
//      {/* </BrowserRouter> */}
//     </>
//   )
// }

// export default App


import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import SignupPage from './pages/SignupPage';
import Navbar from './components/Navbar';
import UserProfile from './pages/UserProfile';
import RentPlaceList from './pages/RentPlacesList';
import Property from './pages/Property';
import OwnerProfile from './pages/ownerProfile';
import OwnerBookingsPage from './pages/OwnerBookingsPage';
import OwnerPricePredictions from './pages/OwnerPricePredictions';

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

function AppContent() {
  const location = useLocation();
  const excludeNavbarRoutes = ["/login", "/signup"];

  return (
    <>
      {!excludeNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userprofile" element={<UserProfile/>} />
        <Route path="/rentplacelist" element={<RentPlaceList/>} />
        <Route path="/property/:propertyId" element={<Property/>}/>
        <Route path="/propertyownerprofile" element={<OwnerProfile/>} /> 
        <Route path='/bookings' element={<OwnerBookingsPage/>} />
        <Route path='/price' element={<OwnerPricePredictions/>} />
      </Routes>
    </>
  );
}

export default App;
