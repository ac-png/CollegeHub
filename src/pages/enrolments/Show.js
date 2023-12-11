import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

const Show = () => {
    const { authenticated } = useAuth();
    const { id } = useParams();
    const [enrolment, setEnrolment] = useState(null);

    useEffect(() => {
        let token = localStorage.getItem('token');
        axios.get(`https://college-api.vercel.app/api/enrolments/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            setEnrolment(response.data.data);
        })
        .catch(err => {
            console.error(err);
        });
    }, [id]);

    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            {enrolment ? (
                <div className="grid-x grid-margin-x">
                    <div className="cell small-12 medium-6">
                        <div className="card">
                            <div className="card-divider">
                                <h4>Enrolment Details</h4>
                            </div>
                            <div className="card-section">
                                <p><b>Date: </b>{enrolment.date}</p>
                                <p><b>Time: </b>{enrolment.time}</p>
                                <p><b>Status: </b>{enrolment.status}</p>
                                <p><b>ID: </b>{enrolment.id}</p>
                            </div>
                        </div>
                    </div>
                    <div className="cell small-12 medium-6">
                        <div className="card">
                            <div className="card-divider">
                                <h4>Course Details</h4>
                            </div>
                            <div className="card-section">
                                <p><b>Title: </b>{enrolment.course && enrolment.course.title}</p>
                                <p><b>Code: </b>{enrolment.course && enrolment.course.code}</p>
                                <p><b>Description: </b>{enrolment.course && enrolment.course.description}</p>
                                <p><b>Points: </b>{enrolment.course && enrolment.course.points}</p>
                            </div>
                        </div>
                    </div>
                    <div className="cell small-12 medium-6">
                        <div className="card">
                            <div className="card-divider">
                                <h4>Lecturer Details</h4>
                            </div>
                            <div className="card-section">
                                <p><b>Name: </b>{enrolment.lecturer && enrolment.lecturer.name}</p>
                                <p><b>Email: </b>{enrolment.lecturer && enrolment.lecturer.email}</p>
                                <p><b>Phone: </b>{enrolment.lecturer && enrolment.lecturer.phone}</p>
                                <p><b>Address: </b>{enrolment.lecturer && enrolment.lecturer.address}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Show;
