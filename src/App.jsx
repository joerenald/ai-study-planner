import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Start from "./pages/Start";
import Deadline from "./pages/Deadline";
import Subjects from "./pages/Subjects";
import Preferences from "./pages/Preferences";
import Review from "./pages/Review";
import Generating from "./pages/Generating";
import Dashboard from "./pages/Dashboard";
import PlanDetails from "./pages/PlanDetails";
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Main Content */}
      <div className="flex-grow">
        <Routes>

          {/* LOGIN */}
          <Route
            path="/"
            element={<Login />}
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* HOME */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          {/* START */}
          <Route
            path="/start"
            element={
              <ProtectedRoute>
                <Start />
              </ProtectedRoute>
            }
          />

          {/* DEADLINE */}
          <Route
            path="/deadline"
            element={
              <ProtectedRoute>
                <Deadline />
              </ProtectedRoute>
            }
          />

          {/* SUBJECTS */}
          <Route
            path="/subjects"
            element={
              <ProtectedRoute>
                <Subjects />
              </ProtectedRoute>
            }
          />

          {/* PREFERENCES */}
          <Route
            path="/preferences"
            element={
              <ProtectedRoute>
                <Preferences />
              </ProtectedRoute>
            }
          />

          {/* REVIEW */}
          <Route
            path="/review"
            element={
              <ProtectedRoute>
                <Review />
              </ProtectedRoute>
            }
          />

          {/* GENERATING */}
          <Route
            path="/generating"
            element={
              <ProtectedRoute>
                <Generating />
              </ProtectedRoute>
            }
          />

          {/* DASHBOARD */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* USER DASHBOARD */}
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          {/* PLAN DETAILS */}
          <Route
            path="/plan/:id"
            element={
              <ProtectedRoute>
                <PlanDetails />
              </ProtectedRoute>
            }
          />

          {/* UNKNOWN ROUTE */}
          <Route
            path="*"
            element={<Navigate to="/" />}
          />

        </Routes>
      </div>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default App;