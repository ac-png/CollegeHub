// Importing necessary modules from React and external libraries
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

// Component to display details of a specific enrollment
const Show = () => {
    // Using authentication context and params
    const { authenticated } = useAuth();
    // Extracting the course id from the URL parameters
    const { id } = useParams();
    // Navigation function for programmatic redirects
    const navigate = useNavigate();
    // State to store enrollment details
    const [enrollment, setEnrollment] = useState(null);
    // State to control the visibility of the delete confirmation popup
    const [showConfirmation, setShowConfirmation] = useState(false);

    // Function to handle the deletion of the enrollment
    const handleDelete = () => {
        // Retrieving the token from localStorage
        let token = localStorage.getItem('token');
        // Making a DELETE request to delete the enrollment
        axios.delete(`https://college-api.vercel.app/api/enrolments/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                console.log("Course deleted successfully");
                // Redirecting to the enrollments page after deletion
                navigate('/enrollments');
            })
            .catch(err => {
                console.error(err);
            });
    };

    // Function to toggle the visibility of the delete confirmation popup
    const toggleConfirmation = () => {
        setShowConfirmation(!showConfirmation);
    };

    // Fetching the enrollment details when the component mounts
    useEffect(() => {
        // Retrieving the token from localStorage
        let token = localStorage.getItem('token');
        // Making a GET request to fetch the enrollment details
        axios.get(`https://college-api.vercel.app/api/enrolments/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            // Setting the enrollment state with the fetched data
            setEnrollment(response.data.data);
        })
        .catch(err => {
            console.error(err);
        });
    }, [id]);

    // Rendering the enrollment details or a loading message
    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            {enrollment ? (
                <>
                    {/* Enrollment details card */}
                    <div className="grid-x grid-margin-x align-center">
                        <div className="cell small-12 medium-6">
                            <div className="card">
                                <div className="card-divider">
                                    <h4>Enrollment Details</h4>
                                </div>
                                <div className="card-section">
                                    <p><b>Date: </b>{enrollment.date}</p>
                                    <p><b>Time: </b>{enrollment.time}</p>
                                    <p><b>Status: </b>{enrollment.status}</p>
                                    <p><b>ID: </b>{enrollment.id}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Course and Lecturer details side by side */}
                    <div className="grid-x grid-margin-x">
                        {/* Course details card */}
                        <div className="cell small-12 medium-6">
                            <div className="card">
                                <div className="card-divider">
                                    <h4>Course Details</h4>
                                </div>
                                <div className="card-section">
                                    <p><b>Title: </b>{enrollment.course && enrollment.course.title}</p>
                                    <p><b>Code: </b>{enrollment.course && enrollment.course.code}</p>
                                    <p><b>Description: </b>{enrollment.course && enrollment.course.description}</p>
                                    <p><b>Points: </b>{enrollment.course && enrollment.course.points}</p>
                                </div>
                            </div>
                        </div>
                        {/* Lecturer details card */}
                        <div className="cell small-12 medium-6">
                            <div className="card">
                                <div className="card-divider">
                                    <h4>Lecturer Details</h4>
                                </div>
                                <div className="card-section">
                                    <p><b>Name: </b>{enrollment.lecturer && enrollment.lecturer.name}</p>
                                    <p><b>Email: </b>{enrollment.lecturer && enrollment.lecturer.email}</p>
                                    <p><b>Phone: </b>{enrollment.lecturer && enrollment.lecturer.phone}</p>
                                    <p><b>Address: </b>{enrollment.lecturer && enrollment.lecturer.address}</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginLeft: '15px' }}>
                            {/* Link to edit enrollment */}
                            <Link to={`/enrollments/edit/${enrollment.id}`} className="submit warning button">
                                Edit Enrollment
                            </Link>
                            {/* Button to trigger the delete confirmation */}
                            <button className="alert button" onClick={toggleConfirmation}>Delete Enrollment</button>
                        </div>


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
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

// Exporting the Show page
export default Show;
