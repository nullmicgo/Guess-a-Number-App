import React, { useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, Button, Alert, ScrollView, FlatList, Dimensions} from 'react-native';
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

const renderListItem = (listLength , itemData) =>(
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
)


const GameScreen = props => {
    const initialGuess =  generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [pastGuess, setPastGuess] = useState([initialGuess.toString()]);

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
        setPastGuess( currPastGuest => [nextNumber.toString(), ...currPastGuest] );

    };

    let listContainerStyle = styles.listContainer;
    if(Dimensions.get('window').width < 350){
        listContainerStyle = styles.listContainerBig;
    }


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
            <View style={listContainerStyle}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuess.map( (guess, index) => (
                        renderListItem(guess, pastGuess.length - index)
                    ))}
                </ScrollView> */}


                <FlatList 
                        keyExtractor={ (item)=> item} 
                        data={pastGuess} 
                        renderItem={renderListItem.bind(this, pastGuess.length)}
                        contentContainerStyle={styles.list}
                         />

            </View>

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
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width:400,
        maxWidth: '90%'
    },
    listItem:{
        borderColor: "#ccc",
        padding: 15,
        borderWidth:1,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection:'row',
        justifyContent:'space-between',
        width: '100%'
    },
    listContainer:{
        width: '60%',
        flex: 1
    },
    listContainerBig:{
        width: '80%', 
        flex: 1
    },
    list:{
        // alignItems:'center',
        justifyContent:'flex-end',
        flexGrow: 1
    }
});


export default GameScreen;