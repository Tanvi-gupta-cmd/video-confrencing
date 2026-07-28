import VideoPlayer from "./VideoPlayer";

function VideoGrid({ localVideoRef, remoteVideoRef }) {
  return (
    <div className="relative flex-1 flex items-center justify-center p-8">

      {/* Remote Video */}
      <div className="w-full max-w-6xl h-[70vh]">
        <VideoPlayer
          videoRef={remoteVideoRef}
          name="Participant"
        />
      </div>

      {/* Local Video */}
      <div className="absolute bottom-10 right-10 w-72">
        <VideoPlayer
          videoRef={localVideoRef}
          muted
          name="You"
          small
        />
      </div>

    </div>
  );
}

export default VideoGrid;