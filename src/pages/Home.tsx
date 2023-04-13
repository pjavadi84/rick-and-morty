import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CharacterCard from '../components/CharacterCard';
// import { Link } from 'react-router-dom';

const Home = () => {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const randomId = Math.floor(Math.random() * 183) + 1;
        const response = await axios.get(`https://rickandmortyapi.com/api/character/${randomId}`);
        setCharacter(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCharacter();

    const intervalId = setInterval(fetchCharacter, 10000); // Fetch character every 10 seconds

    return () => {
      clearInterval(intervalId); // Cleanup the interval on unmount
    };
  }, []);

  return (
    <div>
      <h1>Random Rick and Morty Character</h1>
      {character ? (
        <CharacterCard character={character} />
      ) : (
        <p>Loading...</p>
      )}

    </div>
  );
};

export default Home;