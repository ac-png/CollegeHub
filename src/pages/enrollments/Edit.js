// Importing necessary modules from React and external libraries
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

// Component to create a enrollment
const Edit = () => {
    // Authentication context to handle user authentication status
    const { onAuthenticated } = useAuth();
    const { id } = useParams();
    // State to store lecturer details
    const [lecturers, setLecturers] = useState([]);
    // State to store course details
    const [courses, setCourses] = useState([]);
    // State to store enrollment details
    const [enrollment, setEnrollment] = useState(null);

    // State to manage form input values
    const [form, setForm] = useState({
		date: '',
		time: '',
		status: '',
    });

    // State to manage form validation errors
    const [errors, setErrors] = useState({
		date: '',
		time: '',
		status: '',
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

    // Rendering the edit form
    return (
        <form className="grid-container" style={{ marginTop: '20px' }}>
            <h3>Edit Enrollment</h3>
            {enrollment && (
                <>
                    <label htmlFor="date">
                        Date:
                        <input type="date" id="date" name="date" onChange={handleForm} value={enrollment.date} />
                        <p style={{ color: 'red' }}>{errors.date}</p>
                    </label>
                    <label htmlFor="time">
                        Time:
                        <input type="time" id="time" name="time" onChange={handleForm} value={enrollment.time} />
                        <p style={{ color: 'red' }}>{errors.time}</p>
                    </label>
                    <fieldset class="large-5 cell">
                        <legend>Status:</legend>
                        <input type="radio" name="status" value="assigned" id="assigned" required onChange={handleForm} />
                        <label htmlFor="assigned">Assigned</label>
                        <input type="radio" name="status" value="career_break" id="career_break" required onChange={handleForm} />
                        <label htmlFor="career_break">Career Break</label>
                        <input type="radio" name="status" value="interested" id="interested" required onChange={handleForm} />
                        <label htmlFor="interested">Interested</label>
                        <input type="radio" name="status" value="associate" id="associate" required onChange={handleForm} />
                        <label htmlFor="associate">Associate</label>
                    </fieldset>
                    <p style={{ color: 'red' }}>{errors.course_id}</p>
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
                </>
            )}
            <button className="submit button" type="submit">
                Edit
            </button>
        </form>
    );
};

// Exporting the Edit page
export default Edit;
