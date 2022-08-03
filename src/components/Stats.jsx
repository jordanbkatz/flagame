import React from 'react';
import { useSelector } from 'react-redux';

const Stats = () => {
    const { streak, highest } = useSelector((state) => state.game);
    return (
        <section className="stats">
            <div>
                <p>streak</p>
                <h2>{streak}</h2>
            </div>
            <div>
                <p>highest</p>
                <h2>{highest}</h2>
            </div>
        </section>
    );
};

export default Stats;