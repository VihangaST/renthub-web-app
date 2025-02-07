// // import React, { useState,useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom'
// // import ErrorModal from '../components/ErrorModal';
// // import { BASE_URL } from '../constants/config';

// // export default function SignupPage() {
// // const [userRole, setUserRole] = useState('');
// // const [username, setUsername] = useState('');  
// // const [phoneNumber, setPhoneNumber] = useState('');
// // const [confirmPassword, setConfirmPassword] = useState('');
// // const [password, setPassword] = useState('');
// // // const [isUpdate, setIsUpdate] = useState(false); // Initialize as false
// // const [isErrorOpen, setIsErrorOpen] = useState(false); // State to control error modal
// // const navigate = useNavigate();
// // const [message, setMessage] = useState('');
// // const [requiredMessage, setRequiredMessage] = useState(''); 
// // const [modalType,setModalType] = useState('error');

// // useEffect(() => {
// // // Call fetchUsers and fetchOrganizations

// // }, []);
// // const handleSave = async (e) => {
// //     e.preventDefault();

// // try {
// //     // const token = localStorage.getItem('token')
// //     // if (!token) {
// //     // setMessage('User is not logged in. Please log in first.');
// //     // setModalType('error');
// //     // setIsErrorOpen(true);
// //     // navigate('/login'); // Redirect to login if no token is found
// //     // return;
// //     // }

// //     // Frontend validation
// //     if (!username || !password || !confirmPassword || !userRole) {
// //     setRequiredMessage('Please enter mandotary fields.');
// //     // setModalType('error');
// //     // setIsErrorOpen(true);
// //     return;
// //     }

// //     // Ensure password and confirmPassword match
// //     if (password !== confirmPassword) {
// //     setRequiredMessage('Passwords do not match.')
// //     // setMessage('Passwords do not match.');
// //     // setModalType('error');
// //     // setIsErrorOpen(true);
// //     return;
// //     }
// //     else{
// //     setRequiredMessage('');}

// //     const response = await fetch(`${BASE_URL}/signup`, {
// //     method: 'POST',
// //     headers: {
// //         'Content-Type': 'application/json',
// //         'Accept': 'application/json',
// //         // 'Authorization': `Bearer ${token}`
// //     },
// //     body: JSON.stringify({ username, password,confirmPassword,phoneNumber,userRole}),
// //     });

// //     if (response.ok) {
// //     const data = await response.json();
// //     // alert(Response: ${JSON.stringify(data)});
// //     alert('User created successfully');
// //     setMessage('User created successfully');
// //     setModalType('notification');
// //     setIsErrorOpen(true);
// //     console.log('Server Response:', data);
// //     closeModal();
// //     fetchUsers();
    
    
// //     // fetchUsers();

// //     setConfirmPassword('');
// //     setPassword('');
// //     setUsername('');	
// //     setPhoneNumber('');
// //     setUserRole('');
// //     setRequiredMessage('');
// //     setOrganization('');
    
// //     }
// //     else if (response.status === 401 || response.status === 403) {
// //     setMessage('Session expired or invalid. Redirecting to login...');
// //     setModalType('error');
// //     setIsErrorOpen(true); // Open error modal
// //     setTimeout(() => {
// //         navigate('/login');
// //     }, 10000); // Redirect to login page
// //     localStorage.removeItem('token'); // Remove token from localStorage
// //     } 
// //     else {
// //     // alert(User creation failed ${response.statusText});
// //     setMessage('User creation failed');
// //     setModalType('error');
// //     setIsErrorOpen(true);
// //     }
// // } catch (error) {
// //     // alert(Error: ${error.message});
// //     setMessage(`Error: ${error.message}`);
// //     setModalType('error');
// //     setIsErrorOpen(true);
// //     console.error('Error:', error);
// // }
// // //    finally {
// // //   setIsLoading(false); // Set loading to false once processing is complete
// // // }
// // };

// // const handleCancel = () => {
// //     setSelectedRow(null);
// //     setUsername('');
// //     setPassword('');
// //     setConfirmPassword('');
// //     setPhoneNumber('');
// //     setUserRole('');
// //     setOrganization('');
// //     setMessage('');
// //     setRequiredMessage('');

// //     closeModal();
// // };

// // return (
// // <>
// // {/* <div className="flex w-full h-screen overflow-hidden"> */}
// // <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
// // <main className="grow">
// //     <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
// //     <div className="sm:flex sm:justify-between sm:items-center mb-8 ">
// //         <div className="mb-4 sm:mb-0">
// //         <h1 className="ml-4 text-2xl md:text-3xl text-primary-light dark:text-primary-lighter font-bold">Register Account</h1>
// //         </div>  
// //     </div>
// //         <div className=" rounded-xl p-4">
// //         <form className="grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-4">
// //     {/* username */}
// //     <div className="flex items-center ">
// //     <label htmlFor="username" 
// //     className="w-1/3 text-sm font-medium leading-6 text-gray-900">
// //         Username *
// //     </label>
// //     <div className="w-2/3 mt-2">
// //         <input
// //         id="username"
// //         name="username"
// //         type="text"
// //         autoComplete="username"
// //         required
// //         value={username}
// //         onChange={(e) => setUsername(e.target.value)}
// //         className="block w-full bg-gray-300 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark sm:text-sm sm:leading-6"
// //         />
// //     </div>
// //     </div>
// //     {/* user role */}
// //     <div className="flex items-center">
// //     <label htmlFor="userrole" className="w-1/3 text-sm font-medium leading-6 text-gray-900
// // ">
// //         User Role *
// //     </label>
// //     <div className="w-2/3 mt-2">
// //         <select
// //         id="userRole"
// //         name="userRole"
// //         required
// //         value={userRole}
// //         onChange={(e) => setUserRole(e.target.value)}
// //         className="block w-full bg-gray-300 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark sm:text-sm sm:leading-6"
// //         >
// //         <option value="" disabled>Select User Role</option>
// //         <option value='1'>Admin</option>
// //         <option value='2'>User</option>
// //         </select>
// //     </div>
// //     </div>
// //     {/* phonenumber */}
// //     <div className="flex items-center">
// //     <label htmlFor="phoneNumber" className="w-1/3 text-sm font-medium leading-6 text-gray-900">
// //         Phone No*
// //     </label>
// //     <div className="w-2/3 mt-2">
// //         <input
// //         id="phoneNumber"
// //         name="phoneNumber"
// //         type="tel"
// //         value={phoneNumber}
// //         onChange={(e) => setPhoneNumber(e.target.value)}
// //         className="block w-full bg-gray-300 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark sm:text-sm sm:leading-6"
// //         />
// //     </div>
// //     </div>
// // {/*confirm password */}
// //     <div className="flex items-center">
// //     <label htmlFor="password" className="w-1/3 text-sm font-medium leading-6 text-gray-900
// // ">
// //         Confirm Password *
// //     </label>
// //     <div className="w-2/3 mt-2">
// //         <input
// //         id="confirmpassword"
// //         name="confirmpassword"
// //         type="password"
// //         required
// //         value={confirmPassword}
// //         onChange={(e) => setConfirmPassword(e.target.value)}
// //         className="block w-full bg-gray-300 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark sm:text-sm sm:leading-6"
// //         />
// //     </div>
// //     </div>          
// //     {/*password  */}
// //     <div className="flex items-center">
// //     <label htmlFor="password" className="w-1/3 text-sm font-medium leading-6 text-gray-900
// // ">
// //         Password *  
// //     </label>
// //     <div className="w-2/3 mt-2">
// //         <input
// //         id="password"
// //         name="password"
// //         type="password"
// //         required
// //         value={password}
// //         onChange={(e) => setPassword(e.target.value)}
// //         className="block w-full bg-gray-300 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark sm:text-sm sm:leading-6"
// //         />
// //     </div>
// //     </div>




// //     <div className="flex justify-end gap-4 sm:col-span-2">
// //     <div>
// //     {requiredMessage && <p className='text-red-600'>{requiredMessage}</p>}
// //     </div>
// //     <button
// //     type="submit"
// //     className="h-8 w-1/5 flex items-center justify-center px-4 py-2 text-sm text-white font-semibold rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary-dark focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark"
// //     onClick={handleSave}
// //     >
// //     Register
// //     </button>

// //     <button
// //     type="button"
// //     onClick={handleCancel}
// //     className="h-8 w-1/5 flex items-center justify-center px-4 py-2 text-sm text-white font-semibold rounded-md bg-primary hover:bg-primary-dark focus:outline-none focus:ring focus:ring-primary-dark focus:ring-offset-1 focus:ring-offset-white dark:focus:ring-offset-dark"
// //     >
// //     Cancel
// //     </button>        
// // </div>

// // </form>
    
// // </div>
// //     <ErrorModal
// //         isOpen={isErrorOpen}
// //         onClose={() => setIsErrorOpen(false)}
// //         message={message}
// //         type={modalType}
    
// //     />           
    
// // </div>
// // </main>
// // </div>
// // {/* </div> */}
// // </>

// // );
// // }


// import { useState } from 'react';

// const Signup = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSignup = async (e) => {
//         e.preventDefault();
//         const response = await fetch('http://127.0.0.1:5000/signup', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, password }),
//         });
//         const data = await response.json();
//         alert(data.message || data.error);
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen bg-gray-100">
//             <form onSubmit={handleSignup} className="p-6 bg-white rounded shadow-md">
//                 <h1 className="text-xl font-bold mb-4">Signup</h1>
//                 <input
//                     type="text"
//                     placeholder="Username"
//                     className="w-full p-2 border rounded mb-4"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                 />
//                 <input
//                     type="password"
//                     placeholder="Password"
//                     className="w-full p-2 border rounded mb-4"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button className="w-full bg-blue-500 text-white py-2 rounded">Signup</button>
//             </form>
//         </div>
//     );
// };

// export default Signup;

import React,{useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/config';
// import AuthContext  from '../context/AuthContext';


export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword]=useState('')
    const [userRole, setUserRole] = useState('');
    const [phoneNo, setPhoneNo] = useState('0716299291');
    const [email, setEmail] = useState('abc@gmail.com');
    const [homeTown, setHomeTown] = useState('Wattala');


    const [validationMessage, setValidationMessage] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    // const {login}  = useContext(AuthContext);

const handleSignup = async (e) => {
e.preventDefault();
    
    // Perform front-end validation
    if (!username && !password) { 
    setValidationMessage({ ...validationMessage, username: 'Username is required' ,password: 'Password is required'});
    return;
    }
    if (!username) { 
    setValidationMessage({ ...validationMessage, username: 'Username is required' });
    return;
    }
    if (!password) {
    setValidationMessage({...validationMessage, password: 'Password is required' });
    return;
    }
    try {
    
        const response = await fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ username, password ,confirmPassword,userRole,phoneNo,email,homeTown}),
        });

        if (response.ok) {
            const data = await response.json();
            alert(`Response: ${JSON.stringify(data)}`);
            // alert(Response: ${JSON.stringify(data)});
            localStorage.setItem('token', data.token);
            // alert(token:${JSON.stringify(data.token)});
            console.log("Server Response:", data);
            // login(data);
            navigate("/login")
        } else {
            // alert(Login failed: ${response.statusText});
            setValidationMessage({...validationMessage, password: 'Invalid Credentials' });
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error('Error:', error);
    }
};

return (
<>
<div className="w-full h-full">
<div className="sm:mx-auto sm:w-full sm:max-w-sm">

<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-200">
    Sign up
</h2>
</div>
<div className="mt-10 w-full">
<form className="space-y-2">
    <div >
    <div className="flex items-center justify-between">
    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        Username
    </label>
    </div>
    <div className="mt-2">
        <input
        id="username"
        name="username"
        type="text"
        autoComplete="username"
        required
        value={username}
        // onChange={(e) => setUsername(e.target.value)}
        onChange={(e) => {
        setUsername(e.target.value);
        setValidationMessage({ ...validationMessage, username: '' });
        }}
        className="block w-full bg-gray-300 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark sm:text-sm sm:leading-6"
        />
        {validationMessage.username && <p className="text-red-500 text-sm mt-1">{validationMessage.username}</p>}
    </div>
    </div>

    <div>
    <div className="flex items-center justify-between">
    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
    Password
    </label>
        
    </div>
    <div className="mt-2">
        <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        // onChange={(e) => setPassword(e.target.value)}
        onChange={(e) => {
        setPassword(e.target.value);
        setValidationMessage({ ...validationMessage, password: '' });
        }}
        className="block w-full bg-gray-300 rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark sm:text-sm sm:leading-6"
        />
        {/* {validationMessage.password && <p className="text-red-500 text-sm mt-1">{validationMessage.password}</p>} */}
    
    </div>
    </div>
    
    <div>
    <div className="flex items-center justify-between">
    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
    Confirm Password
    </label>      
    </div>
    <div className="mt-2">
        <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        autoComplete="current-password"
        required
        value={confirmPassword}
        // onChange={(e) => setPassword(e.target.value)}
        onChange={(e) => {
        setConfirmPassword(e.target.value);
        setValidationMessage({ ...validationMessage, password: '' });
        }}
        className="block w-full bg-gray-300 rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark sm:text-sm sm:leading-6"
        />
        {/* {validationMessage.password && <p className="text-red-500 text-sm mt-1">{validationMessage.password}</p>} */}
    
    </div>
    </div>
    <div>
    <div className="flex items-center justify-between">
    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
    User Role 
    </label>      
    </div>
    <div className="mt-2">
    <select
        id="userRole"
        name="userRole"
        required
        value={userRole}
        onChange={(e) => setUserRole(e.target.value)}
        className="block w-full bg-gray-300 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark sm:text-sm sm:leading-6"
        >
        <option value="" disabled>Select User Role</option>
        <option value='1'>Admin</option>
        <option value='2'>User</option>
        </select>
        {/* {validationMessage.password && <p className="text-red-500 text-sm mt-1">{validationMessage.password}</p>} */}
    
    </div>
    </div>
    {/* <div>
    <div className="flex items-center justify-between">
    <label htmlFor="userrole" className="block text-sm font-medium leading-6 text-gray-900">
        User Role *
    </label>
    <div className="mt-2">
        <select
        id="userRole"
        name="userRole"
        required
        value={userRole}
        onChange={(e) => setUserRole(e.target.value)}
        className="block w-full bg-gray-300 rounded-md border-0 py-1.5 px-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-dark sm:text-sm sm:leading-6"
        >
        <option value="" disabled>Select User Role</option>
        <option value='1'>Admin</option>
        <option value='2'>User</option>
        </select>
    </div>
    </div>
    </div> */}

    <div>
    <button
        type="submit"
        className="h-8 w-full flex items-center justify-center px-4 py-2 text-sm custom-button"
        onClick={handleSignup}
        // onClick={() => navigate("/Dashboard")}
    >
        Sign up
    </button>
    {/* {message && <p>{message}</p>} */}
 
    </div>
    {/* <div className="text-sm flex items-center justify-between">
        <a href="#" className=" text-gray-400 hover:text-black">
            Forgot password?
        </a>
        <a href="/signup" className=" text-gray-400 hover:text-black">Sign up</a>

        </div> */}

    
</form>
</div>
</div>
</>
);
}


