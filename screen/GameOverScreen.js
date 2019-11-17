import React from 'react';
import  {View, Text, StyleSheet, Button, Image} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The Game is Over!</TitleText>

            <View style={styles.imageContainer}>
                <Image 
                fadeDuration={300}
                // source={require('../assets/success.png')}
                source={{uri:'https://media.istockphoto.com/photos/success-picture-id912928582?k=6&m=912928582&s=612x612&w=0&h=GCLKEbbQKhh17Z36oHO6mC6q-hHXnrFUVjXOsYzWNyw='}}

                 
                style={styles.image} 
                resizeMode="cover" />
            </View>
            <BodyText>Number of rounds: {props.roundsNumber}</BodyText>
            <BodyText>Number was: {props.userNumber}</BodyText>
            <Button title="NEW GAME" onPress={props.onRestart}></Button>
        </View>

    );
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    imageContainer:{
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image:{
        width: '100%',
        height: '100%'
    }
});

export default GameOverScreen;