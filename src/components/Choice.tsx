interface IChoiceProps {
    i: number;
    name: string;
    guessed: boolean;
    guessCountry: (guess: number) => void;
}

const Choice: React.FC<IChoiceProps> = ({ i, guessed, name, guessCountry }) => {
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