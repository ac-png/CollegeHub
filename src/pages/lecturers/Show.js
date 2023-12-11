import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

const Show = () => {
    const { authenticated } = useAuth();
    const { id } = useParams();
    const [lecturer, setLecturer] = useState([]);

    const EnrollmentDetails = ({ enrollment }) => {
        return (
            <div className="card" style={{ marginBottom: '20px' }}>
                <div className="card-divider">
                    <h4>{enrollment.course.title}</h4>
                </div>
                <div className="card-section">
                    <p>Date: {enrollment.date}</p>
                    <p>Time: {enrollment.time}</p>
                    <p>Status: {enrollment.status}</p>
                    <p>Course Code: {enrollment.course.code}</p>
                    <p>Course Description: {enrollment.course.description}</p>
                </div>
            </div>
        );
    };

    useEffect(() => {
        let token = localStorage.getItem('token');
        axios.get(`https://college-api.vercel.app/api/lecturers/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                setLecturer(response.data.data);
            })
            .catch(err => {
                console.error(err);
            })
    }, [id]);

    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            {lecturer ? (
                <div>
                    <h1>{lecturer.name}</h1>
                    <p>Address: {lecturer.address}</p>
                    <p>Email: {lecturer.email}</p>
                    <p>Phone: {lecturer.phone}</p>

                    <h2>Enrollments:</h2>
                    {lecturer.enrolments && lecturer.enrolments.length > 0 ? (
                        lecturer.enrolments.map((enrollment) => (
                            <EnrollmentDetails key={enrollment.id} enrollment={enrollment} />
                        ))
                    ) : (
                        <p>No enrollments found.</p>
                    )}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Show;