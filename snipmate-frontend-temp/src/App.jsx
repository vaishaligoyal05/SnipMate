import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./styles.css";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Snippets from "./pages/Snippets";

// Components
import Navbar from "./components/Navbar";

// Dev/Test
import AuthTest from "./AuthTest";

// Auth utility function
const isAuthenticated = () => {
  return !!localStorage.getItem("userInfo");
};

// Private Route wrapper component
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/snippets"
          element={
            <PrivateRoute>
              <Snippets />
            </PrivateRoute>
          }
        />

        {/* Dev route for testing */}
        <Route path="/test-auth" element={<AuthTest />} />
      </Routes>
    </Router>
  );
}

export default App;
