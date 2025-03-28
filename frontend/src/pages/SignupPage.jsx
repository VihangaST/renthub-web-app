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
<div className="w-[400px] h-full bg-gray-100 p-10 rounded ">
<div className="sm:mx-auto sm:w-full sm:max-w-sm">

<h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-700">
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
        className="h-8 mt-5 w-full flex items-center justify-center px-4 py-2 text-sm custom-button"
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


