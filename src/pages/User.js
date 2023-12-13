// Importing necessary modules from React and external libraries
import { useEffect, useState } from "react";
import axios from '../config/api';
import { useAuth } from "../contexts/AuthContext";

// Page to display user information
const User = () => {
    // Using the authentication
    const { authenticated } = useAuth();
    // State to store user data
    const [user, setUser] = useState([]);

    // Fetching user data when the page loads
    useEffect(() => {
        // Retrieving the token from localStorage
        let token = localStorage.getItem('token');
        // Making a GET request to fetch user data
        axios.get(`https://college-api.vercel.app/api/user`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                // Setting the user state with the fetched data
                setUser(response.data.user);
            })
            .catch(err => {
                console.error(err);
            })
    }, []);

    // Function to format the date and time
    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        // Extracting day, month, year, hours, and minutes from the date-time object
        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear();
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        // Returning a formatted date-time string
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    // Rendering the user information
    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            {/* Heading */}
            <h2>User Information</h2>
            {/* Displaying user details */}
            <p><b>Name: </b>{user.name}</p>
            <p><b>Email: </b>{user.email}</p>
            <p><b>Email Verification: </b>{user.email_verified_at ? "Verified" : "Not Verified"}</p>
            <p><b>Account Created: </b>{formatDateTime(user.created_at)}</p>
            <p><b>Account Updated: </b>{formatDateTime(user.updated_at)}</p>
        </div>
    );
}

// Exporting the User page
export default User;
