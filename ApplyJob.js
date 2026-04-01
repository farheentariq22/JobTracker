import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";
function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    experience: "",
    phone: "",
  });

  const [resume, setResume] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
  try {
    const formData = new FormData();

    formData.append("job_id", id);
    formData.append("name", form.name);
    formData.append("age", form.age);
    formData.append("gender", form.gender);
    formData.append("experience", form.experience);
    formData.append("phone", form.phone);

    if (resume) {
      formData.append("resume", resume);
    }

    await API.post("/apply", formData);

    navigate("/success");

  } catch (err) {
    console.log(err.response);
  }
};


  return (
    <div className="min-h-screen flex justify-center items-center p-6">
      <Navbar />
      <div className="bg-white p-8 rounded-xl shadow w-full max-w-xl">

        <h2 className="text-2xl font-bold mb-6">Apply for Job</h2>

        <input
          name="name"
          placeholder="Full Name"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />

        <input
          name="age"
          placeholder="Age"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />

        <input
          name="gender"
          placeholder="Gender"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />

        <input
          name="experience"
          placeholder="Years of Experience"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone Number"
          className="w-full p-2 border rounded mb-3"
          onChange={handleChange}
        />

        <input
          type="file"
          className="w-full mb-4"
          onChange={(e) => setResume(e.target.files[0])}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit Application
        </button>

      </div>
    </div>
  );
}

export default ApplyJob;