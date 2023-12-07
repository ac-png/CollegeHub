import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
    const { authenticated } = useAuth();

    return (
        <>
        <h2>This is home</h2>
        {(!authenticated) ? (
                <LoginForm />
        ) : (
            <p>You are authenticated</p>
        )}
        </>
    );
}

export default Home;