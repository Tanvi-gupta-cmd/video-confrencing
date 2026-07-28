import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaVideo,
  FaCopy,
  FaRandom,
  FaArrowRight,
} from "react-icons/fa";

function CreateMeeting() {
  const navigate = useNavigate();

  const generateMeetingId = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const [meetingId, setMeetingId] = useState(generateMeetingId());

  const generateNew = () => {
    setMeetingId(generateMeetingId());
  };

  const copyCode = () => {
    navigator.clipboard.writeText(meetingId);
    alert("Meeting Code Copied!");
  };

  const startMeeting = () => {
    navigate(`/meeting/${meetingId.toUpperCase()}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-100 flex items-center justify-center px-6">

      <div className="bg-white rounded-[35px] shadow-2xl max-w-2xl w-full p-12">

        <div className="flex justify-center">

          <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
            <FaVideo size={40} />
          </div>

        </div>

        <h1 className="text-5xl font-bold text-center mt-8">
          Create Meeting
        </h1>

        <p className="text-center text-gray-500 mt-4">
          Generate a secure meeting code and invite participants instantly.
        </p>

        {/* Meeting Code */}

        <div className="mt-12">

          <label className="font-semibold text-slate-700">
            Meeting Code
          </label>

          <div className="flex mt-3">

            <input
              value={meetingId}
              readOnly
              className="flex-1 border rounded-l-xl px-5 py-4 bg-slate-50 text-2xl font-bold tracking-widest outline-none"
            />

            <button
              onClick={copyCode}
              className="bg-teal-600 px-6 text-white rounded-r-xl hover:bg-teal-700 transition"
            >
              <FaCopy />
            </button>

          </div>

        </div>

        {/* Buttons */}

        <div className="grid md:grid-cols-2 gap-5 mt-10">

          <button
            onClick={generateNew}
            className="flex justify-center items-center gap-3 border-2 border-teal-600 text-teal-600 rounded-xl py-4 hover:bg-teal-50 transition"
          >
            <FaRandom />
            Generate New Code
          </button>

          <button
            onClick={startMeeting}
            className="flex justify-center items-center gap-3 bg-teal-600 text-white rounded-xl py-4 hover:bg-teal-700 transition"
          >
            Start Meeting
            <FaArrowRight />
          </button>

        </div>

        {/* Tips */}

        <div className="mt-12 bg-cyan-50 rounded-2xl p-6">

          <h3 className="font-bold text-lg text-slate-800">
            Quick Tips
          </h3>

          <ul className="mt-4 space-y-2 text-gray-600">
            <li>✔ Share the meeting code with participants.</li>
            <li>✔ Allow camera & microphone permissions.</li>
            <li>✔ Join from desktop for the best experience.</li>
          </ul>

        </div>

      </div>

    </div>
  );
}

export default CreateMeeting;