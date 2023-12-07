import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

const Index = () => {
    const { authenticated } = useAuth();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem('token');
        axios.get(`https://college-api.vercel.app/api/courses`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                setCourses(response.data.data);
            })
            .catch(err => {
                console.error(err);
            })
    }, []);

    if(courses.length === 0) return <h3>There are no courses</h3>;

    const coursesList = courses.map(course => {
        return (
            <div key={course.id} className="cell medium-4">
            <div className="callout"  style={{ borderRadius: '5px' }}>
                {authenticated ? (
                    <h4><Link to={`/courses/${course.id}`} className="link">{course.title}</Link></h4>
                ) : (
                    <h4>{course.title}</h4>
                )}
                <p><strong>Code:</strong> {course.code}</p>
                <p><strong>Points:</strong> {course.points}</p>
                <p><strong>Level:</strong> {course.level}</p>
            </div>
        </div>
        );
    });

    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            <h2>All Courses</h2>
            <button class="submit success button">Add Course</button>
            <div className="grid-x grid-margin-x">
                {coursesList}
            </div>
        </div>
    );
}

export default Index;