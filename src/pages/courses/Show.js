import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

const Show = () => {
    const { authenticated } = useAuth();
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);

    useEffect(() => {
        let token = localStorage.getItem('token');
        axios.get(`https://college-api.vercel.app/api/courses/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                setCourse(response.data.data);
            })
            .catch(err => {
                console.error(err);
            })
    }, [id]);

    const handleDelete = () => {
        let token = localStorage.getItem('token');
        axios.delete(`https://college-api.vercel.app/api/courses/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                console.log("Course deleted successfully");
                navigate('/courses');
            })
            .catch(err => {
                console.error(err);
            });
    };

    const toggleConfirmation = () => {
        setShowConfirmation(!showConfirmation);
    };

    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            {course ? (
                <div>
                    <h1>{course.title}</h1>
                    <p><b>Code: </b>{course.code}</p>
                    <p><b>Description: </b>{course.description}</p>
                    <p><b>Points: </b>{course.points}</p>
                    <p><b>Level: </b>{course.level}</p>
                    <p><b>Created At: </b>{course.created_at}</p>
                    <p><b>Updated At: </b>{course.updated_at}</p>

                    <button className="alert button" onClick={toggleConfirmation}>Delete Course</button>

                    {showConfirmation && (
                        <div className="overlay">
                            <div className="confirmation-popup">
                                <p>Are you sure you want to delete this course?</p>
                                <div className="button-group">
                                    <button className="button alert" onClick={handleDelete}>Delete</button>
                                    <button className="button secondary" onClick={toggleConfirmation}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Show;
