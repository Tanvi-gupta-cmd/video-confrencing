import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaVideo, FaArrowRight } from "react-icons/fa";

function JoinMeeting() {
  const [meetingId, setMeetingId] = useState("");
  const navigate = useNavigate();

  const joinMeeting = () => {
    if (!meetingId.trim()) {
      alert("Please enter a meeting code");
      return;
    }

    navigate(`/meeting/${meetingId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-100 flex items-center justify-center px-6">

      <div className="bg-white rounded-[35px] shadow-2xl max-w-xl w-full p-12">

        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
            <FaVideo size={40} />
          </div>
        </div>

        <h1 className="text-5xl font-bold text-center mt-8">
          Join Meeting
        </h1>

        <p className="text-center text-gray-500 mt-4">
          Enter the meeting code shared with you.
        </p>

        <div className="mt-10">

          <label className="font-semibold text-slate-700">
            Meeting Code
          </label>

          <input
            type="text"
            placeholder="Example : AB12CD"
            value={meetingId}
            onChange={(e) => setMeetingId(e.target.value.toUpperCase())}
            className="w-full mt-3 border rounded-xl px-5 py-4 text-xl outline-none focus:ring-2 focus:ring-teal-500"
          />

        </div>

        <button
          onClick={joinMeeting}
          className="w-full mt-8 bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl flex justify-center items-center gap-3 transition"
        >
          Join Now
          <FaArrowRight />
        </button>

      </div>

    </div>
  );
}

export default JoinMeeting;