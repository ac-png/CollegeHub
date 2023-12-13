// Importing necessary modules from React and external libraries
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

// Component for the navigation bar
const Navbar = () => {
    // Using authentication context and navigation hook
    const { authenticated, onAuthenticated } = useAuth();
    const navigate = useNavigate();

    // Function to handle user logout
    const logout = () => {
        // Updating authentication status and navigating to logout page
        onAuthenticated(false);
        navigate('/logout');
    }

    const headingStyle = {
        fontFamily: "'Lobster', sans-serif",
    };

    // Rendering the navigation bar
    return (
        <>
                <h1 className='text-center' style={headingStyle}>
                    College Hub
                </h1>
            <div className="top-bar stacked-for-medium" id="example-menu">
                <div className="top-bar-left">
                    {/* Left-aligned menu items */}
                    <ul className="dropdown menu" data-dropdown-menu>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/courses">Courses</Link></li>
                        <li><Link to="/lecturers">Lecturers</Link></li>
                        <li><Link to="/enrolments">Enrolments</Link></li>
                    </ul>
                </div>
                <div className="top-bar-right">
                    {/* Right-aligned menu items */}
                    <ul className="menu">
                        {/* Displaying different options based on authentication status */}
                        {(authenticated) ? (
                            <>
                                {/* Logout button and user account link */}
                                <li><button className='button alert' onClick={logout}>Logout</button></li>
                                <li><Link to="/user">Account</Link></li>
                            </>
                        ) : ""}
                        {(!authenticated) ? (
                            <>
                                {/* Login and signup links */}
                                <li><Link to="/login" className='button'>Login</Link></li>
                                <li><Link to="/signup">Signup</Link></li>
                            </>
                        ) : ""}
                    </ul>
                </div>
            </div>
        </>
    );
};

// Exporting the Navbar component
export default Navbar;
