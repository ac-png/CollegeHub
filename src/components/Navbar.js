import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
    const { authenticated, onAuthenticated } = useAuth();

    const navigate = useNavigate();

    const logout = () => {
        onAuthenticated(false);
        navigate('/');
    }

    return (
        <div className="top-bar stacked-for-medium" id="example-menu">
            <div className="top-bar-left">
                <ul className="dropdown menu" data-dropdown-menu>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/courses">Courses</Link></li>
                    <li><Link to="/lecturers">Lecturers</Link></li>
                    <li><Link to="/enrolments">Enrolments</Link></li>
                </ul>
            </div>
            <div className="top-bar-right">
                <ul className="menu">
                    {(authenticated) ? (
                        <li><button className='button' onClick={logout}>Logout</button></li>
                    ) : ""}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
