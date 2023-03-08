import React, { useState } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import GameBoard from './Components/GameBoard';


const App = () => {
  const [size, setSize] = useState(4);
  const [data, setData] = useState(Array.from({ length: size * size / 2 }, (_, i) => i + 1));

  const handleReset = () => {
    setData(Array.from({ length: size * size / 2 }, (_, i) => i + 1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Card Game</Text>
      <GameBoard size={size} data={data} />
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
