import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaSpinner } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

function Register_Student() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    location: "",
    gender: "",
    telephone: "",
    trade: "",
    class: ""
  });

  // =====================
  // VALIDATION
  // =====================
  const validateForm = () => {

    if (!formData.first_name || !formData.last_name)
      return "Names are required";

    if (!formData.email.includes("@"))
      return "Invalid email address";

    if (!formData.trade)
      return "Trade is required";

    return null;
  };

  // =====================
  // HANDLE INPUT
  // =====================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // =====================
  // SUBMIT
  // =====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validateForm();

    if (error) {
      toast.error(error);
      return;
    }

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:5000/register",
        formData
      );

      toast.success("✅ Student Registered Successfully");

      setTimeout(() => {
        navigate("/students");
      }, 2000);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ✅ TOAST MESSAGE CONTAINER */}
      <ToastContainer position="top-right" autoClose={3000} />

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-blue-600 text-white items-center justify-center flex-col p-10">
        <h1 className="text-4xl font-bold mb-4">
          Multi-Trade School
        </h1>

        <p className="text-lg text-blue-100 text-center max-w-md">
          Register students easily and manage academic records.
        </p>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-100 p-6">

        <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8">

          <h2 className="text-2xl font-bold text-center mb-8">
            Student Registration
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* INPUT COMPONENT */}
            {[
              ["first_name", "First Name"],
              ["last_name", "Last Name"],
              ["email", "Email Address"],
              ["location", "Location"],
              ["telephone", "Telephone"],
              ["trade", "Trade"],
              ["class", "Class"]
            ].map(([name, label]) => (
              <div className="floating" key={name}>
                <input
                  type={name === "email" ? "email" : "text"}
                  name={name}
                  placeholder=" "
                  value={formData[name]}
                  onChange={handleChange}
                  required={name === "trade" || name === "email"}
                />
                <label>{label}</label>
              </div>
            ))}

            {/* GENDER */}
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="modern-input"
              required
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold flex justify-center items-center gap-2"
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Register Student"
              )}
            </button>

          </form>
        </div>
      </div>

      {/* STYLES */}
      <style>{`
        .modern-input{
          width:100%;
          padding:14px;
          border:1px solid #ddd;
          border-radius:12px;
        }

        .floating{
          position:relative;
        }

        .floating input{
          width:100%;
          padding:14px;
          border:1px solid #ddd;
          border-radius:12px;
          outline:none;
          background:transparent;
        }

        .floating label{
          position:absolute;
          left:14px;
          top:14px;
          color:#777;
          background:white;
          padding:0 6px;
          transition:.2s;
          pointer-events:none;
        }

        .floating input:focus + label,
        .floating input:not(:placeholder-shown) + label{
          top:-8px;
          font-size:12px;
          color:#2563eb;
        }
      `}</style>

    </div>
  );
}

export default Register_Student;