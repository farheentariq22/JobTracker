import { useNavigate } from "react-router-dom";

function Layout({ children }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 text-white p-5 space-y-4">

        <h1 className="text-xl font-bold mb-6">Job Tracker</h1>

        {role === "candidate" && (
          <>
            <button onClick={() => navigate("/jobs")} className="block">
              Jobs
            </button>
            <button onClick={() => navigate("/my-applications")} className="block">
              My Applications
            </button>
          </>
        )}

        {role === "hr" && (
          <button onClick={() => navigate("/hr-dashboard")}>
            HR Dashboard
          </button>
        )}

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          className="text-red-400 mt-10"
        >
          Logout
        </button>

      </div>

      {/* MAIN */}
      <div className="flex-1 bg-gray-100 p-6">
        {children}
      </div>

    </div>
  );
}

export default Layout;