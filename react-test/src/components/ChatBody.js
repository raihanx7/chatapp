import React from 'react';
import { useState, useEffect } from 'react';

function ChatBody({messages, lastMsgRef}) {

    const [name, setName] = useState();
    const today = new Date();

    useEffect(() => {
        setName(sessionStorage.getItem('name'));
    }, [])

    return(
        <div>
            <h2 className="text-center">Chat room</h2>
            <h5 className="text-center">You are signed in as: {name}</h5>
            <div className="chat vh-95 overflow-auto">
            <div className="text-center">{today.getDate() + '/' + today.getMonth()+1 + '/' + today.getFullYear()}</div>
                <div className="card-body h-100 p-2">
                    {messages.map(message =>
                        message.name === name ? (
                        <div className="small p-2 ms-3 mb-1 rounded-3 bg-primary w-75 float-end" key={message.id}>
                            <p className="fw-bold mb-0">You ({name})</p>
                            <p className="mb-0">{message.text}</p>
                            <div className="text-white">{message.time}</div>
                        </div>
                        ) : (
                        <div className="small p-2 ms-3 mb-1 rounded-3 bg-secondary w-75 float-start" key={message.id}>
                            <p className="fw-bold mb-0">{message.name}</p>
                            <p className="mb-0">{message.text}</p>
                            <div className="text-white">{message.time}</div>
                        </div>
                        )
                    )}
                </div> 
            </div>
            <div ref={lastMsgRef} />  
        </div>
    )
}

export default ChatBody;