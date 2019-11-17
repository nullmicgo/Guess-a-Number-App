import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button, 
        TouchableWithoutFeedback, Keyboard, Alert,
        Dimensions , ScrollView, KeyboardAvoidingView} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import Colors from '../constants/colors';
import NumberContainer from '../components/NumberContainer';
import BodyText from '../components/BodyText';
import TitleText from '../components/TitleText';
import MainButton from '../components/MainButton';

const StartGameScreen = props =>{

    const [enteredValue, setEnteredValue] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandler = inputText =>{
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }

    const resetInputHandler = () =>{
        setEnteredValue('');
        setConfirmed(false);
    }

    const confirmInputHandler = () =>{
        const chosenNumber = parseInt(enteredValue);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
            Alert.alert('Invalid number!',
            'Number has to be a number between 1 and 99.',
            [{text: 'Okay', style:'destructive', onPress: resetInputHandler}])
            return;
        }
        setConfirmed(true);
        setSelectedNumber(parseInt(enteredValue));
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let confirmedOutput;
    if(confirmed) {
        confirmedOutput = <Card style={styles.summaryContainer}>
                         <BodyText>You selected</BodyText>
                         <View>
                             <NumberContainer>{selectedNumber}</NumberContainer>
                             <MainButton title="START GAME" onPress={()=> props.onStartGame(selectedNumber)} >
                            START GAME </MainButton>
                         </View>
            </Card>
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={30}>
                    <TouchableWithoutFeedback onPress={()=>{ 
                        Keyboard.dismiss();
                    }}>
                        <View style={styles.screen}>
                            <TitleText style={styles.title}>Start a New Game</TitleText>
                            <Card style={styles.inputContainer}>
                                    <BodyText>Select a Number</BodyText>
                                    <Input style={styles.input} blurOnSubmit autoCapitalize='none' autoCorrect={false} keyboardType="number-pad" maxLength={2} value={enteredValue} onChangeText={numberInputHandler}  />
                                    <View style={styles.buttonContainer}>
                                        <View style={styles.button}><Button title="Reset" onPress={resetInputHandler} color={Colors.accent} /></View>
                                        <View style={styles.button}><Button title="Confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>   
                                    </View>
                            </Card>
                            {confirmedOutput}
                        </View>
                    </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen:{
        flex:1,
        padding: 10,
        alignItems: 'center'
    },
    title:{
        fontSize:20,
        marginVertical: 10,
        fontFamily:'open-sans-bold'
    },
    inputContainer:{
        minWidth: 300,
        width: '80%',
        maxWidth: '95%',
        alignItems: 'center',
    },
    buttonContainer:{
        flexDirection:"row",
        width:'100%',
        justifyContent:'space-between',
        paddingHorizontal: 15
    },
    button:{
        width: Dimensions.get('window').width/4
    },
    input:{
        width:50,
        textAlign:'center'
    },
    summaryContainer:{
        marginTop:20,
        alignItems:'center'
    }
});

export default StartGameScreen;