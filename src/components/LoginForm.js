import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = () => {
    const { onAuthenticated } = useAuth();

    const errorStyle = {
        color: 'red'
    };

    const [form, setForm] = useState({
        email: "alice@gmail.com",
        password: "password"
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://college-api.vercel.app/api/login', {
            email: form.email,
            password: form.password
        })
        .then(response => {
            onAuthenticated(true, response.data.token);
        })
        .catch(err => {
            console.error(err);
            console.log(err.response.data.message);
            setErrorMessage(err.response.data.message);
        });
    };

    const handleForm = (e) => {
        const { name, value } = e.target;
        setForm(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="grid-container" style={{ marginTop: '20px' }}>
            <div className="grid-x grid-padding-x align-center">
                <div className="cell small-10 medium-6 large-4" style={{ paddingTop: '20px' }}>
                    <h3>Login</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="email">Email
                            <input onChange={handleForm} type="text" name="email" value={form.email} />
                        </label>
                        <label htmlFor="password">Password
                            <input onChange={handleForm} type="password" name="password" value={form.password} />
                        </label>
                        <button type="submit" className="button expanded">Login</button>
                        <p style={errorStyle}>{errorMessage}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
