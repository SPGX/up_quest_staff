import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import DateTimePicker from '@react-native-community/datetimepicker';

import { firebase } from './firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EnrollQuestScreen = () => {

    const navigation = useNavigation();

    const questRef = firebase.firestore().collection('quests')

        //quest data
    const [questName, setQuestName] = useState('')
    const [location, setLocation] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [unit, setUnit] = useState('')
    const [amountTime, setAmountTime] = useState('')

        //date time picker
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [showDate, setShowDate] = useState('');

    const onAddPress = async() => {
        try {
            const uid = await AsyncStorage.getItem("uid")
            console.log(uid)
            const data = {
                staff : uid,
                questName : questName,
                location : location,
                unit : unit,
                amountTime : amountTime,
                createdAt : firebase.firestore.FieldValue.serverTimestamp(),
            };
            questRef
                .add(data)
                    .then(_doc => {
                        setQuestName('')
                        setLocation('')
                        setUnit('')
                        setAmountTime('')
                        Keyboard.dismiss()
                        alert("เพิ่มงานจิตอาสาเรียบร้อย!")
                    }).catch((error) => {
                        alert(error)
                    });          
        } catch (error) {
            alert(error)
        }

    }

    //date time picker
    // const onChange = (event, selectedDate) => {
    //     const currentDate = selectedDate || date;
    //     setShow(Platform.OS === 'ios');
    //     setDate(currentDate);
    //   };
    
    //   const showMode = (currentMode) => {
    //     setShow(true);
    //     setMode(currentMode);
    //   };
    
    //   const showDatepicker = () => {
    //     showMode('date');
    //   };
    
    //   const showTimepicker = () => {
    //     showMode('time');
    //   };
    
      //sign out
    const onBackPress = () => {
        navigation.goBack()
    }

    return (
        <View style={{ flex:1, flexDirection:'column' }}>
            <View style={{ flex:1.5, backgroundColor:'red' }}>
                <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between' }}>
                        <View style={{ flex:1, flexDirection:'row', justifyContent:"flex-start", backgroundColor:'white' }}>
                            <TouchableOpacity onPress={onBackPress}>
                                <Text style={{ fontSize:24 }}>Back</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex:2, flexDirection:'row', justifyContent:"center", backgroundColor:'white' }}>
                            <View style={{ fontSize:24 }}>
                                <Text>Quest Enroll</Text>
                            </View>
                        </View>
                        <View style={{ flex:1, flexDirection:'row', justifyContent:"flex-end", backgroundColor:'white' }}>

                        </View>
                    </View>
            </View>
            <View style={{ flex:15, backgroundColor:'#CCBAFF' }}>
                <View style={{ flex:1, backgroundColor:'#9773FF' }}>

                </View>
                <View style={{ flex:10 }}>
                    <TextInput 
                        placeholder='ชื่องาน'
                        value={questName}
                        onChangeText={(text) => setQuestName(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                   <TextInput 
                        placeholder='สถานที่'
                        value={location}
                        onChangeText={(text) => setLocation(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    <TextInput 
                        placeholder='จำนวนนิสิตที่เปิดรับ'
                        value={unit}
                        onChangeText={(text) => setUnit(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                    {/* Amount Time */}
                    <TextInput 
                        placeholder='จำนวนชั่วโมง'
                        value={amountTime}
                        onChangeText={(text) => setAmountTime(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />

                    <View style={{ flex:1, flexDirection:'row' }}>

                        {/* <View style={{ flex:1, flexDirection:'column' }}>
                            <Text>
                                Start Time
                            </Text>
                            <View>
                                <Button onPress={showDatepicker} title="Start Date" />
                            </View>
                            <View>
                                <Button onPress={showTimepicker} title="Start Time" />
                            </View>
                            {show && (
                                <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={onChange}
                                />
                            )}                           
                            <Text>
                                {showDate}
                            </Text>
                        </View>
                        <View style={{ flex:1, flexDirection:'column' }}>
                            <Text>
                                End Time
                            </Text>
                            <View>
                                <Button onPress={showDatepicker} title="Start Date" />
                            </View>
                            <View>
                                <Button onPress={showTimepicker} title="Start Time" />
                            </View>                              
                        </View> */}
                    </View>
                    <Button title='บันทึกข้อมูล' onPress={onAddPress}/>
                </View>
            </View>
        </View>
    )
}

export default EnrollQuestScreen;