import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, TextInput, Platform, Keyboard, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from '@react-native-picker/picker';

import { firebase } from './firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';

import moment from 'moment';

const EnrollQuestScreen = () => {

    const navigation = useNavigation();

    const questRef = firebase.firestore().collection('quests')
    const staffRef = firebase.firestore().collection('staffs')

    //staff data
    // const [staffData, setStaffData] = useState({
    //     department:'',
    //     email:'',
    //     firstName:'',
    //     lastName:'',
    //     phoneNumber:'',
    //     staffNumber:'',
    // })

    //quest data
    const [questName, setQuestName] = useState('')
    const [location, setLocation] = useState('เลือกสถานที่')
    const [unit, setUnit] = useState('')
    const [description, setDescription] = useState('')
    const [unitEnroll, setUnitEnroll] = useState(0)

    //date time picker 2
    const [isTimeStartPickerVisible, setTimeStartPickerVisibility] = useState(false);
    const [isTimeEndPickerVisible, setTimeEndPickerVisibility] = useState(false);
    const [isTimePeriodStartPickerVisible, setTimePeriodStartPickerVisibility] = useState(false);
    const [isTimePeriodEndPickerVisible, setTimePeriodEndPickerVisibility] = useState(false);

    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [timePeriodStart, setTimePeriodStart] = useState('');
    const [timePeriodEnd, setTimePeriodEnd] = useState('');

    const onAddPress = async () => {
        try {
            const uid = await AsyncStorage.getItem("uid")
            // staffRef
            //     .doc(uid)
            //         .get()
            //             .then((doc) => {
            //                 setStaffData(doc.data)
            //                 console.log(staffData)
            //             })
            var timeStartCheck = moment(timePeriodStart)
            var timeEndCheck = moment(timePeriodEnd)
            var dateStartCheck = moment(timeStart)
            var dateEndCheck = moment(timeEnd)
            if (parseInt(timeEndCheck.diff(timeStartCheck)) > 0 &&
                parseInt(dateEndCheck.diff(dateStartCheck)) >= 0 &&
                questName != '' &&
                location != '' &&
                unit != '' &&
                description != '') {
                console.log(uid)
                console.log(unit)
                const data = {
                    staff: uid,
                    // staffDepartment : staffRef.department,
                    // staffEmail : staffRef.email,
                    // staffFirstName : staffRef.firstName,
                    // staffLastName : staffRef.lastName,
                    // staffPhoneNumber : staffRef.phoneNumber,
                    // staffNumber : staffRef.staffNumber,
                    // questName : questName,
                    // location : location,
                    unit: Number.parseInt(unit),
                    unitEnroll: unitEnroll,
                    description: description,
                    dateStart: moment(timeStart).format('ddd, MMM D YYYY'),
                    dateEnd: moment(timeEnd).format('ddd, MMM D YYYY'),
                    timeStart: moment(timePeriodStart).format('h:mm a'),
                    timeEnd: moment(timePeriodEnd).format('h:mm a'),
                    amountTime: moment(timePeriodEnd.diff(timePeriodStart, 'hours')) * ((moment(timeEnd.diff(timeStart, 'days'))) + 1),
                    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                };
                console.log(data)
                questRef
                    .add(data)
                    .then(_doc => {
                        setQuestName('')
                        setLocation('')
                        setUnit('')
                        setDescription('')
                        setTimeStart('')
                        setTimeEnd('')
                        setTimePeriodStart('')
                        setTimePeriodEnd('')
                        Keyboard.dismiss()
                        alert("เพิ่มงานจิตอาสาเรียบร้อย!")
                    }).catch((error) => {
                        alert(error)
                    });
            } else {
                alert('โปรดกรอกข้อมูลให้ถูกต้อง')
            }

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
        setTimeStart(moment(date).add(543, 'year'));
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
        setTimeEnd(moment(date).add(543, 'year'));
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
        setTimePeriodStart(moment(date));
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
        setTimePeriodEnd(moment(date));
        hideTimePeriodEndPicker();
    };

    //sign out
    const onBackPress = () => {
        navigation.goBack()
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#B4B4B4' }}>
            <View style={{ flex: 1.5, backgroundColor: '#A788FF' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-start" }}>
                        <TouchableOpacity onPress={onBackPress}>
                            <Text style={{ fontSize: 20, color: 'white', margin: 5 }}>ย้อนกลับ</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: "center" }}>
                        <View>
                            <Text style={{ fontSize: 25, color: 'white', margin: 5 }}>หน้าหลัก</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-end", backgroundColor: '#A788FF' }}>

                    </View>
                </View>
            </View>
            <View style={{ flex: 15, backgroundColor: '#CCBAFF' }}>
                <View style={{ flex: 1, backgroundColor: '#9773FF', marginTop: 35 }}>
                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 20, color: 'white' }} >
                            เพิ่มงาน
                        </Text>
                    </View>
                        <View style={{ width: '100%', backgroundColor: 'white', alignItems: 'center' }}>
                            <View style={{ width: '100%', height: '13%', marginTop: '2%' }}>
                                <View style={{ flex: 3 }}>
                                    <View style={{ flex: 1, flexDirection: 'column' }}>
                                        <Text style={{ paddingLeft: 5 }}>
                                            ชื่องาน
                                </Text>
                                        <View style={{ alignItems: 'center' }}>
                                            <TextInput
                                                style={{ backgroundColor: 'white', marginTop: 10, height: 35, borderWidth: 0.5, padding: 10, width: '90%', alignItems: 'center' }}
                                                placeholder=''
                                                value={questName}
                                                onChangeText={(text) => setQuestName(text)}
                                                underlineColorAndroid="transparent"
                                                autoCapitalize="none"
                                            />
                                        </View>
                                        <View>
                                            <Text style={{ paddingLeft: 5, marginTop: 5 }}>
                                                สถานที่
                                    </Text>
                                            <Picker
                                                selectedValue={location}
                                                style={{ height: 50, width: '100%' }}
                                                onValueChange={(itemValue) => setLocation(itemValue)}
                                            >
                                                <Picker.Item label="คณะเทคโนโลยีสารสนเทศและการสื่อสาร" value="คณะเทคโนโลยีสารสนเทศและการสื่อสาร" />
                                                <Picker.Item label="คณะพลังงานและสิ่งแวดล้อม" value="คณะพลังงานและสิ่งแวดล้อม" />
                                                <Picker.Item label="คณะวิศวกรรมศาสตร์" value="คณะวิศวกรรมศาสตร์" />
                                                <Picker.Item label="คณะสหเวชศาสตร์" value="คณะสหเวชศาสตร์" />
                                                <Picker.Item label="คณะเภสัชศาสตร์" value="คณะเภสัชศาสตร์" />
                                                <Picker.Item label="คณะสถาปัตยกรรมศาสตร์" value="คณะสถาปัตยกรรมศาสตร์" />
                                                <Picker.Item label="คณะเกษครศาสตร์และทรัพยากรธรรมชาติ" value="คณะเกษครศาสตร์และทรัพยากรธรรมชาติ" />
                                                <Picker.Item label="คณะแพทยศาสตร์" value="คณะแพทยศาสตร์" />
                                                <Picker.Item label="คณะพยาบาลศาสตร์" value="คณะพยาบาลศาสตร์" />
                                                <Picker.Item label="คณะวิทยาศาสตร์" value="คณะวิทยาศาสตร์" />
                                                <Picker.Item label="คณะวิทยาศาสตร์การแพทย์" value="คณะวิทยาศาสตร์การแพทย์" />
                                                <Picker.Item label="คณะศิลปศาสตร์" value="คณะศิลปศาสตร์" />
                                                <Picker.Item label="คณะนิติศาสตร์" value="คณะนิติศาสตร์" />
                                                <Picker.Item label="คณะวิทยาการจัดการและสารสนเทศศาสตร์" value="คณะวิทยาการจัดการและสารสนเทศศาสตร์" />
                                                <Picker.Item label="คณะรัฐศาสตร์และสังคมศาสตร์" value="คณะรัฐศาสตร์และสังคมศาสตร์" />
                                                <Picker.Item label="คณะทันตแพทยศาสตร์" value="คณะทันตแพทยศาสตร์" />
                                                <Picker.Item label="วิทยาลัยการศึกษา" value="วิทยาลัยการศึกษา" />
                                                <Picker.Item label="หอประชุมพญางำเมือง" value="หอประชุมพญางำเมือง" />
                                                <Picker.Item label="อาคารสำนักงานอธิการบดี" value="อาคารสำนักงานอธิการบดี" />
                                                <Picker.Item label="ศูนย์การแพทย์และโรงพยาบาล มหาวิทยาลัยพะเยา" value="ศูนย์การแพทย์และโรงพยาบาล มหาวิทยาลัยพะเยา" />
                                                <Picker.Item label="ศูนย์บรรณาสารและการเรียนรู้" value="ศูนย์บรรณาสารและการเรียนรู้" />
                                                <Picker.Item label="อาคาร 99 ปี พระอุบาลีคุณูปมาจารย์" value="อาคาร 99 ปี พระอุบาลีคุณูปมาจารย์" />
                                                <Picker.Item label="ศูนย์หนังสือจุฬา" value="ศูนย์หนังสือจุฬา" />
                                                <Picker.Item label="อาคารสงวนเสริมศรี" value="อาคารสงวนเสริมศรี" />
                                                <Picker.Item label="สนามกีฬา" value="สนามกีฬา" />
                                                <Picker.Item label="หอพักนิสิต (UP 1-18)" value="หอพักนิสิต (UP 1-18)" />
                                                <Picker.Item label="โรงเรียนสาธิตมหาวิทยาลัย" value="โรงเรียนสาธิตมหาวิทยาลัย" />
                                                <Picker.Item label="พระพุทธภุชคารักษ์" value="พระพุทธภุชคารักษ์" />
                                            </Picker>
                                        </View>
                                        <Text style={{ paddingLeft: 5, marginTop: 5 }}>
                                            จำนวนนิสิตที่เปิดรับ
                                    </Text>
                                        <View style={{ alignItems: 'center' }}>
                                            <TextInput
                                                style={{ backgroundColor: 'white', marginTop: 10, height: 35, borderWidth: 0.5, padding: 10, width: '90%', alignItems: 'center' }}
                                                placeholder=''
                                                value={unit}
                                                onChangeText={(text) => setUnit(text)}
                                                underlineColorAndroid="transparent"
                                                keyboardType={'number-pad'}
                                            />
                                        </View>
                                        <Text style={{ paddingLeft: 5, marginTop: 5 }}>
                                            ระบุรายละเอียดของงาน สถาที่ของงานแบบเจาะจง
                                    </Text>
                                        <View style={{ alignItems: 'center' }}>
                                            <TextInput
                                                style={{ backgroundColor: 'white', marginTop: 10, height: 35, borderWidth: 0.5, padding: 10, width: '90%', alignItems: 'center' }}
                                                placeholder=''
                                                value={description}
                                                onChangeText={(text) => setDescription(text)}
                                                underlineColorAndroid="transparent"
                                                autoCapitalize="none"
                                            />
                                        </View>

                                        <View style={{ backgroundColor: '#F3EFEF', marginTop: 20, height: '230%' }}>
                                            <Text style={{ paddingLeft: 5, marginTop: 5 }}>
                                                ระยะเวลางาน
                                        </Text>
                                            <View style={{ alignItems: 'center', marginTop: 20 }}>
                                                <View style={{ width: '90%' }}>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                        <View style={{ flex: 1, flexDirection: 'column' }}>
                                                            <Button
                                                                color= '#AA67FF'
                                                                title="เลือกวันเริ่มงาน"
                                                                onPress={showTimeStartPicker}
                                                            />
                                                            <DateTimePickerModal
                                                                isVisible={isTimeStartPickerVisible}
                                                                mode="date"
                                                                onConfirm={handleConfirmTimeStart}
                                                                onCancel={hideTimeStartPicker}
                                                            />
                                                            <Text>
                                                                {timeStart != ''
                                                                    ? <Text>{moment(timeStart).format('ddd, MMM D YYYY')}</Text>
                                                                    : <Text></Text>
                                                                }
                                                            </Text>
                                                        </View>
                                                        <View style={{ flex: 1, flexDirection: 'column' }}>
                                                            <Button 
                                                                color= '#AA67FF'
                                                                title="เลือกวันจบงาน" 
                                                                onPress={showTimeEndPicker} 
                                                            />
                                                            <DateTimePickerModal
                                                                isVisible={isTimeEndPickerVisible}
                                                                mode="date"
                                                                onConfirm={handleConfirmTimeEnd}
                                                                onCancel={hideTimeEndPicker}
                                                            />
                                                            <Text>
                                                                {timeEnd != ''
                                                                    ? <Text>{moment(timeEnd).format('ddd, MMM D YYYY')}</Text>
                                                                    : <Text></Text>
                                                                }
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={{ alignItems: 'center', marginTop: 10 }}>
                                                <View style={{ width: '90%' }}>
                                                    <View style={{ flexDirection: 'row' }}>
                                                        <View style={{ flex: 1, flexDirection: 'column' }}>
                                                            <Button 
                                                                color= '#AA67FF'
                                                                title="เวลาเริ่มงาน" 
                                                                onPress={showTimePeriodStartPicker} 
                                                            />
                                                            <DateTimePickerModal
                                                                isVisible={isTimePeriodStartPickerVisible}
                                                                mode="time"
                                                                onConfirm={handleConfirmTimePeriodStart}
                                                                onCancel={hideTimePeriodStartPicker}
                                                            />
                                                            <Text>
                                                                {timePeriodStart != ''
                                                                    ? <Text>{moment(timePeriodStart).format('h:mm a')}</Text>
                                                                    : <Text></Text>
                                                                }
                                                            </Text>
                                                        </View>
                                                        <View style={{ flex: 1, flexDirection: 'column' }}>
                                                            <Button 
                                                                color= '#AA67FF'
                                                                title="เวลาเลิกงาน" 
                                                                onPress={showTimePeriodEndPicker} 
                                                            />
                                                            <DateTimePickerModal
                                                                isVisible={isTimePeriodEndPickerVisible}
                                                                mode="time"
                                                                onConfirm={handleConfirmTimePeriodEnd}
                                                                onCancel={hideTimePeriodEndPicker}
                                                            />
                                                            <Text>
                                                                {timePeriodEnd != ''
                                                                    ? <Text>{moment(timePeriodEnd).format('h:mm a')}</Text>
                                                                    : <Text></Text>
                                                                }
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: '100%', width: '90%', height: '90%' }}>
                                <Button 
                                    color= '#9773FF'
                                    title='บันทึกข้อมูล' 
                                    onPress={onAddPress} />
                            </View>
                        </View>
                </View>
            </View>
        </View>
    )
}

export default EnrollQuestScreen;