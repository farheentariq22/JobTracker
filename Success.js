import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full">
        
        {/* Icon */}
        <div className="text-green-500 text-5xl mb-4">
          ✔️
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold mb-3 text-gray-800">
          Application Submitted!
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">
          Your application is being reviewed. <br />
          We will contact you shortly.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          
          <button
            onClick={() => navigate("/jobs")}
            className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Browse More Jobs
          </button>

          <button
            onClick={() => navigate("/my-applications")}
            className="bg-gray-200 text-gray-800 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            View My Applications
          </button>

        </div>

      </div>
    </div>
  );
}

export default Success;