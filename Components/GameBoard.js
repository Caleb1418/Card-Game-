import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Card from './Card';



class GameLogic {
  constructor(numCards, setMoves) {
    this.numCards = numCards;
    this.cards = this.generateCards(numCards);
    this.selectedCards = [];
    this.moves = 0;
    this.roundsPlayed = 0;
    this.matches = 0;
    this.setMoves = setMoves;
  }

  generateCards(shufflePairs = false) {
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

  checkMatch() {
    const [firstCard, secondCard] = this.selectedCards;
    if (firstCard.value === secondCard.value) {
      firstCard.matched = true;
      secondCard.matched = true;
      firstCard.isMatched = true;
      secondCard.isMatched = true;
      this.selectedCards = [];
      this.matches++;
    } else {
      setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;
        this.selectedCards = [];
      }, 1000);
    }
    this.moves + 1;
    this.setMoves(this.moves);
  }

  handleCardPress(id) {
    const card = this.cards.find((card) => card.id === id);
    if (card.flipped || card.matched) {
      return;
    }
    card.flipped = true;
    this.selectedCards.push(card);
    if (this.selectedCards.length === 2) {
      this.checkMatch();
    }
  }

  isGameFinished() {
    return this.cards.every((card) => card.matched);
  }

  resetGame() {
    this.cards = this.generateCards(this.numCards, true);
    this.selectedCards = [];
    this.moves = 0;
    this.roundsPlayed++;
  }
}
const GameBoard = ({ size }) => {
  const [gameLogic, setGameLogic] = useState(new GameLogic(size, setMoves));
  const [selectedCards, setSelectedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    setGameLogic(new GameLogic(size, setMoves));
  }, [size]);

  const handleCardPress = (id, value) => {
    setSelectedCards((prevSelectedCards) => [...prevSelectedCards, { id, value }]);
    setIsFlipped((prev) => !prev);
    if (selectedCards.length === 0) {
      setMoves((prevMoves) => prevMoves + 1);
      return;
    }
  };

  useEffect(() => {
    if (selectedCards.length === 2) {
      const [firstCard, secondCard] = selectedCards;
      if (firstCard.value === secondCard.value) {
        setGameLogic((prev) => {
          prev.matches++;
          return { ...prev };
        });
      }
      setSelectedCards([]);
    }
  }, [selectedCards]);

  return (
    <View style={styles.container}>
      <Text style={styles.moves}>{`Moves: ${gameLogic.moves}`}</Text>
      <Text style={styles.roundsPlayed}>{`Rounds Played: ${gameLogic.roundsPlayed}`}</Text>
      <FlatList
        data={gameLogic.cards}
        numColumns={size}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card item={item} onCardPressed={handleCardPress} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F5E4',
  },
  moves: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  roundsPlayed:{
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  }
});

export default GameBoard;