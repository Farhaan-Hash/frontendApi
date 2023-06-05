import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoutes>
                <Login />
              </PublicRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoutes>
                <Register />
              </PublicRoutes>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes>
                <Dashboard />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/verify/:token"
            element={
              <PublicRoutes>
                <VerifyEmail />
              </PublicRoutes>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}
export default App;

//  Protecting the routes Private
export function ProtectedRoutes({children}) {
  const auth = localStorage.getItem("data"); //name of the item in setLocalStorage
  if (auth) {
    return children;
  } else {
    return <Navigate to="/" />; //if user token is there the it return other components otherwise it takes user to login page
  }
}

// Public Route
export function PublicRoutes({children}) {
  const auth = localStorage.getItem("data"); //if user already logged in it will have no access to login or register page
  if (auth) {
    <Navigate to="/dashboard" />;
  } else {
    return children;
  }
}
