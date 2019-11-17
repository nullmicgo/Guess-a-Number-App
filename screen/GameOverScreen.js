import React from 'react';
import  {View, Text, StyleSheet, Button, Image} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import  Colors  from '../constants/colors';

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
            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>
                    Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text>{props.userNumber}</Text>.
                </BodyText>
            </View>

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
    },
    resultContainer:{
        marginHorizontal: 20,
        marginVertical: 15
    },
    resultText:{
        textAlign:'center',
        fontSize: 20
    },
    highlight:{
        color:Colors.primary,
        fontFamily:'open-sans',
    }
});

export default GameOverScreen;