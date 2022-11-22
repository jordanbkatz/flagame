import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GameContext from '../contexts/GameContext';

function Home() {
    const navigate = useNavigate();
    const { loading, error, getCountries, generateGame } = useContext(GameContext);
    const handlePlay = () => {
        if (error) {
            getCountries();
        }
        else {
            generateGame();
            navigate('/play');
        }
    };
    useEffect(() => {
        getCountries();
    }, [getCountries]);
    return (
        <div className="home">
            <h1>Flagame</h1>
            <p>match the country name with the flag</p>
            {loading ? (
                <div>loading</div>
            ) : (
                <button onClick={handlePlay}>Play</button>
            )}
            {error ? (
                <div>Failed to fetch countries. Try again!</div>
            ) : null}
        </div>
    );
}

export default Home;