// Importing necessary modules from React and external libraries
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

// Edit component to display details of a specific course
const Edit = () => {
    // Authentication context
    const { authenticated } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);

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
        });
    }, [id]);

    // Handling form submission
    const handleEditSubmit = (event) => {
        event.preventDefault();
        
        // Retrieving the token from localStorage
        let token = localStorage.getItem('token');

        // Making a PUT request to update the course details
        axios.put(`https://college-api.vercel.app/api/courses/${id}`, course, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            // Handle successful update, e.g., navigate to the course details page
            navigate(`/course/${id}`);
        })
        .catch(err => {
            console.error(err);
            // Handle error, e.g., display an error message
        });
    };

    // Handling changes in form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCourse((prevCourse) => ({ ...prevCourse, [name]: value }));
    };

    // Rendering the edit course details or a loading message
    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            {course ? (
                <form className="grid-container" style={{ marginTop: '20px' }} onSubmit={handleEditSubmit}>
                    <h3>Edit Course</h3>
                    <label htmlFor="title">
                        Title: <input type="text" id="title" name="title" value={course.title} onChange={handleInputChange} />
                    </label>
                    <label htmlFor="code">
                        Code: <input type="text" id="code" name="code" value={course.code} onChange={handleInputChange} />
                    </label>
                    <label htmlFor="description">
                        Description:
                        <textarea id="description" rows="3" name="description" value={course.description} onChange={handleInputChange} />
                    </label>
                    <label htmlFor="points">
                        Points: <input type="number" id="points" min="100" name="points" value={course.points} onChange={handleInputChange} />
                    </label>
                    <label htmlFor="level">
                        Level: <input type="number" id="level" min="7" name="level" value={course.level} onChange={handleInputChange} />
                    </label>
                    <button className="submit button" type="submit">
                        Edit
                    </button>
                </form>
            ) : (
                // Loading message when course details are being fetched
                <p>Loading...</p>
            )}
        </div>
    );
}

// Exporting the Edit component
export default Edit;
