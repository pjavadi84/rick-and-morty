import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CharacterCard from '../components/CharacterCard';


// Mock Character data for testing
const mockCharacter = {
    id: 1,
    name: 'Test Character',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    location: {
      name: 'Test Location',
      type: 'Planet',
      dimension: 'Test Dimension',
    },
    image: 'test.jpg',
  };
  
  describe('CharacterCard', () => {
    it('should add character to previous characters list', () => {
      const { getByText } = render(<CharacterCard character={mockCharacter} />);
  
      // Find and click the "Add to Previous Characters" button
      const addToPreviousButton = getByText('Add to Previous Characters');
      fireEvent.click(addToPreviousButton);
  
      // Assert that the character is added to previous characters list
      const previousCharacter = getByText('Previous Characters');
      expect(previousCharacter).toBeInTheDocument();
    });
  
    it('should not add duplicate character to previous characters list', () => {
      const { getByText } = render(<CharacterCard character={mockCharacter} />);
  
      // Find and click the "Add to Previous Characters" button twice
      const addToPreviousButton = getByText('Add to Previous Characters');
      fireEvent.click(addToPreviousButton);
      fireEvent.click(addToPreviousButton);
  
      // Assert that only one instance of character is added to previous characters list
      const previousCharacters = getByText('Previous Characters');
      expect(previousCharacters).toHaveTextContent('Previous Characters');
      expect(previousCharacters).not.toHaveTextContent('Name: Test Character\nName: Test Character');
    });
  });