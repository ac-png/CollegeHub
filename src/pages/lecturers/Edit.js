// Importing necessary modules from React and external libraries
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

// Edit component to display details of a specific lecturer
const Edit = () => {
    // Authentication context
    const { authenticated } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [lecturer, setLecturer] = useState(null);

    // Fetching the lecturer details when the component mounts
    useEffect(() => {
        // Retrieving the token from localStorage
        let token = localStorage.getItem('token');
        // Making a GET request to fetch the lecturer details
        axios.get(`https://college-api.vercel.app/api/lecturers/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                // Setting the lecturer state with the fetched data
                setLecturer(response.data.data);
            })
            .catch(err => {
                console.error(err);
            })
    }, [id]);

    // Handling form submission
    const handleEditSubmit = (event) => {
        event.preventDefault();
        
        // Retrieving the token from localStorage
        let token = localStorage.getItem('token');

        // Making a PUT request to update the lecturer details
        axios.put(`https://college-api.vercel.app/api/lecturers/${id}`, lecturer, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            // Handle successful update, e.g., navigate to the lecturer details page
            navigate(`/lecturer/${id}`);
        })
        .catch(err => {
            console.error(err);
            // Handle error, e.g., display an error message
        });
    };

    // Handling changes in form inputs
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLecturer((prevLecturer) => ({ ...prevLecturer, [name]: value }));
    };

    // Rendering the edit lecturer details or a loading message
    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            {lecturer ? (
                <form className="grid-container" style={{ marginTop: '20px' }} onSubmit={handleEditSubmit}>
                    <h3>Edit Lecturer</h3>
                    <label htmlFor="name">
                        Name: <input type="text" id="name" name="name" value={lecturer.name} onChange={handleInputChange} />
                    </label>
                    <label htmlFor="address">
                        Address: <input type="text" id="address" name="address" value={lecturer.address} onChange={handleInputChange} />
                    </label>
                    <label htmlFor="email">
                        Email: <input type="text" id="email" name="email" value={lecturer.email} onChange={handleInputChange} />
                    </label>
                    <label htmlFor="phone">
                        Phone Number: <input type="text" id="phone" name="phone" value={lecturer.phone} onChange={handleInputChange} />
                    </label>
                    <button className="submit button" type="submit">
                        Edit
                    </button>
                </form>
            ) : (
                // Loading message when lecturer details are being fetched
                <p>Loading...</p>
            )}
        </div>
    );
}

// Exporting the Edit component
export default Edit;
