import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import FlipCard from "react-native-flip-card";

const Card = ({ item, isMatched, handleCardPress, selectedCards, moves }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (isMatched) {
      setIsFlipped(true);
    }
  }, [isMatched]);

  const handlePress = () => {
    handleCardPress(item.id, item.value);
  };

  return (
    <View style={[styles.container, item.isMatched && styles.matched]}>
      <FlipCard
        flip={isFlipped}
        friction={6}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        clickable={true}
        onPress={handlePress}
      >
        <View style={[styles.card, styles.cardFront]}>
          <Text style={styles.cardText}></Text>
        </View>
        <View
          style={[
            styles.card,
            styles.cardBack,
            isMatched && styles.matchedCard,
          ]}
        >
          <Text style={styles.cardText}>{item.value}</Text>
        </View>
      </FlipCard>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  
    margin: 5,
  },
  card: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
  },
  cardFront: {
    backgroundColor: "white",
  },
  cardBack: {
    backgroundColor: "green",
  },
  matchedCard: {
    borderColor: "red",
  },
  cardText: {
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default Card;
