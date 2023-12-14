import { Link } from 'react-router-dom';

const Home = () => {
    const headingStyle = {
        fontFamily: "'Lobster', sans-serif",
    };

    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            <h1>Welcome to <span style={headingStyle}>CollegeHub</span>!</h1>
            <h4><Link to={`/courses`}>Explore our courses</Link>, <Link to={`/lecturers`}>met our lecturers</Link>, and <Link to={`/enrollments`}>and manage your enrollments</Link>.</h4>
            
        </div>
    );
};

export default Home;
