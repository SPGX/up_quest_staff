import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import DateTimePickerModal from "react-native-modal-datetime-picker";
import DateTimePicker from '@react-native-community/datetimepicker';

import { firebase } from './firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';

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

    //date time picker 2
    const [isTimeStartPickerVisible, setTimeStartPickerVisibility] = useState(false);
    const [isTimeEndPickerVisible, setTimeEndPickerVisibility] = useState(false);
    const [isTimePeriodStartPickerVisible, setTimePeriodStartPickerVisibility] = useState(false);
    const [isTimePeriodEndPickerVisible, setTimePeriodEndPickerVisibility] = useState(false);

    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [timePeriodStart, setTimePeriodStart] = useState('');
    const [timePeriodEnd, setTimePeriodEnd] = useState('');   

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
    
    //date time picker 2 time start
    const showTimeStartPicker = () => {
        setTimeStartPickerVisibility(true);
    };
    
    const hideTimeStartPicker = () => {
        setTimeStartPickerVisibility(false);
    };
    
    const handleConfirmTimeStart = (date) => {
        setTimeStart(moment(date).add(543, 'year').format('ddd, MMM D YYYY'));
        hideTimeStartPicker();
    };

    //date time picker 2 time end
    const showTimeEndPicker = () => {
        setTimeEndPickerVisibility(true);
    };
    
    const hideTimeEndPicker = () => {
        setTimeEndPickerVisibility(false);
    };
    
    const handleConfirmTimeEnd = (date) => {
        setTimeEnd(moment(date).add(543, 'year').format('ddd, MMM D YYYY'));
        hideTimeEndPicker();
    };

    //date time picker 2 time period start
    const showTimePeriodStartPicker = () => {
        setTimePeriodStartPickerVisibility(true);
    };
    
    const hideTimePeriodStartPicker = () => {
        setTimePeriodStartPickerVisibility(false);
    };
    
    const handleConfirmTimePeriodStart = (date) => {
        setTimePeriodStart(moment(date).format('h:mm a'));
        hideTimePeriodStartPicker();
    };

    //date time picker 2 time period end
    const showTimePeriodEndPicker = () => {
        setTimePeriodEndPickerVisibility(true);
    };
    
    const hideTimePeriodEndPicker = () => {
        setTimePeriodEndPickerVisibility(false);
    };
    
    const handleConfirmTimePeriodEnd = (date) => {
        setTimePeriodEnd(moment(date).format('h:mm a'));
        hideTimePeriodEndPicker();
    };

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
                    <View style={{ flex:1, flexDirection:'column' }}>
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
                    <TextInput 
                        placeholder='จำนวนชั่วโมง'
                        value={amountTime}
                        onChangeText={(text) => setAmountTime(text)}
                        underlineColorAndroid="transparent"
                        autoCapitalize="none"
                    />
                        <View style={{ flexDirection:'row' }}>
                            <View style={{ flex:1, flexDirection:'column' }}>
                                <Button title="เลือกวันเริ่มงาน" onPress={showTimeStartPicker} />
                                <DateTimePickerModal
                                    isVisible={isTimeStartPickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirmTimeStart}
                                    onCancel={hideTimeStartPicker}
                                />
                                <Text>
                                    {timeStart}
                                </Text>
                            </View>
                            <View style={{ flex:1, flexDirection:'column' }}>
                                <Button title="เลือกวันจบงาน" onPress={showTimeEndPicker} />
                                <DateTimePickerModal
                                    isVisible={isTimeEndPickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirmTimeEnd}
                                    onCancel={hideTimeEndPicker}
                                />
                                <Text>
                                    {timeEnd}
                                </Text>  
                            </View>
                        </View>
                        <View style={{ flexDirection:'row' }}>
                            <View style={{ flex:1, flexDirection:'column' }}>
                                <Button title="เวลาเริ่มงาน" onPress={showTimePeriodStartPicker} />
                                <DateTimePickerModal
                                    isVisible={isTimePeriodStartPickerVisible}
                                    mode="time"
                                    onConfirm={handleConfirmTimePeriodStart}
                                    onCancel={hideTimePeriodStartPicker}
                                />
                                <Text>
                                    {timePeriodStart}
                                </Text>        
                            </View>
                            <View style={{ flex:1, flexDirection:'column' }}>
                                <Button title="เวลาเลิกงาน" onPress={showTimePeriodEndPicker} />
                                <DateTimePickerModal
                                    isVisible={isTimePeriodEndPickerVisible}
                                    mode="time"
                                    onConfirm={handleConfirmTimePeriodEnd}
                                    onCancel={hideTimePeriodEndPicker}
                                />
                                <Text>
                                    {timePeriodEnd}
                                </Text>
                            </View>                            
                        </View>
                    </View>
                    <Button title='บันทึกข้อมูล' onPress={onAddPress}/>
                </View>
            </View>
        </View>
    )
}

export default EnrollQuestScreen;