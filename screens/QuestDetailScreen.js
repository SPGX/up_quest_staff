import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { firebase } from './firebase/config';
import auth from 'firebase/auth'; 

const QuestDetailScreen = ({ route }) => {

    const navigation = useNavigation();

    const questId = route.params.id
    console.log(questId)

    const onBackPress = () => {
        navigation.goBack()
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
            </View>
        </View>
    )
}

export default QuestDetailScreen;