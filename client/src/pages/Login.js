import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login Successful");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-100 flex items-center justify-center px-6">

      <div className="grid lg:grid-cols-2 bg-white rounded-[35px] overflow-hidden shadow-2xl max-w-6xl w-full">

        {/* LEFT */}

        <div className="bg-gradient-to-br from-teal-600 to-cyan-500 text-white p-16 flex flex-col justify-center">

          <h1 className="text-5xl font-black">
            Welcome Back 👋
          </h1>

          <p className="mt-8 text-lg leading-8 text-cyan-100">
            Login to MeetSync and continue your secure meetings,
            video calls and collaboration from anywhere.
          </p>

          <div className="mt-14">

            <div className="w-24 h-24 rounded-full bg-white/20 mb-5"></div>

            <div className="w-52 h-4 rounded-full bg-white/20 mb-4"></div>

            <div className="w-40 h-4 rounded-full bg-white/20"></div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="p-16">

          <h2 className="text-4xl font-bold text-slate-900">
            Login
          </h2>

          <p className="text-slate-500 mt-3">
            Enter your account details.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >

            {/* Email */}

            <div className="relative">

              <FaEnvelope className="absolute left-5 top-5 text-gray-400" />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full pl-14 pr-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
              />

            </div>

            {/* Password */}

            <div className="relative">

              <FaLock className="absolute left-5 top-5 text-gray-400" />

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full pl-14 pr-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
              />

            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl font-semibold transition"
            >
              Login
            </button>

          </form>

          <p className="text-center text-gray-500 mt-8">

            Don't have an account?

            <Link
              to="/register"
              className="text-teal-600 font-semibold ml-2"
            >
              Sign Up
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;