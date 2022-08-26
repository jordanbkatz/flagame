import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import './styles/main.scss';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Navigate replace to="/home" />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
}

export default App;