// Importing necessary modules from React and external libraries
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

// Component to create a enrollment
const Create = () => {
    // Authentication context to handle user authentication status
    const { onAuthenticated } = useAuth();
    const [lecturers, setLecturers] = useState([]);
    const [courses, setCourses] = useState([]);
    
    // React Router's navigation hook
    const navigate = useNavigate();

    // State to manage form input values
    const [form, setForm] = useState({
		date: '',
		time: '',
		status: '',
		enrollment_id: '',
    });

    // State to manage form validation errors
    const [errors, setErrors] = useState({
		date: '',
		time: '',
		status: '',
		enrollment_id: '',
    });

    // Function to fetch lecturers and courses from the API
    const fetchLecturersAndCourses = () => {
        let token = localStorage.getItem('token');

        // Fetch lecturers
        axios.get('https://college-api.vercel.app/api/lecturers', {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                setLecturers(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching lecturers:', error);
            });

        // Fetch courses
        axios.get('https://college-api.vercel.app/api/courses' , {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(response => {
                setCourses(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching courses:', error);
            });
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Get authentication token from localStorage
        let token = localStorage.getItem('token');

        // Send a POST request to create a new enrollment
        axios
            .post('https://college-api.vercel.app/api/enrolments', form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                // Redirect to the enrollments page after successful creation
                navigate('/enrollments');
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

    // Fetch lecturers and courses when the component mounts
    useEffect(() => {
        fetchLecturersAndCourses();
    }, []);

    // Rendering the create form
    return (
        <form className="grid-container" onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <h3>Create Enrollment</h3>
            <label htmlFor="date">
                Date:
                <input type="date" id="date" name="date" onChange={handleForm} />
                <p style={{ color: 'red' }}>{errors.date}</p>
            </label>
            <label htmlFor="time">
                Time:
                <input type="time" id="time" name="time" onChange={handleForm} />
                <p style={{ color: 'red' }}>{errors.time}</p>
            </label>
            <fieldset htmlFor="status">
                <legend>Status:</legend>
                <input type="radio" name="status" value="assigned" id="assigned" onChange={handleForm} />
                <label htmlFor="assigned">Assigned</label>
                <input type="radio" name="status" value="career_break" id="career_break" onChange={handleForm} />
                <label htmlFor="career_break">Career Break</label>
                <input type="radio" name="status" value="interested" id="interested" onChange={handleForm} />
                <label htmlFor="interested">Interested</label>
                <input type="radio" name="status" value="associate" id="associate" onChange={handleForm} />
                <label htmlFor="associate">Associate</label>
                <p style={{ color: 'red' }}>{errors.status}</p>
            </fieldset>
            <label htmlFor="lecturer">Lecturer:
                <select name="lecturer_id" onChange={handleForm}>
                    {lecturers.map(lecturer => (
                        <option key={lecturer.id} value={lecturer.id}>{lecturer.name}</option>
                    ))}
                </select>
                <p style={{ color: 'red' }}>{errors.lecturer_id}</p>
            </label>
            <label htmlFor="course">Course:
                <select name="course_id" onChange={handleForm}>
                    {courses.map(course => (
                        <option key={course.id} value={course.id}>{course.title}</option>
                    ))}
                </select>
                <p style={{ color: 'red' }}>{errors.course_id}</p>
            </label>
            <button className="submit button" type="submit">
                Create
            </button>
        </form>
    );
};

// Exporting the Create page
export default Create;
