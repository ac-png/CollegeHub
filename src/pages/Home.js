import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            <h1>Welcome to CollegeHub!</h1>
            <h4><Link to={`/courses`}>Explore our courses</Link>, <Link to={`/lecturers`}>Meet our lecturers</Link>, and <Link to={`/enrolments`}>and manage your enrollments</Link>.</h4>
            
        </div>
    );
};

export default Home;
