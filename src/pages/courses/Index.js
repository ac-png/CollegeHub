// Importing necessary modules from React and external libraries
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

// Component to display a list of all courses
const Index = () => {
    // Using authentication context
    const { authenticated } = useAuth();
    // State to store the list of courses
    const [courses, setCourses] = useState([]);
    // State to track the current page for pagination
    const [currentPage, setCurrentPage] = useState(1);
    // Number of items per page
    const pageSize = 6;

    // Fetching the list of courses when the component mounts
    useEffect(() => {
        // Retrieving the token from localStorage
        let token = localStorage.getItem('token');
        // Making a GET request to fetch the courses
        axios.get(`https://college-api.vercel.app/api/courses`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                // Setting the courses state with the fetched data
                setCourses(response.data.data);
            })
            .catch(err => {
                console.error(err);
            })
    }, []);

    // Calculate the index of the last and first Course on the current page
    const indexOfLastCourse = currentPage * pageSize;
    const indexOfFirstCourse = indexOfLastCourse - pageSize;
    // Extract the courses for the current page
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    // Function to handle page changes
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    }; 

    // Rendering when there are no courses
    if (courses.length === 0) return <h3>There are no courses</h3>;

    // Mapping courses to JSX elements
    const coursesList = currentCourses.map(course => {
        return (
            <div key={course.id} className="cell medium-4">
                <div className="callout"  style={{ borderRadius: '5px' }}>
                    {/* Displaying course information with or without link based on authentication */}
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

    // Rendering the list of courses
    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            {/* Heading */}
            <h2>All Courses</h2>
            {/* Link to add a new course */}
            <Link to={`/courses/create`} className="submit success button">Add Course</Link>
            {/* Displaying the list of courses */}
            <div className="grid-x grid-margin-x">
                {coursesList}
            </div>
            {/* Pagination controls */}
            <div className="grid-x grid-margin-x align-center">
                <div className="cell small-12">
                    <ul className="pagination text-center">
                        <li className={currentPage === 1 ? 'disabled' : ''}>
                            <button className="button" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                        </li>
                        <li><span style={{ margin: '10px' }}>{currentPage}</span></li>
                        <li>
                            <button className="button" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

// Exporting the Index page
export default Index;
