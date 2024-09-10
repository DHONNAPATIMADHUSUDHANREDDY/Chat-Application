import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";


export default function Chat({ socket, username, room }) {

    const [chatdata, setchatdata] = useState("");
    const [messageList, setMessageList] = useState([]);

    const Senddata = async () => {
        if (chatdata !== "") {
            const totaldetails = {
                author: username,
                room_no: room,
                message: chatdata,
                time:
                new Date(Date.now()).getHours() +":"+
                new Date(Date.now()).getMinutes(),
 
            };
            await socket.emit("mesdata", totaldetails);
            setMessageList((List) => [...List, totaldetails]);
            setchatdata("");
        }
    };

    useEffect(() => {
        const handleReceiveMessage = (data) => {
            setMessageList((list) => [...list, data]);
        };

        socket.on("receive_message", handleReceiveMessage);

        return () => {
            socket.off("receive_message", handleReceiveMessage);
        };
    }, [socket]);
 return (
        <div className="chat-window">
            <div className="chat-header" >
                <h3>Ms_Chat</h3>
            </div>
            <div className="chat-body " >
                <ScrollToBottom className="message-container ">
                {
                    messageList.map((messageContent) => {
                        return (
                        <div className="rs">
                            <div className={username === messageContent.author ? "sender" : "reciver"} >
                                <div className="content">
                                    <p className="md" >{messageContent.message}</p>
                                    <p className="time">{messageContent.time}</p>
                                </div>
                            </div> 
                        </div>
                        );
                    })
                }
                </ScrollToBottom>
            </div>
            <div className="chat-footer ">
                <input type="text" value={chatdata}  onChange={(event) => { setchatdata(event.target.value) }}  onKeyPress={(event)=>{
                    event.key==="Enter" && Senddata();
                }} />
                <button onClick={Senddata}>&#9658;</button>
            </div>
        </div>
    );
}