// Importing necessary modules from React and external libraries
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Component for user sign-up form
const SignUpForm = () => {
    // Using authentication context and navigation hook
    const { onAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Styling for error messages
    const errorStyle = {
        color: 'red',
    };

    // State to manage form data and error messages
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');

    // Handling form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Making a POST request to register a new user
        axios
            .post('https://college-api.vercel.app/api/register', {
                name: form.name,
                email: form.email,
                password: form.password,
            })
            .then((response) => {
                // Authenticating user and navigating to courses page on successful registration
                onAuthenticated(true, response.data.token);
                navigate('/courses');
            })
            .catch(err => {
                // Handling errors and displaying error messages
                console.error(err);
            
                if (err.response && err.response.data && err.response.data.message) {
                    console.log(err.response.data.message);
                    setErrorMessage(err.response.data.message);
                } else {
                    // If the error structure is different, display a generic error message
                    setErrorMessage("An unexpected error occurred");
                }
            });
            
    };

    // Handling form input changes
    const handleForm = (e) => {
        const { name, value } = e.target;
        // Updating the form state with the changed input value
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Rendering the sign-up form
    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            <div className="grid-x grid-padding-x align-center">
                <div className="cell small-10 medium-6 large-4" style={{ paddingTop: '20px' }}>
                    <h3>Sign Up</h3>
                    {/* Sign-up form with input fields and submission button */}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">
                            Name
                            <input onChange={handleForm} type="text" name="name" value={form.name} />
                        </label>
                        <label htmlFor="email">
                            Email
                            <input onChange={handleForm} type="text" name="email" value={form.email} />
                        </label>
                        <label htmlFor="password">
                            Password
                            <input onChange={handleForm} type="password" name="password" value={form.password} />
                        </label>
                        {/* Submission button */}
                        <button type="submit" className="button expanded">
                            Sign Up
                        </button>
                        {/* Displaying error messages, if any */}
                        <p style={errorStyle}>{errorMessage}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Exporting the SignUpForm component
export default SignUpForm;
