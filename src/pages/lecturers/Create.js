// Importing necessary modules from React and external libraries
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

// Component to create a lecturer
const Create = () => {
    // Authentication context to handle user authentication status
    const { onAuthenticated } = useAuth();
    
    // React Router's navigation hook
    const navigate = useNavigate();

    // State to manage form input values
    const [form, setForm] = useState({
        name: '',
		address: '',
		email: '',
		phone: '',
    });

    // State to manage form validation errors
    const [errors, setErrors] = useState({
        name: '',
		address: '',
		email: '',
		phone: '',
    });

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Get authentication token from localStorage
        let token = localStorage.getItem('token');

        // Send a POST request to create a new lecturer
        axios
            .post('https://college-api.vercel.app/api/lecturers', form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                // Redirect to the lecturers page after successful creation
                navigate('/lecturers');
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
            <h3>Create Lecturer</h3>
            <label htmlFor="name">
                Name: <input type="text" id="name" name="name" onChange={handleForm} />
                <p style={{ color: 'red' }}>{errors.name}</p>
            </label>
            <label htmlFor="address">
                Address: <input type="text" id="address" name="address" onChange={handleForm} />
                <p style={{ color: 'red' }}>{errors.address}</p>
            </label>
            <label htmlFor="email">
                Email: <input type="text" id="email" name="email" onChange={handleForm} />
                <p style={{ color: 'red' }}>{errors.email}</p>
            </label>
            <label htmlFor="phone">
                Phone Number: <input type="text" id="phone" name="phone" onChange={handleForm} />
                <p style={{ color: 'red' }}>{errors.phone}</p>
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
