// Importing necessary modules from React and external libraries
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

// Show component to display details of a specific course
const Show = () => {
    // Authentication context
    const { authenticated } = useAuth();
    // Extracting the course id from the URL parameters
    const { id } = useParams();
    // Navigation function for programmatic redirects
    const navigate = useNavigate();
    // State to store the course details
    const [course, setCourse] = useState(null);
    // State to control the visibility of the delete confirmation popup
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Fetching the course details when the component mounts
    useEffect(() => {
        // Retrieving the token from localStorage
        let token = localStorage.getItem('token');
        // Making a GET request to fetch the course details
        axios.get(`https://college-api.vercel.app/api/courses/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                // Setting the course state with the fetched data
                setCourse(response.data.data);
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
        axios.delete(`https://college-api.vercel.app/api/courses/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                console.log("Course deleted successfully");
                // Redirecting to the courses page after deletion
                navigate('/courses');
            })
            .catch(err => {
                console.error(err);
            });
    };

    // Function to toggle the visibility of the delete confirmation popup
    const toggleConfirmation = () => {
        setShowConfirmation(!showConfirmation);
    };

    // Rendering the course details or a loading message
    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            {course ? (
                <div>
                    {/* Displaying course details */}
                    <h1>{course.title}</h1>
                    <p><b>Code: </b>{course.code}</p>
                    <p><b>Description: </b>{course.description}</p>
                    <p><b>Points: </b>{course.points}</p>
                    <p><b>Level: </b>{course.level}</p>
                    <p><b>Created At: </b>{course.created_at}</p>
                    <p><b>Updated At: </b>{course.updated_at}</p>

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
                // Loading message when course details are being fetched
                <p>Loading...</p>
            )}
        </div>
    );
}

// Exporting the Show component
export default Show;
