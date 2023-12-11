import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

const Index = () => {
    const { authenticated } = useAuth();
    const [enrolments, setEnrolments] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem('token');
        axios.get(`https://college-api.vercel.app/api/enrolments`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            setEnrolments(response.data.data);
        })
        .catch(err => {
            console.error(err);
        })
    }, []);

    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            <h2>All Enrolments</h2>
            <Link to="/add-enrolment" className="submit success button">Add Enrolment</Link>
            <div className="grid-x grid-margin-x">
                {enrolments.length === 0 ? (
                    <h3>There are no enrolments</h3>
                ) : (
                    enrolments.map(enrolment => (
                        <div key={enrolment.id} className="cell medium-4">
                            <div className="callout" style={{ borderRadius: '5px' }}>
                                <h4><b>ID: </b>{enrolment.id}</h4>
                                <p><b>Date: </b>{enrolment.date}</p>
                                <p><b>Time: </b>{enrolment.time}</p>
                                <p><b>Status: </b>{enrolment.status}</p>
                                <p><b>Course: </b>{enrolment.course.title}</p>
                                <p><b>Lecturer: </b>{enrolment.lecturer.name}</p>
                                {authenticated && (
                                    <p>
                                        <Link to={`/enrolments/${enrolment.id}`} className="link">
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

export default Index;
