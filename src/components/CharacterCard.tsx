import React, { useState, useEffect } from 'react';
import './CharacterCard.scss';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  location: {
    name: string;
    type: string;
    dimension: string;
  };
  image: string;
  // Add other properties as needed
}

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const [previousCharacters, setPreviousCharacters] = useState<Character[]>([]);
  const [polling, setPolling] = useState(false);
  const [filterAlive, setFilterAlive] = useState(false);
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  

  useEffect(() => {
    // Remove duplicate characters from the previous characters list
    setPreviousCharacters(prevCharacters => prevCharacters.filter(prevCharacter => prevCharacter.id !== character.id));
  }, [character.id]);

  // Function to add character to previous characters list
  const addToPreviousCharacters = (character: Character) => {
    // Check if character is already in previous characters list
    const isDuplicate = previousCharacters.some(prevCharacter => prevCharacter.id === character.id);
    if (!isDuplicate) {
      setPreviousCharacters(prevCharacters => [...prevCharacters, character]);
    }
  };


  const handleNextCharacter = () => {
    // Perform the logic to skip to the next character
    // e.g., update state or call a function to get the next character data
    setCurrentCharacterIndex(currentCharacterIndex => currentCharacterIndex + 1);
  };


  const handlePollingToggle = () => {
    // Update the polling state to toggle polling on and off
    setPolling(!polling);
  };

  const handleFilterToggle = () => {
    // Update the filterAlive state to toggle filtering on and off
    setFilterAlive(!filterAlive);
  };




  return (
    <div className="character-card">
      <h2>Character Information</h2>
      <p>Name: {character.name}</p>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <div className="image-container">
        <img src={character.image} alt={character.name} />
        <div className="tooltip">
          <p>Location: {character.location.name}</p>
          <p>Type: {character.location.type}</p>
          <p>Dimension: {character.location.dimension}</p>
        </div>
      </div>

      {/* Render other character information as needed */}
      <div className="previous-characters">
        <h3>Previous Characters</h3>
        {previousCharacters.map(prevCharacter => (
          <div key={prevCharacter.id} className="previous-character">
            <p>Name: {prevCharacter.name}</p>
            <p>Status: {prevCharacter.status}</p>
            <img src={prevCharacter.image} alt={prevCharacter.name} />
          </div>
        ))}
        <button onClick={() => addToPreviousCharacters(character)}>Add to Previous Characters</button>
      </div>
      

      <button onClick={handleNextCharacter}>Skip to Next Character</button>

      <input type="checkbox" checked={polling} onChange={handlePollingToggle} />
      <label>{polling ? 'Polling On' : 'Polling Off'}</label>


      <input type="checkbox" checked={filterAlive} onChange={handleFilterToggle} />
      <label>{filterAlive ? 'Filtering Alive Characters On' : 'Filtering Alive Characters Off'}</label>



    </div>
  );
};

export default CharacterCard;