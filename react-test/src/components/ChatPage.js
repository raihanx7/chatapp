import React from 'react';
import { useState, useEffect, useRef } from 'react';
import ChatBody from './ChatBody';
import ChatSend from './ChatSend';
import ChatUsers from './ChatUsers';

function ChatPage({socket}) {

    const [messages, setMessages] = useState([]);
    const lastMsgRef = useRef();

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessages([...messages, data]));
    }, [socket, messages]);

    useEffect(() => {
        lastMsgRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return(
        <div>
            <ChatUsers socket={socket}/>
            <ChatBody messages={messages} lastMsgRef={lastMsgRef} />
            <br/>
            <ChatSend socket={socket}/>
        </div>
    )
}

export default ChatPage;