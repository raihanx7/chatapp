import React from 'react';
import {  useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home({socket}) {

    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        sessionStorage.setItem('name', name);
        socket.emit('newUser', { name, socketID: socket.id });
        navigate('/chat');
    };

    return(
        <div className="p-5">
            <h1 className="text-center">Chat Application</h1>
            <br />
            <br />
            <h2>Enter your name:</h2>
            <div className="col-xs-4">
                <form className="form zindex-fixed d-flex" onSubmit={handleClick}>
                    <input 
                        className="form-control" 
                        type="text" 
                        placeholder="eg. John Doe"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                        &nbsp;
                    <button className="btn btn-success">Enter</button>
                </form>
            </div>
        </div>
    )
}

export default Home;