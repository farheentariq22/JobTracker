import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      
      <h1 className="text-5xl font-bold mb-4 text-gray-800 animate-pulse">
        Job Tracker 
      </h1>

      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Manage jobs, apply easily, and track your career — all in one place.
      </p>

      <div className="space-x-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Login
        </button>

        <button
          onClick={() => navigate("/register")}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition"
        >
          Register
        </button>
      </div>

      
    </div>
  );
}

export default Welcome;