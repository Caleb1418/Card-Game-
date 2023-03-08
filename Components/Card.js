import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import FlipCard from 'react-native-flip-card';

const Card = ({ item, onCardPressed }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardPress = () => {
    setIsFlipped(true);
    onCardPressed(item.id, item.value);
  };

  return (
    <View style={styles.container}>
      <FlipCard
        flip={isFlipped}
        friction={6}
        perspective={1000}
        flipHorizontal={true}
        flipVertical={false}
        clickable={true}
        onPress = {handleCardPress}
        onFlipEnd={() => {}}>
        <View style={[styles.card, styles.cardFront]}>
          <Text style={styles.cardText}>{item.id}</Text>
        </View>
        <View style={[styles.card, styles.cardBack]}>
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
    backgroundColor: '#3F497F',
  },
  cardBack: {
    backgroundColor: '#F7C04A',
  },
  cardText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Card;