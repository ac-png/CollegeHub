// Importing necessary modules from React and external libraries
import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

// Component to display details of a specific enrollment
const Show = () => {
    // Using authentication context and params
    const { authenticated } = useAuth();
    const { id } = useParams();

    // State to store enrollment details
    const [enrollment, setEnrollment] = useState(null);

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
                <div className="grid-x grid-margin-x">
                    {/* Enrollment details card */}
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
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

// Exporting the Show page
export default Show;
