import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Home from './components/Home';
import ChatPage from './components/ChatPage';
import socketIO from 'socket.io-client';
import './App.css'

const socket = socketIO.connect('http://localhost:4000');

function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<Home socket={socket}/>} />
                <Route exact path="/chat" element={<ChatPage socket={socket}/>} />
            </Routes>
        </div>
    </Router>
  );
}

export default App;