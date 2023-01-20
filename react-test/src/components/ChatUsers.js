import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatUsers.css'

function ChatUsers({socket}) {

    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    const handleLeave = () => {
        navigate('/');
        sessionStorage.removeItem('name');
        window.location.reload();
    }

    useEffect(() => {
        socket.on('newUserResponse', (data) => setUsers(data));
    }, [users]);

    return(
        <div className="chatUsers">
            <div className="d-flex">
                <h5>Users: {users.length}</h5>
                &nbsp;
                &nbsp;
                &nbsp;
                <button className="btn btn-danger" onClick={handleLeave}>Leave</button>
            </div>
                <p>{users.map(user => <li>{user.name}</li>)}</p>
        </div>
    )
}

export default ChatUsers;