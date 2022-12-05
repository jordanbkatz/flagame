import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import Choice from '../components/Choice';

const Home: React.FC = () => {
    const [countries, setCountries] = useState<any[]>([]);
    const [choices, setChoices] = useState<any[]>([]);
    const [answer, setAnswer] = useState<number>(0);
    const [streak, setStreak] = useState<number>(0);
    const [highest, setHighest] = useState<number>(() => {
        const item = localStorage.getItem('flagame-highest');
        return item ? JSON.parse(item) : 0;
    });
    useEffect(() => {
        localStorage.setItem('flagame-highest', JSON.stringify(highest));
    }, [highest]);
    const generateGame = useCallback((countries: any[]) => {
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
    }, []);
    const guessCountry = (guess: number) => {
        if (guess === answer) {
            setStreak(streak + 1);
            setHighest(Math.max(streak + 1, highest));
            generateGame(countries);
        }
        else {
            setStreak(0);
            setChoices(choices.map((choice, i) => {
                return i === guess ? { ...choice, guessed: true } : choice; 
            }));
        }
    };
    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const { data } = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(data);
                generateGame(data);
            }
            catch (err) {
                console.log(err);
            }
        };
        fetchCountries();
    }, [generateGame]);
    return (
        <div className="home">
            <div className="header">
                Flagame
            </div>
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
            <img
                src={countries.length > 0 ? choices[answer].flags.png : ''}
                alt="flag failed to load"
                className="flag"
            />
            <section className="choices">
                {countries.length > 0 ? choices.map((choice, i) => (
                    <Choice 
                        key={i} 
                        i={i} 
                        name={choice.name.common} 
                        guessed={choice.guessed}
                        guessCountry={guessCountry}
                    />
                )): null}
            </section>
        </div>
    );
}

export default Home;