import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "./api";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);

  // Fetch job details
  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await API.get(`/jobs/${id}`);
        setJob(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchJob();
  }, [id]);

  // Check if already applied
  useEffect(() => {
    const checkIfApplied = async () => {
      try {
        const res = await API.get("/my-applications");

        const already = res.data.data.find(
          (app) => app.job_id === Number(id)
        );

        if (already) setApplied(true);
      } catch (err) {
        console.log(err);
      }
    };

    checkIfApplied();
  }, [id]);

  if (!job) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-8 flex justify-center">
        
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-xl">
        

        <h1 className="text-3xl font-bold mb-4">
          {job.title}
        </h1>

        <p className="text-gray-600 mb-6">
          {job.description}
        </p>

        <button
          disabled={applied}
          onClick={() => navigate(`/apply/${id}`)}
          className={`px-6 py-2 rounded text-white ${
            applied
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {applied ? "Already Applied" : "Apply Now"}
        </button>

      </div>
    </div>
  );
}

export default JobDetails;