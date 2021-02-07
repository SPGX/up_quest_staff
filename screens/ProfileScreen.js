import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { Updates } from 'expo';

import { firebase } from './firebase/config';
import auth from 'firebase/auth';

const ProfileScreen = () => {

    const navigation = useNavigation();

    const onBackPress = () => {
        navigation.goBack()
    }

    const onSignOutPress = () => {
        firebase
            .auth()
                .signOut()
                    .then(() => console.log('User signed out!'));
        navigation.navigate('Login');
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
                                <Text>Profile</Text>
                            </View>
                        </View>
                        <View style={{ flex:1, flexDirection:'row', justifyContent:"flex-end", backgroundColor:'white' }}>
                            <TouchableOpacity onPress={onSignOutPress}>
                                <Text>Sign out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
            </View>
            <View style={{ flex:15, backgroundColor:'#CCBAFF' }}>

            </View>
        </View>
    )
}

export default ProfileScreen;