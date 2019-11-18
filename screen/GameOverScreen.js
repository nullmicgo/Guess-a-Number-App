import React from 'react';
import  {View, Text, StyleSheet, Button, Image, Dimensions, ScrollView} from 'react-native';

import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import  Colors  from '../constants/colors';
import MainButton from '../components/MainButton';


const GameOverScreen = props => {
    return (
                <ScrollView>
                    <View style={styles.screen}>
                        <TitleText>The Game is Over!</TitleText>

                        <View style={styles.imageContainer}>
                            <Image 
                            fadeDuration={300}
                            source={require('../assets/success.png')}
                            // source={{uri:'https://media.istockphoto.com/photos/success-picture-id912928582?k=6&m=912928582&s=612x612&w=0&h=GCLKEbbQKhh17Z36oHO6mC6q-hHXnrFUVjXOsYzWNyw='}} 
                            style={styles.image} 
                            resizeMode="cover" />
                        </View>
                        <View style={styles.resultContainer}>
                            <BodyText style={styles.resultText}>
                                Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text>{props.userNumber}</Text>.
                            </BodyText>
                        </View>

                        <MainButton title="NEW GAME" onPress={props.onRestart}>
                                NEW GAME
                        </MainButton>
                    </View>
                </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent: 'center',
        alignItems:'center',
        paddingVertical:10
    },
    imageContainer:{
        width: Dimensions.get('window').width * 0.7,
        height:  Dimensions.get('window').width * 0.7,
        borderRadius:  Dimensions.get('window').width * 0.7 /2 ,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30
    },
    image:{
        width: '100%',
        height: '100%'
    },
    resultContainer:{
        marginHorizontal: 20,
        marginVertical:  Dimensions.get('window').height / 60
    },
    resultText:{
        textAlign:'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20
    },
    highlight:{
        color:Colors.primary,
        fontFamily:'open-sans',
    }
});

export default GameOverScreen;