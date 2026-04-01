import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="bg-white shadow p-4 flex justify-between items-center">
      
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/jobs")}
      >
        Job Tracker 
      </h1>

      <div className="flex gap-4">

        {/* Candidate only */}
        {role === "candidate" && (
          <>
            <button onClick={() => navigate("/jobs")}>
              Jobs
            </button>

            <button onClick={() => navigate("/my-applications")}>
              My Applications
            </button>
          </>
        )}

        {/* HR only */}
        {role === "hr" && (
          <button onClick={() => navigate("/hr-dashboard")}>
            HR Dashboard
          </button>
        )}

        {/* Logout */}
        <button
          onClick={logout}
          className="text-red-500"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Navbar;