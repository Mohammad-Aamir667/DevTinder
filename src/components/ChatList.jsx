import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchConversations } from '../utils/store';
import { useLocation, useNavigate } from 'react-router-dom';

const ChatList = () => {
    const conversations = useSelector((state) => state.conversations);
    const user = useSelector((state) => state.user);
    const location = useLocation();
    const { conversationType } = location.state || {};
    const navigate = useNavigate();
    const loggedInUser = user?._id;
    const dispatch = useDispatch();
    const messageUser = (otherParticipant)=>{
        navigate("/chat-box",{state:{chatUser:otherParticipant}});
    }
    useEffect(() => {
        dispatch(fetchConversations(conversationType));
    }, [conversationType, dispatch]);

    return (

        <div className="chat-list p-4 space-y-4">
            {conversations[conversationType]?.length > 0 ? (
                conversations[conversationType].map((convo) => {
                    const otherParticipant = convo.participants.find(
                        (p) => p._id !== loggedInUser 
                    );

                    return (
                        <div 
                            key={convo._id} onClick = {()=>{messageUser(otherParticipant)}}
                            className="chat-item flex items-center space-x-4 p-3 bg-black rounded-lg hover:bg-gray-700 cursor-pointer"
                        >
                            <img
                                src={otherParticipant?.photoUrl || "/placeholder-avatar.png"}
                                alt={`${otherParticipant?.firstName} ${otherParticipant?.lastName} Avatar`}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                                <h4 className="text-white font-semibold text-lg">
                                    {otherParticipant?.firstName} {otherParticipant?.lastName}
                                </h4>
                                <p className="text-gray-400 text-sm truncate">
                                    {convo.lastMessage?.messageText}
                                </p>
                            </div>

                            
                            <span className="text-gray-500 text-xs">
                                {convo.lastMessage?.timestamp
                                    ? new Date(convo.lastMessage.timestamp).toLocaleString()
                                    : ""}
                            </span>
                        </div>
                    );
                })
            ) : (
                <p className="text-gray-500 text-xl font-semibold text-center">No conversations yet.</p>
            )}
        </div>
    );
};

export default ChatList;
