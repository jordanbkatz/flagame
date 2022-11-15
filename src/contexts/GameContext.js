import React, { useState, useEffect, createContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [countries, setCountries] = useState([]);
    const [choices, setChoices] = useState(Array(4).fill(null));
    const [answer, setAnswer] = useState(null);
    const [streak, setStreak] = useLocalStorage('flagame-streak', 0);
    const [highest, setHighest] = useLocalStorage('flagame-highest', 0);
    const generateChoices = (countries) => {
        setChoices((prevChoices) => {
            let newChoices = prevChoices.map((_, i) => {
                let country = countries[Math.floor(Math.random() * countries.length)];
                country.guessed = false;
                if (i === 0) {
                    setAnswer(country);
                }
                return country;
            });
            newChoices.sort(() => 0.5 - Math.random());
            return newChoices;
        });
    };
    const handleChoose = country => {
        if (choices[country].name.common === answer.name.common) {
            setStreak(streak + 1);
            setHighest(Math.max(highest, streak + 1));
            generateChoices(countries);
        }
        else {
            setChoices(prevChoices => {
                const newChoices = prevChoices.map((choice, i) => {
                    return i === country ? {...choice, guessed: true} : choice;
                });
                return newChoices;
            });
            setStreak(0);
        }
    };
    useEffect(() => {
        const getCountries = async () => {
            try {
                let data = await fetch("https://restcountries.com/v3.1/all");
                data = await data.json();
                setCountries(data);
                generateChoices(data);
            }
            catch (err) {
                console.log(err.message);
            }
        };
        getCountries();
    }, []);
    return (
        <GameContext.Provider value={{
            countries, setCountries,
            choices, setChoices,
            answer, setAnswer,
            streak, setStreak,
            highest, setHighest,
            generateChoices,
            handleChoose
        }}>{children}</GameContext.Provider>
    );
};

export default GameContext;