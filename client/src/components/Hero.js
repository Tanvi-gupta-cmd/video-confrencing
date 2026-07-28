import { Link } from "react-router-dom";
import { FaMicrophone, FaVideo } from "react-icons/fa";

const users = [
  {
    name: "Alex",
    status: "Speaking",
    img: "https://i.pravatar.cc/150?img=12",
    active: true,
  },
  {
    name: "Emma",
    status: "Connected",
    img: "https://i.pravatar.cc/150?img=32",
    active: false,
  },
  {
    name: "Sophia",
    status: "Online",
    img: "https://i.pravatar.cc/150?img=25",
    active: false,
  },
  {
    name: "David",
    status: "In Meeting",
    img: "https://i.pravatar.cc/150?img=44",
    active: false,
  },
];

function Hero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#F8FAFC] via-[#ECFEFF] to-[#CCFBF1] overflow-hidden pt-28">

      {/* Background Glow */}
      <div className="absolute top-20 right-24 w-72 h-72 bg-teal-300 rounded-full blur-[120px] opacity-30"></div>
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-300 rounded-full blur-[120px] opacity-20"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>

          <span className="inline-flex items-center px-5 py-2 rounded-full bg-teal-100 text-teal-700 font-semibold">
            ✨ Secure Online Meetings
          </span>

          <h1 className="text-6xl lg:text-7xl font-black leading-tight text-slate-900 mt-8">
            Connect
            <br />
            instantly.
            <br />
            <span className="text-teal-600">
              No friction.
            </span>
          </h1>

          <p className="mt-8 text-slate-600 text-xl leading-9 max-w-xl">
            MeetSync helps teams connect through secure video meetings,
            live chat and seamless collaboration from anywhere.
          </p>

          <div className="flex gap-5 mt-12">

            <Link
              to="/create-meeting"
              className="w-56 h-16 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-xl hover:scale-105 transition"
            >
              🎥 New Meeting
            </Link>

            <Link
              to="/join-meeting"
              className="w-56 h-16 rounded-2xl bg-white border border-gray-300 flex items-center justify-center shadow-lg hover:bg-gray-50 transition"
            >
              Join Existing
            </Link>

          </div>

        </div>

        {/* RIGHT */}
        <div className="flex justify-center lg:justify-end">

           <div className="relative overflow-hidden bg-gradient-to-br from-teal-600 via-teal-500 to-cyan-500 rounded-[40px] p-10 shadow-2xl w-full max-w-[540px]">

                  <div
  className="absolute inset-0 opacity-10"
  style={{
    backgroundImage: `
      linear-gradient(30deg, rgba(255,255,255,.6) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,.6) 87.5%, rgba(255,255,255,.6)),
      linear-gradient(150deg, rgba(255,255,255,.6) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,.6) 87.5%, rgba(255,255,255,.6)),
      linear-gradient(90deg, rgba(255,255,255,.4) 2%, transparent 2.5%, transparent 97%, rgba(255,255,255,.4) 98%)
    `,
    backgroundSize: "40px 70px",
  }}
></div>

            <div className="relative z-10 grid grid-cols-2 gap-8">

              {users.map((user, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-3xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:scale-105 ${
                    user.active ? "animate-bounce" : ""
                  }`}
                >

                  <img
                    src={user.img}
                    alt={user.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />

                  <div className="flex justify-between mt-5">

                    <FaMicrophone
                      className={
                        user.active ? "text-green-600" : "text-gray-400"
                      }
                    />

                    <FaVideo
                      className={
                        user.active ? "text-green-600" : "text-gray-400"
                      }
                    />

                  </div>

                  <h3 className="font-bold text-2xl text-slate-800 mt-4">
                    {user.name}
                  </h3>

                  <p
                    className={`mt-2 ${
                      user.active
                        ? "text-green-600"
                        : "text-slate-500"
                    }`}
                  >
                    {user.active ? "● " : ""}
                    {user.status}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;