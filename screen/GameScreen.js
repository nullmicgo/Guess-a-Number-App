import React, { useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView} from 'react-native';
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import DefaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton';
import { Ionicons} from '@expo/vector-icons';
import BodyText from '../components/BodyText';


const generateRandomBetween = (min, max, exclude) => {
     min = Math.ceil(min);
     max= Math.floor(max);
     const rndNumber = Math.floor(Math.random() * (max - min)) + min;
     if (rndNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
     }
     else {
         return rndNumber;
     }
};

const renderListItem = (value , numberOfRound) =>(
    <View key={value} style={styles.listItem}>
        <BodyText>#{numberOfRound}</BodyText>
        <BodyText>{value}</BodyText>
    </View>
)


const GameScreen = props => {
    const initialGuess =  generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuess, setPastGuess] = useState([initialGuess]);

    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props;

    useEffect( ()=>{
        //after render
        if(currentGuess === userChoice){
            onGameOver(pastGuess.length);
        }
    }, [currentGuess,userChoice,onGameOver]);

    const nextGuessHandler = direction =>{  
        if(( direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess >props.userChoice )){
            Alert.alert('Don\'t lie!', 'You know that this is wrong...',[
                {text:'Sorry!',style:'cancel'}
            ]);

            return ;
        }
        if( direction ==='lower'){
            currentHigh.current = currentGuess;
        } else{
            currentLow.current = currentGuess;
        }
        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);
        setCurrentGuess(nextNumber);
        //setRounds(currentRounds => currentRounds +1);
        setPastGuess( currPastGuest => [nextNumber, ...currPastGuest] );

    };

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guest</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24}  color="white"  />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                     <Ionicons name="md-add" size={24} color="white"  />    
                </MainButton>                
            </Card>
            <ScrollView>

                {pastGuess.map(guess => (
                    renderListItem(guess)
                ))}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    screen:{
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer:{
        flexDirection:"row",
        justifyContent:'space-around',
        marginTop: 20,
        width:400,
        maxWidth: '90%'
    },
    listItem:{
        borderColor: "#ccc",
        padding: 15,
        borderWidth:1,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection:'row'
    }
});


export default GameScreen;