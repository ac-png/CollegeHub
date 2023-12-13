// Importing necessary modules from React and external libraries
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

// Component to display details of a specific course
const Show = () => {
    // Using authentication context, params, and navigation hook
    const { authenticated } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();

    // State to store the course details, toggle confirmation, and loading status
    const [course, setCourse] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [loading, setLoading] = useState(true);

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
                // Updating loading status
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                // Updating loading status
                setLoading(false);
            })
    }, [id]);

    // Handling the course deletion
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
                // Navigating to the courses page after deletion
                navigate('/courses');
            })
            .catch(err => {
                console.error(err);
            });
    };

    // Toggling the confirmation
    const toggleConfirmation = () => {
        setShowConfirmation(!showConfirmation);
    };

    // Rendering the course details
    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    {/* Displaying course details */}
                    <h1>{course.title}</h1>
                    <p><b>Code: </b>{course.code}</p>
                    <p><b>Description: </b>{course.description}</p>
                    <p><b>Points: </b>{course.points}</p>
                    <p><b>Level: </b>{course.level}</p>
                    <p><b>Created At: </b>{course.created_at}</p>
                    <p><b>Updated At: </b>{course.updated_at}</p>

                    {/* Button to trigger deletion and confirmation dialog */}
                    {authenticated && (
                        <>
                            <button className="alert button" onClick={toggleConfirmation}>Delete Course</button>
                            {/* Confirmation dialog */}
                            {showConfirmation && (
                                <div className="overlay">
                                    <div className="confirmation-popup">
                                        <p>Are you sure you want to delete this course?</p>
                                        {/* Buttons for confirmation and cancellation */}
                                        <div className="button-group">
                                            <button className="button alert" onClick={handleDelete}>Delete</button>
                                            <button className="button secondary" onClick={toggleConfirmation}>Cancel</button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                </div>
            )}
        </div>
    );
}

// Exporting the Show page
export default Show;
