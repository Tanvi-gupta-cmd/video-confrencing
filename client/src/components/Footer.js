import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">

      {/* Top Border */}
      <div className="h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500"></div>

      <div className="max-w-7xl mx-auto px-8 py-14 grid md:grid-cols-3 gap-10">

        {/* Logo */}
        <div>
          <h2 className="text-3xl font-bold">
            Meet<span className="text-teal-400">Sync</span>
          </h2>

          <p className="text-gray-400 mt-5 leading-7">
            Secure video meetings, live chat and collaboration
            for teams, friends and everyone.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-bold text-xl mb-5">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3 text-gray-400">

            <Link to="/">Home</Link>

            <Link to="/login">Login</Link>

            <Link to="/register">Sign Up</Link>

            <Link to="/create-meeting">
              New Meeting
            </Link>

          </div>
        </div>

        {/* Social */}
        <div>

          <h3 className="font-bold text-xl mb-5">
            Connect
          </h3>

          <div className="flex gap-5 text-3xl">

            <FaGithub className="hover:text-teal-400 cursor-pointer transition" />

            <FaLinkedin className="hover:text-teal-400 cursor-pointer transition" />

            <FaTwitter className="hover:text-teal-400 cursor-pointer transition" />

          </div>

        </div>

      </div>

      <div className="border-t border-slate-700 py-6 text-center text-gray-500">
        © 2026 MeetSync • Built with React, Node.js & Socket.io
      </div>

    </footer>
  );
}

export default Footer;