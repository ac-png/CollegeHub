import LoginForm from "../components/LoginForm";
import { useAuth } from "../contexts/AuthContext";

const Home = () => {
    const { authenticated } = useAuth();

    return (
        <>
            {(!authenticated) ? (
                    <LoginForm />
            ) : (
                <p>You are authenticated</p>
            )}
        </>
    );
}

export default Home;