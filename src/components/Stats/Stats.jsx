import React, { useContext } from 'react';
import GameContext from '../../contexts/GameContext';
import './Stats.scss';

const Stats = () => {
    const { streak, highest } = useContext(GameContext);
    return (
        <section className="stats">
            <div className="stat">
                <p className="name">Streak</p>
                <p className="amount">{streak}</p>
            </div>
            <div className="stat">
                <p className="name">Highest</p>
                <p className="amount">{highest}</p>
            </div>
        </section>
    );
};

export default Stats;