import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import ChatLogo from "../assets/chat-logo.png";
import CallLogo from "../assets/Calling_Logo.png";
import NotificationLogo from "../assets/notification_logo.png";
import VideoCallLogo from "../assets/video_call_icon.png";
import PopupHeader from "./PopupHeader";
import LOGO from "../assets/ChandigarhTrafficLogo.png";
import "../styles/Header.css";
import Peer from "simple-peer";

const socket = io("http://localhost:5000"); // Replace with your backend URL

const Header = () => {
  const [popup, setPopup] = useState({ type: "", content: null, isOpen: false });
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevScrollY, setPrevScrollY] = useState(window.scrollY);
  const [incomingCall, setIncomingCall] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [stream, setStream] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [userId, setUserId] = useState("");
  const [call, setCall] = useState(null);
  const [peer, setPeer] = useState(null);

    const myVideo = useRef();
  const userVideo = useRef();

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollDirection(currentScrollY > prevScrollY ? "down" : "up");
      setPrevScrollY(currentScrollY);

    //   const generatedUserId = prompt("Enter your user ID:");
    //       setUserId(generatedUserId);
    //       socket.emit("join", generatedUserId);
      
    //       navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
    //         setStream(currentStream);
    //         if (myVideo.current) myVideo.current.srcObject = currentStream;
    //       });
      
    //       socket.on("incomingCall", ({ from, signal }) => {
    //         setCall({ isReceivingCall: true, from, signal });
    //       });
      
    //       return () => {
    //         socket.off("incomingCall");
    //       };
    };

    window.addEventListener("scroll", handleScroll);

    socket.on("incomingCall", ({ from, signal }) => {
      setIncomingCall({ from, signal });
      openPopup("IncomingCall", { from, signal });
    });

    socket.on("callAccepted", async (signal) => {
      if (peerConnection) {
        peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
        setCallAccepted(true);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      socket.off("incomingCall");
      socket.off("callAccepted");
    };
  }, [peerConnection, prevScrollY]);

  const openPopup = (type, content = null) => {
    setPopup({ type, content, isOpen: true });
  };

  const closePopup = () => {
    setPopup({ type: "", content: null, isOpen: false });
    setIncomingCall(null);
    setCallAccepted(false);
  };

  const startCall = async (video = false) => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video,
        audio: true,
      });
      setStream(userStream);
      if (localVideoRef.current) localVideoRef.current.srcObject = userStream;

      const peer = new RTCPeerConnection();
      userStream.getTracks().forEach((track) => peer.addTrack(track, userStream));

      peer.ontrack = (event) => {
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
      };

      const offer = await peer.createOffer();
      await peer.setLocalDescription(offer);

      socket.emit("callUser", { signalData: offer });

      setPeerConnection(peer);
      openPopup(video ? "VideoCall" : "VoiceCall");
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  const acceptCall = async () => {
    if (!incomingCall) return;
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setStream(userStream);
      if (localVideoRef.current) localVideoRef.current.srcObject = userStream;

      const peer = new RTCPeerConnection();
      userStream.getTracks().forEach((track) => peer.addTrack(track, userStream));

      peer.ontrack = (event) => {
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = event.streams[0];
      };

      await peer.setRemoteDescription(new RTCSessionDescription(incomingCall.signal));
      const answer = await peer.createAnswer();
      await peer.setLocalDescription(answer);

      socket.emit("acceptCall", { signal: answer });

      setPeerConnection(peer);
      setCallAccepted(true);
    } catch (error) {
      console.error("Error accepting call:", error);
    }
  };
    const callUser = () => {
    const userToCall = prompt("Enter the user ID you want to call:");
    if (!userToCall) return;

    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("callUser", { userToCall, signalData: data, from: userId });
    });

    peer.on("stream", (userStream) => {
      if (userVideo.current) userVideo.current.srcObject = userStream;
    });

    socket.on("callAccepted", (signal) => {
      peer.signal(signal);
      setCallAccepted(true);
    });

    setPeer(peer);
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: call.from });
    });

    peer.on("stream", (userStream) => {
      if (userVideo.current) userVideo.current.srcObject = userStream;
    });

    peer.signal(call.signal);
    setPeer(peer);
  };

  const endCall = () => {
    if (peer) peer.destroy();
    socket.emit("endCall", { to: call?.from });
    setCallAccepted(false);
    setCall(null);
  };


  return (
    <header className={`header-container ${scrollDirection === "down" ? "header-hidden" : ""}`}>
      <div className="header-logo-wrapper">
        <Link to="/" className="header-logo-link">
          <img src={LOGO} alt="Chandigarh Traffic Police Logo" className="header-logo" />
        </Link>
      </div>

      <div className="header-title-wrapper">
        <h1 className="header-title">1073 Chandigarh Traffic Police Control Room</h1>
      </div>

      <div className="header-buttons">
        <button onClick={() => openPopup("Chat")} aria-label="Open Chat">
          <img src={ChatLogo} alt="Chat" />
        </button>
        <button onClick={() => startCall(false)} aria-label="Voice Call">
          <img src={CallLogo} alt="Voice Call" />
        </button>
        <button onClick={() => startCall(true)} aria-label="Video Call">
          <img src={VideoCallLogo} alt="Video Call" />
        </button>
        <button onClick={() => openPopup("Notifications")} aria-label="View Notifications">
          <img src={NotificationLogo} alt="Notifications" />
        </button>
      </div>

      {popup.isOpen && (
        <PopupHeader popupType={popup.type} onClose={closePopup}>
          {popup.type === "VoiceCall" && <button onClick={endCall} className="end-call-btn">End Call</button>}
          {popup.type === "VideoCall" && (
            <>
              <video ref={localVideoRef} autoPlay playsInline muted />
              <video ref={remoteVideoRef} autoPlay playsInline />
              <button onClick={endCall} className="end-call-btn">End Call</button>
            </>
          )}
          {popup.type === "IncomingCall" && (
            <>
              <button onClick={acceptCall} className="accept-call-btn">Accept</button>
              <button onClick={closePopup} className="reject-call-btn">Reject</button>
            </>
          )}
          {popup.type === "Notifications" && (
            <div className="notifications-popup">
              <h3>Notifications</h3>
              <ul>
                {notifications.map((note, index) => (
                  <li key={index}>{note.message}</li>
                ))}
              </ul>
            </div>
          )}
        </PopupHeader>
      )}
    </header>
  );
};

export default Header;
