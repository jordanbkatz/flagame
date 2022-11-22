import { useContext } from 'react';
import GameContext from '../contexts/GameContext';

interface IChoiceProps {
    i: number;
    name: string;
    guessed: boolean;
}

function Choice({ i, name, guessed }: IChoiceProps) {
    const { guessCountry } = useContext(GameContext);
    const handleChoose = () => {
        guessCountry(i);
    };
    return (
        <button className={`choice ${(guessed) ? 'guessed' : ''}`} onClick={handleChoose}>
            {name}
        </button>
    );
}

export default Choice;