// Importing necessary modules from React and external libraries
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
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
    // Navigation function for programmatic redirects
    const navigate = useNavigate();
    // State to store the lecturer details
    const [lecturer, setLecturer] = useState([]);
    // State to control the visibility of the delete confirmation popup
    const [showConfirmation, setShowConfirmation] = useState(false);

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


    // Function to handle the deletion of the course
    const handleDelete = () => {
        // Retrieving the token from localStorage
        let token = localStorage.getItem('token');
        // Making a DELETE request to delete the course
        axios.delete(`https://college-api.vercel.app/api/lecturers/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                console.log("Course deleted successfully");
                // Redirecting to the courses page after deletion
                navigate('/lecturers');
            })
            .catch(err => {
                console.error(err);
            });
    };

    // Function to toggle the visibility of the delete confirmation popup
    const toggleConfirmation = () => {
        setShowConfirmation(!showConfirmation);
    };

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

                    {/* Button to trigger the delete confirmation */}
                    <button className="alert button" onClick={toggleConfirmation}>Delete Course</button>

                    {/* Confirmation popup */}
                    {showConfirmation && (
                        <div className="overlay">
                            <div className="confirmation-popup">
                                <p>Are you sure you want to delete this course?</p>
                                <div className="button-group">
                                    {/* Button to confirm deletion */}
                                    <button className="button alert" onClick={handleDelete}>Delete</button>
                                    {/* Button to cancel deletion */}
                                    <button className="button secondary" onClick={toggleConfirmation}>Cancel</button>
                                </div>
                            </div>
                        </div>
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
