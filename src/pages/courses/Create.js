import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from '../../config/api';
import { useAuth } from "../../contexts/AuthContext";

const Create = () => {
    const { onAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: '',
        code: '',
        description: '',
        points: '',
        level: '',
    });

    const [errors, setErrors] = useState({
        title: '',
        code: '',
        description: '',
        points: '',
        level: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        let token = localStorage.getItem('token');

        axios
            .post('https://college-api.vercel.app/api/courses', form, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            .then((response) => {
                navigate('/courses');
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors);
            });
    };

    const handleForm = (e) => {
        const { name, value } = e.target;
        setForm((prevState) => ({
            ...prevState,
            [name]: value,
        }));

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: '',
        }));
    };

    return (
        <form className="grid-container" onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <h3>Create Course</h3>
            <label htmlFor="title">
                Title: <input type="text" id="title" name="title" onChange={handleForm} />
                <p style={{ color: 'red' }}>{errors.title}</p>
            </label>
            <label htmlFor="code">
                Code: <input type="text" id="code" name="code" onChange={handleForm} />
                <p style={{ color: 'red' }}>{errors.code}</p>
            </label>
            <label htmlFor="description">
                Description:
                <textarea id="description" name="description" onChange={handleForm} />
                <p style={{ color: 'red' }}>{errors.description}</p>
            </label>
            <label htmlFor="points">
                Points: <input type="number" id="points" name="points" onChange={handleForm} />
                <p style={{ color: 'red' }}>{errors.points}</p>
            </label>
            <label htmlFor="level">
                Level: <input type="number" id="level" name="level" onChange={handleForm} />
                <p style={{ color: 'red' }}>{errors.level}</p>
            </label>
            <p style={{ color: 'red' }}>{errors.general}</p>
            <button className="submit button" type="submit">
                Create
            </button>
        </form>
    );
};

export default Create;
