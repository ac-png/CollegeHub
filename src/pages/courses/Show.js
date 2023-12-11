import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

const Show = () => {
    const { authenticated } = useAuth();
    const { id } = useParams();
    const [course, setCourse] = useState([]);

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
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default Show;