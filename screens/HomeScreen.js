import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { firebase } from './firebase/config';

const HomeScreen = () => {

    const navigation = useNavigation();

    const onProfilePress = () => {
        navigation.navigate('Profile')
    }

    return (
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: '#B4B4B4' }}>
            <View style={{ flex: 1.5, backgroundColor: '#A788FF' }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-start", backgroundColor: '#A788FF' }}>

                    </View>
                    <View style={{ flex: 2, flexDirection: 'row', justifyContent: "center", backgroundColor: '#A788FF' }}>
                        <View>
                            <Text style={{ fontSize: 25, color: 'white', margin: 5 }}>หน้าหลัก</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: "flex-end", backgroundColor: '#A788FF' }}>

                    </View>
                </View>
            </View>
            <View style={{ flex: 15, backgroundColor: '#B4B4B4', alignItems: 'center', marginTop: 35 }}>
                <View style={{ width: '100%', backgroundColor: '#9773FF' }}>
                    <View style={{ margin: 10 }}>
                        <Text style={{ fontSize: 20, color: 'white' }} >
                            งานจิตอาสา
                            </Text>
                    </View>
                </View>
                <View style= {{ width: '100%', backgroundColor: 'white', alignItems: 'center'}}>
                    <View style={{ width: '90%', height: '13%', margin: 20 }}>
                        <View style={{ flex: 3 }}>
                            <Button 
                                color= '#636262'
                                onPress={() => navigation.navigate('EnrollQuest')} 
                                title='เพิ่มงานจิตอาสา' />
                                <View style={{ marginTop: 5 }}>
                                    <Button 
                                        color= '#636262'
                                        onPress={() => navigation.navigate('Quest')} 
                                        title='งานจิตอาสาที่เพิ่ม' />
                                </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default HomeScreen;