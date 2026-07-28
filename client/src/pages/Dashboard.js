import { useNavigate } from "react-router-dom";
import API from "../api/api";

import {
  FaVideo,
  FaPlus,
  FaUsers,
  FaClock,
  FaCalendarAlt,
  FaArrowRight,
  FaSignOutAlt,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const createMeeting = async () => {
    try {
      const res = await API.post("/meeting/create", {
        host: user._id,
      });

      navigate(`/meeting/${res.data.meeting.meetingId}`);
    } catch (err) {
      console.log(err);
      alert("Unable to create meeting");
    }
  };

  const joinMeeting = () => {
    navigate("/join-meeting");
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const stats = [
    {
      title: "Meetings",
      value: "24",
      icon: <FaVideo />,
    },
    {
      title: "Participants",
      value: "138",
      icon: <FaUsers />,
    },
    {
      title: "Hours",
      value: "52h",
      icon: <FaClock />,
    },
    {
      title: "Scheduled",
      value: "8",
      icon: <FaCalendarAlt />,
    },
  ];

  const recentMeetings = [
    {
      title: "Frontend Team",
      time: "Today • 2:30 PM",
    },
    {
      title: "Client Discussion",
      time: "Tomorrow • 11:00 AM",
    },
    {
      title: "Placement Preparation",
      time: "Friday • 6:00 PM",
    },
  ];

  return (
        <div className="min-h-screen bg-slate-50">

      {/* ================= HEADER ================= */}

      <header className="bg-white shadow-sm border-b">

        <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-2xl bg-teal-600 flex items-center justify-center shadow-lg">

              <FaVideo className="text-white text-2xl" />

            </div>

            <div>

              <h1 className="text-3xl font-bold text-slate-800">
                MeetSync
              </h1>

              <p className="text-gray-500">
                HD Video Conferencing
              </p>

            </div>

          </div>

          <div className="flex items-center gap-5">

            <div className="text-right">

              <p className="text-gray-500 text-sm">
                Welcome Back
              </p>

              <h2 className="text-xl font-bold">
                {user?.name}
              </h2>

            </div>

            <div className="w-12 h-12 rounded-full bg-teal-600 text-white flex items-center justify-center text-lg font-bold">

              {user?.name?.charAt(0)}

            </div>

          </div>

        </div>

      </header>

      {/* ================= HERO ================= */}

      <section className="max-w-7xl mx-auto px-8 py-14">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}

          <div>

            <span className="bg-teal-100 text-teal-700 px-5 py-2 rounded-full font-semibold">

              HD Meetings

            </span>

            <h1 className="text-6xl font-extrabold mt-8 leading-tight text-slate-900">

              Connect.

              <br />

              Collaborate.

              <br />

              Meet Anywhere.

            </h1>

            <p className="text-gray-600 text-xl mt-8 leading-9">

              MeetSync helps teams communicate with
              crystal clear video, instant messaging,
              screen sharing and secure meetings.

            </p>

            <div className="flex gap-5 mt-10">

              <button
                onClick={createMeeting}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-2xl flex items-center gap-3 shadow-xl transition"
              >

                <FaPlus />

                Create Meeting

              </button>

              <button
                onClick={joinMeeting}
                className="border-2 border-teal-600 text-teal-700 hover:bg-teal-50 px-8 py-4 rounded-2xl flex items-center gap-3 transition"
              >

                Join Meeting

                <FaArrowRight />

              </button>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative h-[520px] rounded-[40px] bg-gradient-to-br from-teal-500 to-cyan-600 overflow-hidden shadow-2xl">

            <div className="absolute top-10 left-10 bg-white rounded-3xl shadow-xl p-8">

              <div className="text-5xl">
                🎥
              </div>

              <h3 className="font-bold text-xl mt-3">
                Video Call
              </h3>

            </div>

            <div className="absolute top-36 right-10 bg-white rounded-3xl shadow-xl p-8">

              <div className="text-5xl">
                👥
              </div>

              <h3 className="font-bold text-xl mt-3">
                Team Meeting
              </h3>

            </div>

            <div className="absolute bottom-12 left-16 bg-white rounded-3xl shadow-xl p-8">

              <div className="text-5xl">
                💬
              </div>

              <h3 className="font-bold text-xl mt-3">
                Live Chat
              </h3>

            </div>

          </div>

        </div>

                {/* ================= STATS ================= */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">

          {stats.map((item, index) => (

            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
            >

              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center text-2xl">

                {item.icon}

              </div>

              <h2 className="text-4xl font-bold mt-6 text-slate-800">

                {item.value}

              </h2>

              <p className="text-gray-500 mt-2">

                {item.title}

              </p>

            </div>

          ))}

        </div>

        {/* ================= BOTTOM ================= */}

        <div className="grid lg:grid-cols-3 gap-8 mt-16">

          {/* RECENT MEETINGS */}

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-lg p-8">

            <h2 className="text-2xl font-bold text-slate-800 mb-8">

              Recent Meetings

            </h2>

            {recentMeetings.map((meeting, index) => (

              <div
                key={index}
                className="flex justify-between items-center py-5 border-b last:border-none"
              >

                <div>

                  <h3 className="font-bold text-lg">

                    {meeting.title}

                  </h3>

                  <p className="text-gray-500">

                    {meeting.time}

                  </p>

                </div>

                <button
                  className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-xl transition"
                >

                  Join

                </button>

              </div>

            ))}

          </div>

          {/* QUICK ACTIONS */}

          <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-3xl shadow-xl p-8 text-white">

            <h2 className="text-3xl font-bold">

              Quick Actions

            </h2>

            <p className="mt-4 opacity-90 leading-7">

              Create a new meeting, join an existing one or
              securely logout from MeetSync.

            </p>

            <button
              onClick={createMeeting}
              className="w-full mt-8 bg-white text-teal-700 py-4 rounded-2xl font-bold hover:scale-105 transition"
            >

              + Create Meeting

            </button>

            <button
              onClick={joinMeeting}
              className="w-full mt-5 bg-teal-700 hover:bg-teal-800 py-4 rounded-2xl font-bold transition"
            >

              Join Meeting

            </button>

            <button
              onClick={logout}
              className="w-full mt-5 bg-red-500 hover:bg-red-600 py-4 rounded-2xl font-bold flex justify-center items-center gap-3 transition"
            >

              <FaSignOutAlt />

              Logout

            </button>

          </div>

        </div>

      </section>

    </div>

  );
}

export default Dashboard;