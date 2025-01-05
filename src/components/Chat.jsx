import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import RenderFiles from './RenderFiles';
const socket = io('http://localhost:7000');
const Chat = () => {
  const [file, setFile] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const location = useLocation();
  const [chatHistory, setChatHistory] = useState([]);
  const { chatUser } = location.state;
  const loggedInUser = useSelector((store) => store.user);
  const fromUserId = loggedInUser._id;
  const toUserId = chatUser._id;
  const { firstName, lastName,photoUrl } = chatUser;
  const navigate = useNavigate();
  useEffect(() => {
    socket.emit('register', fromUserId);
    return () => {
      socket.off('receiveMessage');
    };
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messages = await axios.get(BASE_URL + '/messages/' + toUserId, { withCredentials: true });
        setChatHistory(messages.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages(); 
  }, []);

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setChatHistory((prev) => [...prev, message]);
    });

    return () => socket.off('receiveMessage');
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file);
   
   try{
    const uploadResponse = await axios.post(BASE_URL+"/file-send/" +toUserId, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials:true});
    const fileUrl = uploadResponse.data.url;
          const newMessage = {
          fromUserId,
          toUserId,
          messageText: '',
          fileUrl,
          timestamp:Date.now(),
        };
        setChatHistory((prev) => [...prev, newMessage]);
        socket.emit('sendMessage', newMessage);
        setFile("");
      } 
    catch(err){
        console.log(err.message);
    }
  };
  const handleSendMessage = () => {
    if (messageText.trim() !== "" || fileUrl) {
      setChatHistory((prev) => [
        ...prev,
        { toUserId, fromUserId, messageText, file, fileUrl,timestamp:Date.now()  }
      ]);
      socket.emit('sendMessage', {
        fromUserId,
        toUserId,
        messageText,
        file,
        fileUrl,
        timestamp:Date.now(),
      });
    setFile("");
    setFileUrl("");
    setMessageText("");
    }

  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }); 
  };
  

  return (
    <div className="flex flex-col justify-between h-screen max-w-md mx-auto border bg-black shadow-lg rounded-lg">
       
      <div className="flex gap-3  p-4 text-xl bg-blue-500 text-white font-semibold rounded-t-lg">
   <button onClick = {()=>{navigate(-1)}} className="flex items-center text-darkPurple hover:text-electricBlue  rounded-lg focus:outline-none transition duration-200">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className="w-5 h-5 mr-2"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 19l-7-7 7-7"
    />
  </svg>
</button>

      <figure className ="">
              <img src={photoUrl} alt="user-photo" className="w-10 h-10 rounded-full" />
            </figure> 
        {firstName + " " + lastName}

      </div>
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {chatHistory.map((msg) => (
          
          <div key={msg._id} className={`chat ${msg.fromUserId === fromUserId ? 'chat-end' : 'chat-start'}`}>

          {msg.messageText && ( <div className="chat-bubble ">
            {msg.messageText}
            <time className="text-xs px-3 py-12 opacity-50">{formatTime(msg.timestamp)}</time>
            </div>)}
            {msg.fileUrl && (
              <div className="file-container mt-2">
                  <RenderFiles fileUrl={msg.fileUrl} />
                <time className="text-xs  opacity-50">{formatTime(msg.timestamp)}</time>
              </div>)}
          </div>
        ))}
      </div>
      <div className="p-3 bg-black border-t flex space-x-2">
      <div className="file-upload">
        <div className="flex items-center">
  <label
    for="fileInput"
    className="flex items-center justify-center  text-blue-400 text-4xl font-medium  cursor-pointer mr-2 "
  >
     +<i className="fa fa-paperclip text-white "></i>
  </label>
  <input 
    type="file" 
    id="fileInput" 
    className="hidden" 
    onChange={handleFileChange} 
  />
</div>

</div>
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type your message..."
          className="input input-bordered flex-grow"
        />
        {messageText &&<button onClick ={handleSendMessage} class="bg-blue-500 text-white rounded-full p-3 flex items-center justify-center w-12 h-12">
  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l4-4m0 0l-4-4m4 4H3"></path>
  </svg>
</button>



}
        {file && (
          <button onClick ={handleFileUpload} class="bg-blue-500 text-white rounded-full p-3 flex items-center justify-center w-12 h-12">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 13l4-4m0 0l-4-4m4 4H3"></path>
          </svg>
        </button>
        )}
      </div>
    </div>
  );
};

export default Chat;
