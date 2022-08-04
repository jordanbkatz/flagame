import React from 'react';
import { useDispatch } from 'react-redux';
import { getCountries } from '../redux/gameSlice';
import Choices from '../components/Choices';
import Flag from '../components/Flag';
import Stats from '../components/Stats';

const Home = () => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);
    return (
        <main className="home">
            <header>
                <h1>Flagame</h1>
            </header>
            <Stats />
            <Flag />
            <Choices />
        </main>
    );
};

export default Home;