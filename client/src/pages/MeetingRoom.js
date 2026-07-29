import { useEffect, useRef, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import socket from "../socket";
import peer from "../services/peer";

import TopBar from "../components/meeting/TopBar";
import VideoGrid from "../components/meeting/VideoGrid";
import Controls from "../components/meeting/Controls";

function MeetingRoom() {

  const { id: roomId } = useParams();
//  const roomId = id.toUpperCase();
  const navigate = useNavigate();

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  const localStream = useRef(null);
  const remoteSocketId = useRef(null);

  const started = useRef(false);
  const chatEndRef = useRef(null);

  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [isSharing, setIsSharing] = useState(false);

  const startMeeting = useCallback(async () => {

  try {

    console.log("🎥 Starting Meeting");

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    localStream.current = stream;

    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    stream.getTracks().forEach((track) => {

      const alreadyAdded = peer.peer
        .getSenders()
        .find(sender => sender.track === track);

      if (!alreadyAdded) {
        peer.peer.addTrack(track, stream);
    }
    
    });

    peer.peer.onicecandidate = ({ candidate }) => {

      if (candidate && remoteSocketId.current) {

        socket.emit("ice-candidate", {
          target: remoteSocketId.current,
          candidate,
        });

      }

    };

    console.log("Joining Room:", roomId);

    socket.emit("join-room", roomId);

    setParticipants(prev =>
      prev.includes(socket.id)
        ? prev
        : [...prev, socket.id]
    );

  }

  catch (err) {

    console.log(err);

  }

}, [roomId]);

  useEffect(() => {

    if (started.current) return;

    started.current = true;

    startMeeting();

    socket.on("connect", () => {
      console.log("✅ Socket:", socket.id);
    });

    socket.on("all-users", async (users) => {

      console.log("👥 All Users:", users);

      if (users.length === 0) return;

      remoteSocketId.current = users[0];

      const offer = await peer.createOffer();

      socket.emit("offer", {
        target: remoteSocketId.current,
        offer,
      });

    });

    socket.on("offer", async ({ from, offer }) => {

      console.log("📩 Offer Received");

      remoteSocketId.current = from;

      const answer = await peer.createAnswer(offer);

      socket.emit("answer", {
        target: from,
        answer,
      });

    });

    socket.on("answer", async ({ answer }) => {

      console.log("✅ Answer Received");

      await peer.setRemoteAnswer(answer);

    });

    socket.on("ice-candidate", async ({ candidate }) => {

      await peer.addIceCandidate(candidate);

    });

    socket.on("user-joined", (id) => {

      console.log("👤 User Joined:", id);

      setParticipants((prev) =>
        prev.includes(id) ? prev : [...prev, id]
      );

    });

    socket.on("user-left", (id) => {

      console.log("❌ User Left:", id);

      setParticipants((prev) =>
        prev.filter((user) => user !== id)
      );

    });

    socket.on("receive-message", (data) => {

      setMessages((prev) => [...prev, data]);

    });

    peer.peer.ontrack = (event) => {

      console.log("🎥 Remote Stream");

      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }

    };

    return () => {

      socket.removeAllListeners();

      if (localStream.current) {
        localStream.current
          .getTracks()
          .forEach(track => track.stop());
      }

      peer.close();

    };

  }, [startMeeting]);

  

// ==========================
// Chat Auto Scroll
// ==========================

useEffect(() => {

  chatEndRef.current?.scrollIntoView({
    behavior: "smooth",
  });

}, [messages]);

// ==========================
// Send Message
// ==========================

const sendMessage = () => {

  if (!message.trim()) return;

  const data = {
    roomId,
    sender: socket.id,
    message,
    time: new Date().toLocaleTimeString(),
  };

  socket.emit("send-message", data);

  setMessages((prev) => [...prev, data]);

  setMessage("");

};

// ==========================
// Toggle Mic
// ==========================

const toggleMic = () => {

  if (!localStream.current) return;

  const track = localStream.current.getAudioTracks()[0];

  if (!track) return;

  track.enabled = !track.enabled;

  setMicOn(track.enabled);

};

// ==========================
// Toggle Camera
// ==========================

const toggleCamera = () => {

  if (!localStream.current) return;

  const track = localStream.current.getVideoTracks()[0];

  if (!track) return;

  track.enabled = !track.enabled;

  setCameraOn(track.enabled);

};

// ==========================
// Screen Share
// ==========================

const shareScreen = async () => {

  try {

    const screenStream =
      await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

    const screenTrack =
      screenStream.getVideoTracks()[0];

    const sender = peer.peer
      .getSenders()
      .find(
        (sender) =>
          sender.track &&
          sender.track.kind === "video"
      );

    if (sender) {
      sender.replaceTrack(screenTrack);
    }

    localVideoRef.current.srcObject =
      screenStream;

    setIsSharing(true);

    screenTrack.onended = () => {

      const cameraTrack =
        localStream.current.getVideoTracks()[0];

      if (sender) {
        sender.replaceTrack(cameraTrack);
      }

      localVideoRef.current.srcObject =
        localStream.current;

      setIsSharing(false);

    };

  } catch (err) {

    console.log(err);

  }

};

// ==========================
// Leave Meeting
// ==========================

const leaveMeeting = () => {

  if (localStream.current) {

    localStream.current
      .getTracks()
      .forEach(track => track.stop());

  }

  peer.close();

  socket.disconnect();

  navigate("/dashboard");

};

return (
  <div
    style={{
      minHeight: "100vh",
      background: "#202124",
      color: "white",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
    }}
  >
    <TopBar />

    <div
      style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "1fr 320px",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <VideoGrid
        localVideoRef={localVideoRef}
        remoteVideoRef={remoteVideoRef}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {/* Participants */}
        <div
          style={{
            background: "#2d2d2d",
            borderRadius: "12px",
            padding: "15px",
          }}
        >
          <h3>Participants ({participants.length})</h3>

          {participants.map((id) => (
            <div
              key={id}
              style={{
                marginTop: "10px",
                padding: "8px",
                background: "#3c4043",
                borderRadius: "8px",
              }}
            >
              {id === socket.id ? "🟢 You" : "👤 Participant"}
            </div>
          ))}
        </div>

        {/* Chat */}
        <div
          style={{
            flex: 1,
            background: "#2d2d2d",
            borderRadius: "12px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "15px",
              borderBottom: "1px solid #444",
              fontWeight: "bold",
            }}
          >
            Chat
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "15px",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    msg.sender === socket.id
                      ? "flex-end"
                      : "flex-start",
                  marginBottom: "12px",
                }}
              >
                <div
                  style={{
                    background:
                      msg.sender === socket.id
                        ? "#0b57d0"
                        : "#3c4043",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    maxWidth: "80%",
                  }}
                >
                  <div>{msg.message}</div>

                  <small style={{ opacity: 0.7 }}>
                    {msg.time}
                  </small>
                </div>
              </div>
            ))}

            <div ref={chatEndRef} />
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              padding: "15px",
              borderTop: "1px solid #444",
            }}
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
              placeholder="Type a message..."
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                outline: "none",
              }}
            />

            <button
              onClick={sendMessage}
              style={{
                padding: "0 18px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>

    <Controls
      micOn={micOn}
      cameraOn={cameraOn}
      isSharing={isSharing}
      toggleMic={toggleMic}
      toggleCamera={toggleCamera}
      shareScreen={shareScreen}
      leaveMeeting={leaveMeeting}
    />
  </div>
);

}

export default MeetingRoom;