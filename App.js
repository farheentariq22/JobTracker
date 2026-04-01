import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import Login from "./Login";
import Register from "./Register";
import Jobs from "./Jobs";
import JobDetails from "./JobDetails";
import ApplyJob from "./ApplyJob";
import Success from "./Success";
import MyApplications from "./MyApplications";
import HRDashboard from "./HRDashboard";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={
          <ProtectedRoute>
            <JobDetails />
          </ProtectedRoute>
        } />
        <Route path="/apply/:id" element={
          <ProtectedRoute>
            <ApplyJob />
          </ProtectedRoute>
        } />
        <Route path="/success" element={<Success />} />
        <Route path="/my-applications" element={
          <ProtectedRoute>
            <MyApplications />
          </ProtectedRoute>
        } />
        <Route path="/hr-dashboard" element={
          <ProtectedRoute>
            <HRDashboard />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;