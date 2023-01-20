import React from 'react';
import { useState, useEffect, useRef } from 'react';
import ChatBody from './ChatBody';
import ChatSend from './ChatSend';
import ChatUsers from './ChatUsers';

function ChatPage({socket}) {

    const [messages, setMessages] = useState([]);
    const bottomOfChatRef = useRef(null);

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    useEffect(() => {
        bottomOfChatRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return(
        <div>
            <ChatUsers socket={socket}/>
            <ChatBody messages={messages} bottomOfChatRef={bottomOfChatRef} />
            <br/>
            <ChatSend socket={socket}/>
        </div>
    )
}

export default ChatPage;