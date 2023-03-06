import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import Card from './Card';
import GameLogic from './GameLogic';

const GameBoard = ({ size, data }) => {
  const [cards, setCards] = useState([]);
  const [gameLogic, setGameLogic] = useState(new GameLogic(size));

  useEffect(() => {
    setGameLogic(new GameLogic(size));
  }, [size]);

  useEffect(() => {
    setCards(gameLogic.getCardData(data));
  }, [gameLogic, data]);

  const handleCardPress = (id, value) => {
    const result = gameLogic.checkMatch(id, value);
    if (result) {
      setCards([...gameLogic.getCardData(data)]);
    } else {
      setTimeout(() => {
        gameLogic.hideCards();
        setCards([...gameLogic.getCardData(data)]);
      }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{`Score: ${gameLogic.score}`}</Text>
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
    backgroundColor: '#fff',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});

export default GameBoard;