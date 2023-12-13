// Importing necessary modules from React and external libraries
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

// Sub-component to display details of a lecturer's enrollment
const EnrollmentDetails = ({ enrollment }) => {
    return (
        <div className="card" style={{ marginBottom: '20px' }}>
            <div className="card-divider">
                <h4>{enrollment.course.title}</h4>
            </div>
            <div className="card-section">
                <p>Date: {enrollment.date}</p>
                <p>Time: {enrollment.time}</p>
                <p>Status: {enrollment.status}</p>
                <p>Course Code: {enrollment.course.code}</p>
                <p>Course Description: {enrollment.course.description}</p>
            </div>
        </div>
    );
};

// Component to display details of a specific lecturer
const Show = () => {
    // Using authentication context
    const { authenticated } = useAuth();
    // Extracting the lecturer id from the URL parameters
    const { id } = useParams();
    // State to store the lecturer details
    const [lecturer, setLecturer] = useState([]);

    // Fetching the lecturer details when the component mounts
    useEffect(() => {
        // Retrieving the token from localStorage
        let token = localStorage.getItem('token');
        // Making a GET request to fetch the lecturer details
        axios.get(`https://college-api.vercel.app/api/lecturers/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                // Setting the lecturer state with the fetched data
                setLecturer(response.data.data);
            })
            .catch(err => {
                console.error(err);
            })
    }, [id]);

    useEffect(() => {
    let token = localStorage.getItem('token');
    axios.get(`https://college-api.vercel.app/api/lecturers/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            // Check if the response and its data property are defined
            if (response && response.data) {
                // Set the lecturer state with the fetched data
                setLecturer(response.data.data);
            } else {
                console.error("Invalid response format:", response);
            }
        })
        .catch(err => {
            console.error(err);
        })
}, [id]);


    // Rendering the lecturer details or a loading message
    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            {lecturer ? (
                <div>
                    {/* Displaying lecturer details */}
                    <h1>{lecturer.name}</h1>
                    <p>Address: {lecturer.address}</p>
                    <p>Email: {lecturer.email}</p>
                    <p>Phone: {lecturer.phone}</p>

                    {/* Displaying enrollments if available */}
                    <h2>Enrollments:</h2>
                    {lecturer.enrolments && lecturer.enrolments.length > 0 ? (
                        lecturer.enrolments.map((enrollment) => (
                            <EnrollmentDetails key={enrollment.id} enrollment={enrollment} />
                        ))
                    ) : (
                        <p>No enrollments found.</p>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

// Exporting the Show page
export default Show;
