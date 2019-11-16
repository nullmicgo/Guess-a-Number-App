import React from 'react';
import { StyleSheet, View } from 'react-native';
import  Header  from './components/Header';
import StartGameScreen from './screen/StartGameScene';
export default function App() {
  return (
    <View style={styles.screen}>
        <Header title="Guess a Number" />
        <StartGameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
    screen:{
        flex:1
    }
});
