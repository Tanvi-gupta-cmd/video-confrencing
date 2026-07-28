import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaDesktop,
  FaPhoneSlash,
} from "react-icons/fa";

function Controls({
  micOn,
  cameraOn,
  isSharing,
  toggleMic,
  toggleCamera,
  shareScreen,
  leaveMeeting,
}) {
  const btn =
    "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg";

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-5 bg-[#2d2d2d]/95 backdrop-blur-md px-8 py-4 rounded-full shadow-2xl">

      <button
        onClick={toggleMic}
        className={`${btn} ${
          micOn ? "bg-[#3c4043]" : "bg-red-500"
        }`}
      >
        {micOn ? (
          <FaMicrophone className="text-white text-xl" />
        ) : (
          <FaMicrophoneSlash className="text-white text-xl" />
        )}
      </button>

      <button
        onClick={toggleCamera}
        className={`${btn} ${
          cameraOn ? "bg-[#3c4043]" : "bg-red-500"
        }`}
      >
        {cameraOn ? (
          <FaVideo className="text-white text-xl" />
        ) : (
          <FaVideoSlash className="text-white text-xl" />
        )}
      </button>

      <button
        onClick={shareScreen}
        className={`${btn} ${
          isSharing ? "bg-green-600" : "bg-[#3c4043]"
        }`}
      >
        <FaDesktop className="text-white text-xl" />
      </button>

      <button
        onClick={leaveMeeting}
        className={`${btn} bg-red-600 hover:bg-red-700`}
      >
        <FaPhoneSlash className="text-white text-xl" />
      </button>

    </div>
  );
}

export default Controls;