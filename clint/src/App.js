
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";




const socket = io.connect("http://localhost:3001");

function App() {

  const [username, setusername] = useState("");
  const [room, setroom] = useState("");

  // i want to see the chat when iam going to join..
  const [showChat, setShowChat] = useState(false);

  const joinroom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }
  return (
    <div className="App">

      {
      //using ternaryoperator for display the chat after join....
      }

      {!showChat ? (

        <div className="tcon">
          <input className="ms" type="text" placeholder="Username" onChange={(event) => { setusername(event.target.value) }} /> <br/>
          <input className="ms" type="text" placeholder="JoinRoom" onChange={(event) => { setroom(event.target.value) }} /><br />

          <button className="btn btn-primary" onClick={joinroom}>Submit</button>
        </div>
      )
        :
        (<Chat socket={socket} username={username} room={room} />
        )}
    </div>
  );
}

export default App;
