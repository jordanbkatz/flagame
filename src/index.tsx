import React from 'react';
import ReactDOM from 'react-dom/client';
import { GameProvider } from './contexts/GameContext';
import App from './App';
import './styles/style.scss';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <GameProvider>
            <App />
        </GameProvider>
    </React.StrictMode>
);