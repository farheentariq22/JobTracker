import Navbar from "./Navbar";
import { useEffect, useState } from "react";
import API from "./api";

function MyApplications() {
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/my-applications");

      // handle pagination structure
      setApplications(res.data.data || res.data.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  return (
    <div className="min-h-screen p-6">
      <Navbar />
      <h2 className="text-3xl font-bold mb-6 text-center">
        My Applications 
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app) => (
          <div
            key={app.id}
            className="bg-white p-5 rounded-xl shadow"
          >
            
            <h3 className="text-xl font-semibold mb-2">
              {app.job?.title}
            </h3>

            <p className="mb-2">
              <span className="font-medium">Status: </span>
              <span
                className={
                  app.status === "approved"
                    ? "text-green-500"
                    : app.status === "rejected"
                    ? "text-red-500"
                    : "text-yellow-500"
                }
              >
                {app.status}
              </span>
            </p>

            <p className="text-gray-600 mb-3">
              {app.job?.description}
            </p>

            {app.resume && (
              <a
                href={`http://127.0.0.1:8000/storage/${app.resume}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                View Resume
              </a>
            )}

          </div>
        ))}
      </div>

      {applications.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No applications yet.
        </p>
      )}
    </div>
  );
}

export default MyApplications;