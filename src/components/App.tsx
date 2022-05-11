import React from 'react';
import axios from 'axios';
import Game from './Game';
import Stats from './Stats';
import Flag from './Flag';
import Choices from './Choices';

const App: React.FC = () => {
  const api = "https://restcountries.com/v3.1/all";
  const [countries, setCountries] = React.useState<any[]>([null]);
  const [streak, setStreak] = React.useState<number>(0);
  const [highest, setHighest] = React.useState<number>(0);
  const [game, setGame] = React.useState<Game>(new Game(countries));
  React.useEffect(() => {
    axios.get(api).then(res => {
      setCountries(res.data);
      setGame(new Game(res.data));
    }).catch(err => {
      console.log(err.message);
    });
  }, []);
  return (
    <div id="app">
      <Stats streak={streak} highest={highest} />
      <Flag game={game} />
      <Choices 
        countries={countries}
        game={game}
        setGame={setGame}
        setStreak={setStreak}
        setHighest={setHighest}
      />
    </div>
  );
};

export default App;
