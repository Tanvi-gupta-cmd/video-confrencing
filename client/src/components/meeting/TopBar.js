import {
  FaUsers,
  FaShieldAlt,
} from "react-icons/fa";

function TopBar() {
  return (
    <div className="h-16 bg-slate-900 text-white px-6 flex items-center justify-between border-b border-slate-700">

      {/* Left */}
      <div>
        <h2 className="text-xl font-bold">
          MeetSync Meeting
        </h2>

        <p className="text-sm text-slate-400">
          Secure End-to-End Encrypted
        </p>
      </div>

      {/* Center */}

      <div className="hidden md:flex items-center gap-3 bg-slate-800 px-5 py-2 rounded-full">

        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>

        <span>
          Live
        </span>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

        <div className="flex items-center gap-2">

          <FaUsers />

          <span>2</span>

        </div>

        <FaShieldAlt className="text-green-400" />

      </div>

    </div>
  );
}

export default TopBar;