import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { firebase } from './firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

const QuestScreen = () => {

    const [quests, setQuests] = useState([])

    const navigation = useNavigation();

    const onBackPress = () => {
        navigation.goBack()
    }

    const questsRef = firebase.firestore().collection('quests')

    useEffect(() => {
        (async () => {
            try {
                const uid = await AsyncStorage.getItem("uid")
                questsRef
                    .where("staff", "==", uid)
                    .onSnapshot(
                        querySnapshot => {
                            const questData = []
                            querySnapshot.forEach(doc => {
                                const quests = doc.data()
                                quests.id = doc.id
                                questData.push(quests)
                            });
                            setQuests(questData)
                        },
                        error => {
                            console.log(error)
                        }
                    )
            } catch (error) {
                alert(error)
            }
        })();
    }, []);

    const renderQuests = ({ item }) => {
        return (
            <View style={{ width: 370, height: 120 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('QuestDetail', { id: item })}
                >
                    <View style={{ borderWidth: 0.6, paddingLeft: 10, width: '100%' }}>
                        <View style= {{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 4}}>
                            <Text style= {{ fontSize: 18, fontWeight: 'bold', flexDirection: 'column' }}>
                                {item.questName}
                            </Text>
                            <Text style={{ fontSize: 12, fontWeight: 'bold', flexDirection: 'column' }}>
                                {item.timeStart} - {item.timeEnd}
                            </Text>
                        </View>

                        <View style= {{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 4}}>
                            <Text style= {{ flexDirection: 'column' }}>
                                สถานที่ {item.location}
                            </Text>
                            <Text style={{ fontSize: 11, fontWeight: 'bold', flexDirection: 'column' }}>
                                จำนวน {item.amountTime} ชั่วโมง
                            </Text>
                        </View>
                        {/* <Text>
                            จำนวนที่รับ {item.unit}
                        </Text> */}
                        <Text style={{ marginTop: 10 }}>
                            วันเริ่มงาน {item.dateStart}  
                        </Text>

                        <View style= {{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 4}}>
                            <Text style= {{ flexDirection: 'column' }}>
                                วันสิ้นสุดงาน {item.dateEnd}
                            </Text>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', flexDirection: 'column', color: 'purple' }}>
                                {item.unitEnroll}/{item.unit}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
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
                            <Text style={{ fontSize: 25, color: 'white', margin: 5 }}>
                                งานที่เปิดรับ
                            </Text>
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
                </View>
                <View style={{ flex: 13 }}>
                    <View style={{ backgroundColor: 'white', alignItems: 'center' }}>
                        <ScrollView>
                            <View style={{ marginTop: 10 }}>
                            {quests && (
                                <FlatList
                                    data={quests}
                                    renderItem={renderQuests}
                                    keyExtractor={(item) => item.id}
                                    removeClippedSubviews={true}
                                />
                            )}
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default QuestScreen;