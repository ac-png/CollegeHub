import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

const Index = () => {
    const { authenticated } = useAuth();
    const [enrolments, setEnrolments] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem('token');
        axios.get(`https://college-api.vercel.app/api/enrolments`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            console.log(response.data.data)
            setEnrolments(response.data.data);
        })
        .catch(err => {
            console.error(err);
        })
    }, []);

    if (enrolments.length === 0) return <h3>There are no enrolments</h3>;

    const enrolmentsList = enrolments.map(enrolment => (
        <div key={enrolment.id} className="cell medium-4">
            <div className="callout" style={{ borderRadius: '5px' }}>
                {authenticated ? (
                    <h4><Link to={`/enrolments/${enrolment.id}`} className="link">{enrolment.id}</Link></h4>
                ) : (
                    <h4>{enrolment.id}</h4>
                )}
            </div>
        </div>
    ));

    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            <h2>All Enrolments</h2>
            <button class="submit success button">Add Enrolment</button>
            <div className="grid-x grid-margin-x">
                {enrolmentsList}
            </div>
        </div>
    );
}

export default Index;
