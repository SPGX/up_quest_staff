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
            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 5 }}>
                    <Text>
                        {item.studentEnrollId}
                    </Text>
                    <Text>
                        {item.status}
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
                <View style={{ flex: 1 }}>
                    <Button title='Pass' onPress={() => passQuest({ item })} />
                </View>
                <View style={{ flex: 1 }}>
                    <Button title='Fail' onPress={() => failQuest({ item })} />
                </View>
            </View>
        )
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-start", backgroundColor: 'white' }}>
                        <TouchableOpacity onPress={onBackPress}>
                            <Text>Back</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: "center", backgroundColor: 'white' }}>
                        <View>
                            <Text>Quest Detail</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-end", backgroundColor: 'white' }}>

                    </View>
                </View>
            </View>
            <View style={{ flex: 10 }}>
                <View style={{ flex: 1, borderWidth: 1, paddingLeft: 10, width: '100%' }}>
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
                        วันเรื่มงาน {questId.dateStart}
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

                <View style={{ flex: 1 }}>
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
        </View>
    )
}

export default QuestDetailScreen;