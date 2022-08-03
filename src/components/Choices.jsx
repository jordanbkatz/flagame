import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { chooseCountry } from '../redux/gameSlice';

const Choices = () => {
    const dispatch = useDispatch();
    const { choices } = useSelector((state) => state.game);
    return (
        <section className="choices">
            {
                choices.map((choice, i) => (
                    <button 
                        key={i} 
                        className={`btn ${choice.guessed && 'guessed'}`}
                        onClick={() => dispatch(chooseCountry(i))}
                    ><p>{choice && choice.name.common}</p></button>
                ))
            }
        </section>
    );
};

export default Choices;