import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import axios from '../config/api';
import { useAuth } from "../contexts/AuthContext";

const Index = () => {
    const { authenticated } = useAuth();
    const [user, setUser] = useState([]);

    useEffect(() => {
        let token = localStorage.getItem('token');
        axios.get(`https://college-api.vercel.app/api/user`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then(response => {
                setUser(response.data.user);
            })
            .catch(err => {
                console.error(err);
            })
    }, []);

    const formatDateTime = (dateTimeString) => {
        const dateTime = new Date(dateTimeString);
        const day = dateTime.getDate().toString().padStart(2, '0');
        const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const year = dateTime.getFullYear();
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            <h2>User Information</h2>
            <p><b>Name: </b>{user.name}</p>
            <p><b>Email: </b>{user.email}</p>
            <p><b>Email Verification: </b>{user.email_verified_at ? "Verified" : "Not Verified"}</p>
            <p><b>Account Created: </b>{formatDateTime(user.created_at)}</p>
            <p><b>Account Updated: </b>{formatDateTime(user.updated_at)}</p>
        </div>
    );
}

export default Index;