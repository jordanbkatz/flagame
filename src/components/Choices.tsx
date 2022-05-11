import React from 'react';
import Game from './Game';

interface Props {
    countries: any[];
    game: Game;
    setGame: React.Dispatch<React.SetStateAction<Game>>;
    setStreak: React.Dispatch<React.SetStateAction<number>>;
    setHighest: React.Dispatch<React.SetStateAction<number>>;
}

const Choices: React.FC<Props> = ({ countries, game, setGame, setStreak, setHighest }: Props) => {
    return (
        <div id="choices">
            {
                game.choices.map((choice: any, i: number) => (
                    <button key={i} className={`${game.statuses[i]}`} onClick={() => {
                        let statuses = [...game.statuses];
                        if (choice.name.common == game.answer.name.common) {
                            setStreak((prevStreak: number) => {
                                const newStreak = prevStreak + 1;
                                setHighest((prevHighest: number) => {
                                    return (newStreak > prevHighest) ? newStreak : prevHighest;
                                });
                                return newStreak;
                            });
                            statuses[i] = 'correct';
                            setTimeout(() => {
                                setGame(new Game(countries));
                            }, 500);
                        }
                        else {
                            setStreak(0);
                            statuses[i] = 'wrong';
                        }
                        setGame(new Game(countries, game.choices, game.answer, statuses));
                    }}>{choice && choice.name.common}</button>
                ))
            }
        </div>
    );
};

export default Choices;