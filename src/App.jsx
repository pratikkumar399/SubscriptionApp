// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { UserAuthProvider } from './context/UserAuthContext';
import ProtectedRoute from './components/Home/ProtectedRoute';
function App() {

  return (
    <Router>
      <UserAuthProvider>
        <Routes>
          <Route path="/home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Use the imported PrivateRoute component */}
        </Routes>
      </UserAuthProvider>
    </Router>
  );
}

export default App;
