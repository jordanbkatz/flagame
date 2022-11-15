import React from 'react';
import Header from '../Header';
import Stats from '../Stats';
import Flag from '../Flag';
import Choices from '../Choices';
import './App.scss';

const App = () => {
    return (
        <div className="app">
            <div className="content">
                <Header />
                <Stats />
                <Flag />
                <Choices />
            </div>
        </div>
    );
};

export default App;