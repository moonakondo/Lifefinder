import React, { useEffect, useCallback, useState, useRef } from "react";
import ReactPlayer from "react-player";
import peer from "../../services/peer";
import { useSocket } from "../../context/SocketProvider";
import { Button, Layout, Typography, Row, Col, Divider, message } from "antd";
import { FaMicrophone, FaVideo, FaVideoSlash } from "react-icons/fa";
import { IoMicOff } from "react-icons/io5";
// import { MdScreenShare, MdStopScreenShare } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { IoCallOutline } from "react-icons/io5";
import { RiFullscreenExitLine } from "react-icons/ri";
import Navbar from "../Navbar2";
import {Footer} from "../../Sections";

const { Content } = Layout;
const { Title, Text } = Typography;

const RoomPage = () => {
  const location = useLocation();
  const socket = useSocket();
  useEffect(() => {
    if (!location?.state?.verified) {
      navigate("/room");
      message.error("You are not verified for meeting!");
    }
  }, []); 
  
  // Checking if the user is not is room (i.e has reloaded page), it will move back to the '/room' page
  useEffect(() => {
    socket.emit('room:check', { roomId: location?.state?.room });
  }, []);

  // useEffect(() => {
  //   socket.emit("room:join", { email: location?.state?.email, room: location?.state?.room });
  //   // return () => {
  //   //   socket.off("room:join", handleJoinRoom);
  //   // };
  // }, [socket]);

  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [existingUserId, setExistingUserId] = useState(null);
  const [myStream, setMyStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [screenStream, setScreenStream] = useState(null);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [streamsSent, setStreamsSent] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [remoteEmail, setRemoteEmail] = useState('');

  const [showBg, setShowBg] = useState(false);
  const [iAmCaller, setIAmCaller] = useState(false);
  const [callAccepted, setCallAccepted] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);

  const remoteSocketIdRef = useRef(null);
  const existingUserIdRef = useRef(null);
  // If there is an existing user already in Room
  useEffect(() => {
    if(location?.state?.remoteUser) {
      console.log('remoteUser found ✅: ', location?.state?.remoteUser);
      setRemoteSocketId(location?.state?.remoteUser);
      setExistingUserId(location?.state?.remoteUser);
      remoteSocketIdRef.current = location?.state?.remoteUser;
      existingUserIdRef.current = location?.state?.remoteUser;
    }
  }, [location?.state?.remoteUser]);

  // just for testing, remove it
  useEffect(() => {
    console.log('remoteSocket Id ✅✅: ', remoteSocketId);
  }, [remoteSocketId]);

  const handleUserJoined = useCallback(({ email, id }) => {
    console.log(`Email ${email} joined room`);
    setRemoteEmail(email);
    setRemoteSocketId(id);
    remoteSocketIdRef.current = id;
  }, []);

  const handleCallUser = useCallback(async () => {
    setIAmCaller(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
  
      const offer = await peer.getOffer();
      socket.emit("user:call", { to: remoteSocketId, offer });
    } catch (e) {
      message.error('Error in user calling. Resetting connection.');
      console.error('Error in user calling:', e);
      peer.resetPeerConnection();
      handleNegoNeeded();
    }
  }, [remoteSocketId, socket]);
  

  const endCall = () => {
    if (myStream) {
      // myStream.getTracks().forEach((track) => track.stop());
      // peer.peer.close();
      peer.endCall();
      socket.emit("call:ended", { to: remoteSocketId, roomId: location?.state?.room });

      setMyStream(null);
      setRemoteStream(null);
      setRemoteSocketId(null);
      setStreamsSent(false);
      navigate("/end-meeting");
    }
    if (screenStream) {
      screenStream.getTracks().forEach((track) => track.stop());
      setScreenStream(null);
    }
  };

  const toggleVideo = () => {
    if (myStream) {
      myStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsVideoOff(!isVideoOff);
    }
  };

  const toggleMute = () => {
    if (myStream) {
      myStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const handleIncomingCall = useCallback(
    async ({ from, offer }) => {
      setRemoteSocketId(from);
      remoteSocketIdRef.current = from;
      setShowBg(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMyStream(stream);
      console.log(`Incoming Call`, from, offer);
      const ans = await peer.getAnswer(offer);
      socket.emit("call:accepted", { to: from, ans });

      startAudio();
    },
    [socket]
  );

  const sendStreams = useCallback(() => {
    if (myStream && !streamsSent) {
      setShowBg(false);
      for (const track of myStream.getTracks()) {
        peer.peer.addTrack(track, myStream);
      }
      setStreamsSent(true);
      stopAudio();
      console.log('stop audio called inside sendStream()');
    }
    if (screenStream && !streamsSent) {
      for (const track of screenStream.getTracks()) {
        peer.peer.addTrack(track, screenStream);
      }
      setStreamsSent(true);
    }
  }, [myStream, screenStream, streamsSent]);

  const handleCallAccepted = useCallback(
    ({ from, ans }) => {
      peer.setLocalDescription(ans);
      console.log("Call Accepted!");
      sendStreams();
      setCallAccepted(true);
      stopAudio();
    },
    [sendStreams]
  );

  const handleNegoNeeded = useCallback(async () => {
    const offer = await peer.getOffer();
    socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
  }, [remoteSocketId, socket]);

  useEffect(() => {
    peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
    return () => {
      peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
    };
  }, [handleNegoNeeded]);

  const handleNegoNeedIncoming = useCallback(
    async ({ from, offer }) => {
      const ans = await peer.getAnswer(offer);
      socket.emit("peer:nego:done", { to: from, ans });
    },
    [socket]
  );

  const handleNegoNeedFinal = useCallback(async ({ ans }) => {
    await peer.setLocalDescription(ans);
  }, []);

  const handleCallEnded = ({ to, status }) => {
    console.log('handled call:ended...');
    console.log('handled call:ended...');
    console.log('handled call:ended..., status: ', status);
    console.log('status inside handleCallEnded():', status);
    peer.endCall();
    setMyStream(null);
    setRemoteStream(null);
    setRemoteSocketId(null);
    setStreamsSent(false);
    navigate(`/room?id=${location?.state?.room}&email=${location?.state?.email}`);
    message.info("The other user has ended the call, you could also rejoin!");
  };
  // const handleCallEnded = () => {
  //   console.log('handled call:ended...');
  //   console.log('handleCallEnded() called, existingUserId: ', existingUserId, existingUserIdRef.current);
  //   if(existingUserIdRef.current || existingUserId) {
  //     console.log('if called in handleCallEnded().');
  //     setRemoteSocketId(null);
  //     setExistingUserId('');
  //     remoteSocketIdRef.current = null;
  //     existingUserIdRef.current = null;
  //   } else {
  //     console.log('handled call:ended...');
  //     console.log('handled call:ended...');
  //     console.log('else in handleCallEnded: handleNavigation() called in return.');
  //     peer.endCall();
  //     setMyStream(null);
  //     setRemoteStream(null);
  //     setRemoteSocketId(null);
  //     setStreamsSent(false);
  //     navigate(`/room?id=${location?.state?.room}&email=${location?.state?.email}`);
  //     message.info("The other user has ended the call, you could also rejoin!");
  //   }
  // };

  const handleRoomCheck = ({ status }) => {
    if(status) {
      console.log('Room did not found!');
      navigate(`/room?id=${location?.state?.room}&email=${location?.state?.email}`);
    }
  }

  useEffect(() => {
    peer.peer.addEventListener("track", async (ev) => {
      const remoteStream = ev.streams[0];
      console.log("GOT TRACKS!!");
      setRemoteStream(remoteStream);
    });
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoined);
    socket.on("incomming:call", handleIncomingCall);
    socket.on("call:accepted", handleCallAccepted);
    socket.on("peer:nego:needed", handleNegoNeedIncoming);
    socket.on("peer:nego:final", handleNegoNeedFinal);
    socket.on("call:ended", handleCallEnded);
    socket.on("room:check", handleRoomCheck);
    
    return () => {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncoming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
      socket.off("call:ended", handleCallEnded);
      socket.off("room:check", handleRoomCheck);
    };
  }, [
    socket,
    handleUserJoined,
    handleIncomingCall,
    handleCallAccepted,
    handleNegoNeedIncoming,
    handleNegoNeedFinal,
    handleCallEnded
  ]);
  console.log("remoteStream", remoteStream);
  console.log("myStream", myStream);

  const navigate = useNavigate();

  const handleScreenShare = async () => {
    try {
      if (!screenStream) {
        // Start screen sharing
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: {
            cursor: "always",
            displaySurface: "monitor",
            logicalSurface: false,
          },
          audio: false,
        });
        setScreenStream(stream);
        stream.getTracks().forEach((track) => {
          peer.peer.addTrack(track, stream);
        });
      } else {
        // Stop screen sharing
        screenStream.getTracks().forEach((track) => {
          track.stop();
          peer.peer.removeTrack(track);
        });
        setScreenStream(null);
      }

      // Ensure consistent SDP negotiation after adding/removing tracks
      const offer = await peer.getOffer();
      socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
    } catch (error) {
      console.error("Error sharing screen: ", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if(seconds > 1800) {
    // if(seconds > 15) {
      socket.off("user:joined", handleUserJoined);
      socket.off("incomming:call", handleIncomingCall);
      socket.off("call:accepted", handleCallAccepted);
      socket.off("peer:nego:needed", handleNegoNeedIncoming);
      socket.off("peer:nego:final", handleNegoNeedFinal);
      socket?.disconnect();
      navigate('/room');
      message.error('The 30 minutes meeting time has been passed!');
    }
  }, [seconds])


  const audioRef = useRef(null);

  const startAudio = () => {
    console.log('start audio called ✅✅✅');
    if (audioRef.current) {
      audioRef.current.play();  
    }
  };
  
  const stopAudio = () => {
    console.log('stop audio called ✅');
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to the beginning
    }
  };

  // new
  const handleNavigation = (rm) => {
    const socketId = remoteSocketIdRef.current || rm || remoteSocketId;
    console.log('socketId inside handleNavigation(): ', socketId);
    console.log('console: ', remoteSocketIdRef.current, remoteSocketId);
    if(existingUserIdRef.current || existingUserId) {
      socket.emit("call:ended", { to: socketId, status: 'waiting', roomId: location?.state?.room });
    } else {
      socket.emit("call:ended", { to: socketId, roomId: location?.state?.room });
    }
    peer.endCall();
    exitFullscreen();
    navigate(`/room?id=${location?.state?.room}&email=${location?.state?.email}`);
    // message.info('The meeting has been ended, you could also rejoin!');
  };
  useEffect(() => {
    const cleanupCall = () => {
      console.log('cleanup called in return, existingUserId: ', existingUserId, existingUserIdRef.current);
      // if(existingUserIdRef.current || existingUserId) {
      //   console.log('if called in return.');
      //   setRemoteSocketId(null);
      //   setExistingUserId('');
      //   remoteSocketIdRef.current = null;
      //   existingUserIdRef.current = null;
      // } else {
      //   console.log('else: handleNavigation() called in return.');
      //   handleNavigation(remoteSocketId);
      // }
      handleNavigation(remoteSocketId);
    };
  
    return cleanupCall;
  }, []);
  // new end

  const toggleFullScreen = () => {
    fullScreen ? exitFullscreen() : goFullscreen();
    setFullScreen(prev => !prev);
  }

  const goFullscreen = () => {
    const element = document.documentElement;
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
  };

  function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
  }

  return (
    <>
    {!fullScreen && <Navbar />}
    <Layout className={fullScreen ? 'h-[100vh] overflow-hidden' : "min-h-screen"}>
      <audio ref={audioRef} loop style={{ display: 'none' }}>
        <source src="/audio/ring.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <Content className="relative">
        {/* <Content className={fullScreen ? "hidden" : "bg-blue-400 bg-slate-300 p-4 px-2 xs:px-4"}> */}
        <Content className={fullScreen ? "hidden" : "glass-effect p-3 px-2 xs:px-4"}>

        <Row justify="center" gutter={[16, 16]} className={remoteSocketId ? "-mb-[.2rem]" : 'my-2'}>
          <Col span={24} className="text-center">
            <Text className="md:text-[1.6vw] xs:text-[4vw] text-[1.1rem] font-bold text-white">
              {remoteSocketId ? (remoteEmail ? `Connected to: ${remoteEmail}` : "Connected") : "No one in room Please Wait..."}
            </Text>
          </Col>
        </Row>

        {remoteSocketId && <div className="w-full h-[1px] bg-[#eee] my-[.75rem]"></div>}
        {streamsSent && iAmCaller && !remoteStream && <Row className="mb-3 -mt-2" justify="center"><Col><div className="text-white text-[1.05rem]">(Ringing... Waiting for the User to Accept)</div></Col></Row>}
        <Row justify="center" gutter={[16, 16]}>
          <Col>
            {!streamsSent && !callAccepted && !showBg && remoteSocketId && (
              <button onClick={handleCallUser}>
                <div className="p-[.75rem] bg-white text-[#777] rounded-[50%] flex justify-center items-center text-[1.8rem]">
                  <IoCallOutline />
                </div>
              </button>
            )}
          </Col>
          <Col>
            {myStream && (
              <button onClick={sendStreams} disabled={streamsSent}>
                {/* {streamsSent ? (iAmCaller ? 'Call Started' : 'Accepted') : 'Accept'} */}
                <div className={streamsSent ? "p-[.75rem] bg-green-400 text-white rounded-[50%] flex justify-center items-center text-[1.8rem] opacity-60" : "p-[.75rem] bg-green-400 text-white rounded-[50%] flex justify-center items-center text-[1.8rem]"}>
                  <IoCallOutline />
                </div>
              </button>
            )}
          </Col>
        </Row>
        </Content>
        <Content className={fullScreen ? "" : "p-4 px-2 xs:px-4 mt-[1.2rem]"}>
        <Row justify="center" gutter={[16, 16]} className="relative">
          <Col span={24} className="relative">
            {remoteStream && (
              <>
              {myStream && !showBg && <div onClick={toggleFullScreen} className={ fullScreen ? "absolute top-[2rem] right-[1.5rem] bg-[#666] bg-opacity-40 rounded-[.8rem] p-[.5rem] text-[1.8rem] text-white z-50" : "absolute top-[.5rem] xs:top-[-.5rem] right-[1rem] bg-[#666] bg-opacity-40 rounded-[.8rem] p-[.5rem] text-[1.8rem] text-white z-50"}><RiFullscreenExitLine /></div>}
              <div className="flex justify-center items-center">
              <div
                className={fullScreen ? "relative z-[1] max-h-[100vh] max-w-[100vw] w-full h-full" : "relative z-[1] w-full mid:w-[80vw] md:w-[70vw] h-fit xs:h-[60vh] sm:h-[70vh] mid:h-[80vh]"}
              >
                {showBg && <div className="absolute inset-0 bg-slate-300 rounded-2xl flex justify-center items-center"><div className="text-xl xxss:text-2xl xs:text-3xl text-center p-[.5rem] -mt-[1rem] xxss:mt-0">Accept call to See Stream!</div></div>}
                <div className={fullScreen ? "bg-[#111] relative w-[100%] h-[100vh] overflow-hidden" : "player-react relative h-fit xs:h-full w-full overflow-hidden rounded-2xl"}>
                  <ReactPlayer
                    playing
                    height="100%"
                    width="100%"
                    // className={fullScreen ? "object-contain w-[100%] h-[100vh]" : "object-contain"}
                    className="object-contain"
                    url={remoteStream}
                  />
                  <div className={fullScreen ? "absolute bottom-[20vh] pb-[2rem] mid:pb-0 mid:bottom-[2rem] left-[50%] translate-x-[-50%] flex space-x-4" : "absolute bottom-2 xs:bottom-3 sm:bottom-4 left-[50%] translate-x-[-50%] flex space-x-4"}>
                    <div className="flex gap-[2vw] p-2 px-3 mid:px-2 rounded-full glass-effect">
                      <Button
                        className="rounded-full"
                        onClick={toggleMute}
                        icon={isMuted ? <IoMicOff /> : <FaMicrophone />}
                      />
                      <Button
                        className="rounded-full"
                        onClick={toggleVideo}
                        icon={isVideoOff ? <FaVideoSlash /> : <FaVideo />}
                      />
                      <Button
                        className="rounded-full z-[2]"
                        type="primary"
                        danger
                        onClick={endCall}
                      >
                        End Meeting
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </>
            )}
          </Col>

          <Col span={24}>
            {myStream && !fullScreen && (
              <div className="flex justify-end mt-[3rem]">
                <div
                  className="player-react-sm rounded-[1rem] overflow-hidden mid:w-[25vh] h-fit w-[20vh]"
                >
                  <ReactPlayer
                    playing
                    muted
                    height="100%"
                    width="100%"
                    className="rounded-2xl overflow-hidden"
                    url={myStream}
                  />
                </div>
              </div>
            )}
            {myStream && fullScreen && (
              <div className="absolute right-[1.5rem] bottom-[2rem] z-50 shadow-2xl">
                <div
                  className="player-react-sm rounded-[1rem] overflow-hidden mid:w-[25vh] h-fit w-[20vh]"
                >
                  <ReactPlayer
                    playing
                    muted
                    height="100%"
                    width="100%"
                    className="rounded-2xl overflow-hidden"
                    url={myStream}
                  />
                </div>
              </div>
            )}
          </Col>
          {/* <Col span={8}>
            {screenStream && (
              <div>
                <Text className="text-xl font-bold">Screen Share</Text>
                <ReactPlayer
                  playing
                  height="200px"
                  width="100%"
                  url={screenStream}
                />
              </div>
            )}
          </Col> */}
        </Row>
        </Content>
      </Content>
    </Layout>
    {!fullScreen && <Footer />}
    </>
  );
};

export default RoomPage;
