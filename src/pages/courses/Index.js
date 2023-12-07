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
            <div className="callout">
                {authenticated ? (
                    <h4><Link to={`/courses/${course.id}`} className="link">{course.title}</Link></h4>
                ) : (
                    <h4>{course.title}</h4>
                )}
            </div>
        </div>
        );
    });

    return (
        <div className="grid-container">
            <h2>All Courses</h2>
            <div className="grid-x grid-margin-x">
                {coursesList}
            </div>
        </div>
    );
}

export default Index;