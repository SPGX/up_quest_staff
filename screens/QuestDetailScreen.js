import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { firebase } from './firebase/config';
import auth from 'firebase/auth';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

const QuestDetailScreen = ({ route }) => {

    const [quests, setQuests] = useState([])
    const [student, setStudent] = useState([])

    const navigation = useNavigation();

    const questId = route.params.id
    // console.log(questId)

    const questEnrollRef = firebase.firestore().collection('questsEnroll').where('taskId', '==', questId.id)
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

    const passQuest = ({ item }) => {
        console.log(item.id)
        const questStatus = firebase.firestore().collection('questsEnroll').doc(item.id)
        questStatus.update({
            status: 'Pass'
        })
    }

    const failQuest = ({ item }) => {
        console.log(item.id)
        const questStatus = firebase.firestore().collection('questsEnroll').doc(item.id)
        questStatus.update({
            status: 'Failed'
        })
    }

    const renderQuests = ({ item }) => {
        return (
            <View style={{ flexDirection: 'row', backgroundColor: 'white', padding: 10, marginTop: 5, borderRadius: 10 }}>
                <View style={{ flex: 5 }}>
                    <Text>
                        {item.studentEnrollId}
                    </Text>
                    <Text>
                        {item.status}
                    </Text>
                    <Text>
                        {item.status}
                    </Text>
                    <Text>
                        {item.status}
                    </Text>
                    <Text>
                        {item.status}
                    </Text>
                </View>
                <View style={{ flex: 1, marginRight: 5 }}>
                    <Button 
                        color= 'green'
                        title='Pass' 
                        onPress={() => passQuest({ item })} 
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Button    
                        color= 'red'
                        title='Fail' 
                        onPress={() => failQuest({ item })} 
                    />
                </View>
            </View>
        )
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

                <View style={{ flex: 1.2, backgroundColor: '#9773FF', marginTop: 35, justifyContent: "center" }}>
                    <Text style={{ fontSize: 20, color: 'white', paddingLeft: 5 }} >
                        ชื่องาน
                    </Text>
                </View>

            <View style={{ flex: 16 }}>
                <View style={{ flex: 0.5, alignItems: 'center' }}>
                    <View style={{ flex: 1, paddingLeft: 10, width: '100%', backgroundColor: 'white' }}>
                        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 4 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', flexDirection: 'column' }}>
                                {questId.questName}
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', flexDirection: 'column' }}>
                                {questId.timeStart} - {questId.timeEnd}
                            </Text>
                        </View>

                        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 4 }}>
                            <Text style={{ flexDirection: 'column' }}>
                                สถานที่ {questId.location}
                            </Text>
                            <Text style={{ fontSize: 11, fontWeight: 'bold', flexDirection: 'column' }}>
                                จำนวน {questId.amountTime} ชั่วโมง
                                </Text>
                        </View>
                        {/* <Text>
                                จำนวนที่รับ {item.unit}
                            </Text> */}
                        <Text style={{ marginTop: 10 }}>
                            วันเริ่มงาน {questId.dateStart}
                        </Text>

                        <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 4 }}>
                            <Text style={{ flexDirection: 'column' }}>
                                วันสิ้นสุดงาน {questId.dateEnd}
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', flexDirection: 'column', color: 'purple' }}>
                                {questId.unitEnroll}/{questId.unit}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    <View style={{ backgroundColor: '#9773FF', marginTop: 35, justifyContent: "center", height: 55 }}>
                        <Text style={{ fontSize: 20, color: 'white', paddingLeft: 5 }} >
                            รายชื่อนิสิต
                        </Text>
                    </View>
                    <ScrollView>
                        <View style={{ padding: 5 }}>
                            <View style={{ margin: 3 }}>
                                {quests && (
                                    <FlatList
                                        data={quests}
                                        renderItem={renderQuests}
                                        keyExtractor={(item) => item.id}
                                        removeClippedSubviews={true}
                                    />
                                )}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
    )
}

export default QuestDetailScreen;