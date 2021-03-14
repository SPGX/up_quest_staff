import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { firebase } from './firebase/config';
import auth from 'firebase/auth';
import { FlatList } from 'react-native-gesture-handler';

const QuestDetailScreen = ({ route }) => {

    const [quests, setQuests] = useState([])
    const [student, setStudent] = useState([])

    const navigation = useNavigation();

    const questId = route.params.id
    // console.log(questId)

    const questEnrollRef = firebase.firestore().collection('questsEnroll').where('taskId','==',questId.id)
    // const studentRef = firebase.firestore().collection('users')

    const onBackPress = () => {
        navigation.goBack()
    }

    useEffect(() => {
        // const studentPush = []
        questEnrollRef
            .get()
                .then((querySnapshot) => {
                    const questData = []
                    
                    querySnapshot.forEach((doc) => {
                        const quests = doc.data()
                        quests.id = doc.id
                        questData.push(quests)
                        // studentPush.push(doc.data().studentEnrollId)
                    });
                    setQuests(questData)
                })
                .catch((error) => {
                    console.log("Error getting documents: ", error);
                });
    }, []);

    const passQuest = ({item}) => {
        console.log(item.id)
        const questStatus = firebase.firestore().collection('questsEnroll').doc(item.id)
        questStatus.update({
            status : 'Pass'
        })
    }

    const failQuest = ({item}) => {
        console.log(item.id)
        const questStatus = firebase.firestore().collection('questsEnroll').doc(item.id)
        questStatus.update({
            status : 'Failed'
        })
    }

    const renderQuests = ({item}) => {
        return (
            <View style={{flexDirection:'row'}}>
                <View style={{ flex:5 }}>
                    <Text>
                        {item.studentEnrollId}
                    </Text>
                    {/* <Text>
                        {item.firstName}
                    </Text>
                    <Text>
                        {item.lastName}
                    </Text>
                    <Text>
                        {item.studentNumber}
                    </Text>
                    <Text>
                        {item.department}
                    </Text>
                    <Text>
                        {item.phoneNumber}
                    </Text> */}
                </View>
                <View style={{ flex:1 }}>
                    <Button title='Pass' onPress={() => passQuest({item})} />
                </View>
                <View style={{ flex:1 }}>
                    <Button title='Fail' onPress={() => failQuest({item})} />
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex:1, flexDirection:'column' }}>
            <View style={{ flex:1, backgroundColor:'#FFFFFF' }}>
                <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between' }}>
                        <View style={{ flex:1, flexDirection:'row', justifyContent:"flex-start", backgroundColor:'white' }}>
                            <TouchableOpacity onPress={onBackPress}>
                                <Text>Back</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex:2, flexDirection:'row', justifyContent:"center", backgroundColor:'white' }}>
                            <View>
                                <Text>Quest Detail</Text>
                            </View>
                        </View>
                        <View style={{ flex:1, flexDirection:'row', justifyContent:"flex-end", backgroundColor:'white' }}>

                        </View>
                    </View>
            </View>
            <View style={{ flex:15, backgroundColor:'#CCBAFF' }}>
                <Text>
                    ชื่องาน {questId.questName}
                </Text>
                <Text>
                    สถานที่ {questId.location}
                </Text>
                <Text>
                    จำนวนที่รับ {questId.unit}
                </Text>
                <Text>
                    วันเริ่มงาน {questId.dateStart}
                </Text>
                <Text>
                    วันสิ้นสุดงาน {questId.dateEnd}
                </Text>
                <Text>
                    เวลาเริ่มงาน {questId.timeStart}
                </Text>
                <Text>
                    เวลาเสร็จสิ้นงาน {questId.timeEnd}
                </Text>
                <Text>
                    จำนวนชั่วโมง {questId.amountTime}
                </Text>
                <View>
                    { quests && (
                        <FlatList
                            data={quests}
                            renderItem={renderQuests}
                            keyExtractor={(item) => item.id}
                            removeClippedSubviews={true}
                        />
                    )}
                </View>
            </View>
        </View>
    )
}

export default QuestDetailScreen;