import { useEffect, useState } from "react";
import API from "./api";
import Layout from "./Layout";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

function HRDashboard() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const fetchApplications = async () => {
    const res = await API.get("/applications");
    setApplications(res.data.data || res.data.data.data);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, status) => {
    await API.put(`/applications/${id}`, { status });
    fetchApplications();
    setSelected(null);
  };

  // FILTER
  const filteredApps = applications.filter((app) => {
    const matchStatus =
      filter === "all" || app.status === filter;

    const matchSearch =
      app.name?.toLowerCase().includes(search.toLowerCase());

    return matchStatus && matchSearch;
  });

  // CHART DATA
  const data = [
    { name: "Approved", value: applications.filter(a => a.status === "approved").length },
    { name: "Pending", value: applications.filter(a => a.status === "pending").length },
    { name: "Rejected", value: applications.filter(a => a.status === "rejected").length },
  ];

  return (
    <Layout>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          HR Dashboard
        </h1>

        <input
          type="text"
          placeholder="Search candidate..."
          className="border px-4 py-2 rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* CHART */}
      <div className="bg-white p-6 rounded-xl shadow mb-8 flex justify-center">
        <PieChart width={300} height={300}>
          <Pie data={data} dataKey="value" outerRadius={100}>
            <Cell fill="#22c55e" />
            <Cell fill="#facc15" />
            <Cell fill="#ef4444" />
          </Pie>
          <Tooltip />
        </PieChart>
      </div>

      {/* FILTERS */}
      <div className="flex gap-3 mb-6">
        {["all", "pending", "approved", "rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full ${
              filter === f
                ? "bg-blue-500 text-white"
                : "bg-white border"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        {filteredApps.map((app) => (
          <div
            key={app.id}
            onClick={() => setSelected(app)}
            className="bg-white p-5 rounded-xl shadow hover:shadow-2xl hover:scale-105 transition cursor-pointer"
          >

            <h2 className="font-semibold text-lg">
              {app.job?.title}
            </h2>

            <p className="text-gray-500">{app.name}</p>

            <span className={`text-xs px-2 py-1 rounded ${
              app.status === "approved"
                ? "bg-green-100 text-green-600"
                : app.status === "rejected"
                ? "bg-red-100 text-red-600"
                : "bg-yellow-100 text-yellow-600"
            }`}>
              {app.status}
            </span>

          </div>
        ))}

      </div>

      {/* MODAL */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

          <div className="bg-white p-6 rounded-xl w-full max-w-md">

            <h2 className="text-xl font-bold mb-4">
              {selected.job?.title}
            </h2>

            <p><b>Name:</b> {selected.name}</p>
            <p><b>Age:</b> {selected.age}</p>
            <p><b>Gender:</b> {selected.gender}</p>
            <p><b>Experience:</b> {selected.experience}</p>
            <p><b>Phone:</b> {selected.phone}</p>

            {selected.resume && (
              <a
                href={`http://127.0.0.1:8000/storage/${selected.resume}`}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline block mt-2"
              >
                View Resume
              </a>
            )}

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => updateStatus(selected.id, "approved")}
                className="flex-1 bg-green-500 text-white py-2 rounded"
              >
                Approve
              </button>

              <button
                onClick={() => updateStatus(selected.id, "rejected")}
                className="flex-1 bg-red-500 text-white py-2 rounded"
              >
                Reject
              </button>
            </div>

            <button
              onClick={() => setSelected(null)}
              className="mt-4 w-full bg-gray-200 py-2 rounded"
            >
              Close
            </button>

          </div>

        </div>
      )}

    </Layout>
  );
}

export default HRDashboard;