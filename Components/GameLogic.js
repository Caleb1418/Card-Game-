import React, { useState } from 'react';

const GameLogic = ({ numCards, setMoves }) => {
  const [cards, setCards] = useState(generateCards(numCards));
  const [selectedCards, setSelectedCards] = useState([]);
  const [moves, setMovesState] = useState(0);
  const [roundsPlayed, setRoundsPlayed] = useState(0);
  const [matches, setMatches] = useState(0);

  function generateCards(shufflePairs = false) {
    const numPairs = 4;
    const values = Array.from({ length: numPairs }, (_, i) => i + 1); // Possible values for the matching pairs
    const pairs = [];
    for (let i = 0; i < numPairs; i++) {
      const valueIndex = Math.floor(Math.random() * values.length);
      const value = values[valueIndex];
      values.splice(valueIndex, 1);
      pairs.push(value, value);
    }

    if (shufflePairs) {
      for (let i = pairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
      }
    }

    const cards = [];
    for (let i = 0; i < numPairs * 2; i++) {
      const id = i;
      const value = pairs[i];
      cards.push({ id, value, visible: false });
    }
    return cards;
  }

  function checkMatch() {
    const [firstCard, secondCard] = selectedCards;
    if (firstCard.value === secondCard.value) {
      firstCard.matched = true;
      secondCard.matched = true;
      firstCard.isMatched = true;
      secondCard.isMatched = true;
      setSelectedCards([]);
      setMatches(matches + 1);
    } else {
      setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;
        setSelectedCards([]);
      }, 1000);
    }
    setMovesState(moves + 1);
    setMoves(moves + 1);
  }

  function handleCardPress(id) {
    const card = cards.find((card) => card.id === id);
    if (card.flipped || card.matched) {
      return;
    }
    card.flipped = true;
    setSelectedCards([...selectedCards, card]);
    if (selectedCards.length === 1) {
      checkMatch();
    }
  }

  function isGameFinished() {
    return cards.every((card) => card.matched);
  }

  function resetGame() {
    setCards(generateCards(numCards, true));
    setSelectedCards([]);
    setMovesState(0);
    setRoundsPlayed(roundsPlayed + 1);
  }

  return null; // replace this with your actual component UI
};

export default GameLogic;
