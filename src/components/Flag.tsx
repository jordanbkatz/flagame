import React from 'react';
import Game from './Game';

interface Props {
    game: Game;
}

const Flag: React.FC<Props> = ({ game }: Props) => {
    return (
        <img 
            src={(game.answer) ? game.answer.flags.png : ''}
            alt="flag failed to load"
            id="flag"
        />
    );
};

export default Flag;