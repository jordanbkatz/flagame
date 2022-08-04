import React from 'react';
import { useSelector } from 'react-redux';

const Flag = () => {
    const { answer } = useSelector((state) => state.game);
    return (
        <img 
            src={(answer) ? answer.flags.png : ''}
            alt="flag failed to load"
            className="flag"
        />
    );
};

export default Flag;