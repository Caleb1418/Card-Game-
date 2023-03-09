import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import GameBoard from './Components/GameBoard';


const App = () => {
  const [size, setSize] = useState(4);
  const initialData = Array.from({ length: size * size / 2 }, (_, i) => i + 1)
  const [data, setData] = useState(initialData);
  
  
  const handleReset = () => {
    const shuffledData = Array.from({ length: size * size / 2 }, (_, i) => i + 1)
      .concat(Array.from({ length: size * size / 2 }, (_, i) => i + 1))
      .sort(() => Math.random() - 0.5);
    setData(shuffledData);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Card Game</Text>
      <GameBoard size={size}  />
      <View style={styles.buttonContainer}>
        <Button title="Reset" onPress={handleReset} />
       
      </View>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
});

export default App;
