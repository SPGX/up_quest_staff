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
        <View style={{ flex:1, flexDirection:'column' }}>
            <View style={{ flex:1, backgroundColor:'#FFFFFF' }}>
                <View style={{ flex:1, flexDirection:'row', justifyContent:'space-between' }}>
                    <View style={{ flex:1, flexDirection:'row', justifyContent:"flex-start", backgroundColor:'white' }}>
                        <TouchableOpacity>
                            <Text>UP_Quest</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex:2, flexDirection:'row', justifyContent:"center", backgroundColor:'white' }}>
                        <View>
                            <Text>Home</Text>
                        </View>
                    </View>
                    <View style={{ flex:1, flexDirection:'row', justifyContent:"flex-end", backgroundColor:'white' }}>
                        <TouchableOpacity onPress={onProfilePress}>
                            <Text>Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flex:15, backgroundColor:'#CCBAFF' }}>
                <View style={{ flex:1, backgroundColor:'gray' }}>

                </View>
                <View style={{ flex:4, backgroundColor:'pink' }}>

                </View>
                <View style={{ flex:3, backgroundColor:'orange' }}>
                    <Button onPress={() => navigation.navigate('EnrollQuest')} title='เพิ่มงานจิตอาสา'/>
                    <Button onPress={() => navigation.navigate('Quest')} title='งานจิตอาสาที่เพิ่ม'/>
                </View>
            </View>
        </View>
    )
}

export default HomeScreen;