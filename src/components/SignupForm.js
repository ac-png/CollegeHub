import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SignUpForm = () => {
    const { onAuthenticated } = useAuth();

    const errorStyle = {
        color: 'red'
    };

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('https://college-api.vercel.app/api/register', {
            name: form.name,
            email: form.email,
            password: form.password
        })
        .then(response => {
            onAuthenticated(true, response.data.token);
        })
        .catch(err => {
            console.error(err);
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
                    <h3>Sign Up</h3>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="name">Name
                            <input onChange={handleForm} type="text" name="name" value={form.name} />
                        </label>
                        <label htmlFor="email">Email
                            <input onChange={handleForm} type="text" name="email" value={form.email} />
                        </label>
                        <label htmlFor="password">Password
                            <input onChange={handleForm} type="password" name="password" value={form.password} />
                        </label>
                        <button type="submit" className="button expanded">Sign Up</button>
                        <p style={errorStyle}>{errorMessage}</p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpForm;
