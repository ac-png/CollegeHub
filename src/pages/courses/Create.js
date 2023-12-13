// Importing necessary modules from React and external libraries
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

// Component to create a course
const Create = () => {
    // Authentication context to handle user authentication status
    const { onAuthenticated } = useAuth();
    
    // React Router's navigation hook
    const navigate = useNavigate();

    // State to manage form input values
    const [form, setForm] = useState({
        title: '',
        code: '',
        description: '',
        points: '',
        level: '',
    });

    // State to manage form validation errors
    const [errors, setErrors] = useState({
        title: '',
        code: '',
        description: '',
        points: '',
        level: '',
    });

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Get authentication token from localStorage
        let token = localStorage.getItem('token');

        // Send a POST request to create a new course
        axios
            .post('https://college-api.vercel.app/api/courses', form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                // Redirect to the courses page after successful creation
                navigate('/courses');
            })
            .catch((err) => {
                // Log errors and update the state with validation errors
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            });
    };

    // Function to handle form input changes
    const handleForm = (e) => {
        const { name, value } = e.target;
        
        // Update the form state with the new input value
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        // Clear the specific error associated with the changed input
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    // Rendering the create form
    return (
        <form className="grid-container" onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <h3>Create Course</h3>
            <label htmlFor="title">
                Title: <input type="text" id="title" name="title" onChange={handleForm} />
                <p style={{ color: 'red' }}>{errors.title}</p>
            </label>
            <label htmlFor="code">
                Code: <input type="text" id="code" name="code" onChange={handleForm} />
                <p style={{ color: 'red' }}>{errors.code}</p>
            </label>
            <label htmlFor="description">
                Description:
                <textarea id="description" rows="3" name="description" onChange={handleForm} />
                <p style={{ color: 'red' }}>{errors.description}</p>
            </label>
            <label htmlFor="points">
                Points: <input type="number" id="points" name="points" onChange={handleForm} />
                <p style={{ color: 'red' }}>{errors.points}</p>
            </label>
            <label htmlFor="level">
                Level: <input type="number" id="level" name="level" onChange={handleForm} />
                <p style={{ color: 'red' }}>{errors.level}</p>
            </label>
            <p style={{ color: 'red' }}>{errors.general}</p>
            <button className="submit button" type="submit">
                Create
            </button>
        </form>
    );
};

// Exporting the Create page
export default Create;
