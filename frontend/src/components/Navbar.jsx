// import React, { useState, useEffect,useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthContext from '../context/AuthContext';

// const getTheme = () => {
// if (window.localStorage.getItem('dark')) {
// return JSON.parse(window.localStorage.getItem('dark'));
// }
// return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
// };

// const setTheme = (value) => {
// window.localStorage.setItem('dark', value);
// };

// const getColor = () => {
// return window.localStorage.getItem('color') ?? 'cyan';
// };

// // const setColors = (color) => {
// // const root = document.documentElement;
// // root.style.setProperty('--color-primary', var(--color-${color}));
// // root.style.setProperty('--color-primary-50', var(--color-${color}-50));
// // root.style.setProperty('--color-primary-100', var(--color-${color}-100));
// // root.style.setProperty('--color-primary-light', var(--color-${color}-light));
// // root.style.setProperty('--color-primary-lighter', var(--color-${color}-lighter));
// // root.style.setProperty('--color-primary-dark', var(--color-${color}-dark));
// // root.style.setProperty('--color-primary-darker', var(--color-${color}-darker));
// // window.localStorage.setItem('color', color);
// // };

// const cssColors = (color) => {
// return getComputedStyle(document.documentElement).getPropertyValue(color).trim();
// };

// // const getColors = () => {
// // const color = getColor();
// // return {
// // primary: cssColors(--color-${color}),
// // primaryLight: cssColors(--color-${color}-light),
// // primaryLighter: cssColors(--color-${color}-lighter),
// // primaryDark: cssColors(--color-${color}-dark),
// // primaryDarker: cssColors(--color-${color}-darker),
// // };
// // };

// const Navbar = () => {
// const [isSettingsOpen, setIsSettingsOpen] = useState(false);
// const [isDark, setIsDark] = useState(getTheme());
// const [selectedColor, setSelectedColor] = useState(getColor());
// // const [colors, setColorsState] = useState(getColors());
// const navigate = useNavigate();
// const { logout, setMenus } = useContext(AuthContext);

// const handleLogout = () => {
// setMenus([]);
// logout(); 

// // Clear the token and other user-related data
// localStorage.removeItem('token');
// // sessionStorage.removeItem('token');

// // Redirect to login page
// navigate('/login');
// };


// useEffect(() => {
// if (isDark) {
//     document.documentElement.classList.add('dark');
// } else {
//     document.documentElement.classList.remove('dark');
// }
// setTheme(isDark);
// }, [isDark]);

// useEffect(() => {
// setColors(selectedColor);
// setColorsState(getColors());
// }, [selectedColor]);

// const toggleTheme = () => {
// setIsDark((prevIsDark) => !prevIsDark);
// };

// const setLightTheme = () => {
// setIsDark(false);
// };

// const setDarkTheme = () => {
// setIsDark(true);
// };

// const openSettingsPanel = () => {
// setIsSettingsOpen(true);
// };

// const closeSettingsPanel = () => {
// setIsSettingsOpen(false);
// };

// return (
// <>
// <div className="flex-1 overflow-x-hidden overflow-y-auto">
//     <header className="relative bg-white dark:bg-darker">
//     <div className="flex items-center justify-between p-2 border-b dark:border-primary-darker">
//         <div className='flex gap-4'>
//         {/* <img src={CompanyLogo} className='h-10' alt="Logo" /> */}
//         <a
//         href="/login"
//         className="inline-block text-2xl font-bold tracking-wider uppercase text-primary-dark dark:text-light"
//         >
//         ProCall
//         </a></div>
//         <nav
//         aria-label="Secondary"
//         className="hidden space-x-2 md:flex md:items-center"
//         >
//         <button
//             aria-hidden="true"
//             className="relative focus:outline-none"
//             onClick={toggleTheme}
//         >
//             <div className="w-12 h-6 transition rounded-full outline-none bg-primary-100 dark:bg-primary-lighter"></div>
//             <div
//             className={`absolute top-0 left-0 inline-flex items-center justify-center w-6 h-6 transition-all duration-150 transform scale-110 rounded-full shadow-sm ${
//                 isDark
//                 ? 'translate-x-6 text-primary-100 bg-primary-darker'
//                 : 'translate-x-0 -translate-y-px bg-white text-primary-dark'
//             }`}
//             >
//             {isDark ? (
//                 <svg
//                 className="w-4 h-4"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 >
//                 <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//                 />
//                 </svg>
//             ) : (
//                 <svg
//                 className="w-4 h-4"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 >
//                 <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
//                 />
//                 </svg>
//             )}
//             </div>
//         </button>
//         {/* logout button */}
//         <button 
//             onClick={handleLogout}
//             className="hover:animate-spin p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 dark:hover:text-light dark:hover:bg-primary-dark dark:bg-dark focus:outline-none focus:bg-primary-100 dark:focus:bg-primary-dark focus:ring-primary-darker"
//             >
//             <svg
//             className="w-7 h-7"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             >
//             <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//             />
//             <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//             />
//             </svg>
//         </button>
//         {/* settings panel */}
//         <button
//             onClick={openSettingsPanel}
//             className="hover:animate-spin p-2 transition-colors duration-200 rounded-full text-primary-lighter bg-primary-50 hover:text-primary hover:bg-primary-100 dark:hover:text-light dark:hover:bg-primary-dark dark:bg-dark focus:outline-none focus:bg-primary-100 dark:focus:bg-primary-dark focus:ring-primary-darker"
//         >
//             <svg
//             className="w-7 h-7"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             >
//             <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//             />
//             <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//             />
//             </svg>
//         </button>
//         </nav>
//     </div>
//     </header>
//     {isSettingsOpen && (
//     <section
//         className="fixed inset-y-0 right-0 z-20 w-full max-w-xs bg-white shadow-xl dark:bg-darker dark:text-light sm:max-w-md focus:outline-none"
//         aria-labelledby="settingsPanelLabel"
//         tabIndex="-1"
//     >
//         <div className="absolute left-0 p-2 transform -translate-x-full">
//         <button
//             onClick={closeSettingsPanel}>
//             <svg
//             className="w-5 h-5"
//             xmlns="http://www.w3.org/2000/svg"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             >
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//             </svg>
//         </button>
//         </div>

//         <div className="flex flex-col h-screen">
//         <div className="flex-1 overflow-y-auto">
//             {/* Theme */}
//             <div className="p-4 space-y-4 md:p-8">
//             <div className="flex flex-col items-center justify-center flex-shrink-0 px-4 py-8 space-y-4 border-b dark:border-primary-dark"
//             >
//             {/* Settings */}
//             <span aria-hidden="true" className="text-gray-500 dark:text-primary">
//                 <svg
//                 className="w-8 h-8"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//                 >
//                 <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidthh="2"
//                     d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
//                 />
//                 </svg>
//             </span>
//             <h2 id="settinsPanelLabel" className="text-xl font-medium text-gray-500 dark:text-light">Settings</h2>
//             </div>
//             </div>

//             {/* modes */}
//             <div className="flex items-start">
//             <div className="p-4 space-y-4 md:p-8">
//                 <h6 className="text-lg font-medium text-gray-400 dark:text-light">
//                 Mode
//                 </h6>
//                 <div className="flex items-center space-x-8">
//                 <button
//                     onClick={setLightTheme}
//                     className={`flex items-center justify-center ${
//                     !isDark
//                         ? 'text-primary'
//                         : 'text-gray-500 dark:text-light'
//                     } transition-colors duration-200 focus:outline-none`}
//                 >
//                     <span className="sr-only">Light</span>
//                     <svg
//                     className="w-9 h-9"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     >
//                     <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M12 3v1m0 16v1m8.66-6.34l-.707.707M4.05 19.778l-.707-.707M21 12h-1M4 12H3m15.364-6.364l-.707-.707M4.05 4.222l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
//                     />
//                     </svg>
//                 </button>
//                 <button
//                     onClick={setDarkTheme}
//                     className={`flex items-center justify-center ${
//                     isDark
//                         ? 'text-primary'
//                         : 'text-gray-500 dark:text-light'
//                     } transition-colors duration-200 focus:outline-none`}
//                 >
//                     <span className="sr-only">Dark</span>
//                     <svg
//                     className="w-9 h-9"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                     >
//                     <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M20.354 15.354A9 9 0 118.646 3.646 9.003 9.003 0 0020.354 15.354z"
//                     />
//                     </svg>
//                 </button>
//                 </div>
//                 </div>
//             </div>

//             {/* Colors */}
//             <div className="p-4 space-y-4 md:p-8">
//             <h6 className="text-lg font-medium text-gray-400 dark:text-light">
//                 Colors</h6>
//             {/* <div className="flex items-center space-x-4">
//                 {['cyan', 'teal', 'green', 'fuchsia', 'blue', 'violet'].map((color) => (
//                 // <button
//                 //     key={color}
//                 //     onClick={() => setSelectedColor(color)}
//                 //     className={w-10 h-10 rounded-full bg-${color}-500 focus:outline-none}
//                 //     aria-label={Set theme color to ${color}}
//                 // />
//                 ))}
//             </div> */}
//             </div>
//         </div>
//         </div>
//     </section>
//     )}
// </div>
// </>

// );
// };

// export default Navbar;


import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user authentication data (e.g., token)
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    // Navigate to the login page
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {/* <div className="flex justify-between items-center space-x-60"> */}
        {/* Left: Logo */}
        <h1 className="text-xl font-bold">Renthub</h1>

        {/* Center: Navigation Links */}
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
          {/* <a
            href="/services"
            className="hover:text-gray-400 transition duration-200"
          >
            Services
          </a> */}
        </div>

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
