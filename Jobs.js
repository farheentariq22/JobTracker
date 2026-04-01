import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const fetchJobs = async () => {
    try {
      const res = await API.get("/jobs");
      setJobs(res.data.data || res.data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <Navbar />

      <h2 className="text-3xl font-bold mb-6 text-center">
        Available Jobs 
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            
            {/* Clickable Title */}
            <h3
              onClick={() => navigate(`/jobs/${job.id}`)}
              className="text-xl font-semibold mb-2 cursor-pointer hover:text-blue-500"
            >
              {job.title}
            </h3>

            <p className="text-gray-600 mb-4">
              {job.description}
            </p>

            {role === "candidate" && (
  <button
    onClick={() => navigate(`/jobs/${job.id}`)}
    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
  >
    View Details
  </button>
)}

          </div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;