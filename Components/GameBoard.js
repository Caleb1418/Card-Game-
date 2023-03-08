import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Card from './Card';
import GameLogic from './GameLogic';

const GameBoard = ({ size, data }) => {
  const [cards, setCards] = useState([]);
  const [gameLogic, setGameLogic] = useState(new GameLogic(size));
  const [selectedCards, setSelectedCards] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    setGameLogic(new GameLogic(size));
    
  }, [size]);

  useEffect(() => {
    setCards(gameLogic.cards);
  }, [gameLogic]);

  const handleCardPress = (id, value) => {
    setSelectedCards((prevSelectedCards) => [...prevSelectedCards, { id, value }]);
    setIsFlipped((prev) => !prev);
  
    if (selectedCards.length === 0) {
      return;
    }
  
    const [firstCard] = selectedCards;
    const result = gameLogic.checkMatch(firstCard.id, firstCard.value, id, value);
  
    if (result === "win") {
      setGameLogic(gameLogic);
      setCards([...gameLogic.getCardData(data)]);
      setPoints(points + 1);
    } else if (result) {
      setGameLogic(gameLogic);
      setCards([...gameLogic.getCardData(data)]);
    } else {
      setTimeout(() => {
        gameLogic.hideCards();
        setCards([...gameLogic.getCardData(data)]);
        setSelectedCards([]);
        setMoves((prevMoves) => prevMoves + 1);
      }, 1000);
      return;
    }
  
    setSelectedCards([]);
    setMoves((prevMoves) => prevMoves + 1);
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.moves}>{`Moves: ${gameLogic.moves}`}</Text>
      <Text style={styles.roundsPlayed}>{`Rounds Played: ${gameLogic.roundsPlayed}`}</Text>
      <FlatList
        data={cards}
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