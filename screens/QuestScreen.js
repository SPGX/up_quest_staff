import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { firebase } from './firebase/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList } from 'react-native-gesture-handler';

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

    const renderQuests = ({item}) => {
        return (
            <View style={{ width:335, height:170 }}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('QuestDetail', {id: item})}
                >
                    <View>
                        <Text>
                            ชื่องาน {item.questName}
                        </Text>
                        <Text>
                            สถานที่ {item.location}
                        </Text>
                        <Text>
                            จำนวนที่รับ {item.unit}
                        </Text>
                        <Text>
                            วันเรื่มงาน {item.dateStart}
                        </Text>
                        <Text>
                            วันสิ้นสุดงาน {item.dateEnd}
                        </Text>
                        <Text>
                            เวลาเรื่มงาน {item.timeStart}
                        </Text>
                        <Text>
                            เวลาเสร็จสิ้นงาน {item.timeEnd}
                        </Text>
                        <Text>
                            จำนวนชั่วโมง {item.amountTime}
                        </Text>
                    </View>
                </TouchableOpacity>
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
                                <Text>Quest</Text>
                            </View>
                        </View>
                        <View style={{ flex:1, flexDirection:'row', justifyContent:"flex-end", backgroundColor:'white' }}>

                        </View>
                    </View>
            </View>
            <View style={{ flex:15, backgroundColor:'#CCBAFF' }}>
                <View style={{ backgroundColor:'#9773FF' }}>
                    <Text>
                        รายชื่องานจิตอาสาทั้งหมด
                    </Text>
                </View>
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
    )
}

export default QuestScreen;