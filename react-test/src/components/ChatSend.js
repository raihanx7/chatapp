import React from 'react';
import { useState, useEffect } from 'react';
import './ChatSend.css'

function ChatSend({socket}) {

    const [name, setName] = useState();
    const [message, setMessage] = useState();

    const getTime = () => {
        let today = new Date();
        let hours = today.getHours();
        let mins = today.getMinutes();
        if (mins < 10) {
            return hours + ':0' + mins;
        } else {
            return hours + ':' + mins;
        }
    }

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (message && sessionStorage.getItem('name')) {
            socket.emit('message', {
              text: message,
              name: sessionStorage.getItem('name'),
              id: `${socket.id}${Math.random()}`,
              time: getTime(),
              socketID: socket.id,
            });
        }
        setMessage('');
    }

    useEffect(() => {
        setName(sessionStorage.getItem('name'));
    }, [name, message])

    return(
        <div>
            <form className="form zindex-fixed p-5 d-flex" onSubmit={handleSendMessage}>
                <div className="col-11 float-end">
                    <input
                        type="text"
                        placeholder="Write a message"
                        className="form-control"
                        value={message}
                        onChange={ (e) => setMessage(e.target.value) }
                    />
                </div>
                &nbsp;
                &nbsp;
                <button className="btn btn-success">Send</button>
            </form>
        </div>
    )
}

export default ChatSend;