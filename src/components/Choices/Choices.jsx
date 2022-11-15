import React, { useContext } from 'react';
import GameContext from '../../contexts/GameContext';
import './Choices.scss';

const Choices = () => {
    const { choices, handleChoose } = useContext(GameContext);
    return (
        <section className="choices">
            {
                choices.map((choice, i) => (
                    <button 
                        key={i} 
                        className={`choice ${(choice && choice.guessed) ? 'guessed' : ''}`}
                        onClick={() => handleChoose(i)}
                    >{choice ? choice.name.common : ''}</button>
                ))
            }
        </section>
    );
};

export default Choices;