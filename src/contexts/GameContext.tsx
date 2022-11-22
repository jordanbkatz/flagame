import React, { useCallback, useState, createContext } from 'react';
import axios from 'axios';
import useLocalStorage from '../hooks/useLocalStorage';

interface IGameContext {
    countries: any[];
    error: boolean;
    loading: boolean;
    choices: any[];
    answer: number;
    streak: number;
    highest: number;
    getCountries: () => void;
    generateGame: () => void;
    guessCountry: (guess: number) => void;
}

const GameContext = createContext<IGameContext>({} as IGameContext);

interface IGameProviderProps {
    children: React.ReactNode;
}

export function GameProvider({ children }: IGameProviderProps) {
    const [countries, setCountries] = useState<any[]>([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [choices, setChoices] = useState<any[]>([]);
    const [answer, setAnswer] = useState(0);
    const [streak, setStreak] = useState(0);
    const [highest, setHighest] = useLocalStorage('flagame-highest', 0);
    const getCountries = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://restcountries.com/v3.1/all');
            setCountries(response.data);
            setError(false);
        }
        catch (err) {
            setError(true);
        }
        finally {
            setLoading(false);
        }
    }, []);
    const generateGame = () => {
        const amount = 4;
        let index: number;
        let indexes: number[] = [];
        for (let i = 0; i < amount; i++) {
            do {
                index = Math.floor(Math.random() * countries.length);
            }
            while (indexes.includes(index));
            indexes.push(index);
        }
        setChoices(indexes.map(index => countries[index]));
        setAnswer(Math.floor(Math.random() * amount));
    };
    const guessCountry = (guess: number) => {
        if (guess === answer) {
            setStreak(streak + 1);
            setHighest(Math.max(streak + 1, highest));
            generateGame();
        }
        else {
            setStreak(0);
            setChoices(choices.map((choice, i) => {
                return i === guess ? { ...choice, guessed: true } : choice; 
            }));
        }
    };
    return (
        <GameContext.Provider value={{
            countries,
            error,
            loading,
            choices,
            answer,
            streak,
            highest,
            getCountries,
            generateGame,
            guessCountry
        }}>
            {children}
        </GameContext.Provider>
    );
}

export default GameContext;