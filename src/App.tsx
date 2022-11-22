import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Play from './pages/Play';

function App() {
    return (
        <div className="app">
            <Router>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/play" element={<Play />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
};

export default App;