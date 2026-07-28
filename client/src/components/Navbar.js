import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="absolute top-0 left-0 w-full z-50 flex items-center justify-between px-16 py-6">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-teal-600 flex items-center justify-center text-white text-2xl shadow-lg">
          🎥
        </div>

        <h1 className="text-4xl font-extrabold text-slate-900">
          Meet<span className="text-teal-600">Sync</span>
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="font-semibold text-slate-700 hover:text-teal-600 transition"
        >
          Home
        </Link>

        <Link
          to="/login"
          className="font-semibold text-slate-700 hover:text-teal-600 transition"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;