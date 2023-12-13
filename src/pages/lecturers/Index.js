// Importing necessary modules from React and external libraries
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

// Component to display a list of all lecturers
const Index = () => {
    // Using authentication context
    const { authenticated } = useAuth();
    // State to store the list of lecturers
    const [lecturers, setLecturers] = useState([]);

    // Fetching the list of lecturers when the component mounts
    useEffect(() => {
        // Retrieving the token from localStorage
        let token = localStorage.getItem('token');
        // Making a GET request to fetch the lecturers
        axios.get(`https://college-api.vercel.app/api/lecturers`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                // Setting the lecturers state with the fetched data
                setLecturers(response.data.data);
            })
            .catch(err => {
                console.error(err);
            })
    }, []);

    // Rendering the list of lecturers or a message if there are none
    if(lecturers.length === 0) return <h3>There are no lecturers</h3>;

    const lecturersList = lecturers.map(lecturer => {
        return (
            <div key={lecturer.id} className="cell medium-4">
                <div className="callout" style={{ borderRadius: '5px' }}>
                    {/* Displaying lecturer name, linked if authenticated */}
                    {authenticated ? (
                        <h4><Link to={`/lecturers/${lecturer.id}`} className="link">{lecturer.name}</Link></h4>
                    ) : (
                        <h4>{lecturer.name}</h4>
                    )}
                    {/* Displaying lecturer details */}
                    <p><strong>Address:</strong> {lecturer.address}</p>
                    <p><strong>Email Address:</strong> {lecturer.email}</p>
                    <p><strong>Phone Number:</strong> {lecturer.phone}</p>
                </div>
            </div>
        );
    });

    // Rendering the entire component
    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            {/* Heading */}
            <h2>All Lecturers</h2>
            {/* Link to add a new lecturer */}
            <Link to={`/lecturers/create`} className="submit success button">Add Lecturer</Link>
            {/* Displaying the list of lecturers */}
            <div className="grid-x grid-margin-x">
                {lecturersList}
            </div>
        </div>
    );
}

// Exporting the Index page
export default Index;
