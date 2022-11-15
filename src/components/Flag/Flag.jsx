import React, { useContext } from 'react';
import GameContext from '../../contexts/GameContext';
import './Flag.scss';

const Flag = () => {
    const { answer } = useContext(GameContext);
    return (
        <img 
            src={answer ? answer.flags.png : ''}
            alt="flag failed to load"
            className="flag"
        />
    );
};

export default Flag;