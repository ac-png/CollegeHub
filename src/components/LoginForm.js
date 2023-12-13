// Importing necessary modules from React and external libraries
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Component for user login form
const LoginForm = () => {
    // Using authentication context and navigation hook
    const { onAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Styling for error messages
    const errorStyle = {
        color: 'red'
    };

    // State to manage form data and error messages
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");

    // Handling form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Making a POST request to log in the user
        axios.post('https://college-api.vercel.app/api/login', {
            email: form.email,
            password: form.password
        })
        .then(response => {
            // Authenticating user and navigating to courses page on successful login
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
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Rendering the login form
    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            <div className="grid-x grid-padding-x align-center">
                <div className="cell small-10 medium-6 large-4" style={{ paddingTop: '20px' }}>
                    <h3>Login</h3>
                    {/* Login form with input fields and submission button */}
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email
                            <input onChange={handleForm} type="text" name="email" value={form.email} />
                        </label>
                        <label htmlFor="password">Password
                            <input onChange={handleForm} type="password" name="password" value={form.password} />
                        </label>
                        {/* Submission button */}
                        <button type="submit" className="button expanded">Login</button>
                        {/* Displaying error messages, if any */}
                        <p style={errorStyle}>{errorMessage}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

// Exporting the LoginForm component
export default LoginForm;
