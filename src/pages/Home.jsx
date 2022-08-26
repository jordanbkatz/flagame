import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [countries, setCountries] = useState([]);
    const [choices, setChoices] = useState(Array(4).fill(null));
    const [answer, setAnswer] = useState(null);
    const [streak, setStreak] = useState(0);
    const [highest, setHighest] = useState(0);
    const generate = countries => {
        setChoices(prevChoices => {
            let newChoices = prevChoices.map((_, i) => {
                let country = countries[Math.floor(Math.random() * countries.length)];
                country.chosen = false;
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
            generate(countries);
        }
        else {
            setChoices(prevChoices => {
                const newChoices = prevChoices.map((choice, i) => {
                    return i === country ? {...choice, chosen: true} : choice;
                });
                return newChoices;
            });
            setStreak(0);
        }
    };
    useEffect(() => {
        const getCountries = async () => {
            try {
                const { data } = await axios("https://restcountries.com/v3.1/all");
                setCountries(data);
                generate(data);
            }
            catch (err) {
                console.log(err);
            }
        };
        getCountries();
    }, []);
    return (
        <div className="home">
            <div className="container">
                <h1 className="header">Flagame</h1>
                <div className="stats">
                    <div className="item">
                        <p className="name">Streak</p>
                        <h1 className="value">{streak}</h1>
                    </div>
                    <div className="item">
                        <p className="name">Highest</p>
                        <h1 className="value">{highest}</h1>
                    </div>
                </div>
                <img
                    src={answer ? answer.flags.png : ''}
                    alt="failed to load flag"
                    className="flag"
                />
                <div className="choices">
                    {choices.map((choice, i) => (
                        <button
                            key={i}
                            className={`choice ${(choice && choice.chosen) ? 'chosen' : ''}`}
                            onClick={() => handleChoose(i)}
                        >{(choice) && (
                            choice.name.common
                        )}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;