import { useContext } from 'react';
import GameContext from '../contexts/GameContext';
import Choice from '../components/Choice';

function Play() {
    const { choices, answer, streak, highest } = useContext(GameContext);
    return (
        <div className="play">
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
            {choices[0] ? (
                <>
                    <img
                        src={choices[answer].flags.png}
                        alt="flag failed to load"
                        className="flag"
                    />
                    <section className="choices">
                        {choices.map((choice, i) => (
                            <Choice key={i} i={i} name={choice.name.common} guessed={choice.guessed} />
                        ))}
                    </section>
                </>
            ) : null}
        </div>
    );
}

export default Play;