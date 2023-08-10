import { useUserAuth } from '../../context/UserAuthContext';
// import addPlansToFirestore from '../../Addplans';
import DisplayPlans from '../Plans/DisplayPlans';
const Home = () => {
    const { user, logout } = useUserAuth();
    console.log(user);

    const handleLogout = async () => {
        // implement logout logic here
        try {
            await logout();
        }
        catch (err) {
            console.log(err);
        }
    }
    // const handleAddDataClick = () => {
    //     addPlansToFirestore();
    // };

    return (
        <div>
            <h1 className='text-3xl font-bold underline'>Hello Welcome, {user && user.displayName}</h1>
            <button onClick={handleLogout}>
                Log Out
            </button>

            {/* <Plans /> */}
            <DisplayPlans />
        </div>
    )
}

export default Home;
