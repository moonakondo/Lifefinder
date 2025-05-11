import React, { useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Form, Input, Button, Typography, Card, message } from "antd";
import { useSocket } from "../../context/SocketProvider";
// import axios from "../../services/axios";
import axios from "axios";
import { apiUrl } from "../../apiUrl";

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const [permissionError, setPermissionError] = useState('');

  const socket = useSocket();
  const navigate = useNavigate();
  const { Title, Text } = Typography;

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id") || "";
  const userEmail = searchParams.get("email") || "";
  useEffect(() => {
    setRoom(id);
    setEmail(userEmail);
  }, [id, userEmail]);

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      console.log('Permissions granted');
      setPermissionError(''); // Close the modal
      // setMyStream(stream);
    } catch (err) {
      // Permissions not granted
      setPermissionError('Permissions not granted. Please enable the microphone and camera.');
      console.log('Error accessing media devices: ', err);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, [])

  const handleSubmitForm = useCallback(
    (e) => {
      // uncomment it
      if(!permissionError) {
        // socket.emit("room:join", { email, room });
        axios
          .post(apiUrl + "/join/meeting", {
            email: email,
            session_id: room,
          })
          .then((res) => {
            console.log("join/meeting response: ", res.data);
            localStorage.setItem("clinic_email", email);
            socket.emit("room:join", { email, room });
          })
          .catch((e) => {
            console.log(
              "error in join-meeting api: ",
              e?.response?.data?.error || e?.response?.data || e?.data
            );
            message.error(e?.response?.data?.error || e?.message);
          });
      } else {
        requestPermissions();
      }
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      const { room, users } = data;
      console.log('roomId in handleJoinRoom: ', room);
      console.log('users in handleJoinRoom: ', users);
      if(!room) {
        message.info('The meeting is already in progress / Room is full!');
        return;
      }
      const remoteUser = users.length > 0 ? users[0] : '';
      navigate(`/room/${room}`, { state: { verified: true, email: userEmail, room: id, remoteUser } });
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  if(permissionError) {
    return (
      <div className="h-[80vh] w-full">
        <div className="w-full h-full flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 xs:p-8 max-w-sm w-[95%]">
            <h2 className="text-xl font-semibold text-red-600 mb-4">⚠️ Error</h2>
            <p className="text-gray-700 mb-3 text-[1.05rem]">Camera and mic permissions are required to start the meeting!</p>
            <p className="text-gray-700 mb-6 text-sm">{`(If the button don't work, 1) Click on permissions icon in the browser top header to grant camera and mic permissions. 2) If it is still not working, Check Settings App for Browser Permission.)`}</p>
            <button
              onClick={requestPermissions}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Re-ask Permissions
            </button>
          </div>
        </div>
      </div>
      // {showModal && (
      // )}
    )
  } else {  

  return (
    <div className="flex justify-center items-center h-[90vh] bg-gray-100">
      <Card className="w-full max-w-md p-6">
        <Title level={2} className="text-center mb-4">
          Joining a Meeting
        </Title>
        <span className="text-center flex justify-center items-center font-medium text-xl mb-[40px]">
          Welcome back to join the meeting
        </span>
        <Form layout="vertical" onFinish={handleSubmitForm}>
          <Form.Item
            label={
              <span className="text-clr1 font-medium text-xl">Email ID</span>
            }
          >
            <Input
              size="large"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label={
              <span className="text-clr1 font-medium text-xl">Meeting ID</span>
            }
          >
            <Input
              size="large"
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              className="w-full md:w-auto !bg-clr1 hover:!bg-transparent border-2 border-clr1 hover:!text-clr1 font-semibold text-lg h-[50px]"
            >
              Join
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
  }
};

export default LobbyScreen;
