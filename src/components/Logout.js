// Importing necessary modules from React and external libraries
import { Link } from 'react-router-dom';

// Component for the logout page
const Logout = () => {
    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            {/* Heading */}
            <h2>Logout Page</h2>
            {/* Logout success message */}
            <p>You have been logged out successfully.</p>
            <Link to="/" className='button'>Go to Home</Link>
        </div>
    );
};

// Exporting the Logout component
export default Logout;
