import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

const Index = () => {
    const { authenticated } = useAuth();
    const [lecturers, setLecturers] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem('token');
        axios.get(`https://college-api.vercel.app/api/lecturers`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                setLecturers(response.data.data);
            })
            .catch(err => {
                console.error(err);
            })
    }, []);

    if(lecturers.length === 0) return <h3>There are no lecturers</h3>;

    const lecturersList = lecturers.map(lecturer => {
        return (
            <div key={lecturer.id} className="cell medium-4">
            <div className="callout"  style={{ borderRadius: '5px' }}>
                {authenticated ? (
                    <h4><Link to={`/lecturers/${lecturer.id}`} className="link">{lecturer.name}</Link></h4>
                ) : (
                    <h4>{lecturer.name}</h4>
                )}
                <p><strong>Address:</strong> {lecturer.address}</p>
                <p><strong>Email Address:</strong> {lecturer.email}</p>
                <p><strong>Phone Number:</strong> {lecturer.phone}</p>
            </div>
        </div>
        );
    });

    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            <h2>All Lecturers</h2>
            <button class="submit success button">Add Lecturer</button>
            <div className="grid-x grid-margin-x">
                {lecturersList}
            </div>
        </div>
    );
}

export default Index;