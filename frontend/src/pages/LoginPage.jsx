import React,{useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../constants/config';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [validationMessage, setValidationMessage] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    // const {login}  = useContext(AuthContext);

const handleLogin = async (e) => {
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
    
        const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
            const data = await response.json();
            // alert(`Response: ${JSON.stringify(data)}`);
            alert(`Login successful`);
            console.log("userID:", data.user.userID)
            localStorage.setItem('userID', data.user.userID);
            // alert(Response: ${JSON.stringify(data)});
            localStorage.setItem('token', data.token);
            localStorage.setItem('roleID', data.user.roleID);
            // alert(token:${JSON.stringify(data.token)});
            console.log("Server Response:", data);
            localStorage.setItem('username', username); // Store username in localStorage
            localStorage.setItem('roleID', data.user.roleID); // Store roleID in localStorage
            // retreive the roleID from the local storage
            const roleID = localStorage.getItem('roleID');
            console.log("roleID:", roleID);
            if(roleID ==='1'){
                navigate("/propertyownerprofile")
            }
            else{
                navigate("/rentplacelist")
            }

            

        } else {
            // alert(Login failed: ${response.statusText});
            alert('Login failed. Try again');
            setValidationMessage({...validationMessage, password: 'Invalid Credentials' });
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
        console.error('Error:', error);
    }
};

return (
<>
<div className="h-full bg-gray-100 p-10 flex items-center justify-center">
    <div className="h-full bg-gray-700">
    </div>
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-700 rounded">
        Sign in
    </h2>
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
            {validationMessage.password && <p className="text-red-500 text-sm mt-1">{validationMessage.password}</p>}
        
        </div>
        </div>

        <div>
        <button
            type="submit"
            className="h-8 w-full flex items-center justify-center px-4 py-2 text-sm custom-button"
            onClick={handleLogin}
            // onClick={() => navigate("/Dashboard")}
        >
            Sign in
        </button>
        {/* {message && <p>{message}</p>} */}
        </div>
        <div className="text-sm flex items-center justify-between">
            <a href="/signup" className=" text-gray-400 hover:text-black">Dont have an account? Sign up</a>
            </div>    
    </form>
    </div>
</div>
</>
);
}

