function VideoPlayer({ videoRef, name, muted = false, small = false }) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-black shadow-2xl ${
        small ? "w-72 h-52" : "w-full h-full"
      }`}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={muted}
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-3 left-3 bg-black/60 px-3 py-1 rounded-full text-white text-sm">
        {name}
      </div>
    </div>
  );
}

export default VideoPlayer;