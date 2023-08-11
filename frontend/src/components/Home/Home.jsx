import { useUserAuth } from '../../context/UserAuthContext';
import DisplayPlans from '../Plans/DisplayPlans';
import './Home.css'; // Import your CSS file

const Home = () => {
    const { user, logout } = useUserAuth();

    const handleLogout = async () => {
        try {
            await logout();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <nav className="navbar">
                <h1 className='logo'>
                    Hello Welcome, {user && user.displayName}
                </h1>

            </nav>

            <DisplayPlans />
        </div>
    )
}

export default Home;
