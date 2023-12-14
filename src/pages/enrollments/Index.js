// Importing necessary modules from React and external libraries
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

// Component to display a list of all enrollments
const Index = () => {
    // Using authentication context
    const { authenticated } = useAuth();
    // State to store the list of enrollments
    const [enrollments, setEnrollments] = useState([]);

    // Fetching the list of enrollments when the component mounts
    useEffect(() => {
        // Retrieving the token from localStorage
        let token = localStorage.getItem('token');
        // Making a GET request to fetch the enrollments
        axios.get(`https://college-api.vercel.app/api/enrolments`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            // Setting the enrollments state with the fetched data
            setEnrollments(response.data.data);
        })
        .catch(err => {
            console.error(err);
        })
    }, []);

    // Rendering the list of enrollments
    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            {/* Heading */}
            <h2>All Enrollments</h2>
            {/* Link to add a new enrollment */}
            <Link to="/enrollments/create" className="submit success button">Add Enrollment</Link>
            {/* Displaying the list of enrollments or a message if there are none */}
            <div className="grid-x grid-margin-x">
                {enrollments.length === 0 ? (
                    <h3>There are no enrollments</h3>
                ) : (
                    enrollments.map(enrollment => (
                        <div key={enrollment.id} className="cell medium-4">
                            <div className="callout" style={{ borderRadius: '5px' }}>
                                {/* Enrollment details */}
                                <h4><b>ID: </b>{enrollment.id}</h4>
                                <p><b>Date: </b>{enrollment.date}</p>
                                <p><b>Time: </b>{enrollment.time}</p>
                                <p><b>Status: </b>{enrollment.status}</p>
                                <p><b>Course: </b>{enrollment.course.title}</p>
                                <p><b>Lecturer: </b>{enrollment.lecturer.name}</p>
                                {/* Link to view enrollment details, visible for authenticated users */}
                                {authenticated && (
                                    <p>
                                        <Link to={`/enrollments/${enrollment.id}`} className="link">
                                            View Details
                                        </Link>
                                    </p>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

// Exporting the Index page
export default Index;
